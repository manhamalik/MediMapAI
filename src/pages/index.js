import React, { useState, useEffect, lazy, Suspense, startTransition} from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import ScrollArrow from "@/components/ScrollArrow";
import Dropdown from "@/components/Dropdown";
import { Link } from "react-scroll";
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/potta-one";
import { filterResources } from "../components/filter";
import { motion, useInView } from "framer-motion";
const TrackerSection = lazy(() => import("@/components/TrackerSection"));
const UseCaseSection = lazy(() => import("@/components/UseCaseSection"));
const TumorDetectionSection = lazy(() => import("@/components/TumorDetectionSection"));
const TumorGuideSection = lazy(() => import("@/components/TumorGuideSection"));

export default function Home() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [visibleResources, setVisibleResources] = useState(4);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
    setVisibleResources(4); // Reset visible resources to initial value
  };

  const handleSubCategoryClick = (mainCategory, subCategory) => {
    setSelectedSubCategories((prevSelectedSubCategories) => {
      const subCategoriesForCategory =
        prevSelectedSubCategories[mainCategory] || [];
      const updatedSubCategories = subCategoriesForCategory.includes(
        subCategory
      )
        ? subCategoriesForCategory.filter((sc) => sc !== subCategory) // Remove if clicked again
        : [...subCategoriesForCategory, subCategory]; // Add if not already selected
      return {
        ...prevSelectedSubCategories,
        [mainCategory]: updatedSubCategories,
      };
    });

    setVisibleResources(4); // Reset visible resources to initial value
  };

  const clearDateSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/api/resource-list");
        const data = await response.json();

        startTransition(() => {
          setResources(data);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching resources:", error);
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchResources();
  }, []);
  
  const filterResourcesByCategory = (mainCategory) => {
    if (!resources || resources.length === 0) return [];
    return filterResources(
      resources,
      mainCategory,
      selectedSubCategories[mainCategory] || [],
      searchInput,
      startDate,
      endDate
    ).slice(0, visibleResources);
  };
  
  const handleShowMore = () => {
    setVisibleResources((prevVisibleResources) => prevVisibleResources + 12);
  };

  const numberOfRows = Math.ceil(visibleResources / 4);

  const essentialsResources = filterResources(
    resources,
    "Essentials",
    selectedSubCategories["Essentials"] || [],
    searchInput,
    startDate,
    endDate
  ).slice(0, visibleResources);
  
  const shelterResources = filterResources(
    resources,
    "Shelter & Support Services",
    selectedSubCategories["Shelter & Support Services"] || [],
    searchInput,
    startDate,
    endDate
  ).slice(0, visibleResources);
  
  const medicalResources = filterResources(
    resources,
    "Medical & Health",
    selectedSubCategories["Medical & Health"] || [],
    searchInput,
    startDate,
    endDate
  ).slice(0, visibleResources);
  
  const animalResources = filterResources(
    resources,
    "Animal Support",
    selectedSubCategories["Animal Support"] || [],
    searchInput,
    startDate,
    endDate
  ).slice(0, visibleResources);
  
  
  // if (loading) return <p>Loading resources...</p>;
  // if (!resources || resources.length === 0) return <p>No resources available.</p>;

    const deduplicateResources = (resources) => {
      return Array.from(new Map(resources.map((r) => [r.id, r])).values());
    };
	
  return (
    <Suspense>
      <div className="relative">
        <Head>
          <title>LA Relief - Discover Aid Near You</title>
          <meta
            name="description"
            content="Find aid and resources near you for emergencies and support."
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Tilt+Warp:wght@400;700&family=Noto+Sans:wght@700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=Noto+Sans:wght@400;800&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>

       {/* Hero Section */}
       <div
          id="hero"
          className="absolute inset-0 bg-cover bg-center h-screen z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        >
          {" "}
          {/* <div className="absolute inset-0 bg-black opacity-40 z-0"></div> */}
        </div>

        {/* Navigation Bar */}
        <NavBar />

        {/* Landing Section */}
        <div
          className="flex flex-col justify-center items-center text-center text-white relative z-10"
          style={{ height: "calc(100vh - 5.14rem)" }} // Adjust for navbar height
        >
          {/* <h1
            className="text-6xl md:text-8xl mb-9"
            style={{
              fontFamily: "'Tilt Warp', sans-serif",
              textShadow: "0px 11.36px 11.36px rgba(0, 0, 0, 0.15)",
            }}
          >
            Discover Aid Near You
          </h1> */}

          {/* <Link
            to="map"
            className="flex justify-center items-center border border-white text-white hover:text-black hover:bg-white transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: "'Noto Sans Multani', sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
              borderRadius: "22px",
              padding: "10px 22px",
              borderWidth: "2px",
            }}
            spy={true}
            smooth={true}
            duration={500}
          >
            EXPLORE RESOURCES
          </Link> */}
          <div className="absolute bottom-8 w-full flex justify-center items-center">
            {/* Scroll Arrow Component */}
            <ScrollArrow to="tracker" />
          </div>
        </div>

        {/* Mission Section */}
        <TrackerSection />

 {/* Mission Section */}
 <UseCaseSection />

  {/* Mission Section */}
  <TumorDetectionSection />

   {/* Mission Section */}
   <TumorGuideSection />

{/* FAQ Section */}
<section id="faqs" className="bg-[#183917] py-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    {/* Section Header */}
    <h2 className="relative text-center">
  {/* Stroke/Outline Layer */}
  <span
    className="absolute inset-0 text-center"
    style={{
      fontFamily: "'Noto Sans', sans-serif",
      fontWeight: "900",
      fontSize: "5.5rem",
      top: "-0.25rem", // Slight offset upwards
      left: "-0.75rem", // Slight offset to the left
      color: "transparent",
      WebkitTextStroke: "1px #ffffff",
    }}
  >
    FAQs
  </span>

  {/* Main Filled Layer */}
  <span
    className="relative text-white"
    style={{
      fontFamily: "'Noto Sans', sans-serif",
      fontWeight: "900",
      fontSize: "5.5rem",
      textShadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
    }}
  >
    FAQs
  </span>
</h2>

    {/* FAQ Dropdowns */}
    <div className="space-y-4">
      <Dropdown
        title="How can I volunteer or contribute?"
        content="You can explore volunteer opportunities and donation needs by navigating through the interactive map or selecting the 'Volunteer Opportunities' or 'Donations Needed' buttons on the website. Additionally, you can click the 'Volunteer' or 'Donate' buttons in the navigation bar to visit dedicated pages and explore available opportunities or postings."
      />
      <Dropdown
        title="What types of donations are accepted?"
        content="We accept various types of donations, such as food, hygiene supplies, medical items, and pet supplies. Specific donation needs can be found under the 'Donations Needed' tab on the map and on the Donations page."
      />
      <Dropdown
        title="How do I find resources or assistance near me?"
        content="You can enter your address in the map's search bar to view nearby resources, shelters, and services. From there, you can explore by categories such as Essentials, Shelter & Support Services, Medical & Health, or Animal Support."
      />
      <Dropdown
        title="What should I do in case of a wildfire evacuation?"
        content="Follow designated evacuation routes and instructions from authorities. Bring essential documents, medications, and emergency supplies. Secure your home by locking doors and turning off utilities if time permits. Check on neighbors and assist those in need. Stay informed through updates from local emergency services."
      />
      <Dropdown
        title="How do I contact you to add information or organizations to the website?"
        content="If you would like to contribute information, suggest an organization, or report updates, please use the contact form on the 'Contact Us' page or email us directly."
      />
      <Dropdown
        title="How often is the map and resource list updated?"
        content="The map and resource list are updated daily to reflect the latest information about resources, donations, and volunteer needs."
      />
      <Dropdown
        title="Can I collaborate with LARelief to list my organization’s opportunities?"
        content="Absolutely! Use the Google Form on the Contact page to share your organization’s details, volunteer opportunities, or donation requests. Our team will review and add it to the platform."
      />
    </div>
  </div>
</section>
    </div>
    </Suspense>
  );
}