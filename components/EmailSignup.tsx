"use client";
import Link from "next/link";
import React, { useState } from "react";
import API from '.././api';
import { signIn } from "next-auth/react";
import { IoIosArrowForward } from "react-icons/io";
import { AxiosError } from "axios";

export default function Emailsignup({ onRegistered }: {onRegistered?: (e: string)=> void}) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  // email sinup 

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');


  const submit = async (e: FormDataEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      setMsg(res.data.message);
      onRegistered && onRegistered(email); // show OTP screen
    } catch (err) {
      if (err instanceof AxiosError ) {
        
        setMsg(err.response?.data?.message || 'Error');
      }
    }
  };

  //  line end 

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit  = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      callbackUrl: "/",
    });

    if (res?.error) {
      console.error(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-7 py-8 md:mt-">
      <p className="text-start  md:text-xl   mb-4">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <form
        className="flex flex-col md:flex-row gap-3 w-full max-w-xl"
        onSubmit={handleSubmit}
      >


        <input
          id="home"
          required
          placeholder="Email address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={`w-full md:flex-1 md:w-full lg:w-full bg-transparent border ${isValidEmail ? "border-green-500" : "border-gray-500"
            } text-white rounded-md py-3 px-4 focus:outline-white`}
        />

        <button
          type="submit"
          className="flex items-start bg-red-700 w-max justify-start gap-2  text-white font-bold text-lg rounded-md py-3 px-6 md:w-auto transition-opacity duration-300 hover:opacity-75"
        >
          Get Started <IoIosArrowForward className="text-2xl bg-red-700" />
        </button>
      </form>
    </div>
  );
}
