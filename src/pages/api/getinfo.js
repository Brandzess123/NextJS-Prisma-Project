import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

export default async function handler(req, res) {
  // Sử dụng Prisma Client để truy vấn dữ liệu từ CSDL

  if (req.method === "GET") {
    const data = await prisma.user.findMany();
    const combinedate = {
      data1: data,
      data2: "đây là result trả về",
    };
    res.status(200).json(combinedate);
    // res.status(200).json("đây là result trả về");
  } else if (req.method === "POST") {
    // Lấy thông tin người dùng từ request body
    const { username, email, password } = req.body;

    const resultData = {
      data1: username + "\n" + email + "\n" + password,
    };
    // res.status(200).json(resultData);
    // const user = await prisma.$queryRaw`INSERT INTO user (name, email, password) VALUES ('${username}', '${email}', '${password}';`
    // );
    //const user = await prisma.$queryRaw`INSERT INTO public.user (name, email, password) VALUES ('${username}', '${email}', '${password}'`;

    //     const user = await prisma.$queryRaw(`
    //   INSERT INTO public.user (name, email, password)
    //   VALUES (${username}, ${email}, ${password});
    // `);
    // const user =
    //   await prisma.$queryRaw`INSERT INTO public."user"(name, email, password) VALUES (${username}, ${email}, ${password});`;
    // const user = await prisma.user.createMany({
    //   data: {

    //     email: email,
    //     name: username,
    //     password: password,
    //   },
    // });

    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: password,
      },
    });
    res.status(201).json(user);

    // Tạo người dùng mới trong cơ sở dữ liệu

    //res.status(201).json(user);
  } else if (req.method === "PUT") {
    // Lấy ID người dùng từ query parameters
    const { id } = req.query;
    // Lấy thông tin người dùng từ request body
    const { name, email, password } = req.body;
    // Cập nhật thông tin người dùng trong cơ sở dữ liệu
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password },
    });
    res.status(200).json(updatedUser);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    //res.status(200).json("giá trị cuối cùng là " + id + " và tên tôi là ");
    // Xoá người dùng khỏi cơ sở dữ liệu
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } else {
    // Phương thức HTTP không được hỗ trợ
    res.status(405).end();
  }
}
