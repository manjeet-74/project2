"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error:any) {
      console.log(error?.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };

  return (
    <div
      className="flex flex-col items-center
        justify-center min-h-screen py-2"
    >
      <h1>Profile</h1>
      <h2>
        {data == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <p>Profile page</p>
      <br />
      <button
        onClick={logout}
        className="bg-blue-500 rounded hover:bg-blue-700 
      text-white font-bold p-2"
      >
        Logout
      </button>
      <br />

      <button
        onClick={getUserDetails}
        className="bg-blue-500 rounded hover:bg-blue-700 
      text-white font-bold p-2"
      >
        Get User data
      </button>
    </div>
  );
}
