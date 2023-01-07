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
    const { date } = req.query;

    if(!date) {
      return res.status(400).json({
        message: "Date not provided."
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

    const referenceDate = dayjs(String(date));
    const isPastDate = referenceDate.endOf("day")
      .isBefore(new Date());

    if(isPastDate) {
      return res.json({
        availableTimes: [],
        possibleTimes: []
      });
    }

    const userAvailability = await prisma.userIimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: referenceDate.get("day")
      }
    });

    if(!userAvailability) {
      return res.json({
        availableTimes: [],
        possibleTimes: []
      });
    }

    const {
      time_end_in_minutes,
      time_start_in_minutes
    } = userAvailability;

    const startHour =  time_start_in_minutes / 60;
    const endHour = time_end_in_minutes / 60;

    const possibleTimes = Array.from({
      length: endHour - startHour
    }).map((_, i) => {
      return startHour + i;
    });

    const blockedTimes = await prisma.scheduling.findMany({
      select: {
        date: true
      },
      where: {
        user_id: user.id,
        date: {
          gte: referenceDate.set("hour", startHour).toDate(),
          lte: referenceDate.set("hour", endHour).toDate(),
        }
      }
    });

    console.log("blockedTimes", blockedTimes);
    const availableTimes = possibleTimes.filter(
      (time) => {
        const isTimeBlocked = blockedTimes.some(blockedTimes => {
          console.log("isTimeBlocked", blockedTimes.date.getHours(), time);
          return blockedTimes.date.getHours() === time;
        });
        
        const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());
        
        console.log("isTimeInPast", isTimeInPast);
        return !isTimeBlocked && !isTimeInPast;
      }
    );

    return res.status(200).json({
      availableTimes,
      possibleTimes
    });
  }
  case "POST": 
    break;
  default:
    break;
  }
  
  return res.status(405).end();
}