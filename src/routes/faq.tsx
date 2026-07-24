import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionFAQ from "@/components/sections/SectionFAQ";
import ExitIntentModal from "@/components/ExitIntentModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | PropertyWorks" },
      {
        name: "description",
        content:
          "Find clear, structured, and data-backed answers to frequently asked questions about the PropertyWorks real estate advisory model, service fees, and property comparison reports.",
      },
      { property: "og:title", content: "Frequently Asked Questions | PropertyWorks" },
      {
        property: "og:description",
        content:
          "Find clear, structured, and data-backed answers to frequently asked questions about the PropertyWorks real estate advisory model, service fees, and property comparison reports.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/faq" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Frequently Asked Questions | PropertyWorks" },
      { name: "twitter:description", content: "Find answers regarding the PropertyWorks advisory model, processes, and service features." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/faq" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is PropertyWorks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "PropertyWorks is a Real Estate Intelligence & Advisory Services platform designed to simplify the residential and commercial property evaluation process. Instead of functioning like a traditional brokerage or listing portal, PropertyWorks helps buyers and investors make more structured, informed, and strategically aligned property decisions through guided evaluation, project intelligence, comparative analysis, and coordinated advisory support."
              }
            },
            {
              "@type": "Question",
              "name": "How is PropertyWorks different from traditional brokers or property portals?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional property platforms usually focus on listing inventory, generating leads, and promoting projects. PropertyWorks focuses on understanding your actual requirements, evaluating alignment between your priorities and available projects, simplifying comparison complexity, coordinating inventory validation, and helping you make clearer and more confident decisions."
              }
            },
            {
              "@type": "Question",
              "name": "Does PropertyWorks charge buyers for property evaluation assistance?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Currently, PropertyWorks offers guided evaluation assistance and shortlisted recommendations at no direct cost to buyers for eligible residential and commercial opportunities."
              }
            },
            {
              "@type": "Question",
              "name": "Does PropertyWorks directly sell properties?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. PropertyWorks does not function as a direct property seller or developer. We operate as a guided intelligence and advisory platform coordinating with developers, channel partner networks, and project teams to help prospects evaluate suitable opportunities more effectively."
              }
            },
            {
              "@type": "Question",
              "name": "How does the PropertyWorks evaluation process work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The evaluation journey starts with requirements sharing. PropertyWorks analyzes budget, location, family needs, lifestyle, Vastu considerations, and investment objectives. Suitable projects are identified, developer inventory availability is checked, and a structured recommendation shortlist is shared with the prospect, followed by guided site visit coordination."
              }
            }
          ]
        })
      },
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
              "name": "FAQ",
              "item": "https://www.propertyworks.in/faq"
            }
          ]
        })
      }
    ]
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
        </div>
      </div>

      <SectionFAQ />
      
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
