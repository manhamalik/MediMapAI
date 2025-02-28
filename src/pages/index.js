import React, { lazy, Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ScrollArrow from "@/components/ScrollArrow";
import HoverSection from "@/components/HoverSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const UseCaseSection = lazy(() => import("@/components/UseCaseSection"));

export default function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap"
          />
        </Head>

        {/* hero section */}
        <section id="hero" className="relative w-full h-screen">
          <div className="absolute inset-0 bg-[#010006]"></div>
          <div
            className="absolute bottom-0 w-full h-[34vw]"
            style={{
              backgroundImage: "url('/images/mmb.jpg')",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100vw",
            }}
          ></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full gap-x-[7vw] px-4">
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
                  <Image
                    src="/images/point.png"
                    alt="point"
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-3"
                  />
                  99%+ AI Model Accuracy
                </li>
                <li className="flex items-center mb-2">
                  <Image
                    src="/images/point.png"
                    alt="point"
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-3"
                  />
                  Trained on 100,000+ medical images
                </li>
                <li className="flex items-center mb-2">
                  <Image
                    src="/images/point.png"
                    alt="point"
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-3"
                  />
                  Compliant with HL7 FHIR standards
                </li>
              </ul>
              <button
                onClick={() => scrollToSection("second")}
                className="mt-3 w-[50%] p-3 pl-10 pr-10 text-2xl border-2 border-[#5EDEF4] rounded-[22px] shadow-[0_0_10px_white] transition hover:bg-cyan-500/100"
                style={{
                  fontFamily: "Tilt Warp, sans-serif",
                  boxShadow: "0px 0px 5px 0px #5EDEF4",
                }}
              >
                GET STARTED
              </button>
            </div>
            <div className="relative z-10 flex items-center justify-center md:-mt-20 md:ml-[-2rem]">
              <Image
                src="/images/brain-right.png"
                alt="AI Brain"
                width={800}
                height={600}
                className="w-[35vw] h-auto"
              />
            </div>
          </div>
          <div className="absolute bottom-8 w-full flex justify-center items-center z-10">
            <ScrollArrow to="second" />
          </div>
        </section>

        {/* second section */}
        <section
          id="second"
          className="relative w-full min-h-[50vw] bg-black py-[10rem]"
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="flex flex-wrap justify-center items-center gap-8 w-full">
              {/* First Box */}
              <div className="relative bg-[#000000] rounded-[1.5vw] p-8 pt-5 pb-6 text-center w-full md:w-[29rem] shadow-lg border-white border-[0.104vw]">
                <div className="absolute -top-[4.3rem] left-1/2 transform -translate-x-1/2">
                  <Image
                    src="/images/glow.png"
                    alt="glow"
                    width={144}
                    height={144}
                    className="w-36 h-36"
                  />
                </div>
                <Image
                  src="/images/visual1.png"
                  alt="Track Symptoms"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 w-[12vw] h-[12vw]"
                />
                <h3
                  className="text-[2rem] font-medium text-white mb-1"
                  style={{ fontFamily: "Tilt Warp, sans-serif" }}
                >
                  TRACK SYMPTOMS
                </h3>
                <p
                  className="text-[1.4rem] text-white mb-2 font-medium"
                  style={{ fontFamily: "Tilt Warp, sans-serif", lineHeight: "1.25" }}
                >
                  Track your symptoms over time to detect patterns early. Lay your
                  health data and generate reports to share with your doctor.
                </p>
                <Link href="/tracker">
                  <button
                    className="mt-3 w-[75%] p-3 pl-10 pr-10 text-2xl text-white border-2 border-[#5EDEF4] rounded-[1.25rem] shadow-[0_0_10px_white] transition hover:bg-cyan-500/100"
                    style={{
                      fontFamily: "Tilt Warp, sans-serif",
                      boxShadow: "0px 0px 5px 0px #5EDEF4",
                    }}
                  >
                    START TRACKING
                  </button>
                </Link>
              </div>

              {/* Second Box */}
              <div className="relative bg-[#000000] rounded-[1.5vw] p-8 pt-5 pb-6 text-center w-full md:w-[29rem] shadow-lg border-white border-[0.104vw]">
                <div className="absolute -top-[4.3rem] left-1/2 transform -translate-x-1/2">
                  <Image
                    src="/images/glow.png"
                    alt="glow"
                    width={144}
                    height={144}
                    className="w-36 h-36"
                  />
                </div>
                <Image
                  src="/images/visual2.png"
                  alt="Detect Tumors"
                  width={300}
                  height={280}
                  className="mx-auto mb-0 w-[14.5vw] h-[13.5vw]"
                />
                <h3
                  className="text-[2rem] font-medium text-white mb-1"
                  style={{ fontFamily: "Tilt Warp, sans-serif" }}
                >
                  DETECT TUMORS
                </h3>
                <p
                  className="text-[1.4rem] text-white mb-[1.8rem] font-medium"
                  style={{ fontFamily: "Tilt Warp, sans-serif", lineHeight: "1.25" }}
                >
                  Upload a brain scan and get instant AI-driven insights on tumor
                  presence, size, and type.
                </p>
                <Link href="/tumordetection">
                  <button
                    className="mt-3 w-[75%] p-3 pl-10 pr-10 text-2xl text-white border-2 border-[#5EDEF4] rounded-[1.25rem] shadow-[0_0_10px_white] transition hover:bg-cyan-500/100"
                    style={{
                      fontFamily: "Tilt Warp, sans-serif",
                      boxShadow: "0px 0px 5px 0px #5EDEF4",
                    }}
                  >
                    TRY DETECTION
                  </button>
                </Link>
              </div>

              {/* Third Box */}
              <div className="relative bg-[#000000] rounded-[1.5vw] p-8 pt-5 pb-6 text-center w-full md:w-[29rem] shadow-lg border-white border-[0.104vw]">
                <div className="absolute -top-[4.3rem] left-1/2 transform -translate-x-1/2">
                  <Image
                    src="/images/glow.png"
                    alt="glow"
                    width={144}
                    height={144}
                    className="w-36 h-36"
                  />
                </div>
                <Image
                  src="/images/visual3.png"
                  alt="Tumor Guide"
                  width={200}
                  height={217}
                  className="mx-auto mb-2 w-[12vw] h-[13vw]"
                />
                <h3
                  className="text-[2rem] font-medium text-white mb-1"
                  style={{ fontFamily: "Tilt Warp, sans-serif" }}
                >
                  TUMOR GUIDE
                </h3>
                <p
                  className="text-[1.4rem] text-white mb-[1.7rem] font-medium"
                  style={{ fontFamily: "Tilt Warp, sans-serif", lineHeight: "1.25" }}
                >
                  Explore causes, symptoms, and treatments with expert-reviewed
                  medical resources.
                </p>
                <Link href="/tumorguide">
                  <button
                    className="mt-3 w-[75%] p-3 pl-10 pr-10 text-2xl text-white border-2 border-[#5EDEF4] rounded-[1.25rem] shadow-[0_0_10px_white] transition hover:bg-cyan-500/100"
                    style={{
                      fontFamily: "Tilt Warp, sans-serif",
                      boxShadow: "0px 0px 5px 0px #5EDEF4",
                    }}
                  >
                    LEARN MORE
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            <ScrollArrow to="third" />
          </div>
        </section>

        {/* third section */}
        <HoverSection buttonText="TRY TRACKER" href="/tracker">
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
        </HoverSection>

        {/* fourth section */}
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

        {/* fifth section */}
        <HoverSection buttonText="TRY DETECTION" href="/tumordetection">
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
        </HoverSection>

        {/* sixth section */}
        <section
          id="sixth"
          className="relative w-full min-h-screen bg-black flex items-center justify-center px-4 py-16"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto w-full">
            {/* text column */}
            <div className="md:w-[41rem] text-white text-center md:text-left flex flex-col items-center md:items-start">
              <h1
                className="text-[5.5rem] mb-2 pl-2 "
                style={{ fontFamily: "Tilt Warp, sans-serif" }}
              >
                Tumor Guide
              </h1>
              <ul
                className="space-y-2 mb-6 list-disc pl-7 text-[1.65rem]"
                style={{ fontFamily: "Noto Sans, sans-serif" }}
              >
                <li>
                  <strong>Types & Causes:</strong> Understand different brain tumor
                  types and what causes them.
                </li>
                <li>
                  <strong>Symptoms:</strong> Learn key warning signs, from headaches to
                  vision changes.
                </li>
                <li>
                  <strong>Treatments:</strong> Explore available treatment options,
                  including medications, surgery, and more.
                </li>
              </ul>
              <Link href="/tumorguide">
                <button
                  className="bg-[#7BC9D6] hover:bg-black border-[#7BC9D6] border-2 hover:text-white text-black px-12 py-4 rounded-[1.5rem] flex items-center gap-10 text-[2rem]"
                  style={{
                    fontFamily: "Tilt Warp, sans-serif",
                    boxShadow: "0px 0px 5px 0px #7BC9D6",
                  }}
                >
                  EXPLORE THE GUIDE{" "}
                  <FontAwesomeIcon icon={faCaretRight} className="text-[2.25rem]" />
                </button>
              </Link>
            </div>
            {/* image column */}
            <div className="md:w-1/2 mt-10 md:mt-0 pl-9 flex justify-center">
              <Image
                src="/images/tgb.png"
                alt="Tumor Guide Brain"
                width={544}
                height={400}
                className="w-[34rem]"
              />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
