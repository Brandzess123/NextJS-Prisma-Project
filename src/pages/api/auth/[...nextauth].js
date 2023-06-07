import NextAuth from "next-auth";
import { providers } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient({
  //khởi tạo prisma client
  log: ["query", "error"],
});

const authOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:
        "87060862126-s59n9e8g4p4f9stm2rr1m6lr9sfm1pe0.apps.googleusercontent.com",
      clientSecret: "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",
    }),
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
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   //hàm này để chuyển hướng sau khi người dùng
  //   jwt(params) {
  //     // update token
  //     if (params.user?.role) {
  //       params.token.role = params.user.role;
  //     }
  //     // return final_token
  //     return params.token;
  //   },
  // },
};

export default NextAuth(authOptions);
