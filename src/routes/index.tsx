import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/sections/SectionHero";
import SectionNoise from "@/components/sections/SectionNoise";
import SectionClarity from "@/components/sections/SectionClarity";
// import SectionProcess from "@/components/sections/SectionProcess";
import SectionResidential from "@/components/sections/SectionResidential";
import SectionCommercial from "@/components/sections/SectionCommercial";
import SectionFAQ from "@/components/sections/SectionFAQ";
import SectionContact from "@/components/sections/SectionContact";
import SlideContactUs from "@/components/sections/SlideContactUs";
import SlideAboutPropertyWorks from "@/components/sections/SlideAboutPropertyWorks";
import SlideOurServices from "@/components/sections/SlideOurServices";
import SlideWhyChoose from "@/components/sections/SlideWhyChoose";
import SlideActiveDeveloperNetwork from "@/components/sections/SlideActiveDeveloperNetwork";
import SlideTechnologyAdvisory from "@/components/sections/SlideTechnologyAdvisory";
import SlideYourJourney from "@/components/sections/SlideYourJourney";
// import SlideBetterDecisions from "@/components/sections/SlideBetterDecisions";
import SlideGuidedSiteVisits from "@/components/sections/SlideGuidedSiteVisits";
import SlideClientTestimonials from "@/components/sections/SlideClientTestimonials";
// import SlideThankYou from "@/components/sections/SlideThankYou";
import { p1 } from "@/components/sections/shared";
import SlideIndependentEvaluation from "@/components/sections/SlideIndependentEvaluation";
import ExitIntentModal from "@/components/ExitIntentModal";

export const Route = createFileRoute("/")({
  head: () => {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PropertyWorks",
      "url": "https://www.propertyworks.in",
      "logo": "https://www.propertyworks.in/images/logo-main.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98205-44427",
        "contactType": "customer service",
        "email": "stany.brahmane@gmail.com",
        "availableLanguage": ["English", "Hindi"]
      }
    };

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "PropertyWorks",
      "image": "https://www.propertyworks.in/images/logo-main.png",
      "@id": "https://www.propertyworks.in/#organization",
      "url": "https://www.propertyworks.in",
      "telephone": "+918433826365",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "N/A",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "N/A",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.0760,
        "longitude": 72.8777
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PropertyWorks",
      "url": "https://www.propertyworks.in"
    };

    return {
      meta: [
        { title: "PropertyWorks | Real Estate Intelligence & Advisory Services" },
        {
          name: "description",
          content: "PropertyWorks helps residential and commercial buyers evaluate real estate through structured comparison, guided advisory, project intelligence, and practical decision support."
        },
        { property: "og:title", content: "PropertyWorks | Real Estate Intelligence & Advisory Services" },
        {
          property: "og:description",
          content: "PropertyWorks helps residential and commercial buyers evaluate real estate through structured comparison, guided advisory, project intelligence, and practical decision support."
        },
        { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
        { property: "og:url", content: "https://www.propertyworks.in/" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "PropertyWorks | Real Estate Intelligence & Advisory Services" },
        { name: "twitter:description", content: "PropertyWorks helps residential and commercial buyers evaluate real estate through structured comparison, guided advisory, and project intelligence." },
        { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" }
      ],
      links: [
        { rel: "canonical", href: "https://www.propertyworks.in/" }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(orgSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(businessSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(websiteSchema)
        }
      ]
    };
  },
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <h1 className="sr-only">PropertyWorks — Real Estate Intelligence &amp; Advisory</h1>
      <Header />
      <SectionHero />
      <SectionNoise />
      <SectionClarity />
      {/* <SectionProcess /> */}
      <SectionResidential />
      <SectionCommercial />
      <SlideGuidedSiteVisits />
       <SlideOurServices />
       <SlideAboutPropertyWorks />
       <SlideWhyChoose />
       <SlideActiveDeveloperNetwork />
       <SlideIndependentEvaluation />
     
       <SlideTechnologyAdvisory />
       <SlideYourJourney />
     <SlideClientTestimonials />
      
 <SectionFAQ />
  {/* <SectionContact /> */}
      <SlideContactUs />
      
     
      
      {/* <SlideBetterDecisions /> */}

      
      {/* <SlideThankYou /> */}
     
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
