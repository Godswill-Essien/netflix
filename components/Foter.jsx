"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaGlobe } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";


const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "zh", label: "Chinese" },
    { code: "ja", label: "Japanese" }
];

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <div className="flex  flex-col   text-white py-8  px-7 md:px-12 md:items-center">
            <p className="mb-4  text-sm md:text-base  lg:mr-[855px] md:mr-[800px]  underline">Questions? Contact us.</p>
            <div className="flex  flex-col text-start md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-400 md:text-left w-full max-w-5xl justify-center md:justify-start">
                <Link href="#" className="underline">FAQ</Link>
                <Link href="#" className="underline">Help Center</Link>
                <Link href="/login" className="underline">Account</Link>
                <Link href="#" className="underline">Media Center</Link>
                <Link href="#" className="underline">Investor Relations</Link>
                <Link href="#" className="underline">Jobs</Link>
                <Link href="#" className="underline">Ways to Watch</Link>
                <Link href="#" className="underline">Terms of Use</Link>
                <Link href="#" className="underline">Privacy</Link>
                <Link href="#" className="underline">Cookie Preferences</Link>
                <Link href="#" className="underline">Corporate Information</Link>
                <Link href="#" className="underline">Contact Us</Link>
                <Link href="#" className="underline">Speed Test</Link>
                <Link href="#" className="underline">Legal Notices</Link>
                <Link href="#" className="underline">Only on Netflix</Link>
            </div>

            <div className="  lg:mr-[800px] md:mr-[800px] mt-8  ">
                <button onClick={() => setIsOpen(!isOpen)} className="flex  md:translate-x-[-44px]   items-center gap-2  text-white px-4 py-2 rounded-lg shadow-md border">
                    <FaGlobe className="w-4  h-4 flex justify-start items-start" /> {selectedLanguage.label} <FaChevronDown className="w-4 h-4" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-20 w-48 border rounded-lg shadow-lg">
                        <ul className="py-2">
                            {languages.map((language) => (
                                <li
                                    key={language.code}
                                    className="px-4 py-2 hover:bg-gray-900 cursor-pointer flex items-center gap-2"
                                    onClick={() => {
                                        setSelectedLanguage(language);
                                        setIsOpen(false);
                                    }}
                                >
                                    <FaGlobe className="w-4 h-4" /> {language.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        
         
        </div>
    );
}
