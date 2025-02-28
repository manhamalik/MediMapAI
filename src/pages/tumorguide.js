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
    coords: "19,56,266,240",
    position: { top: "55px", left: "0px" },
    size: "17rem",
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
    coords: "270,55,420,250",
    position: { top: "45px", left: "220px" },
    size: "15rem",
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
    coords: "380,54,420,350",
    position: { top: "110px", left: "345px" },
    size: "11.7rem",
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
    coords: "22,285,500,550",
    position: { top: "230px", left: "110px" },
  },
  cerebellum: {
    name: "Cerebellum",
    conditions: [
      {
        title: "Medulloblastoma",
        details:
          "Exact cause unknown, but linked to genetic mutations and sometimes hereditary syndromes.",
      },
      {
        title: "Ependymoma",
        details:
          "Most sporadic (random mutations), but some cases may be linked to NF2.",
      },
      {
        title: "Hemangioblastoma",
        details:
          "Often sporadic, but associated with von Hippel-Lindau (VHL) disease, a genetic disorder.",
      },
    ],
    image: "images/tumorGuide/Vector 23.png",
    coords: "295,350,550,400",
    position: { top: "360px", left: "290px" },
    size: "12rem",
  },
  nerve: {
    name: "Nerve",
    conditions: [
      {
        title: "Schwannoma",
        details: "Caused by mutation in the NF2 gene or spontaneous mutations.",
      },
    ],
    image: "images/tumorGuide/Vector 21.png",
    coords: "220,230,350,305",
    position: { top: "225px", left: "220px" },
    size: "10rem",
  },
  pituitary: {
    name: "Pituitary",
    conditions: [
      {
        title: "Craniopharyogioma",
        details:
          "Arises from embryonic tissue remnants near the pituitary gland, no clear genetic cause.",
      },
    ],
    image: "images/tumorGuide/Vector 22.png",
    coords: "0,245,265,280",
    position: { top: "220px", left: "140px" },
    size: "6.5rem",
  },
};

const lobesSymptoms = {
  frontal: {
    name: "Frontal Lobe",
    description:
      "The front lobes are in front of the brain. They control thinking and movement. Frontal lobe brain tumors might cause balance problems and trouble walking. there might be personality changes, such as forgetfulness and lack of interest in usual activities. Sometimes family members notice that the person with the brain tumor seems different",
    coords: "19,56,266,240",
    position: { top: "60px", left: "0px" },
    size: "17rem",
    image: "images/tumorGuide/Vector 18-1.png",
  },
  parietal: {
    name: "Parietal Lobe",
    description:
      "The parietal lobes are in the upper middle part of the brain. They help process information about touch, taste, smell, vision and hearing. Parietal lobe brain tumors can cause problems related to the senses. Examples include vision problems and hearing problems.",
    coords: "270,55,420,250",
    position: { top: "45px", left: "225px" },
    size: "14rem",
    image: "images/tumorGuide/Vector 19-1.png",
  },
  occipital: {
    name: "Occipital Lobe",
    description:
      "The occipital lobes are in the back of the brain. They control vision. Occipital lobe brain tumors can cause vision loss.",
    coords: "380,54,420,350",
    position: { top: "110px", left: "345px" },
    size: "11.7rem",
    image: "images/tumorGuide/Vector 20-1.png",
  },
  temporal: {
    name: "Temporal Lobe",
    description:
      "The temporal lobes are on the sides of the brain. They process memories and senses. Temporal lobe brain tumors can cause memory problems. They might cause someone to see, taste or smell something that isn't there. Sometimes the taste or smell is unpleasant or unusual.",
    coords: "10,225,110,300",
    position: { top: "205px", left: "100px" },
    image: "images/tumorGuide/Vector 16-1.png",
  },
};

