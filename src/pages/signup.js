import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [useGoogle, setUseGoogle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  // Use useEffect for redirection so that hooks are always called in the same order
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Handle Email Sign Up
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // Extract first and last names from displayName if available.
      const displayName = userCredential.user.displayName || "";
      const nameParts = displayName.split(" ");
      const gFirstName = nameParts[0] || "";
      const gLastName = nameParts.slice(1).join(" ") || "";

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          firstName: gFirstName,
          lastName: gLastName,
          email: userCredential.user.email,
          createdAt: new Date(),
        },
        { merge: true }
      );
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* CSS header: import fonts and set defaults */}
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
          Container is now wider (max-w-3xl) and 
          has extra padding at the bottom (pb-24) and right (pr-28) 
          so the logo doesn't overlap buttons or inputs. 
        */}
        <div className="relative bg-[#121418] text-white shadow-md rounded-[1.5rem] w-full max-w-3xl p-6 pb-24 pr-28">
          <h2 className="text-2xl mb-2">Create new account.</h2>
          
          {/* The text below uses Tilt Neon */}
          <p className="mb-6 tiltNeon">
            Already a member?{" "}
            <Link href="/login" className="text-[#5EDEF4] hover:underline">
              Log in
            </Link>
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {useGoogle ? (
            // Google Sign Up Method
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignup}
                className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded w-full"
              >
                Sign Up with Google
              </button>
              <button
                onClick={() => setUseGoogle(false)}
                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded w-full"
              >
                Back to Email Sign Up
              </button>
            </div>
          ) : (
            // Email Sign Up Method
            <form onSubmit={handleEmailSignup} className="text-left">
              {/* First & Last Name in two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <label
                    htmlFor="firstName"
                    className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label
                    htmlFor="lastName"
                    className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative mt-4">
                <label
                  htmlFor="email"
                  className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="John.doe@anywhere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                  required
                />
              </div>

              {/* Password */}
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
                  placeholder="Enter a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="relative mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="absolute top-3 left-4 text-[#707070] text-xs pointer-events-none"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-[4rem] w-full rounded-[1rem] bg-[#2A2A2A] px-4 pt-6 pb-1 text-white text-[1.1rem] placeholder-[#9E9E9E] focus:outline-none"
                  required
                />
              </div>

              {/* Buttons at the bottom */}
              <div className="flex space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setUseGoogle(true)}
                  className="bg-[#A7B7D0] hover:bg-gray-500 text-black py-2 px-4 rounded-[1rem] w-1/2"
                >
                  Change method
                </button>
                <button
                  type="submit"
                  className="bg-[#5EDEF4] hover:bg-cyan-400 text-black py-2 px-4 rounded-[1rem] w-1/2"
                >
                  Create account
                </button>
              </div>
            </form>
          )}

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
