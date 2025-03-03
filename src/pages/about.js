import React from "react";
import ScrollArrow from "@/components/ScrollArrow";

const About = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="first"
        className="relative w-full h-screen bg-cover bg-center bg-black text-white p-[5vw] justify-center flex flex-col"
        style={{
          backgroundImage: "url('images/image 1769.png')",
          fontFamily: "tilt warp",
        }}
      >
        <h1 className="text-[4rem] leading-[4.5rem] w-[80%]">
          <span className="text-cyan-500/100">Simplifying </span>
          patient care with AI: <br />
          Track symptoms, detect tumors, and gain actaionable insights
        </h1>
        <p
          className="mt-6 mb-6 text-[1.2rem] w-[75%]"
          style={{ fontFamily: "noto sans" }}
        >
          MediMapAI is built on a powerful three-model AI pipeline, delivering
          precision in tumor detection, segmentation, and growth prediction. The
          detection model identifies tumor types with high accuracy, the
          segmentation model maps tumor boundaries and calculates size, and the
          predictive model forecasts growth risk for early intervention.
          Alongside this, our NLP-driven symptom tracker lets users log and
          analyze symptoms over time, providing deeper insights to support
          smarter, data-backed healthcare decisions.
        </p>

        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="second" />
        </div>
      </section>

      <section
        id="second"
        className="w-full bg-cover bg-center bg-black text-white p-[5vw] justify-center flex flex-col"
        style={{
          fontFamily: "tilt warp",
        }}
      >
        <div className="relative w-full flex flex-col items-center">
          <div className="w-full flex justify-start">
            <img
              src="images/design-3.png"
              alt="Design"
              className="w-[40%] transform scale-x-[-1] scale-y-[-1] mt-10"
            />
          </div>

          <h1 className="text-[3rem] relative z-10 mt-[-3.7rem]">
            <span className="text-cyan-500/100">A Little About </span>
            Our Tumor Detection Model
          </h1>

          <div className="w-full flex justify-end -mt-20">
            <img src="images/design-3.png" alt="Design" className="w-[40%]" />
          </div>
        </div>

        <p className="text-[2rem] mt-5">1) Tumor Classification Model</p>
        <p
          className="text-[1.1rem] mt-2 mb-5"
          style={{ fontFamily: "noto sans" }}
        >
          Used tools: Tensorflow, Keras, EfficientNetB1, OpenCV, Numpy, Pandas,
          scikit-learn
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h2 className="text-2xl mb-2">Data Collection</h2>
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit">
              <img
                src="/images/modelDesc/1-1.png"
                alt="Data Collection"
                className="rounded-lg min-h-[20rem]"
              />
              <p
                className=" text-center mt-4"
                style={{ fontFamily: "noto sans" }}
              >
                Balanced data sizes per categories
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl mb-2">Data Pre-Processing</h2>
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit">
              <img
                src="/images/modelDesc/1-2.png"
                alt="Data Collection"
                className="rounded-lg min-h-[20rem]"
              />
              <p
                className=" text-center mt-4"
                style={{ fontFamily: "noto sans" }}
              >
                cropping images using OpenCV{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl mb-2">Data visualization</h2>
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit items-center">
              <p
                className=" text-center mb-4"
                style={{ fontFamily: "noto sans" }}
              >
                1. Line Graphs for tracking accuracy & loss improvement along
                with growth of Epochs
              </p>
              <img
                src="/images/modelDesc/1-3.png"
                alt="Data Collection"
                className="rounded-lg min-h-[20rem]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit items-center">
              <p
                className=" text-center mb-4"
                style={{ fontFamily: "noto sans" }}
              >
                2. Confusion Matrix to compare predicted values to actual values
              </p>
              <img
                src="/images/modelDesc/1-4.png"
                alt="Data Collection"
                className="rounded-lg min-h-[20rem]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit items-center">
              <p
                className=" text-center mb-4"
                style={{ fontFamily: "noto sans" }}
              >
                3. Shuffle Testing
              </p>
              <img
                src="/images/modelDesc/1-5.png"
                alt="Data Collection"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center bg-gray-900 p-6 rounded-[1.5rem] mb-8 max-w-fit items-center">
              <p
                className=" text-center mb-4"
                style={{ fontFamily: "noto sans" }}
              >
                4. Classification Report
              </p>
              <img
                src="/images/modelDesc/1-6.png"
                alt="Data Collection"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <p className="text-[2rem] mt-5">2) Tumor segmentation Model</p>
        <p
          className="text-[1.1rem] mt-2 mb-5"
          style={{ fontFamily: "noto sans" }}
        >
          Used tools: Tensorflow, Keras, 2D Unet scikit-learn
        </p>
      </section>
    </>
  );
};

export default About;
