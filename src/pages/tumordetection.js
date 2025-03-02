import React, { useState } from "react";
import "@fontsource/tilt-warp"; // npm install @fontsource/tilt-warp
import "@fontsource/noto-sans"; // npm install @fontsource/noto-sans
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf"; //npm install jspdf
import scrollElement from "react-scroll/modules/mixins/scroll-element";

const preSavedResults = {
  "images/tryout- Meningioma.png": {
    tumorType: "Meningioma",
    area: "23.5",
    volume: "12.8",
    growthRisk: "18%",
  },
  "images/tryout- Pituitary Tumors (Pituitary Microadenoma).png": {
    tumorType: "Pituitary Tumor",
    area: "19.4",
    volume: "10.2",
    growthRisk: "12%",
  },
  "images/No Tumor (4).png": {
    tumorType: "No Tumor",
  },
};

const tumorExplanation = {
  meningioma:
    "This is an abnormal growth in the pituitary gland, a small gland at the brain’s base that regulates hormones.",
  pituitary:
    "This is an abnormal growth in the pituitary gland, a small gland at the brain’s base that regulates hormones.",
};

function TumorDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [area, setArea] = useState("");
  const [volume, setVolume] = useState("");
  const [growthRisk, setGrowthRisk] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showResult, setShowResult] = useState(false); // Track if the analysis is completed

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Function to call the Hugging Face API
  const classifyTumor = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(
        "https://e1z-tumormodels.hf.space/predict/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setShowResult(true); // Switch to result screen
    } catch (error) {
      console.error("Error calling API:", error);
      setPrediction("Error processing image.");
    }
  };

  // Handle upload button click
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }
    classifyTumor(selectedFile);
  };

  const handlePreSavedAnalysis = (imagePath) => {
    setImagePreview(imagePath);
    setPrediction(preSavedResults[imagePath].tumorType);
    setArea(preSavedResults[imagePath].area);
    setVolume(preSavedResults[imagePath].volume);
    setGrowthRisk(preSavedResults[imagePath].growthRisk);
    setShowResult(true);
  };

  const downloadAnalysisPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.text("Tumor Analysis Report", 20, 20);
    doc.text(`Detected Tumor: ${prediction || "Meningioma"}`, 20, 40);
    doc.text("Tumor Size & Volume", 20, 60);
    doc.text(`Area: 23.5 cm²`, 20, 70);
    doc.text(`Volume: 12.8 cm³`, 20, 80);
    doc.text("Growth Probability", 20, 100);
    doc.text(`Estimated Growth Risk: 18% over the next 6 months`, 20, 110);
    doc.text("Recommendations", 20, 130);
    doc.text("- Follow-up MRI in 6–12 months", 20, 140);
    doc.text("- If experiencing headaches, consult a neurologist", 20, 150);
    doc.text("- Regular MRI monitoring is recommended", 20, 160);
    doc.save("Tumor_Analysis_Report.pdf");
  };

  const scrollElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section>
      <div
        style={{
          backgroundImage: "url('images/image 1769.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          fontFamily: "Tilt Warp",
        }}
        className="flex items-center justify-center text-white h-screen"
      >
        <div className="flex flex-col max-w-4xl text-white text-start mb-10">
          <h1 className="text-5xl text-[4rem] leading-[5rem] mb-8">
            Instant Tumor Detection.
            <br />
            <span className="text-cyan-500/100">AI-Powered</span>
            <span className="text-[#F5CA90]"> Precision.</span>
          </h1>
          <h2
            className="w-3/5 mb-6 text-2xl md:text-3xl"
            style={{ fontFamily: "Noto Sans" }}
          >
            Analyze your MRI scans with advanced AI models to detect tumors,
            measure size, and predict growth.
          </h2>
          <button
            className="mt-4 text-3xl border-2 border-[#5EDEF4] bg-black w-[21rem] h-[5rem] rounded-[24px] shadow-lg shadow-cyan-500/50 hover:bg-cyan-500/100 transition-all duration-300"
            onClick={() => scrollElement("run-analysis")}
          >
            START AI DETECTION
          </button>
        </div>

        <img
          src="images/tumordectionhero.png"
          alt="Tumor Detection"
          className=" h-2/3 mb-16"
        />
      </div>

      <div
        className="flex flex-col justify-center items-center bg-black text-white p-6 min-h-screen w-full sm:text-base"
        style={{
          fontFamily: "Tilt Warp",
          fontSize: "1.5rem",
        }}
      >
        {showResult ? (
          prediction === "No Tumor" ? (
            // NO TUMOR SCREEN
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[1.8rem] text-cyan-400">NO TUMOR DETECTED</h2>
              <div
                className="flex border-2 mb-10 border-white text-[1.2rem] rounded-[13px] items-centre p-4 w-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer mt-10"
                onClick={() => setShowResult(false)}
              >
                <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
                Upload Another Image
              </div>
            </div>
          ) : (
            // RESULT SCREEN
            <div className="flex flex-col lg:flex-row gap-16 items-center mx-w-full p-8">
              <div className="flex-col justify-center lg:w-2/5">
                <div
                  className="flex border-2 border-white text-[1.2rem] rounded-[13px] p-4 w-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer mb-3"
                  onClick={() => setShowResult(false)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
                  Upload Another Image
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Tumor MRI"
                    className="w-full rounded-lg border p-4 border-gray-500 hover:opacity-80"
                  />
                  <button
                    className="mt-6 text-[1.7rem] border border-[#5EDEF4] font-bold bg-black p-6 rounded-[28px] hover:bg-cyan-500/100 transition-all duration-300"
                    onClick={downloadAnalysisPDF}
                  >
                    DOWNLOAD FULL ANALYSIS
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-3/5">
                <h2 className="text-[1.8rem] text-cyan-400 mb-2">
                  TYPE OF TUMOR
                </h2>
                <p>
                  <strong>Detected:</strong> {prediction || "No Tumor"}
                </p>
                <p
                  className="mt-2 text-[1.2rem] w-[55rem] leading-6"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  {tumorExplanation[prediction.toLowerCase().split(" ")[0]]}
                </p>
                <h2 className="text-[1.8rem] text-cyan-400 mt-8 mb-2">
                  TUMOR SIZE & VOLUME
                </h2>
                <p>
                  <strong>Area:</strong> {area} cm²
                </p>
                <p className="mt-2">
                  <strong>Volume:</strong> {volume} cm³
                </p>
                <p
                  className="mt-2 text-[1.2rem] w-[55rem] leading-6"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  The tumor is localized with well-defined borders, commonly
                  observed in meningiomas. Size monitoring is essential to
                  assess potential growth.
                </p>
                <h2 className="text-[1.8rem] text-cyan-400 mt-8 mb-2">
                  GROWTH PROBABILITY
                </h2>
                <p>
                  <strong>Estimated Growth Risk:</strong> {growthRisk} over the
                  next 6 months
                </p>
                <p
                  className="mt-2 text-[1.2rem] w-[55rem] leading-6"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  AI-based analysis suggests a low-to-moderate risk of tumor
                  expansion. Regular imaging and clinical evaluations are
                  recommended to track any changes.
                </p>
                <h2 className="text-[1.8rem] text-cyan-400 mt-8 mb-2">
                  RECOMMENDATIONS
                </h2>
                <ul
                  className="list-disc pl-6 mt-2 text-[1.2rem] w-[55rem] leading-6"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  <li>
                    Consider a follow-up MRI in 6–12 months to monitor potential
                    changes.
                  </li>
                  <li>
                    If experiencing headaches, vision issues, or cognitive
                    symptoms, consult a neurologist.
                  </li>
                  <li>
                    Treatment often involves regular monitoring through MRI
                    scans, with intervention only if the tumor grows or causes
                    symptoms.
                  </li>
                </ul>
              </div>
            </div>
          )
        ) : (
          // UPLOAD SCREEN
          <div
            id="run-analysis"
            className="flex lg:flex-row flex-col items-center gap-2"
          >
            <div className="flex flex-col items-center w-full">
              <div className="border-2 border-white rounded-[20px] p-10 text-center w-full lg:w-[43rem] h-[20rem] justify-center items-center">
                <label htmlFor="fileUpload" className="cursor-pointer block">
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    style={{ width: "10rem", height: "10rem" }}
                  />
                </label>
                <label
                  htmlFor="fileUpload"
                  className="text-[2.4rem] font-semibold cursor-pointer"
                >
                  Select files to upload
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="mt-12 text-center">
                <p className="text-[1.5rem] font-semibold">
                  Or click images to try out
                </p>
                <div className="flex flex-row gap-4 mt-12">
                  {Object.keys(preSavedResults).map((imagePath) => (
                    <img
                      key={imagePath}
                      src={imagePath}
                      alt="Sample MRI"
                      className="lg:w-[15rem] lg:h-[12rem] rounded-lg cursor-pointer border border-gray-500 hover:opacity-80"
                      onClick={() => handlePreSavedAnalysis(imagePath)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full ">
              <button
                className="text-[2rem] mt-4 border border-[#5EDEF4] font-bold bg-black w-1/2 h-[4rem] rounded-[20px] shadow-lg shadow-cyan-500/50 hover:bg-cyan-500/100 transition-all duration-300"
                onClick={handleUpload}
              >
                RUN ANALYSIS
              </button>

              <div className="mt-8 md:ml-[5vw]">
                <h2 className=" text-4xl mt-6">AI-Driven Tumor Detection</h2>
                <p
                  className="mt-2 text-[1.5rem] w-[40rem] leading-8"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Pinpoint whether the tumor is glioma, meningioma, pituitary,
                  or benign with cutting-edge classification models.
                </p>
                <h2 className=" text-4xl mt-6"> High-Precision Tumor Sizing</h2>
                <p
                  className="mt-2 text-[1.5rem] w-[40rem] leading-8"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Generate a detailed, segmented visualization of the tumor with
                  exact size and volume metrics for deeper analysis.
                </p>
                <h2 className=" text-4xl mt-6">
                  {" "}
                  Predictive Growth Intelligence
                </h2>
                <p
                  className="mt-2 text-[1.5rem] w-[40rem] leading-8"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Uncover the tumor’s growth trajectory with advanced AI
                  modeling, equipping you with crucial insights for proactive
                  care.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TumorDetection;