const treatment = [
  {
    name: "SURGERY",
    image: "images/treatmentIcons/treatment1.png",
    description:
      "This is the most direct approach to cancer treatment. Surgeons physically remove the tumor along with some surrounding tissue to ensure no cancerous cells remain. The goal is to achieve 'clean margins,' meaning all affected areas are cleared.",
  },
  {
    name: "ABLATIVE THERAPY",
    image: "images/treatmentIcons/treatment2.png",
    description:
      "This treatment relies on extreme temperatures to destroy abnormal cells. Substances like heat, cold, or radiofrequency energy are applied directly to the tumor, targeting it precisely while minimizing damage to surrounding tissue.",
  },
  {
    name: "CHEMOTHERAPY",
    image: "images/treatmentIcons/treatment3.png",
    description:
      "A classic and versatile cancer treatment. Chemotherapy uses powerful drugs to shrink tumors before surgery or eliminate lingering abnormal cells after surgery. While effective, it may also impact healthy cells.",
  },
  {
    name: "IMMUNOTHERAPY",
    image: "images/treatmentIcons/treatment4.png",
    description:
      "This innovative treatment boosts your body’s immune system, teaching it to recognize and fight cancer cells. Though not suitable for all types, it offers hope for certain cancers by using your own defenses.",
  },
  {
    name: "RADIATION THERAPY",
    image: "images/treatmentIcons/treatment5.png",
    description:
      "A powerful tool in cancer treatment, this therapy uses high-energy X-rays or other radiation types to target and destroy abnormal cells. It’s often used to shrink tumors or eliminate remaining cancer cells after surgery.",
  },
  {
    name: "EMBOLIZATION",
    image: "images/treatmentIcons/treatment6.png",
    description:
      "A minimally invasive procedure that cuts off the blood supply to the tumor. By blocking the vessels that provide nourishment, this method effectively starves the tumor and slows its growth.",
  },
  {
    name: "HORMONE THERAPY",
    image: "images/treatmentIcons/treatment7.png",
    description:
      "This approach targets cancers fueled by hormones like estrogen or testosterone. Hormone therapy works by blocking or lowering the levels of these hormones, effectively slowing tumor growth.",
  },
  {
    name: "TARGETED THERAPY ",
    image: "images/treatmentIcons/treatment8.png",
    description:
      "Designed to specifically target cancer cells, this therapy slows or stops their growth. It works by disrupting the molecular changes that enable cancer cells to thrive while sparing healthy cells.",
  },
  {
    name: "ABLATION THERAPY",
    image: "images/treatmentIcons/treatment9.png",
    description:
      "This treatment relies on extreme temperatures to destroy abnormal cells. Substances like heat, cold, or radiofrequency energy are applied directly to the tumor, targeting it precisely while minimizing damage to surrounding tissue.",
  },
];

