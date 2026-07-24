import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SlideOurServices from "@/components/sections/SlideOurServices";
import SectionResidential from "@/components/sections/SectionResidential";
import SectionCommercial from "@/components/sections/SectionCommercial";
import SlideGuidedSiteVisits from "@/components/sections/SlideGuidedSiteVisits";
import SlideTechnologyAdvisory from "@/components/sections/SlideTechnologyAdvisory";
import ExitIntentModal from "@/components/ExitIntentModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | PropertyWorks" },
      {
        name: "description",
        content:
          "Discover our property intelligence and guided advisory services, including residential comparison, commercial evaluation, guided site visits, and data-backed reports.",
      },
      { property: "og:title", content: "Our Services | PropertyWorks" },
      {
        property: "og:description",
        content:
          "Discover our property intelligence and guided advisory services, including residential comparison, commercial evaluation, guided site visits, and data-backed reports.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Services | PropertyWorks" },
      { name: "twitter:description", content: "Discover our property intelligence and guided advisory services." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/services" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.propertyworks.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Our Services",
              "item": "https://www.propertyworks.in/services"
            }
          ]
        })
      }
    ]
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Our Services" }]} />
        </div>
      </div>

      <SlideOurServices />
      <SectionResidential />
      <SectionCommercial />
      <SlideGuidedSiteVisits />
      <SlideTechnologyAdvisory />
      
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
