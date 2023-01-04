import { Adapter } from "next-auth/adapters";
import prisma from "../prisma";

export default function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {},
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id
        }
      });

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        id: user.id,
        name: user.name,
        username: user.username,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email
        }
      });

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        id: user.id,
        name: user.name,
        username: user.username,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          
        }
      });

      return {
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        id: user.id,
        name: user.name,
        username: user.username,
      };
    },
    async updateUser(user) {
      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    async getSessionAndUser(sessionToken) {
      return;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}