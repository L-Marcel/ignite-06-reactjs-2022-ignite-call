import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { errors } from "../../../errors";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch(req.method) {
  case "GET":
    break;
  case "POST": {
    const { name, username } = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if(userAlreadyExists) {
      return res.status(400).json(errors.usernameAlreadyInUse);
    }

    const user = await prisma.user.create({
      data: {
        name,
        username
      }
    });

    setCookie({ res }, "@lmarcel/ignite-call/user-id", user.id, {
      maxAge: 60 * 60 * 24 * 7, //7 days
      path: "/",
    });

    return res.status(201).json(user);
  }
  default:
    break;
  }

  return res.status(405).end();
}