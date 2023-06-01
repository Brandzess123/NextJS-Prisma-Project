import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

export default async function handler(req, res) {
  // Sử dụng Prisma Client để truy vấn dữ liệu từ CSDL

  if (req.method === "POST") {
    // Lấy thông tin người dùng từ request body
    const { email, password } = req.body;

    const resultData = {
      data1: "\n" + email + "\n" + password,
      data2: "",
    };

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    //  if (user)
    //  res.json({ success: true});
    //  res.s
    //  else
    if (user) resultData.data2 = "true";
    else resultData.data2 = "false";
    res.status(200).json(resultData);
    // Tạo người dùng mới trong cơ sở dữ liệu
  } else {
    res.status(405).end();
  }
}
