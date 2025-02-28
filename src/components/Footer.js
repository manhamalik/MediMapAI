import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">
          <div className="hidden select-none w-56 sm:block">
            <Image
              src="/images/new-logo.png"
              alt="LARelief"
              width={261}
              height={80}
            />
          </div>
          <div className="block select-none w-36 h-6 sm:hidden">
            <Image
              src="/images/new-logo.png"
              alt="MediMap AI"
              width={261}
              height={80}
            />
          </div>
        </div>
        <div className="social-icon-wrapper">
          <Link
            href="mailto:contact.medimapai@gmail.com"
            passHref
            legacyBehavior
          >
            <a aria-label="Email link" target="_blank">
              <div className="social-icon">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: "1.75rem", margin: "0px" }}
                />
              </div>
            </a>
          </Link>
        </div>
        <span className="footer-text select-none">
          2025 © MediMapAI.
          <br /> All rights reserved.
        </span>
      </div>
      <style jsx>{`
        .footer {
          background-color: #000;
          padding: 28px;
          text-align: center;
          font-family: "Noto Sans Multani", sans-serif;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .social-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .social-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 55px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s ease-out;
        }
        .social-icon:hover {
          transform: scale(1.1);
        }
        .footer-text {
          font-weight: 700;
          font-size: 22px;
          color: white;
          line-height: 1.2;
        }
        /* Desktop layout: three columns using grid */
        @media (min-width: 769px) {
          .footer-content {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }
          .logo {
            justify-self: start;
          }
          .social-icon-wrapper {
            justify-self: center;
          }
          .footer-text {
            justify-self: end;
          }
        }
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }
          .footer-text {
            font-size: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
