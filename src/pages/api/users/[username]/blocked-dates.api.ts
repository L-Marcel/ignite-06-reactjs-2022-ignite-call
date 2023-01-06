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
    const { year, month } = req.query;

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

    const blockedDatesRaw = await prisma.$queryRaw`
      SELECT *
      FROM schedulings S
      WHERE S.user_id = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
    `;

    return res.status(200).json({
      blockedWeekDays,
      blockedDatesRaw
    });
  }
  case "POST": 
    break;
  default:
    break;
  }
  
  return res.status(405).end();
}