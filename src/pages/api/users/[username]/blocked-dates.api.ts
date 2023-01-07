import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
  case "GET": {
    const username = String(req.query.username);
    const year = req.query?.year;
    let month = req.query?.month;

    if(!year || !month) {
      return res.status(400).json({
        message: "Year and month not provided."
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if(!user) {
      return res.status(404).json({
        message: "User does not exist."
      });
    }

    const availableWeekDays = await prisma.userIimeInterval.findMany({
      select: {
        week_day: true
      },
      where: {
        user_id: user.id
      }
    });

    const blockedWeekDays = Array.from({
      length: 7
    })
      .map((_, i) => i)
      .filter((weekDay) => {
        return !availableWeekDays.some(
          (availableWeekDay) => {
            return availableWeekDay.week_day === weekDay;
          }
        );
      });

    month = String(month).padStart(2, "0");
    const blockedDatesRaw: Array<{
      date: number;
    }> = await prisma.$queryRaw`
      SELECT 
        EXTRACT(DAY FROM S.date) AS date,
        COUNT(S.date) AS amount,
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

      FROM schedulings S

      LEFT JOIN user_time_intervals UTI
        ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

      WHERE S.user_id = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

      GROUP BY EXTRACT(DAY FROM S.date),
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      HAVING amount >= size
    `;

    const blockedTimes: Array<{
      currentHourInMinutes: number;
      maxStartTimeInMinutes: number;
      remains: number;
    }> = await prisma.$queryRaw`
      SELECT
        (UTI.time_end_in_minutes - 60) as maxStartTimeInMinutes,
        ((HOUR(CURTIME()) - 3) * 60) as currentHourInMinutes,
        ((UTI.time_end_in_minutes / 60) - 1 - (HOUR(CURTIME()) - 3)) as remains
      
      FROM user_time_intervals UTI

      WHERE UTI.user_id = ${user.id}
        AND UTI.week_day = WEEKDAY(DATE_ADD(CURDATE(), INTERVAL 1 DAY))

      GROUP BY maxStartTimeInMinutes, currentHourInMinutes, remains
    `;

    const schedulesInCurrentDay = await prisma.$queryRaw<{ amount: number; }>`
      SELECT  
        COUNT(S.date) as amount
        FROM schedulings S
        WHERE (DAY(DATE_SUB(S.date, INTERVAL 3 HOUR)) = DAY(CURDATE()))  #is current day
        AND ((HOUR(S.date) - 3) * 60) > ((HOUR(CURTIME()) - 3) * 60)   #is not past
    `;

    const todayIsBlocked = blockedTimes.length > 0 && blockedTimes.every((schedule) => {
      return schedule.remains <= schedulesInCurrentDay.amount;
    });

    const blockedDates = blockedDatesRaw.map((item) => {
      return item.date;
    });

    if(todayIsBlocked) {
      blockedDates.push(dayjs(new Date()).get("date"));
    }

    return res.status(200).json({
      blockedWeekDays,
      blockedDates
    });
  }
  case "POST": 
    break;
  default:
    break;
  }
  
  return res.status(405).end();
}

/*
SELECT 
        EXTRACT(DAY FROM S.date) AS date,
        COUNT(S.date) AS amount,
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

      FROM schedulings S

      LEFT JOIN user_time_intervals UTI
        ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

      WHERE S.user_id = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

      GROUP BY EXTRACT(DAY FROM S.date),
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      HAVING amount >= size
*/