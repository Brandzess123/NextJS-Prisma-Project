import { useSession, signOut } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Protected = () => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  if (status === "authenticated")
    return (
      <div>
        This page is Protected for special people. like{"\n"}
        {JSON.stringify(data.user, null, 2)}
        <button
          onClick={() => signOut()}
          className="block mt-2 text-center bg-red-500 w-[120px] rounded"
        >
          Sign out
        </button>
      </div>
    );

  return <div>loading</div>;
};

export default Protected;
