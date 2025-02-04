import React, { useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faClipboard,
  faCheckCircle,
  faStar,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const formRef = useRef();
  const recaptchaRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Sending message...");

    try {
      // Execute invisible reCAPTCHA and await the token
      const token = await recaptchaRef.current.executeAsync();

      // Optionally, you can verify the token if needed.
      if (!token) {
        toast.error("reCAPTCHA verification failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Proceed with sending the email using EmailJS
      emailjs
        .sendForm(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          formRef.current,
          "YOUR_PUBLIC_KEY"
        )
        .then(
          () => {
            toast.dismiss();
            toast.success("Message sent successfully!");
            setFormSubmitted(true);
          },
          (error) => {
            toast.dismiss();
            toast.error("Failed to send message.");
            console.error("EmailJS error:", error);
          }
        )
        .finally(() => {
          setIsSubmitting(false);
          // Reset the invisible reCAPTCHA for future submissions
          recaptchaRef.current.reset();
        });
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("An error occurred with reCAPTCHA. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Head>
        <title>LA Relief - Discover Aid Near You</title>
        <meta
          name="description"
          content="Find aid and resources near you for emergencies and support."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        className="relative flex flex-col items-center min-h-screen bg-[#183917] text-white p-6"
        style={{
          fontFamily: "'noto sans multani', sans-serif",
          fontWeight: "700",
        }}
      >
        {/* Black background */}
        <div className="absolute bottom-[px] top-[230px] h-full w-full bg-[#000000] rounded-[160px] rounded-b-none z-index-2"></div>

        <div
          className="absolute top-[0px] bg-[#227541] rounded-[128px] rounded-t-none"
          style={{
            zIndex: 0,
            width: "498px",
            height: "210px",
            boxShadow: "-25px 1px 2px 0 rgb(7, 32, 14)",
          }}
        ></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-5xl font-bold text-center border-4 border-white p-6 pl-10 pr-10 mt-5 rounded-[180px]"
          style={{
            fontFamily: "'noto sans', sans-serif",
            fontWeight: "900",
            textShadow: "0 4px 3px rgba(0, 0, 0, 0.4)",
            fontSize: "4rem",
          }}
        >
          CONTACT
        </motion.h1>

        {/* Thank You Screen After Submission */}
        {formSubmitted ? (
          <div className="relative mt-10 flex flex-row items-start space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-center p-6 rounded-3xl shadow-lg max-w-[600px] w-full items-center"
              style={{
                fontFamily: "'noto sans multani', sans-serif",
                fontWeight: "700",
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[#227541] text-[200px] mb-4"
              />

              <h2 className="text-4xl font-bold">THANK YOU</h2>
              <p className="text-white text-xl font-bold mt-2">
                We will get back to you as soon as possible!
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-8 bg-[#227541] text-xl font-bold text-white p-2 rounded-3xl hover:bg-white hover:text-[#227541] transition duration-600"
              >
                Send Another Message
              </button>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Info Section */}
            <div className="relative">
              <motion.div
                className="flex items-center justify-between gap-[20px] mt-[-150px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <img
                  src="/images/left-laptop.png"
                  className="sm:w-[15rem] md:w-[15rem] lg:w-[27rem] h-auto mr-6"
                  alt="Left Laptop"
                />
                <img
                  src="/images/right-laptop.png"
                  className="sm:w-[15rem] md:w-[15rem] lg:w-[27rem] h-auto pl-6"
                  alt="Right Laptop"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-8xl p-6 rounded-[2.75vw] shadow-lg mt-3 border-4 border-white m-6"
                style={{
                  fontFamily: "'noto sans multani', sans-serif",
                  fontSize: "1.2rem",
                }}
              >
                <p className="font-normal">
                  <strong>Welcome to MediMapAI!</strong> <br />
                  <span>
                    Whether you&apos;re here to share ideas, offer support, or ask for help, we&apos;re ready to connect and support you every step of the way.
                    <br /> <br />
                    Use the fields below to send us a message directly, or feel free to email us at{" "}
                    <a
                      href="mailto:contact.medimapai@gmail.com"
                      className="text-blue-400 underline"
                    >
                      contact.medimapai@gmail.com
                    </a>
                    . You can also follow and message us on Instagram at{" "}
                    <a
                      href="https://www.instagram.com/medimapai/"
                      className="text-blue-400 underline"
                    >
                      @medimapai
                    </a>
                    .<br />
                    <br />
                    <strong>A Little About Us</strong> <br />
                    Medimapai was founded in response to the devastating fires that impacted Los Angeles on January 7, 2025. Our mission is to provide essential resources and support, helping the community recover and thrive.
                    <br />
                    <br />
                    Looking ahead, we are committed to expanding our impact, ensuring that no one is left behind during tough times. Fueled by compassion and the collective spirit of people like you, we aim to build a stronger, more resilient community together.
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="relative mt-10 flex flex-col md:flex-row md:items-center space-x-4 m-5">
              {/* Google Form Section (smaller width) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-black border-4 border-white text-white p-6 rounded-[2.75vw] shadow-xl w-full md:w-1/4 max-w-sm text-center"
              >
                {/* Star Icon - Positioned Above */}
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 flex items-center justify-center rounded-full border-4 border-black">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-black text-3xl"
                  />
                </div>

                {/* Assistance Text */}
                <p
                  className="mt-4 text-xl font-bold leading-relaxed"
                  style={{ fontFamily: "'noto sans multani', sans-serif" }}
                >
                  Need help with volunteering, donations, or updating resources?
                  Fill out our Google form.
                </p>

                {/* Google Form Button */}
                <a
                  href="#link-to-google-form"
                  className="mt-4 bg-white text-black font-extrabold text-xl py-2 px-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition duration-300"
                >
                  GOOGLE FORM
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-2xl"
                  />
                </a>
              </motion.div>

              {/* Contact Form (2/3 width) */}
              <div className="flex flex-col items-end w-full md:w-2/3 pl-0 md:pl-5">
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative mt-0 w-full max-w-4xl min-h-[400px] p-6 rounded-[2.75vw] shadow-xl border-4 border-white"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 text-base rounded-xl bg-black text-white border-2 border-white placeholder-white"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 text-base rounded-xl bg-black text-white border-2 border-white placeholder-white"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject*"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 mb-4 text-base rounded-xl bg-black text-white border-2 border-white placeholder-white"
                  />
                  <textarea
                    name="message"
                    placeholder="Message*"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 min-h-[200px] mb-4 text-base rounded-xl bg-black text-white border-2 border-white placeholder-white"
                  ></textarea>

                  {/* Invisible reCAPTCHA */}
                  <div className="flex justify-center mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Leq-8gqAAAAACQaMzJwa7ucBiT_Z-YEKw3piAyq"
                      size="invisible"
                      badge="bottomright"
                      onChange={() => {}}
                    />
                  </div>
                </motion.form>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[100px] h-[45px] bg-[#267738] text-white text-base font-bold p-2 rounded-2xl hover:bg-green-600 flex items-center justify-center mt-4"
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="mr-2 text-2xl"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
