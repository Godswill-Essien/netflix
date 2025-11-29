import React from 'react';
import { FaTv } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { GoTelescopeFill } from "react-icons/go";
import { FaTheaterMasks } from "react-icons/fa";

export default function Reasons() {
    return (
        <div className='flex justify-center items-center  p-7 '>


            <div className='max-w-6xl w-full flex flex-col items-center md:translate-x-7   gap-8'>



                <h1 className='font-extrabold mb-2 lg:text-[23px] mr-36  md:mr-[870px]'>More Reasons to Join</h1>


                <div className=' grid grid-cols-1  lg:grid-cols-4 md:grid-col-1 gap-y-2 w-full '>


                    <div className=' md:h-[330px] sm:w-full md:w-[250px] bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg        p-6 bg-opacity-60 rounded-2xl shadow-lg bg-gradient-to-r from-slate-900 to-pink-950 text-white flex flex-col justify-between h-auto min-h-[200px] '>
                        <h2 className='text-2xl font-bold'>Enjoy your TV</h2>
                        <p className='mt-2 text-sm'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                        <div className='flex justify-end'>
                            <FaTv size={50} /> 
                        </div>
                    </div>



                    <div className=' md:w-[250px] sm:w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg      p-6 rounded-2xl shadow-lg bg-gradient-to-r from-slate-900 to-pink-950 text-white flex flex-col justify-between  min-h-[200px]'>
                        <div className='flex text-start'>
                        <h2 className='text-2xl font-bold'>Download your shows to watch offline</h2>
                        </div>
                      
                        <p className='mt-2 text-sm'>Save your favorites easily and always have something to watch.</p>
                        <div className='flex justify-end'>
                             <FaDownload size={40} />
                        </div>
                    </div>



                    <div className=' md:w-[250px] bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg  border-gray-100    p-6 rounded-2xl shadow-lg bg-gradient-to-r from-slate-900 to-pink-950 text-white flex flex-col justify-between h-auto min-h-[200px]'>
                        <h2 className='text-2xl font-bold'>Watch everywhere</h2>
                        <p className='mt-2 text-sm'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                        <div className='flex justify-end'>
                             <GoTelescopeFill size={50} />
                        </div>
                    </div>


                    <div className='  md:w-[250px] bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg  border-gray-100   p-6 rounded-2xl shadow-lg bg-gradient-to-r from-slate-900 to-pink-950 text-white flex flex-col justify-between h-auto min-h-[200px]'>
                        <h2 className='text-2xl font-bold'>Create profiles for kids</h2>
                        <p className='mt-2 text-sm'>Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
                        <div className='flex justify-end'>
                             <FaTheaterMasks size={50} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