const HomePage = () => {
  const [activeLobe, setActiveLobe] = useState(null);
  const [activeLobeSymptom, setActiveLobeSymptom] = useState(null);

  return (
    <div>
      <section>
        <div
          className="relative w-full h-screen bg-cover bg-center flex flex-row items-center justify-center"
          style={{
            backgroundImage: "url('images/image 1769.png')",
            fontFamily: "tilt warp",
          }}
        >
          <div className="flex flex-col max-w-4xl text-white text-start mb-48">
            <h1 className="text-[4rem] leading-[4.5rem] ">
              Understand Brain Tumors & <br />
              <span className="text-cyan-500/100">
                Take Control of Your Health
              </span>
            </h1>
            <p
              className="mt-6 mb-6 text-[2rem] leading-[2.5rem] w-[80%]"
              style={{ fontFamily: "noto sans" }}
            >
              Explore causes, symptoms, and treatments with expert-reviewed
              medical insights.
            </p>

            <button
              className="mt-6 w-[35%] p-4 text-3xl border-2 border-cyan-500/100 rounded-[25px] shadow-lg shadow-cyan-500/50 transition hover:bg-cyan-500/100"
              onClick={() =>
                document
                  .getElementById("types")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
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
      </section>

      {/* Tumor Types & Causes */}
      <section
        id="types"
        className="relative flex flex-col items-center text-white bg-black min-h-screen py-16"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}
      >
        <div className="flex flex-col items-center">
          <img src="images/design-2.png" className="w-full h-auto" />

          <div className="absolute mt-[6rem] flex flex-col items-center text-white text-center">
            <h2 className="text-6xl font-bold">Tumor Types & Causes</h2>
            <p className="text-xl mt-8 w-[60%]">
              Place your mouse on the brain to see how different brain lobes
              affect differently.
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-40">
          <div>
            <div className="relative mt-10">
              <img
                src="images/tumorGuide/brain.png"
                alt="Brain"
                className="w-[34rem] relative"
              />

              {/* Display all lobe images by default */}
              {Object.keys(lobes).map((key) => {
                const { image, position, size } = lobes[key];
                return (
                  <img
                    key={key}
                    src={image}
                    alt={key}
                    className="absolute transition-opacity duration-300 pointer-events-none w-80"
                    style={{
                      top: position.top,
                      left: position.left,
                      width: size,
                      opacity: activeLobe
                        ? activeLobe.name === key
                          ? 1
                          : 0.3
                        : 1, // Show all lobes with lower opacity when hovering
                    }}
                  />
                );
              })}

              {/* Interactive Hover Areas */}
              {activeLobe && (
                <img
                  src={activeLobe.image}
                  alt={activeLobe.name}
                  className="absolute top-0 transition-opacity duration-300 opacity-100 pointer-events-none w-80"
                  style={{
                    top: activeLobe.position.top,
                    left: activeLobe.position.left,
                    width: activeLobe.size,
                  }}
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

          {/* Lobe Information Display */}
          {activeLobe ? (
            <>
              <div className="flex flex-col justify-center w-[40rem]">
                <div className="flex">
                  <img
                    src={activeLobe.image}
                    className="w-12 mr-2"
                    style={{}}
                  />
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
            </>
          ) : (
            <div className="text-center text-gray-400 w-[40rem]">
              <h3 className="text-2xl font-bold">Select a Brain Lobe</h3>
              <p className="mt-2 text-l">Click on a lobe to see details.</p>
            </div>
          )}
        </div>
      </section>

      {/*tumor symptoms */}
      <section
        id="symptoms"
        className="relative flex flex-col items-center text-white bg-black min-h-screen py-16"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}
      >
        <div className="flex flex-col items-center">
          <img src="images/design-2.png" className="w-full h-auto" />

          <div className="absolute mt-[6rem] flex flex-col items-center text-white text-center">
            <h2 className="text-6xl font-bold">Tumor Symptoms</h2>
            <p className="text-xl mt-8 w-[60%]">
              Place your mouse on the brain to see how different brain lobes
              affect differently.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-40">
          <div>
            <div className="relative mt-10">
              <img
                src="images/tumorGuide/brain.png"
                alt="Brain"
                className="w-[34rem] relative"
              />

              {/* Display all lobe images by default */}
              {Object.keys(lobesSymptoms).map((key) => {
                const { image, position, size } = lobesSymptoms[key];
                return (
                  <img
                    key={key}
                    src={image}
                    alt={key}
                    className="absolute transition-opacity duration-300 pointer-events-none w-80"
                    style={{
                      top: position.top,
                      left: position.left,
                      width: size,
                      opacity: activeLobeSymptom
                        ? activeLobeSymptom.name === key
                          ? 1
                          : 0.3
                        : 1, // Show all lobes with lower opacity when hovering
                    }}
                  />
                );
              })}

              {/* Interactive Hover Areas */}
              {activeLobeSymptom && (
                <img
                  src={activeLobeSymptom.image}
                  alt={activeLobeSymptom.name}
                  className="absolute top-0 transition-opacity duration-300 opacity-100 pointer-events-none w-80"
                  style={{
                    top: activeLobeSymptom.position.top,
                    left: activeLobeSymptom.position.left,
                    width: activeLobeSymptom.size,
                  }}
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
                    onMouseEnter={() =>
                      setActiveLobeSymptom(lobesSymptoms[key])
                    }
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Lobe Information Display */}
          {activeLobeSymptom ? (
            <>
              <div className="flex flex-col justify-center w-[40rem]">
                <div className="flex">
                  <img
                    src={activeLobeSymptom.image}
                    className="w-12 mr-2"
                    style={{}}
                  />
                  <h3 className="text-3xl font-bold">
                    {activeLobeSymptom.name}
                  </h3>
                </div>
                <p className="mt-2 text-l mb-4 text-gray-300">
                  {activeLobeSymptom.description}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 w-[40rem]">
              <h3 className="text-2xl font-bold">Select a Brain Lobe</h3>
              <p className="mt-2 text-l">Click on a lobe to see details.</p>
            </div>
          )}
        </div>
        <div
          className="justify-items-center
 mt-[15vh] mb-[10vh]"
        >
          <h2 className="text-[3.5rem] font-bold">
            When should I call my healthcare provider?
          </h2>
          <p className="mt-8 ml-10 text-[1.5rem] w-1/2">
            You should call a healthcare provider if you notice a new or
            changing lump anywhere on your body. You should also contact them if
            you experience:
          </p>
          <ul className="mt-4 text-[1.5rem] list-disc list-inside">
            <li>Extreme fatigue.</li>
            <li>Severe pain that interferes with sleep or daily activities.</li>
            <li>Unexplained weight loss.</li>
          </ul>
        </div>
      </section>

      <section
        id="treatments"
        className="text-white bg-black min-h-screen"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}
      >
        <img src=" images/design-1.png" />
        <h2 className="text-[4rem] font-extrabold absolute transform translate-x-[33vw] -translate-y-[22vh]">
          How are tumors treated?
        </h2>
        {treatment.map((item, index) => (
          <div
            key={item.name || index}
            className={`flex ${
              index % 6 < 3 ? "flex-row pl-[10vw]" : "flex-row-reverse pr-[10vw]"
            } items-center gap-10 mt-10`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[25vh] h-[25vh]"
            />
            <div className="flex flex-col">
              <h2 className="text-[1.8rem] font-extrabold mb-1">{item.name}</h2>
              <p className="text-[1.3rem] w-[50rem]">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
