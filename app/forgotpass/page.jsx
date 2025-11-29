"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger your backend API here
    setMessage("If this email is registered, a reset link has been sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center backgroundx px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-neutral-900/50 backdrop-blu text-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
        <p className="text-neutral-400 text-center mb-6">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="text-green-400 text-center mt-4">{message}</p>
        )}

        <div className="text-center mt-6">
          <a href="/login" className="text-red-500 hover:underline">
            Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}
