"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
    } catch (error: any) {
      console.log("Login failed", error.message);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="
      flex 
      flex-col 
      items-center 
      justify-center 
      min-h-screen 
      py-2"
    >
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="text-black p-2 border border-gray-300 round-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="text-black p-2 border border-gray-300 round-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="
      p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
      focus:border-gray-600"
      >
        Login
      </button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}