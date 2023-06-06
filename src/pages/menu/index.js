import React from "react";
// import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
// import { json } from "stream/consumers";
// import { authOptions } from "src/pages/api/auth/[...nextauth]";

// import { useSession, signIn, signOut } from "next-auth/react";
//kiểm tra xem ai đó sign in vào chưa

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

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://${context.req.headers.host}/api/getinfo`);
  const jsonData = await res.json();
  // setData(jsonData.data1); //set giá trị vào state
  return { props: { jsonData } };
};

export default function Menu({ jsonData }) {
  const [data, setData] = useState([]);

  const [mail, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [user, setUserName] = useState("");
  const [idc, setidc] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  //đoạn code này nên cho vào hàm use effect
  // const { data: session, loading } = useSession();

  //   if (loading) {
  //     console.log("loading");
  //   }

  //   if (session) {
  //     // Phiên session đã được tạo
  //    console.log(session.username);
  //   } else {
  //     // Phiên session chưa được tạo
  //    console.log("blank");
  //   }
  // }

  useEffect(() => {
    // const myComponent = <Protected />;
    setData(jsonData.data1);
    // console.log(window.location.href.split("/menu")[0] + "/api/getinfo");
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api/getinfo"); //fetch dữ liệu từ api cho trước
    const jsonData = await response.json(); //lưu result vào prop jsonData

    setData(jsonData.data1); //set giá trị vào state
    console.log(jsonData.data2);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete("/api/getinfo", {
        params: { id: idc },
      });
      console.log("Kết quả xoá:", response.data);
    } catch (error) {
      console.error("Lỗi khi xoá dữ liệu:", error);
    }
    //fetch();
    fetchData();
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
    fetchData();
    //tạo 1 state button mỗi khi click thì nó sẽ thay đổi => kéo theo useeffect thay đổi
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <h1 className="mt-5 text-lg font-bold text-center">
        This is a menu page
      </h1>
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
                <th className="border">Edit</th>
              </tr>
            </thead>
            <tbody className="border">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center border">{item.id}</td>
                  <td className="text-center border">{item.name}</td>
                  <td className="text-center border">{item.email}</td>
                  <td className="text-center border">{item.password}</td>
                  <td className="text-center border">
                    {" "}
                    <button
                      className="ml-5 text-center bg-red-500 border rounded-sm"
                      type="submit"
                      onClick={openModal}
                    >
                      Update
                    </button>
                  </td>
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
              Insert
            </button>

            <button
              className="ml-5 text-center bg-red-500 border rounded-sm"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 ">
                  <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-center text-gray-900"
                        >
                          testing
                        </Dialog.Title>
                        <div className="flex flex-col items-center justify-center mt-2 ">
                          <input
                            id="id2"
                            name="id2"
                            // type="id"
                            //tách dữ liệu
                            value={idc}
                            onChange={(e) => setidc(e.target.value)}
                            required
                            className="block w-[80%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-[80%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-[80%] mt-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-[80%] rounded-md mt-11 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div className="flex items-center justify-center mt-4">
                          <button
                            type="button"
                            className="justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Sign up
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

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
