import NextAuth from "next-auth";
import { providers } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient({
  //khởi tạo prisma client
  log: ["query", "error"],
});

const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        // Lấy thông tin người dùng từ CSDL bằng Prisma
        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });

        if (user) {
          // Trả về đối tượng người dùng nếu đăng nhập thành công
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } else {
          // Trả về null nếu đăng nhập không thành công
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
