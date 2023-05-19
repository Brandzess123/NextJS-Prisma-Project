import React from "react";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Menu() {
  const [data, setData] = useState([]);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUserName] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/db"); //fetch dữ liệu từ api cho trước
      const jsonData = await response.json(); //lưu result vào prop jsonData

      setData(jsonData);                      //set giá trị vào state
    };

    fetchData();
  }, []);

  async function postData(email,password) { //xử lý post
    try {
      // Dữ liệu cần gửi lên server
      
      // Gửi request POST với dữ liệu và chờ đợi response
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // Chuyển đổi response thành dữ liệu JSON và chờ đợi kết quả
      const result = await response.json();
      // In ra kết quả từ server
      console.log(result);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
    }
  }
  
  postData();
  

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
                <th className="border">update</th>
                <th className="border">delete</th>
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
                    <button className="bg-red-500" onClick={}>update</button>
                  </td>
                  <td className="text-center bg-yellow-300 border">
                    <button>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <form method="POST">
              <input
              id="email"
              name="email"
              type="email"
              
              //tách dữ liệu
              value={email}
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
              value={password}
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
              value={username}
              onChange={(e) => setUserName(e.target.value)} 

              required
              className="block w-[30%] rounded-md mt-11 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </form>
        </div>
      </div>
    </>
  );
}
