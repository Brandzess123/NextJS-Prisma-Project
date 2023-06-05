// import { prisma } from "../../server/db/";
// import { getSession } from "next-auth/client";
// import { authOptions } from "./auth/[...nextauth]";

// function titleFromCode(code) {
//   return code.trim().split("\n")[0].replace("// ", "");
// }

// async function post(req, res) {
//   const session = await getSession({ req });
//   if (!session) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   const prismaUser = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!prismaUser) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   const { language, code } = req.body;
//   const title = titleFromCode(code);
//   const post = await prisma.post.create({
//     data: {
//       title,
//       language,
//       code,
//       userId: prismaUser.id,
//     },
//   });
//   res.status(201).json(post);
// }

// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       await post(req, res);
//       break;
//     default:
//       res.setHeader("Allow", ["POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
