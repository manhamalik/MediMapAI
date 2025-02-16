import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Updated FAQ data for MediMap AI
const staticFaqs = [
  {
    Question: "How does MediMap AI detect brain tumors?",
    Answer:
      "MediMap AI uses advanced AI models trained on MRI scans to analyze images, detect tumors, measure size, and predict growth patterns. The system leverages deep learning and computer vision to provide high-precision diagnostics.",
  },
  {
    Question: "What types of brain tumors can the AI detect?",
    Answer:
      "The AI can identify various types of brain tumors, including gliomas, meningiomas, pituitary tumors, and more. The detection is based on medical imaging patterns and AI-driven classification models.",
  },
  {
    Question: "How accurate is the AI tumor detection?",
    Answer:
      "MediMap AI is built using state-of-the-art machine learning models, achieving high accuracy of 99% comparable to radiologists. However, it is not a replacement for medical diagnosis, and users should consult a healthcare professional for final evaluation.",
  },
  {
    Question: "Can I use MediMap AI for personal health tracking?",
    Answer:
      "Yes! MediMap AI includes a symptom tracker that lets you log daily health patterns, track recurring symptoms, and generate reports to discuss with your doctor.",
  },
  {
    Question: "Do I need a medical background to use MediMap AI?",
    Answer:
      "Not at all! MediMap AI is designed for patients, caregivers, and medical professionals alike. The interface is user-friendly, with easy-to-understand reports for personal or clinical use.",
  },
  {
    Question: "How can I access my tumor analysis report?",
    Answer:
      "Once you upload an MRI scan, MediMap AI generates a detailed report including tumor type, size, and potential growth risk. You can download your report for personal records or share it with a healthcare provider.",
  },
  {
    Question: "Is my medical data secure?",
    Answer:
      "Yes! MediMap AI follows strict security protocols to ensure patient data privacy and compliance with healthcare regulations. Your uploads are secure and encrypted.",
  },
  {
    Question: "Can doctors use MediMap AI for clinical purposes?",
    Answer:
      "MediMap AI is designed to support medical professionals by providing AI-assisted insights. However, it should be used as a supplementary tool, and final diagnoses should always be made by a qualified radiologist or doctor.",
  },
  {
    Question: "Does MediMap AI require registration to use?",
    Answer:
      "You can access basic features without an account, but registration unlocks full functionality, including symptom tracking, history logs, and downloadable reports.",
  },
  // {
  //   Question: "How can I contact MediMap AI for support or suggestions?",
  //   Answer:
  //     "For inquiries, feature requests, or collaboration opportunities, send us an email at ______@gmail.com",
  // },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [chatHeight, setChatHeight] = useState(350);
  const [chatWidth, setChatWidth] = useState(320);
  const [isButtonOpen, setButtonOpen] = useState(true);

  // Initial chat message contains the welcome text and FAQ buttons.
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      buttons: true,
      text: (
        <p>
          Have a question about MediMap AI? Just click below, and I’ll break it down for you!
        </p>
      ),
    },
  ]);

  const [typing, setTyping] = useState(false);
  const [dots, setDots] = useState("");

  // Use updated static FAQ data
  const [faqs] = useState(staticFaqs);

  const messagesEndRef = useRef(null);

  // Adjust chat window size on mount and window resize.
  useEffect(() => {
    function resizeWidth() {
      if (window.innerWidth <= 1024) {
        setChatWidth(320);
        setChatHeight(window.innerHeight * 0.8);
      } else {
        setChatWidth(400);
        setChatHeight(window.innerHeight * 0.8);
      }
    }
    resizeWidth();
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Open the chatbot window
  const handleChatbotOpen = () => {
    setButtonOpen(false);
    if (!hasOpened) {
      setHasOpened(true);
    } else {
      setTimeout(() => {
        setHasOpened(false);
      }, 2500);
    }
    setIsOpen(true);
  };

  // When a FAQ button is clicked, display the question and answer
  const handleButtonClick = (faq) => {
    // Append the user's question
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: faq.Question,
      },
    ]);

    // Simulate the bot "typing" and then respond with the answer
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: faq.Answer,
        },
      ]);
    }, 700);
  };

  // Animate dots for the typing effect
  useEffect(() => {
    let interval;
    if (typing) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 200);
    } else {
      setDots("");
    }
    return () => clearInterval(interval);
  }, [typing]);

  return (
    <div className="fixed bottom-2 right-0 z-[9999]">
      {/* Chatbot Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: isButtonOpen ? 1 : 0 }}
            animate={{ scale: isButtonOpen ? 1 : [0, 1.2, 1] }}
            whileHover={{ scale: 1.2 }}
            exit={{
              scale: [1, 1.5, 0],
              transition: { scale: { duration: 0.2 }, ease: "easeInOut" },
            }}
            transition={{
              scale: { duration: 0.3, delay: isButtonOpen ? 0 : 1 },
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-2 w-20 h-20 cursor-pointer"
            onClick={handleChatbotOpen}
          >
            <Image
              src="/images/ChatbotIMG.png"
              alt="Chatbot"
              width={80}
              height={80}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window with Pop Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Pop-in animation using scale
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative px-4 flex flex-col border border-charcoalLight bg-charcoal text-white p-3 rounded-lg shadow-lg"
            style={{ width: chatWidth, height: chatHeight }}
          >
            {/* Header (click to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-between items-center mb-3 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setButtonOpen(true);
                }, 1300);
              }}
            >
              <h2 className="font-bold text-md">FAQ Chat</h2>
              <span className="text-sm w-3 h-3 hover:text-ruby">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </span>
            </motion.div>

            {/* Chat Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="chat-messages bg-Charcoal pt-2 pr-3 pb-3 pl-1 rounded mb-3 overflow-y-auto border border-charcoalLight"
              style={{ flex: 1 }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 flex items-start ${
                    message.sender === "bot"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.sender === "bot" && (
                    <Image
                      src="/images/ChatbotIMG.png"
                      alt="Bot Avatar"
                      className="rounded-full"
                      width={56}
                      height={40}
                    />
                  )}
                  <div
                    className={`inline-block p-2 rounded max-w-xs text-sm ${
                      message.sender === "bot"
                        ? "bg-Charcoal text-white"
                        : "bg-charcoalLight text-white"
                    }`}
                  >
                    {message.text}
                    {message.buttons &&
                      faqs.length > 0 &&
                      faqs.map((faq, i) => (
                        <button
                          key={i}
                          className="bg-[#000000] my-1 py-2 px-3 text-left rounded hover:opacity-70 transition-opacity w-full"
                          onClick={() => handleButtonClick(faq)}
                        >
                          {faq.Question}
                        </button>
                      ))}
                  </div>
                </div>
              ))}

              {/* Typing animation */}
              {typing && (
                <div className="mb-2 flex items-start justify-start">
                  <Image
                    src="/images/ChatbotIMG.png"
                    alt="Bot Avatar"
                    className="w-13 h-10 rounded-full"
                    width={56}
                    height={40}
                  />
                  <div className="inline-block animate-pulse p-2 rounded max-w-xs text-sm bg-Charcoal text-white">
                    <span className="text-2xl">{dots}</span>
                  </div>
                </div>
              )}
              {/* Dummy element to force scroll to bottom */}
              <div ref={messagesEndRef} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
