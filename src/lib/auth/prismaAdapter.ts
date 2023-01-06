/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Adapter } from "next-auth/adapters";
import prisma from "../prisma";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { destroyCookie, parseCookies } from "nookies";

export default function PrismaAdapter(
  req: NextApiRequest | NextPageContext["req"], 
  res: NextApiResponse | NextPageContext["res"]
): Adapter {
  return {
    async createUser(user) {
      const { "@lmarcel/ignite-call/user-id": userIdOnCookies } = parseCookies({
        req
      });

      if(!userIdOnCookies) {
        throw new Error("User ID not found on cookies.");
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userIdOnCookies
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      });

      destroyCookie({ res }, "@lmarcel/ignite-call/user-id", {
        path: "/"
      });

      return {
        email: updatedUser.email!,
        emailVerified: null,
        avatar_url: updatedUser.avatar_url!,
        bio: updatedUser.bio!,
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      });

      if(!user) {
        return null;
      }

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        bio: user.bio!,
        id: user.id,
        name: user.name,
        username: user.username,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if(!user) {
        return null;
      }

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        id: user.id,
        bio: user.bio!,
        name: user.name,
        username: user.username,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId
          }
        },
        include: {
          user: true
        }
      });

      if(!account) {
        return null;
      }

      const { user } = account;

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        id: user.id,
        bio: user.bio!,
        name: user.name,
        username: user.username,
      };
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      });

      return {
        email: updatedUser.email!,
        emailVerified: null,
        avatar_url: updatedUser.avatar_url!,
        bio: updatedUser.bio!,
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state
        }
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken
        }
      });

      return {
        userId,
        sessionToken,
        expires
      };
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken
        },
        include: {
          user: true
        }
      });

      if(!session) {
        return null;
      }

      const { user } = session;

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
          bio: user.bio!,
          id: user.id,
          name: user.name,
          username: user.username,
        }
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updateSession = await prisma.session.update({
        where: {
          session_token: sessionToken
        },
        data: {
          expires,
          user_id: userId
        }
      });

      return {
        sessionToken: updateSession.session_token,
        userId: updateSession.user_id,
        expires: updateSession.expires
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken
        }
      });
    }
  };
}