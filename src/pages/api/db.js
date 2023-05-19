import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Sử dụng Prisma Client để truy vấn dữ liệu từ CSDL

  if (req.method === "GET") {
    const data = await prisma.user.findMany();
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // Lấy thông tin người dùng từ request body
    const { name, email, password } = req.body;
    // Tạo người dùng mới trong cơ sở dữ liệu
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
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
    // Lấy ID người dùng từ query parameters
    const { id } = req.query;
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
