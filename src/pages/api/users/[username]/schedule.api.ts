import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";
import { google } from "googleapis";
import { getGoogleOAuthToken } from "../../../../lib/google";

const createScheduleBody = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
  case "GET": 
    break;
  case "POST": {
    const username = String(req.query.username);

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

    const { 
      name, 
      email, 
      observations, 
      date 
    } = createScheduleBody.parse(req.body);

    const schedulingDate = dayjs(date).startOf("hour");
    
    if(schedulingDate.isBefore(new Date())) {
      return res.status(400).json({
        message: "Date is in the past."
      });
    }

    const scheduleWeekDay = schedulingDate.get("day");
    const scheduleHourInMinutes = schedulingDate.startOf("hour").get("hour") * 60;
    const scheduleUserTimeInterval = await prisma.userIimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: scheduleWeekDay,
        time_end_in_minutes: {
          gt: scheduleHourInMinutes
        },
        time_start_in_minutes: {
          lte: scheduleHourInMinutes
        }
      }
    });

    const schedulingIsAvailable = scheduleUserTimeInterval;
    if(!schedulingIsAvailable) {
      return res.status(400).json({
        message: "Time is not available."
      });
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        user_id: user.id,
        date: schedulingDate.toDate()
      }
    });

    if(conflictingScheduling) {
      return res.status(400).json({
        message: "There is another scheduling at the same time."
      });
    }

    const { id } = await prisma.scheduling.create({
      data: {
        name,
        email,
        observations,
        date: schedulingDate.toDate(),
        user_id: user.id
      }
    });

    const calendar = google.calendar({
      version: "v3",
      auth: await getGoogleOAuthToken(user.id)
    });

    await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${name}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format()
        },
        end: {
          dateTime: schedulingDate.add(1, "hour").format()
        },
        attendees: [
          { email, displayName: name }
        ],
        conferenceData: {
          createRequest: {
            requestId: id,
            conferenceSolutionKey:  {
              type: "hangoutsMeet"
            }
          }
        }
      }
    });

    return res.status(201).end();
  }
  default:
    break;
  }
  
  return res.status(405).end();
}