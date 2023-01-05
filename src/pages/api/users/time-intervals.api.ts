import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    startTimeInMinutes: z.number(),
    endTimeInMinutes: z.number()
  }))
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
  case "GET":
    break;
  case "POST": {
    const session = await unstable_getServerSession(
      req, 
      res, 
      buildNextAuthOptions(req, res)
    );

    if(!session) {
      return res.status(401).end();
    }

    const {
      intervals
    } = timeIntervalsFormSchema.parse(req.body);

    //await prisma?.userIimeInterval.createMany

    await Promise.all(intervals.map((interval) => {
      return prisma?.userIimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          week_day: interval.weekDay,
          user_id: session.user?.id
        }
      });
    }));

    return res.status(201).end();
  }
  default:
    break;
  }
  
  return res.status(405).end();
}