import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import prisma from "../../../lib/prisma";

const profileFormSchema = z.object({
  bio: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
  case "GET":
    break;
  case "POST":
    break;
  case "PUT": {
    const session = await unstable_getServerSession(
      req, 
      res, 
      buildNextAuthOptions(req, res)
    );

    if(!session) {
      return res.status(401).end();
    }

    const {
      bio
    } = profileFormSchema.parse(req.body);

    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        bio
      }
    });

    res.revalidate(`/schedule/${session.user.username}`);

    return res.status(204).end();
  }
  default:
    break;
  }
  
  return res.status(405).end();
}