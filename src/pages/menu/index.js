import React from "react";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import axios from "axios";

// export async function getServerSideProps() {
//   // Gọi API hoặc lấy dữ liệu từ server
//   const response = await fetch("/api/db"); //fetch dữ liệu từ api cho trước
//   //await fetch("/api/db");
//   const jsonData = await response.json(); //lưu result vào prop jsonData

//   // Trả về dữ liệu nhận được dưới dạng props
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Menu() {
  const [data, setData] = useState([]);

  const [mail, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [user, setUserName] = useState("");
  const [idc, setidc] = useState("");
  //const [bts, setbutton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getinfo"); //fetch dữ liệu từ api cho trước
      const jsonData = await response.json(); //lưu result vào prop jsonData

      setData(jsonData.data1); //set giá trị vào state
      console.log(jsonData.data2);
    };

    fetchData();
  }, []);

  // const handleDelete = async (e) => {
  //   e.preventDefault();

  //   try {
  //     console.log("hàm chạy");
  //     //const dataResult = { username: user, email: mail, password: pass };
  //     const dataDelete = { email: mail };
  //     const response = await fetch("/api/getinfo", {
  //       method: "DELETE",
  //       body: JSON.stringify(dataDelete),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Kết quả từ API:", data.data1);
  //     } else {
  //       console.error("Lỗi khi gửi yêu cầu:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu:", error);
  //   }
  // };

  // const handleDelete = async (e) => {
  //   // console.log("chạy");
  //   e.preventDefault();

  //   try {
  //     const Result2 = { id: idc, name: "hieu" }; //lấy dữ liệu từ dataResult

  //     const response = await fetch("/api/getinfo", {
  //       method: "DELETE",
  //       body: JSON.stringify(Result2),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Kết quả từ API:", data); //nó sẽ return kết quả
  //     } else {
  //       console.error("Lỗi khi gửi yêu cầu:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu:", error);
  //   }
  //   //tạo 1 state button mỗi khi click thì nó sẽ thay đổi => kéo theo useeffect thay đổi
  // };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("/api/getinfo", {
        params: { id: idc },
      });
      // const response = await axios.delete(`/api/data?id=${idc}`, {});
      // Thay thế '/api/data' bằng URL API thực tế của bạn và thêm query parameter ?id=${id}
      console.log("Kết quả xoá:", response.data);
      // Xử lý kết quả xoá thành công ở đây
    } catch (error) {
      console.error("Lỗi khi xoá dữ liệu:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //console.log("hàm chạy");
      const dataResult = { username: user, email: mail, password: pass };
      const response = await fetch("/api/getinfo", {
        method: "POST",
        body: JSON.stringify(dataResult),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Kết quả từ API:", data.data1);
        //setbutton(!bts);
      } else {
        console.error("Lỗi khi gửi yêu cầu:", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
    //tạo 1 state button mỗi khi click thì nó sẽ thay đổi => kéo theo useeffect thay đổi
  };

  // async function postData() {
  //   //xử lý post
  //   // Dữ liệu cần gửi lên server

  //   // Gửi request POST với dữ liệu và chờ đợi response

  //   //tạo 1 object và truyền 3 giá trị vào object data

  //   // const prisma = new PrismaClient();
  //   // const user = await prisma.user.create({
  //   //   data: {
  //   //     username: username1,
  //   //     email: email1,
  //   //     password: password1,
  //   //   },
  //   // });

  //   const dataResult = { username: user, emai: mail, password: pass };

  //   const response = await fetch("/api/db", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataResult),
  //   });
  //   // Chuyển đổi response thành dữ liệu JSON và chờ đợi kết quả
  //   const result = await response.json();
  //   // In ra kết quả từ server
  //   console.log(result);
  // }

  return (
    <>
      <h1>this is a menu page</h1>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2">
          <h1 className="mb-4 text-center">Menu</h1>
          <table className="w-full border">
            <thead className="border ">
              <tr className="border">
                <th className="border">ID</th>
                <th className="border">Name</th>
                <th className="border">Email</th>
                <th className="border">Password</th>
                {/* <th className="border">update</th>
                <th className="border">delete</th> */}
              </tr>
            </thead>
            <tbody className="border">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center border">{item.id}</td>
                  <td className="text-center border">{item.name}</td>
                  <td className="text-center border">{item.email}</td>
                  <td className="text-center border">{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* onSubmit={handleSubmit} */}
          <form>
            <input
              id="id2"
              name="id2"
              // type="id"
              //tách dữ liệu
              value={idc}
              onChange={(e) => setidc(e.target.value)}
              required
              className="block w-[30%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" id"
            />

            <input
              id="email"
              name="email"
              type="email"
              //tách dữ liệu
              value={mail}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-[30%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="email"
            />
            <input
              id="password"
              name="password"
              type="password"
              //tách dữ liệu
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-[30%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="password"
            />
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              //tách dữ liệu
              value={user}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              required
              className="block w-[30%] rounded-md mt-11 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
              className="text-center bg-red-500 border"
              type="submit"
              onClick={handleSubmit}
            >
              update
            </button>

            <button
              className="ml-5 text-center bg-red-500 border rounded-sm"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>

            {/* <button
              className="text-center bg-yellow-300 border"
              type="submit"
              onClick={handleDelete}
            >
              delete
            </button> */}
          </form>
        </div>
      </div>
    </>
  );
}
