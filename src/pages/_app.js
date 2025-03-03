import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

config.autoAddCss = false;
library.add(faXTwitter, faInstagram, faEnvelope);

import "@/styles/globals.css";
import { Noto_Sans_Multani } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider

const notoSansMultani = Noto_Sans_Multani({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Any router-based logic can be added here if needed
  }, [router.isReady]);

  return (
    <AuthProvider>
      <style jsx global>{`
        html {
          font-family: ${notoSansMultani.style.fontFamily}, sans-serif;
        }
      `}</style>
      <NavBar />
      <Chatbot />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  );
}
