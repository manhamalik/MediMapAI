import React from "react";
import ScrollArrow from "@/components/ScrollArrow";

const Tracker = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="first"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tracker-first.png')",
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
          backgroundImage: "url('/images/third-section.png')",
          backgroundSize: "75vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
      </section>
    </>
  );
};

export default Tracker;
