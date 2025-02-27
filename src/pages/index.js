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
            href="https://fonts.googleapis.com/css2?family=Tilt+Warp:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        {/* ==================== HERO SECTION ==================== */}
        <section id="hero" className="relative w-full h-screen">
          <div className="absolute inset-0 bg-[#010006]"></div>

          {/* Background Image on Bottom Half */}
          <div
            className="absolute bottom-0 w-full h-[34vw]"
            style={{
              backgroundImage: "url('/images/mmb.jpg')",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100vw",
            }}
          ></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full gap-x-[7vw] px-4">

            {/* Left Text Content */}
            <div
              className="flex flex-col max-w-4xl text-white p-8"
              style={{ fontFamily: "Tilt Warp, sans-serif" }}
            >
              <h1 className="text-[4rem] leading-[4.5rem]">
                Revolutionizing<br />
                <span style={{ color: "#8AE0F0" }}>
                  Brain Tumor Detection<br />
                  with AI
                </span>
              </h1>

              <ul
                className="ml-4 mt-6 mb-6 text-[1.5rem] leading-7"
                style={{ listStyleType: "none" }}
              >
                <li className="flex items-center mb-2">
                  <img src="images/point.png" alt="point" className="w-6 h-6 mr-3" />
                  99%+ AI Model Accuracy
                </li>
                <li className="flex items-center mb-2">
                  <img src="images/point.png" alt="point" className="w-6 h-6 mr-3" />
                  Trained on 100,000+ medical images
                </li>
                <li className="flex items-center mb-2">
                  <img src="images/point.png" alt="point" className="w-6 h-6 mr-3" />
                  Compliant with HL7 FHIR standards
                </li>
              </ul>

              {/* Button */}
              <button
                className="mt-3 w-[50%] p-3 pl-10 pr-10 text-2xl border-2 border-[#5EDEF4] rounded-[25px] shadow-[0_0_10px_white] transition hover:bg-cyan-500/100"
                style={{
                  fontFamily: "Tilt Warp, sans-serif",
                  boxShadow: "0px 0px 5px 0px white",
                }}
              >
                GET STARTED
              </button>
            </div>

            {/* Right Image (Brain) */}
            <div className="relative z-10 flex items-center justify-center md:-mt-20 md:ml-[-2rem]">
              <img
                src="images/brain-right.png"
                alt="AI Brain"
                className="w-[35vw] h-auto"
              />
            </div>
          </div>

          {/* Scroll Arrow at Bottom of Hero */}
          <div className="absolute bottom-8 w-full flex justify-center items-center z-10">
            <ScrollArrow to="second" />
          </div>
        </section>

        {/* ==================== SECOND SECTION ==================== */}
        <section
          id="second"
          className="relative w-full h-screen bg-cover bg-center bg-black"
          style={{
            backgroundImage: "url('/images/second-section.png')",
            backgroundSize: "100vw",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            <ScrollArrow to="third" />
          </div>
        </section>

        {/* ==================== THIRD SECTION ==================== */}
        <section
          id="third"
          className="relative w-full h-screen bg-cover bg-center bg-black"
          style={{
            backgroundImage: "url('/images/third-section.png')",
            backgroundSize: "70vw",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            <ScrollArrow to="fourth" />
          </div>
        </section>

        {/* ==================== FOURTH SECTION ==================== */}
        <section
          id="fourth"
          className="relative w-full min-h-screen bg-cover bg-center bg-black"
          style={{
            backgroundImage: "url('/images/fourth-section.png')",
            backgroundSize: "84vw",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            <ScrollArrow to="fifth" />
          </div>
        </section>

        {/* ==================== FIFTH SECTION ==================== */}
        <section
          id="fifth"
          className="relative w-full h-screen bg-cover bg-center bg-black"
          style={{
            backgroundImage: "url('/images/fifth-section.png')",
            backgroundSize: "85vw",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            <ScrollArrow to="sixth" />
          </div>
        </section>

        {/* ==================== SIXTH SECTION ==================== */}
        <section
          id="sixth"
          className="relative w-full h-screen bg-cover bg-center bg-black"
          style={{
            backgroundImage: "url('/images/sixth-section.png')",
            backgroundSize: "85vw",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
        </section>

        {/* Other lazy-loaded sections */}
        {/* <TrackerSection />
        <UseCaseSection />
        <TumorDetectionSection />
        <TumorGuideSection /> */}
      </div>
    </Suspense>
  );
}
