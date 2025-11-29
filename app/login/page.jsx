"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { DevicePhoneMobileIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Cookie from "js-cookie"


export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showText, setShowText] = useState(false); // "Learn More"
    const [remember, setRemember] = useState(false); // "Remember Me"
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState(""); // For backend/NextAuth messages

    const validate = () => {
        let newErrors = {};
        if (!email) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 4) newErrors.password = "your password must contain between 4 and 60 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            // 1️⃣ Call Express backend login (with OTP check)
            const backendRes = await axios.post("/api/auth/login", {
                email,
                password,
            });

            // Backend returns user info and token
            const { token, user } = backendRes.data;
            localStorage.setItem("token", token);
            setMsg("Logged in via backend ✅");
            Cookie.set("user", "__auth"+user?.email)
            // 2️⃣ Optional NextAuth login
            // const nextAuthRes = await signIn("credentials", {
            //     redirect: false,
            //     email,
            //     password,
            // });


            location.href = "/profile"

            if (nextAuthRes?.error) {
                console.error("NextAuth error:", nextAuthRes.error);
                setMsg(nextAuthRes.error);
            } else {
                setMsg("Logged in with NextAuth ✅");
            }

        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Login failed";
            setMsg(message);
        }
    };

    return (
        <div>
            {/* <img className="" src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/NG-en-20250317-TRIFECTA-perspective_8b62199f-48df-4f79-ac95-d9ef46920eed_small.jpg">
            </img> */}
            <div className="background">
                <div className="hidden md:block">
                    <div className="netflix translate-x-36 "></div>
                </div>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-lg mb-10 lg:max-w-xl xl:max-w-2xl bg-opacity-60 md:max-md:bg-black/60 bg-black/60 backdrop-blur-md p-10 rounded-lg shadow-md md:w-[450px]">
                        <div className="netflix-1 md:hidden translate-x-[-10px]"></div>
                        <h1 className="text-3xl font-bold text-white flex justify-start mb-6">Log In</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                required
                                placeholder="Email or mobile number"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="md:w-[370px] bg-opacity-60 bg-neutral-800 focus:outline-white border-gray-500 border text-white rounded-md py-4 px-5"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            <div className="relative flex">
                                <input
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-neutral-800 focus:outline-white border-gray-500 border bg-opacity-60 text-white rounded-md py-4 px-5 w-full pr-12"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-6 h-6" />
                                    ) : (
                                        <EyeIcon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                            <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-all font-bold" type="submit">
                                Login
                            </button>

                            <p className="text-white text-center">{msg}</p> {/* Display backend/NextAuth messages */}

                            <p className="text-white text-center">OR</p>

                            <Link href="/forgot-password" className="bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-md transition-all">
                                Use a Sign-In Code
                            </Link>

                            <Link href="/forgotpass" className="text-white underline text-center">
                                Forgotten password?
                            </Link>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={() => setRemember(!remember)}
                                        className="w-5 h-5 bg-transparent"
                                    />
                                    Remember Me
                                </label>
                            </div>
                            <p className="text-gray-500 text-sm mt-4 gap-1 flex justify-start text-center">
                                New to Netflix?{" "}
                                <Link href="/signup" className="font-bold text-white hover:underline">
                                    Sign up now
                                </Link>
                            </p>
                        </form>

                        {/* Learn More Section */}
                        <div className="mt-6  flex flex-col jusitfy-start items-start">
                            <p className="mt-3 text-gray-400 text-[12px] text-left">
                                This page is protected by Google reCAPTCHA to ensure <br /> you're not a bot.
                            </p>

                            <button
                                onClick={() => setShowText(!showText)}
                                className="text-blue-800 text-lg font-medium text-[15px] underline"
                            >
                                {showText ? "Show Less" : "Learn More"}
                            </button>

                            {showText && (
                                <p className="mt-3 text-gray-400 text-left text-[12px]">
                                    The information collected by Google reCAPTCHA is subject to the Google and{" "}
                                    <Link href="#" className="text-blue-900">Privacy Policy</Link> and{" "}
                                    <Link href="#" className="text-blue-900">Terms of Service,</Link>.
                                    and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer sections (mobile + desktop) remain unchanged */}
            {/* ... your original footer code here ... */}
        </div>
    );
}
