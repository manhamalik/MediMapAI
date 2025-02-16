import React, { lazy, Suspense } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import ScrollArrow from "@/components/ScrollArrow";
import Dropdown from "@/components/Dropdown";
import { motion } from "framer-motion";
const TrackerSection = lazy(() => import("@/components/TrackerSection"));
const UseCaseSection = lazy(() => import("@/components/UseCaseSection"));
const TumorDetectionSection = lazy(() => import("@/components/TumorDetectionSection"));
const TumorGuideSection = lazy(() => import("@/components/TumorGuideSection"));

export default function Home() {
  return (
    <Suspense>
      <div className="relative">
        <Head>
          <title>MediMapAI</title>
          <meta
            name="description"
            content="Find aid and resources near you for emergencies and support."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://fonts.googleapis.com/css2?family=Tilt+Warp:wght@400;700&family=Noto+Sans:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>

        {/* Hero Section */}
        <div
          id="hero"
          className="absolute inset-0 bg-cover bg-center h-screen z-0"
          style={{
            backgroundImage: "url('/images/marm.png')",
          }}
        ></div>

        {/* Landing Section */}
        <div
          className="flex flex-col justify-center items-center text-center text-white relative z-10"
          style={{ height: "calc(100vh - 5.14rem)" }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* Scroll Arrow Component */}
            <ScrollArrow to="second" />
          </div>
        </div>

        {/* Sections */}
        <section
      id="second"
      className="relative w-full h-screen bg-cover bg-center bg-black"
      style={{ 
        backgroundImage: "url('/images/second-section.png')",
        backgroundSize: "100vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
<div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* ScrollArrow Component */}
            <ScrollArrow to="third" />
          </div>
    </section>

<section
      id="third"
      className="relative w-full h-screen bg-cover bg-center bg-black"
      style={{ 
        backgroundImage: "url('/images/third-section.png')",
        backgroundSize: "70vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
<div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* ScrollArrow Component */}
            <ScrollArrow to="fourth" />
          </div>
    </section>

    <section
      id="fourth"
      className="relative w-full min-h-screen bg-cover bg-center bg-black"
      style={{ 
        backgroundImage: "url('/images/fourth-section.png')",
        backgroundSize: "84vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
<div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* ScrollArrow Component */}
            <ScrollArrow to="fifth" />
          </div>
    </section>

    <section
      id="fifth"
      className="relative w-full h-screen bg-cover bg-center bg-black"
      style={{ 
        backgroundImage: "url('/images/fifth-section.png')",
        backgroundSize: "85vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
<div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* ScrollArrow Component */}
            <ScrollArrow to="sixth" />
          </div>
    </section>

    <section
      id="sixth"
      className="relative w-full h-screen bg-cover bg-center bg-black"
      style={{ 
        backgroundImage: "url('/images/sixth-section.png')",
        backgroundSize: "85vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
    </section>

        {/* Sections */}
        {/* <TrackerSection />
        <UseCaseSection />
        <TumorDetectionSection />
        <TumorGuideSection /> */}
      </div>
    </Suspense>
  );
}
