import React, { useState, useEffect } from "react";
import Head from "next/head";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScrollArrow from "@/components/ScrollArrow";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Firestore imports
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

// jsPDF import
import { jsPDF } from "jspdf";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend
);

const scrollElement = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Tracker = () => {
  // Destructure currentUser, userData, and loading from AuthContext
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <p>Loading user data...</p>;
  }

  // Create displayName using first and last name if available, or fallback to email
  const displayName =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : currentUser?.email || "";

  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symptomData, setSymptomData] = useState([]);
  const [daysLogged, setDaysLogged] = useState(0);

  // Symptom states
  const [symptoms, setSymptoms] = useState({
    headache: 0,
    cognitive: 0,
    vision: 0,
    motor: 0,
    speech: 0,
    seizures: 0,
    nausea: 0,
  });

  // Chart.js data & options
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  // Fetch user's existing symptom data
  useEffect(() => {
    if (!currentUser) return;
    const fetchSymptomData = async () => {
      try {
        const ref = collection(db, "users", currentUser.uid, "symptoms");
        const snapshot = await getDocs(ref);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const transformed = data.map((d) => {
          const dateString =
            typeof d.date === "string"
              ? d.date
              : new Date(d.date.seconds * 1000).toDateString();
          const totalSeverity = Object.values(d.symptoms || {}).reduce(
            (acc, val) => acc + Number(val),
            0
          );
          return { ...d, dateString, totalSeverity };
        });

        setSymptomData(transformed);
        const uniqueDays = new Set(transformed.map((item) => item.id)).size;
        setDaysLogged(uniqueDays);
      } catch (error) {
        console.error("Error fetching symptom data:", error);
      }
    };
    fetchSymptomData();
  }, [currentUser]);

  // Build chart data whenever symptomData changes
  useEffect(() => {
    if (!symptomData.length) return;
    const data = {
      labels: symptomData.map((d) => d.dateString),
      datasets: [
        {
          label: "Total Symptom Severity",
          data: symptomData.map((d) => d.totalSeverity),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
          tension: 0.2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.1)" },
        },
        y: {
          ticks: { color: "#fff", beginAtZero: true },
          grid: { color: "rgba(255,255,255,0.1)" },
        },
      },
      plugins: {
        legend: { labels: { color: "#fff" } },
        title: {
          display: true,
          text: "Symptom Severity Over Time",
          color: "#fff",
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [symptomData]);

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Update symptom state
  const handleSymptomChange = (symptom, severity) => {
    setSymptoms((prev) => ({ ...prev, [symptom]: Number(severity) }));
  };

  // Submit symptoms
  const handleSubmitSymptoms = async () => {
    const allZero = Object.values(symptoms).every((val) => val === 0);
    if (allZero) {
      const confirmNoSymptoms = window.confirm(
        "You have selected no symptoms. Do you want to log a symptom-free day?"
      );
      if (!confirmNoSymptoms) return;
    }
    if (!currentUser) {
      alert("You must be logged in to log symptoms.");
      return;
    }
    const dateStr = selectedDate.toISOString().split("T")[0];
    try {
      await setDoc(
        doc(db, "users", currentUser.uid, "symptoms", dateStr),
        { date: dateStr, symptoms },
        { merge: true }
      );

      const newEntry = {
        id: dateStr,
        dateString: dateStr,
        totalSeverity: Object.values(symptoms).reduce(
          (acc, val) => acc + Number(val),
          0
        ),
        symptoms: { ...symptoms },
      };

      setSymptomData((prev) => {
        const filtered = prev.filter((item) => item.id !== dateStr);
        return [...filtered, newEntry];
      });

      setDaysLogged((prev) => {
        const existingDates = new Set(symptomData.map((item) => item.id));
        existingDates.add(dateStr);
        return existingDates.size;
      });

      // Reset
      setIsModalOpen(false);
      setSymptoms({
        headache: 0,
        cognitive: 0,
        vision: 0,
        motor: 0,
        speech: 0,
        seizures: 0,
        nausea: 0,
      });
    } catch (error) {
      console.error("Error saving symptoms:", error);
      alert("Error saving symptoms. Please try again.");
    }
  };

  // Generate PDF report with composite (mixed) chart
  const handleGenerateReport = async () => {
    if (daysLogged < 7) {
      alert(
        `Please continue filling out information. Need at least 7 days. Currently: ${daysLogged} day(s).`
      );
      return;
    }

    let reportTitle = "";
    let rangeSize = 0;
    if (daysLogged >= 7 && daysLogged < 14) {
      reportTitle = "7-Day Health Report";
      rangeSize = 7;
    } else if (daysLogged >= 14 && daysLogged < 21) {
      reportTitle = "14-Day Health Report";
      rangeSize = 14;
    } else {
      reportTitle = "21-Day Health Report";
      rangeSize = 21;
    }

    const sorted = [...symptomData].sort(
      (a, b) => new Date(a.dateString) - new Date(b.dateString)
    );
    const recentData = sorted.slice(-rangeSize);

    // Summaries
    const summaryCounts = {
      headache: 0,
      cognitive: 0,
      vision: 0,
      motor: 0,
      speech: 0,
      seizures: 0,
      nausea: 0,
    };
    recentData.forEach((day) => {
      const s = day.symptoms || {};
      if (s.headache > 0) summaryCounts.headache += 1;
      if (s.cognitive > 0) summaryCounts.cognitive += 1;
      if (s.vision > 0) summaryCounts.vision += 1;
      if (s.motor > 0) summaryCounts.motor += 1;
      if (s.speech > 0) summaryCounts.speech += 1;
      if (s.seizures > 0) summaryCounts.seizures += 1;
      if (s.nausea > 0) summaryCounts.nausea += 1;
    });

    // Create jsPDF doc with black background
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "bold");
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setTextColor(255, 255, 255);

    // Try to add a logo
    try {
      const logoUrl = "https://i.imgur.com/80ziW9i.png";
      const logoBase64 = await getBase64FromUrl(logoUrl);
      doc.addImage(logoBase64, "PNG", pageWidth - 30, 10, 20, 20);
    } catch (err) {
      console.error("Error fetching logo:", err);
    }

    // Title
    doc.setTextColor(4, 218, 230);
    doc.setFontSize(16);
    doc.text(reportTitle, pageWidth / 2, 20, { align: "center" });

    // Date Range
    if (recentData.length > 0) {
      const startDate = new Date(recentData[0].dateString);
      const endDate = new Date(recentData[recentData.length - 1].dateString);
      endDate.setDate(endDate.getDate() + 1);
      const startDateFriendly = startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const endDateFriendly = endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bolditalic");
      doc.text(
        `${startDateFriendly} – ${endDateFriendly}`,
        pageWidth / 2,
        30,
        { align: "center" }
      );
    }

    // Summaries
    doc.setTextColor(255, 255, 255);
    let y = 40;
    const xIndent = 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(4, 218, 230);
    doc.text("Summary of Logged Symptoms:", xIndent, y);
    y += 8;

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    const summaryItems = [
      {
        label: "• Headaches:",
        detail:
          summaryCounts.headache > 0
            ? ` Logged ${summaryCounts.headache} time(s)`
            : " No logs",
      },
      {
        label: "• Cognitive & Mental Changes:",
        detail:
          summaryCounts.cognitive > 0
            ? ` Logged ${summaryCounts.cognitive} time(s)`
            : " No logs",
      },
      {
        label: "• Vision & Eye Changes:",
        detail:
          summaryCounts.vision > 0
            ? ` Logged ${summaryCounts.vision} time(s)`
            : " No logs",
      },
      {
        label: "• Motor Function & Balance:",
        detail:
          summaryCounts.motor > 0
            ? ` Logged ${summaryCounts.motor} time(s)`
            : " No logs",
      },
      {
        label: "• Speech & Communication:",
        detail:
          summaryCounts.speech > 0
            ? ` Logged ${summaryCounts.speech} time(s)`
            : " No logs",
      },
      {
        label: "• Seizures & Muscle Movements:",
        detail:
          summaryCounts.seizures > 0
            ? ` Logged ${summaryCounts.seizures} time(s)`
            : " No logs",
      },
      {
        label: "• Nausea & Vomiting:",
        detail:
          summaryCounts.nausea > 0
            ? ` Logged ${summaryCounts.nausea} time(s)`
            : " No logs",
      },
    ];

    summaryItems.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.label, xIndent + 5, y);
      const labelWidth = doc.getTextWidth(item.label);
      doc.setFont("helvetica", "normal");
      doc.text(item.detail, xIndent + 5 + labelWidth, y);
      y += 7;
    });
    y += 5;

    // Key Observations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(4, 218, 230);
    doc.text("Key Observations:", xIndent, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(
      "• Headaches appeared multiple times (moderate severity).",
      xIndent + 5,
      y
    );
    y += 7;
    doc.text("• Memory lapses noted on multiple days.", xIndent + 5, y);
    y += 10;

    // Recommendation
    doc.setFont("helvetica", "bold");
    doc.setTextColor(4, 218, 230);
    doc.text("Recommendation:", xIndent, y);
    y += 8;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(255, 255, 255);
    const recText =
      "If symptoms worsen, consider consulting a healthcare professional.";
    doc.text(recText, pageWidth / 2, y, {
      align: "center",
      maxWidth: pageWidth - 40,
    });
    y += 15;

    // Next Steps
    doc.setFont("helvetica", "bold");
    doc.setTextColor(4, 218, 230);
    doc.text("Next Steps:", xIndent, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    const nextSteps = [
      "Continue daily logging to capture any emerging trends.",
      "Watch for changes in headache intensity or frequency.",
      "If symptoms persist or intensify, schedule a check-up.",
    ];
    nextSteps.forEach((step, index) => {
      const stepNumber = `${index + 1}. `;
      doc.setFont("helvetica", "bold");
      doc.text(stepNumber, xIndent + 5, y);
      const numberWidth = doc.getTextWidth(stepNumber);
      doc.setFont("helvetica", "normal");
      doc.text(step, xIndent + 5 + numberWidth, y);
      y += 7;
    });
    y += 10;

    // Mixed chart data
    const displayChartLabels = sorted.map((item) => item.dateString);
    const displayChartValues = sorted.map((item) => item.totalSeverity);
    const mixedChartData = {
      labels: displayChartLabels,
      datasets: [
        {
          type: "bar",
          label: "Total Symptom Severity (Bar)",
          data: displayChartValues,
          backgroundColor: "rgba(75,192,192,0.5)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Total Symptom Severity (Line)",
          data: displayChartValues,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    const mixedChartOptions = {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: "Symptom Severity Over Time",
          color: "#FFFFFF",
        },
        legend: {
          display: true,
          labels: { color: "#FFFFFF" },
        },
      },
      scales: {
        x: {
          ticks: { color: "#FFFFFF" },
          grid: { color: "rgba(255,255,255,0.2)" },
        },
        y: {
          ticks: { color: "#FFFFFF" },
          grid: { color: "rgba(255,255,255,0.2)" },
        },
      },
    };

    try {
      const mixedChartDataURL = await generateChartImage(
        "bar",
        mixedChartData,
        mixedChartOptions
      );
      const chartWidth = 120;
      const chartHeight = 90;
      const chartX = (pageWidth - chartWidth) / 2;
      doc.addImage(mixedChartDataURL, "PNG", chartX, y, chartWidth, chartHeight);
      doc.save("health-report.pdf");
    } catch (err) {
      console.error("Error generating or adding mixed chart:", err);
      alert("Error generating charts. Check console for details.");
    }
  };

  // Helper function to convert image URL to base64
  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // Generate chart image from Chart.js data
  const generateChartImage = async (chartType, data, options) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");

      const chart = new ChartJS(ctx, {
        type: chartType,
        data: data,
        options: {
          ...options,
          responsive: false,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            onComplete: function () {
              try {
                const dataURL = canvas.toDataURL("image/png");
                chart.destroy();
                resolve(dataURL);
              } catch (err) {
                reject(err);
              }
            },
          },
        },
      });

      // Fallback if animation callback doesn't fire
      setTimeout(() => {
        try {
          const dataURL = canvas.toDataURL("image/png");
          chart.destroy();
          resolve(dataURL);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tilt+Warp&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* First Section */}
      <section
        id="first"
        style={{
          backgroundImage: "url('images/image 1769.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          fontFamily: "'Noto Sans Multani', sans-serif",
        }}
        className="relative flex items-center justify-center text-white h-screen"
      >
        {/* Left Text Content */}
        <div className="flex flex-col max-w-4xl text-white text-start mb-10">
          <h1
            style={{ fontFamily: "Tilt Warp, sans-serif" }}
            className="text-5xl md:text-[4rem] leading-[4rem] md:leading-[5rem] mb-8"
          >
            Track Symptoms, <br />
            Spot Trends, <br />
            <span className="text-[#5EDEF4]">Take Control</span>
          </h1>

          <p className="w-[32vw] mb-6 text-xl md:text-2xl lg:text-3xl">
            Use the interactive calendar and AI-driven insights to monitor your health patterns over time.
          </p>

          <button
            style={{ fontFamily: "Tilt Warp, sans-serif" }}
            className="mt-4 text-xl md:text-3xl border-2 border-[#5EDEF4] bg-black w-[16rem] md:w-[19rem] h-[4.2rem] rounded-[24px] shadow-lg shadow-cyan-500/50 hover:bg-cyan-500/100 transition-all duration-300 flex items-center justify-center"
            onClick={() => scrollElement("second")}
          >
            START TRACKING
          </button>
        </div>

        {/* Right Image */}
        <img
          src="images/right.png"
          alt="Track Symptoms"
          className="h-[46vw] mb-16"
        />

        {/* Scroll Arrow at the Bottom */}
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="second" />
        </div>
      </section>

      {/* SECOND SECTION */}
      <section
        id="second"
        className="relative w-full min-h-screen bg-black bg-center bg-no-repeat"
        style={{
          backgroundSize: "75vw",
        }}
      >
        <div className="flex w-full min-h-screen py-10 px-0">
          {/* LEFT COLUMN (Calendar & Greeting) */}
          <div className="w-2/3 px-6 flex flex-col items-center text-center">
            <h2
              className="text-[3rem] text-white mb-2"
              style={{ fontFamily: "Tilt Warp, sans-serif" }}
            >
              Welcome back{" "}
              <span
                style={{
                  fontFamily: "Tilt Warp, sans-serif",
                  color: "#5edef4",
                }}
              >
                {displayName}
              </span>{" "}
              🎉
            </h2>
            <p className="text-white text-[1.5rem] mb-6 w-[35rem]">
              Track your health effortlessly. Select a date to log your symptoms and monitor trends over time!
            </p>

            <div className="custom-calendar mb-8">
              <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const dateStr = date.toISOString().split("T")[0];
                    if (symptomData.find((d) => d.id === dateStr)) {
                      return "symptom-day";
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[26rem] bg-[#121212] rounded-lg p-4 text-white" style={{ marginLeft: "auto" }}>
            <h2 style={{ fontFamily: "Tilt Warp, sans-serif" }} className="text-[1.75rem] mb-4 text-center">Health Insights</h2>

            <div className="mb-6">
              <p style={{ fontFamily: "Inter, sans-serif" }} className="font-semibold text-[1.25rem] inline">
                Tip: <span style={{ fontFamily: "Inter, sans-serif" }} className="font-normal">Stay hydrated! 💧</span>
              </p>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-[1.25rem]">
                Fatigue and headaches can often be signs of dehydration.
              </p>
            </div>

            <div className="mb-6">
              <p style={{ fontFamily: "Inter, sans-serif" }} className="font-bold text-[1.25rem] mb-2">Recent Entries:</p>
              <ul style={{ fontFamily: "Inter, sans-serif" }} className="list-disc text-[1.25rem] list-inside ml-5 space-y-1">
                <li>Headache (2 days ago)</li>
                <li>Fatigue (Yesterday)</li>
                <li>Nausea (Today)</li>
              </ul>
            </div>

            <div className="mb-6">
              <p style={{ fontFamily: "Inter, sans-serif" }} className="font-bold text-[1.25rem] mb-2">Recurring Symptoms:</p>
              <ul style={{ fontFamily: "Inter, sans-serif" }} className="list-disc list-inside ml-5 space-y-1 text-[1.25rem]">
                <li>Headache (5 times this month)</li>
                <li>Fatigue (7 times this month)</li>
              </ul>
            </div>

            <div className="mb-6 h-[250px] bg-[#1e1e1e] rounded p-2">
              {chartData && chartOptions ? (
                <div className="h-full">
                  <Line data={chartData} options={chartOptions} />
                </div>
              ) : (
                <p className="text-center mt-8">Loading chart...</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerateReport}
                style={{ fontFamily: "Tilt Warp, sans-serif" }}
                className="text-xl md:text-2xl border-2 border-[#5EDEF4] bg-black w-[16rem] md:w-[19rem] h-[4rem] rounded-[24px] shadow-lg shadow-cyan-500/50 hover:bg-cyan-500/100 transition-all duration-300 flex items-center justify-center"
              >
                GENERATE REPORT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Symptom Logging Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Log Symptoms for {selectedDate.toDateString()}
            </h2>

            {/* Headaches */}
            <div className="mb-3">
              <label className="block font-medium">Headaches</label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.headache}
                onChange={(e) => handleSymptomChange("headache", e.target.value)}
              >
                <option value={0}>No Headache</option>
                <option value={1}>Mild Headache</option>
                <option value={2}>Steady Headache</option>
                <option value={3}>Severe Headache</option>
                <option value={4}>Debilitating Headache</option>
              </select>
            </div>

            {/* Cognitive & Mental Changes */}
            <div className="mb-3">
              <label className="block font-medium">
                Cognitive & Mental Changes
              </label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.cognitive}
                onChange={(e) =>
                  handleSymptomChange("cognitive", e.target.value)
                }
              >
                <option value={0}>Clear Mind</option>
                <option value={1}>Occasional Forgetfulness</option>
                <option value={2}>Frequent Memory Lapses</option>
                <option value={3}>Confused Thinking</option>
                <option value={4}>Disoriented</option>
              </select>
            </div>

            {/* Vision & Eye Changes */}
            <div className="mb-3">
              <label className="block font-medium">Vision & Eye Changes</label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.vision}
                onChange={(e) => handleSymptomChange("vision", e.target.value)}
              >
                <option value={0}>Normal Vision</option>
                <option value={1}>Slight Blurriness</option>
                <option value={2}>Intermittent Double Vision</option>
                <option value={3}>Frequent Blurriness</option>
                <option value={4}>Significant Vision Loss</option>
              </select>
            </div>

            {/* Motor Function & Balance */}
            <div className="mb-3">
              <label className="block font-medium">Motor Function & Balance</label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.motor}
                onChange={(e) => handleSymptomChange("motor", e.target.value)}
              >
                <option value={0}>Steady/Stable</option>
                <option value={1}>Mild Dizziness</option>
                <option value={2}>Occasional Unsteadiness</option>
                <option value={3}>Frequent Loss of Balance</option>
                <option value={4}>Severe Coordination Loss</option>
              </select>
            </div>

            {/* Speech & Communication */}
            <div className="mb-3">
              <label className="block font-medium">Speech & Communication</label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.speech}
                onChange={(e) => handleSymptomChange("speech", e.target.value)}
              >
                <option value={0}>Clear Speech</option>
                <option value={1}>Word Recall Difficulty</option>
                <option value={2}>Mumbled Speech</option>
                <option value={3}>Slurred Speech</option>
                <option value={4}>Loss of Speech</option>
              </select>
            </div>

            {/* Seizures & Muscle Movements */}
            <div className="mb-3">
              <label className="block font-medium">
                Seizures & Muscle Movements
              </label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.seizures}
                onChange={(e) =>
                  handleSymptomChange("seizures", e.target.value)
                }
              >
                <option value={0}>No Seizures or Twitching</option>
                <option value={1}>Minor Twitching</option>
                <option value={2}>Partial Seizure</option>
                <option value={3}>Full Seizure</option>
                <option value={4}>Critical Seizure</option>
              </select>
            </div>

            {/* Nausea & Vomiting */}
            <div className="mb-3">
              <label className="block font-medium">Nausea & Vomiting</label>
              <select
                className="border rounded p-1 w-full"
                value={symptoms.nausea}
                onChange={(e) => handleSymptomChange("nausea", e.target.value)}
              >
                <option value={0}>No Nausea</option>
                <option value={1}>Mild Nausea</option>
                <option value={2}>Moderate Nausea</option>
                <option value={3}>Frequent Vomiting</option>
                <option value={4}>Severe Vomiting</option>
              </select>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmitSymptoms}
              >
                Log Symptoms
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Calendar Styles */}
      <style jsx global>{`
        /* Use Inter font for the entire calendar */
        .custom-calendar .react-calendar {
          width: 50rem;
          height: 32rem;
          background: #121418;
          font-size: 2em;
          border: none;
          font-family: "Inter", sans-serif;
          padding: 1rem;
          border-radius: 1rem;
        }

        /* Navigation (month/year + arrows) in white, bold */
        .react-calendar__navigation button {
          color: #fff;
          font-weight: bold;
        }

        /* The arrow SVG fill */
        .react-calendar__navigation button .react-calendar__navigation__arrow {
          fill: #fff;
        }

        /* Weekday abbreviations in cyan, normal (not bold) */
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
          color: #5edef4;
          font-weight: normal;
        }

        /* All day numbers in white by default */
        .react-calendar__tile {
          color: #fff;
        }

        /* Days from previous/next month in #707070 */
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #707070;
        }

        .react-calendar__tile:hover {
          border-radius: 50%;
          background: #5edef4;
          color: #121418;
        }

        /* Current day: smaller circle in #5edef4 */
        .react-calendar__tile--now {
          background: none;
        }
        .react-calendar__tile--now abbr {
          display: inline-block;
          width: 3rem;
          height: 2.5rem;
          // line-height: 1rem;
          border-radius: 50%;
          background: #5edef4;
          color: #121418;
          text-align: center;
        }

        /* Selected day: smaller circle in #2a2d30 */
        .react-calendar__tile--active {
          background: none;
        }
        .react-calendar__tile--active abbr {
          display: inline-block;
          width: 1.5rem;
          height: 1rem;
          line-height: 1rem;
          border-radius: 50%;
          background: #2a2d30;
          color: #fff;
          text-align: center;
        }

        /* Days that have symptoms: cyan underline */
        .symptom-day {
          border-bottom: 3px solid #5edef4;
        }
      `}</style>
    </>
  );
};

export default Tracker;
