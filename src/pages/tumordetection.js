import React from "react";
import ScrollArrow from "@/components/ScrollArrow";

const TumorDetection = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="first"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/td-first.png')",
          backgroundSize: "90vw",
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
          backgroundImage: "url('/images/fifth-section.png')",
          backgroundSize: "85vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
      </section>
    </>
  );
};

export default TumorDetection;
