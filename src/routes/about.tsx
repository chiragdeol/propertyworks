import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SlideAboutPropertyWorks from "@/components/sections/SlideAboutPropertyWorks";
import SlideWhyChoose from "@/components/sections/SlideWhyChoose";
import SlideActiveDeveloperNetwork from "@/components/sections/SlideActiveDeveloperNetwork";
import ExitIntentModal from "@/components/ExitIntentModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PropertyWorks | Real Estate Intelligence & Advisory" },
      {
        name: "description",
        content:
          "Learn about PropertyWorks, a premium real estate intelligence and guided advisory firm helping residential and commercial buyers evaluate real estate objectively.",
      },
      { property: "og:title", content: "About PropertyWorks | Real Estate Intelligence & Advisory" },
      {
        property: "og:description",
        content:
          "Learn about PropertyWorks, a premium real estate intelligence and guided advisory firm helping residential and commercial buyers evaluate real estate objectively.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About PropertyWorks | Real Estate Intelligence & Advisory" },
      { name: "twitter:description", content: "Learn about PropertyWorks, a premium real estate intelligence and guided advisory firm." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/about" }
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
              "name": "About Us",
              "item": "https://www.propertyworks.in/about"
            }
          ]
        })
      }
    ]
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "About Us" }]} />
        </div>
      </div>

      <SlideAboutPropertyWorks />
      <SlideWhyChoose />
      <SlideActiveDeveloperNetwork />
      
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
