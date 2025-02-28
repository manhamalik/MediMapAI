import React, { useState } from "react";
import Link from "next/link";

const HoverSection = ({ children, buttonText, href }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: "black",
          opacity: hovered ? 0.5 : 0,
          pointerEvents: "none",
        }}
      ></div>
      
      <Link href={href}>
        <button
          className={`absolute transition-all duration-300 text-white border-2 border-[#5EDEF4] rounded-[25px] px-8 py-4 text-[2.25rem] shadow-[0_0_5px_#5EDEF4] 
          ${hovered ? "translate-x-[-50%] translate-y-[-50%] rotate-[-10deg] opacity-100 bg-black hover:bg-cyan-500" : "translate-x-[150%] translate-y-[-50%] rotate-[-10deg] opacity-0"}`}
          style={{
            top: "50%",
            left: "50%",
            fontFamily: "Tilt Warp, sans-serif",
          }}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default HoverSection;
