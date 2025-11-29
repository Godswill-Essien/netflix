"use client"
import Link from 'next/link'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import { isAuth } from "../app/api/auth/depends"

export default function Navbar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    const loginRes = await fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email }) // Only sending email
    });

    console.log(loginRes);


    const signInRes = await signIn("credentials", {
      email,
      callbackUrl: "/",
    });

    if (signInRes?.error) {
      console.error(signInRes.error);
    }

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });

    if (res!.error) {
      console.error(res!.error);
    }
  };

  return (
    <div className="px hero max-md:h-[700px] h-[600px] " >
      <nav className='flex justify-around  md:gap-x-52  items-center py-6 '>
        <div className='netflix '> </div>
        <div >
          {isAuth() ? (
          <Link href="/profile " className='font-sans font-bold  py-2 px-4 rounded-md   bg-gradient-to-l from-red-700 to-red-600 transition-all duration-500 ease-in-out hover:opacity-75'> Dashboard</Link>

          ) : (
          <Link href="/signup " className='font-sans font-bold  py-2 px-4 rounded-md   bg-gradient-to-l from-red-700 to-red-600 transition-all duration-500 ease-in-out hover:opacity-75'> Sign in</Link>

          ) }
        </div>
      </nav>

      <div className='translate-y-6 md:mt-28 px-4 min-h-fit  flex flex-col gap-5 '>
        <div className=''>
          <p className='font-sans md:hidden text-[37px]  font-extrabold'>Unlimited movies, TV shows,  and  more</p>
          <p className='font-sans hidden  px-2 md:block text-[34px] md:text-[58px] font-extrabold '>Unlimited movies, <br /> TV  shows,  and  more</p>
          <p className='mb-4 md:font-bold'>Starts at ₦2,200. Cancel anytime.</p>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
        </div>

        <form className='flex  flex-col md:flex-row gap-3 justify-center items-center' onSubmit={handleSubmit}>
          <input
            id="home"
            required
            placeholder='Email address'
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`bg-inherit md:w-[400px] bg-opacity-60 bg-neutral-800 focus:bg-opacity-60 focus:outline-white border ${isValidEmail ? 'border-green-500' : 'border-gray-500'} text-white rounded-md py-4 px-5`}
          />

          <div className='bg-red-700 flex justify-center items-center md:w-[198px] gap-5 rounded-md py-4 px-5 transition-all duration-500 ease-in-out hover:opacity-75'>
            <button className=' text-white font-extrabold font-sans  text-[16px] px-2 rounded-md' type="submit">Get Started</button>
            <IoIosArrowForward className='text-[25px]' />
          </div>
        </form>



      </div>

      <div className="relative md:top-48  sm:bg-red-900   top-[145px]">
        <div className="absolute bottom-0 left-0 w-full h-16 "></div>
        <div className="absolute bottom-0 left-0 w-full h-16  bg-black rounded-t-[50%] border-t-4 border-red-700 shadow-2xl shadow-black"></div>
      </div>

      
    </div>
  )
}
