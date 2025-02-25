import React, { useState, useEffect } from "react";
import "@fontsource/tilt-warp"; // npm install @fontsource/tilt-warp
import "@fontsource/noto-sans"; // npm install @fontsource/noto-sans

const lobes = {
  frontal: {
    name: "Frontal Lobe",
    description:
      "The front lobes are in front of the brain. They control thinking and movement.",
    conditions: [
      {
        title: "Glioblastoma (GBM)",
        details:
          "Most aggressive brain tumor, Caused by multiple genetic mutations (EGFR, PTEN, TP53, IDH wild-type) and can develop from lower-grade gliomas or appear spontaneously.",
      },
      {
        title: "Oligodendroglioma",
        details:
          "Caused by multiple genetic mutations (EGFR, PTEN, TP53, IDH wild-type) and can develop from lower-grade gliomas or appear spontaneously.",
      },
    ],
    image: "images/tumorGuide/Vector 18.png",
    coords: "50,50,250,200",
  },
  parietal: {
    name: "Parietal Lobe",
    description:
      "The parietal lobes are in the upper middle part of the brain. They help process information about touch, taste, smell, vision and hearing.",
    conditions: [
      {
        title: "Astrocytoma",
        details:
          "Low-grade Gliomas (LGG), Caused by BRAF gene mutations, often found in children and young adults.",
      },
      { title: "Meningioma", details: "Common benign brain tumor." },
    ],
    image: "images/tumorGuide/Vector 19.png",
    coords: "260,60,400,190",
  },
  occipital: {
    name: "Occipital Lobe",
    description:
      "The occipital lobes are in the back of the brain. They control vision. Occipital lobe brain tumors can cause vision loss.",
    conditions: [
      {
        title: "Hemangioblastoma",
        details:
          "Caused by cancer from other parts of the body spreading to the brain through the bloodstream. Some casees occur randomly and arise from blood vessel cells. ",
      },
      {
        title: "Metastatic tumors",
        details:
          "Caused by cancer from other parts of the body spreading to the brain through the bloodstream. ",
      },
      {
        title: "Glioma",
        details:
          "Caused by BRAF gene mutations, often found in children and young adults.",
      },
    ],
    image: "images/tumorGuide/Vector 20.png",
    coords: "420,100,550,200",
  },
  temporal: {
    name: "Temporal Lobe",
    description:
      "The temporal lobes are on the sides of the brain. They process memories and senses.",
    conditions: [
      {
        title: "Anaplastic Astrocytoma",
        details:
          "Caused by mutations in TP53, IDH1/IDH2 genes, and sometimes linked to prior radiation exposure.",
      },
      {
        title: "Ganglioglioma",
        details:
          "Caused by BRAF gene mutations, often found in children and young adults.",
      },
    ],
    image: "images/tumorGuide/Vector 16.png",
    coords: "120,220,270,280",
  },
};

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-row items-center justify-center"
      style={{
        backgroundImage: "url('images/image 1769.png')",
        fontFamily: "tilt warp",
      }}
    >
      <div className="flex flex-col max-w-4xl text-white text-start mb-48">
        <h1 className="text-4xl leading-2 md:text-6xl">
          Understand Brain Tumors & <br />
          <span className="text-cyan-500/100">Take Control of Your Health</span>
        </h1>
        <p
          className="mt-6 mb-6 text-3xl text-gray-300 mr-20"
          style={{ fontFamily: "noto sans" }}
        >
          Explore causes, symptoms, and treatments with expert-reviewed medical
          insights.
        </p>

        <button className="mt-6 w-[35%] py-4 text-3xl font-semibold border border-cyan-500/100 rounded-[25px] shadow-lg transition hover:bg-cyan-500/100">
          START EXPLORING
        </button>
      </div>
      <div className="flex items-center justify-center w-2/5 mb-20">
        <img
          src="images/TumorGuideHero.png"
          alt="Braiabsolute right-5 md:right-15 n Tumor Visualization"
        />
      </div>
    </div>
  );
};

const TumorGuide = () => {
  const [activeLobe, setActiveLobe] = useState(lobes.frontal);

  useEffect(() => {
    setActiveLobe(lobes.frontal); // Set default lobe when the component mounts
  }, []);

  return (
    <section
      className="relative flex flex-col items-center text-white bg-black min-h-screen py-16"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <h2 className="text-6xl font-bold">Tumor Type & Causes</h2>
      <p className="text-2xl mt-2 text-gray-300">
        Place your mouse on the brain to see how different brain lobes effect
        differently.
      </p>
      <div className="flex flex-row-reverse mt-10 items-center gap-20">
        <div>
          <div
            className="relative mt-10"
            onMouseLeave={() => setActiveLobe(lobes.frontal)}
          >
            <img
              src="images/tumorGuide/brain.png"
              alt="Brain"
              className="w-2/3 relative"
            />

            {activeLobe && (
              <img
                src={activeLobe.image}
                alt={activeLobe.name}
                className="absolute top-0 transition-opacity duration-300 opacity-100 pointer-events-none w-80"
              />
            )}

            {Object.keys(lobes).map((key) => {
              const { coords } = lobes[key];
              const [x1, y1, x2, y2] = coords.split(",").map(Number);
              return (
                <div
                  key={key}
                  className="absolute bg-transparent"
                  style={{
                    top: y1,
                    left: x1,
                    width: x2 - x1,
                    height: y2 - y1,
                  }}
                  onMouseEnter={() => setActiveLobe(lobes[key])}
                ></div>
              );
            })}
          </div>
        </div>

        {activeLobe && (
          <div className="flex flex-col justify-center w-[40rem]">
            <div className="flex">
              <img src={activeLobe.image} className="w-12 mr-2" />
              <h3 className="text-3xl font-bold">{activeLobe.name}</h3>
            </div>
            <p className="mt-2 text-l mb-4 text-gray-300">
              {activeLobe.description}
            </p>
            {activeLobe.conditions.map((condition, index) => (
              <div key={index} className="mt-2">
                <p className="text-xl font-semibold">{condition.title}:</p>
                <p className="text-l text-gray-300">{condition.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TumorGuide />
    </div>
  );
};

export default HomePage;
