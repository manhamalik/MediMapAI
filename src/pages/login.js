import { useState } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Import custom fonts and apply default body font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&family=Tilt+Warp&display=swap');
        body {
          font-family: 'Tilt Warp', cursive;
        }
        .tiltNeon {
          font-family: 'Tilt Neon', cursive;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-black">
        {/*
          Container is now wider (max-w-3xl),
          and has extra padding at the bottom (pb-24) and right (pr-28)
          so the logo doesn't overlap buttons or inputs.
        */}
        <div className="relative bg-[#121418] text-white shadow-md rounded-[1.5rem] w-full max-w-3xl p-6 pb-24 pr-28">
          <h2 className="text-2xl mb-4">Sign in to continue.</h2>

          <p className="mb-6 tiltNeon">
            New here?{" "}
            <Link href="/signup" className="hover:underline text-[#5EDEF4]">
              Create an account
            </Link>{" "}
            instead
          </p>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative mt-4">
              <label
                htmlFor="password"
                className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                required
              />
            </div>

            {/* Buttons at the bottom (each half the width of the input area) */}
            <div className="flex space-x-2 mt-6 w-full">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="bg-[#A7B7D0] hover:bg-gray-500 text-black py-2 px-4 rounded-[1rem] w-1/2"
              >
                Forgot password?
              </button>
              <button
                type="submit"
                className="bg-[#5EDEF4] hover:bg-cyan-400 text-black py-2 px-4 rounded-[1rem] w-1/2"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Logo in the bottom-right corner */}
          <img
            src="images/log-c.png"
            alt="Your Logo"
            className="absolute bottom-4 right-4 w-16 h-16 object-contain"
          />
        </div>
      </div>
    </>
  );
}
