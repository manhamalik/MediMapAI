import "@/styles/globals.css";
import { Noto_Sans_Multani } from "next/font/google"; // Import Noto Sans Multani
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";

const notoSansMultani = Noto_Sans_Multani({
  subsets: ["latin"],
  weight: ["400"],
}); // Import Noto Sans Multani

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Any router-based logic can be added here if needed
  }, [router.isReady]);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${notoSansMultani.style.fontFamily}, sans-serif;
        }
      `}</style>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
