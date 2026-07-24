import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SlideContactUs from "@/components/sections/SlideContactUs";
import ExitIntentModal from "@/components/ExitIntentModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PropertyWorks" },
      {
        name: "description",
        content:
          "Get in touch with PropertyWorks for a free residential or commercial real estate consultation, and receive a customized Property Intelligence Report.",
      },
      { property: "og:title", content: "Contact PropertyWorks" },
      {
        property: "og:description",
        content:
          "Get in touch with PropertyWorks for a free residential or commercial real estate consultation, and receive a customized Property Intelligence Report.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact PropertyWorks" },
      { name: "twitter:description", content: "Get in touch with PropertyWorks for a free residential or commercial consultation." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/contact" }
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
              "name": "Contact Us",
              "item": "https://www.propertyworks.in/contact"
            }
          ]
        })
      }
    ]
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />
        </div>
      </div>

      <div className="py-6 bg-slate-50/50">
        <SlideContactUs />
      </div>
      
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
