import React from "react";
import ScrollArrow from "@/components/ScrollArrow";

const TumorGuide = () => {
  return (
    <>
      {/* First Section */}
      <section
        id="first"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tg-first.png')",
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
          backgroundImage: "url('/images/tg-second.png')",
          backgroundSize: "80vw",
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
          backgroundImage: "url('/images/tg-third.png')",
          backgroundSize: "90vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="fourth" />
        </div>
      </section>

      {/* Fourth Section */}
      <section
        id="fourth"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tg-fourth.png')",
          backgroundSize: "100vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="fifth" />
        </div>
      </section>

      {/* Fifth Section */}
      <section
        id="fifth"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tg-fifth.png')",
          backgroundSize: "70vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="sixth" />
        </div>
      </section>

      {/* Sixth Section */}
      <section
        id="sixth"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tg-sixth.png')",
          backgroundSize: "70vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute bottom-8 w-full flex justify-center items-center">
          <ScrollArrow to="seventh" />
        </div>
      </section>

       {/* Seventh Section */}
       <section
        id="seventh"
        className="relative w-full h-screen bg-cover bg-center bg-black"
        style={{ 
          backgroundImage: "url('/images/tg-seventh.png')",
          backgroundSize: "68vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center" 
        }}
      >
      </section>
    </>
  );
};

export default TumorGuide;
