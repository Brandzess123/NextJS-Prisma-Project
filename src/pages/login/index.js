import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { sign } from "crypto";

import Image from "next/image";

export default function LoginSite() {
  const [pass, setPassword] = useState("");
  const [mail, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // const [session, loading] = useSession();
  // const { data: session, loading } = useSession();

  // const handleGoogle = () => {
  //   // const result = signIn("google", { callbackUrl: "http://localhost:3000" });
  //   // if (result.error) {
  //   //   // Xử lý lỗi nếu có
  //   //   console.log(result.error);
  //   // } else {
  //   //   // Đăng nhập thành công, điều hướng đến trang mong muốn
  //   //   router.push("/menu"); // Thay đổi '/dashboard' thành đường dẫn trang mong muốn
  //   // }

  //   signIn("google");
  // };

  const handleGithub = async () => {
    const result = await signIn("github");
    if (result.error) {
      // Xử lý lỗi nếu có
      console.log(result.error);
    } else {
      // Đăng nhập thành công, điều hướng đến trang mong muốn
      router.push("/menu"); // Thay đổi '/dashboard' thành đường dẫn trang mong muốn
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  // const validateForm = (email, password) => {
  //   // Regex pattern for email validation
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   // Regex pattern for password validation
  //   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  //   // Check if email is valid
  //   if (!emailPattern.test(email)) {
  //     setErrorMessage("Email is not valid");
  //     return false;
  //   }

  //   // Check if password is valid
  //   if (!passwordPattern.test(password)) {
  //     setErrorMessage(
  //       "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit"
  //     );
  //     return false;
  //   }

  //   // Form is valid
  //   setErrorMessage("");
  //   return true;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     //console.log("hàm chạy");

  //     const dataResult = { email: mail, password: pass };

  //     const status = await signIn("credentials", {
  //       redirect: false,
  //       email: mail,
  //       password: pass,
  //       callbackUrl: "/login",
  //     });

  //     if (status.ok) router.push("/menu");
  //   } catch (error) {
  //     console.error("Vui Lòng nhập đúng thông tin", error);
  //   }
  //   //tạo 1 state button mỗi khi click thì nó sẽ thay đổi => kéo theo useeffect thay đổi
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //console.log("hàm chạy");
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: mail,
        password: pass,
      }); //thêm cái này cho nó đỡ redirect

      if (signInResponse.ok) {
        console.log(signInResponse);
        router.push("/menu");
      }
      // router.push("/protected");
      // console.log(session.user.email);
      else console.log(signInResponse);
    } catch (error) {
      console.error("Vui Lòng nhập đúng thông tin", error);
    }
    //tạo 1 state button mỗi khi click thì nó sẽ thay đổi => kéo theo useeffect thay đổi
  };

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={50}
            height={50}
            className="w-auto h-10 mx-auto"
            src="/favicon.ico"
            alt="Your Company"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={mail}
                  // required
                  // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  // title="Email should be @."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                  // pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/"
                  // title="Password should be digits (0 to 9) or alphabets (a to z)."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* {validateForm(mail, pass) && (
              <div>Thông tin đăng nhập hoặc mật khẩu không chính xác!</div>
            )}{" "} */}
            {/* Display error message */}
            <div>
              <button
                type="submit"
                className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>

              <button
                // type="submit"
                // onClick={handleGoogle}
                onClick={() => signIn("google")}
                className="mb-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // onClick={}
              >
                Google
              </button>

              <button
                type="submit"
                onClick={handleGithub}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // onClick={}
              >
                Github
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>

          {/* <div>
              <h1>Menu</h1>
              <ul>
                {data.map((item) => (
                  <li key={item.id}>
                    {item.name} và password của database là {item.email} và
                    password là {item.pasword}{" "}
                  </li>
                ))}
              </ul>
            </div> */}
        </div>
      </div>
    </>
  );
}
