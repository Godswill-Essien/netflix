"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function Signup() {
    const [name, setName] = useState(""); // New field for name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
    const [showPassword, setShowPassword] = useState(false);
    const [showText, setShowText] = useState(false); // "Learn More"
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState(""); // For backend/NextAuth messages

    const validate = () => {
        let newErrors = {};

        if (!name) newErrors.name = "Name is required.";

        if (!email) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 4) newErrors.password = "Password must contain between 4 and 60 characters.";

        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            // Call backend signup API
            const backendRes = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            const { token, user } = backendRes.data;
            localStorage.setItem("token", token);
            setMsg("Signed up successfully ✅");

            // Optional NextAuth login (or redirect after signup)
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
                setMsg("Signed up and logged in with NextAuth ✅");
            }

        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Signup failed";
            setMsg(message);
        }
    };

    return (
        <div>
            <div className="background">
                <div className="hidden md:block">
                    <div className="netflix translate-x-36"></div>
                </div>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-lg mb-10 lg:max-w-xl xl:max-w-2xl bg-opacity-60 md:max-md:bg-black bg-black p-10 rounded-lg shadow-md md:w-[450px]">
                        <div className="netflix-1 md:hidden translate-x-[-10px]"></div>
                        <h1 className="text-3xl font-bold text-white flex justify-start mb-6">Sign Up</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                required
                                placeholder="Full Name"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="md:w-[370px] bg-opacity-60 bg-neutral-800 focus:outline-white border-gray-500 border text-white rounded-md py-4 px-5"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            <input
                                required
                                placeholder="Email"
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

                            <div className="relative flex">
                                <input
                                    placeholder="Confirm Password"
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

                            <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-all font-bold" type="submit">
                                Sign Up
                            </button>

                            <p className="text-white text-center">{msg}</p> {/* Display backend messages */}

                            <p className="text-white text-center">OR</p>

                            <Link href="/login" className="bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-md transition-all">
                                Already have an account? log in
                            </Link>

                            <div className="mt-6 flex flex-col justify-start items-start">
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
                                        <Link href="#" className="text-blue-900">Terms of Service</Link>.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
