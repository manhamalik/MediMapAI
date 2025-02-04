import React, { useState, lazy, Suspense } from "react";
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
          <title>LA Relief - Discover Aid Near You</title>
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
            backgroundImage: "url('/images/background.png')",
          }}
        ></div>

        {/* Navigation Bar */}
        <NavBar />

        {/* Landing Section */}
        <div
          className="flex flex-col justify-center items-center text-center text-white relative z-10"
          style={{ height: "calc(100vh - 5.14rem)" }}
        >
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* Scroll Arrow Component */}
            <ScrollArrow to="tracker" />
          </div>
        </div>

        {/* Sections */}
        <TrackerSection />
        <UseCaseSection />
        <TumorDetectionSection />
        <TumorGuideSection />

        {/* FAQ Section */}
        <section id="faqs" className="bg-[#183917] py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="relative text-center">
              <span
                className="absolute inset-0 text-center"
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: "900",
                  fontSize: "5.5rem",
                  top: "-0.25rem",
                  left: "-0.75rem",
                  color: "transparent",
                  WebkitTextStroke: "1px #ffffff",
                }}
              >
                FAQs
              </span>
              <span
                className="relative text-white"
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: "900",
                  fontSize: "5.5rem",
                  textShadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                FAQs
              </span>
            </h2>

            {/* FAQ Dropdowns */}
            <div className="space-y-4">
              <Dropdown
                title="How can I volunteer or contribute?"
                content="You can explore volunteer opportunities and donation needs by navigating through the interactive map or selecting the 'Volunteer Opportunities' or 'Donations Needed' buttons on the website."
              />
              <Dropdown
                title="What types of donations are accepted?"
                content="We accept various types of donations, such as food, hygiene supplies, medical items, and pet supplies."
              />
              <Dropdown
                title="How do I find resources or assistance near me?"
                content="You can enter your address in the map's search bar to view nearby resources, shelters, and services."
              />
              <Dropdown
                title="What should I do in case of a wildfire evacuation?"
                content="Follow designated evacuation routes and instructions from authorities."
              />
              <Dropdown
                title="How do I contact you to add information or organizations to the website?"
                content="Use the contact form on the 'Contact Us' page or email us directly."
              />
              <Dropdown
                title="How often is the map and resource list updated?"
                content="The map and resource list are updated daily to reflect the latest information."
              />
              <Dropdown
                title="Can I collaborate with LARelief to list my organization’s opportunities?"
                content="Use the Google Form on the Contact page to share your organization’s details."
              />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}