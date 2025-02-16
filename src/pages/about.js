import React from "react";
import ScrollArrow from "@/components/ScrollArrow";

const About = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="first"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/about-first.png')",
          backgroundSize: "100vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="second" />
        </div>
      </section>

      {/* Second Section */}
      <section
        id="second"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/about-second.png')",
          backgroundSize: "67vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="third" />
        </div>
      </section>

      {/* Third Section */}
      <section
        id="third"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/about-third.png')",
          backgroundSize: "70vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
      </section>
    </>
  );
};

export default About;
