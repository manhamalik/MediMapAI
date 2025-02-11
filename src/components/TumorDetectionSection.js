import React, { useRef } from "react";
import ScrollArrow from "@/components/ScrollArrow";
import { Link as ScrollLink } from "react-scroll";
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/potta-one";
import { motion, useInView } from "framer-motion";

// Dummy navigate function (replace with your own navigation logic)
const navigate = (url) => {
  window.location.href = url;
};

const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="tumordetection"
      className="bg-[#000] text-white min-h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden overflow-x-hidden"
    >
      <div>
        {/* Lighter green square on right with drop shadow */}
        <div
          className="absolute top-0 right-0 h-full bg-[#03657F] rounded-tl-[160px] rounded-bl-[100px]"
          style={{
            zIndex: 0,
            width: "30.5%",
            boxShadow: "-25px 1px 2px 0 rgba(0, 0, 0, 0.3)",
          }}
        ></div>

        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center gap-4 relative z-10">
          {/* Text Content */}
          <div className="md:w-[80%] lg:w-[50%] w-full z-10 flex flex-col justify-center items-center text-center h-full pl-16">
            {/* Title */}
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: "900",
                fontSize: "94px",
                lineHeight: "1.1",
                whiteSpace: "nowrap",
                textShadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              TUMOR DETECTION
            </h2>

            {/* Paragraph */}
            <motion.p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{
                fontFamily: "'Noto Sans Multani', sans-serif",
                fontWeight: "400",
                fontSize: "22px",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Our mission is to stand with communities affected by the Los Angeles wildfires. We’re here to make it easier to find the resources, support, and opportunities needed to recover and rebuild. Whether it’s through donations, volunteering, or simply offering a helping hand, we believe in the power of coming together to make a real difference.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Using ScrollLink to scroll to the section with id "map" */}
              <ScrollLink to="map" smooth={true} duration={500} offset={-70}>
                <motion.button
                  className="bg-white text-[#183917] font-bold py-3 px-8 rounded-full border-2 border-white hover:bg-[#183917] hover:text-white hover:border-white transition-all duration-300 cursor-pointer"
                  style={{
                    fontFamily: "'Noto Sans Multani', sans-serif",
                    fontSize: "20px",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EXPLORE RESOURCES
                </motion.button>
              </ScrollLink>

              <motion.button
                className="bg-transparent border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-900 transition-all duration-300"
                style={{
                  fontFamily: "'Noto Sans Multani', sans-serif",
                  fontSize: "20px",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
              >
                GET SUPPORT
              </motion.button>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="md:w-[55%] relative h-full pr-8">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src="/images/mission-graphic.png"
                alt="Support graphic"
                className="w-[73%] h-auto"
              />
            </motion.div>
            {/* Vertical Texts */}
            <motion.div
              className="absolute top-[16vw] transform -translate-y-[14vw] right-[-3rem] text-green-100 font-extrabold z-20"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: "900",
                fontSize: "105px",
                letterSpacing: "normal",
                color: "#ffffff",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
              }}
              initial={{ x: 150, opacity: 0, rotate: -90 }}
              whileInView={{ x: 0, opacity: 1, rotate: -90 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              TRACKER
            </motion.div>

            <motion.div
              className="absolute top-[16vw] transform -translate-y-[16vw] right-[-8.7rem] text-green-100 font-extrabold z-10"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: "900",
                fontSize: "105px",
                letterSpacing: "normal",
                WebkitTextStroke: "1px #ffffff",
                color: "transparent",
              }}
              initial={{ x: 200, opacity: 0, rotate: -90 }}
              whileInView={{ x: 0, opacity: 1, rotate: -90 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              TRACKER
            </motion.div>
          </div>
        </div>
        <ScrollArrow to="tumorguide" />
      </div>
    </section>
  );
};

export default MissionSection;
