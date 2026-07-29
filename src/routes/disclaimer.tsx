import { createFileRoute } from "@tanstack/react-router";
import PolicyLayout from "@/components/PolicyLayout";
import PolicyContactSection from "@/components/PolicyContactSection";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | PropertyWorks" },
      {
        name: "description",
        content: "Read the PropertyWorks Disclaimer. Understand the limits of our real estate advisory, data intelligence comparisons, and coordinated property recommendations.",
      },
      { property: "og:title", content: "Disclaimer | PropertyWorks" },
      {
        property: "og:description",
        content: "Read the PropertyWorks Disclaimer. Understand the limits of our real estate advisory, data intelligence comparisons, and coordinated property recommendations.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/disclaimer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Disclaimer | PropertyWorks" },
      { name: "twitter:description", content: "Read the PropertyWorks Disclaimer." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/disclaimer" }
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
              "name": "Disclaimer",
              "item": "https://www.propertyworks.in/disclaimer"
            }
          ]
        })
      }
    ]
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <PolicyLayout title="Disclaimer" lastUpdated="June 24, 2026">
      <p className="text-slate-600 font-medium">
        PropertyWorks — Real Estate Intelligence & Advisory Services
      </p>
      
      <p>
        The information, content, materials, recommendations, and services provided on this website are intended solely for general informational and real estate evaluation purposes.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        1. General Information
      </h2>
      <p>
        PropertyWorks provides structured real estate intelligence, guided evaluation support, comparative analysis, project information, inventory coordination assistance, and practical advisory services to help residential and commercial buyers make more informed decisions.
      </p>
      <p>
        Nothing contained on this website should be interpreted as a guarantee, promise, or assurance regarding any property, project, developer, transaction, or investment outcome.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        2. No Investment Advice
      </h2>
      <p>
        PropertyWorks does not provide investment advisory services. Any information shared through this website, consultations, reports, recommendations, or communications should not be construed as investment, financial, wealth management, portfolio management, tax, legal, accounting, or lending advice.
      </p>
      <p>
        Users should independently consult qualified financial, legal, tax, or other professional advisors before making any real estate purchase or investment decision.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        3. Independent Verification Required
      </h2>
      <p>
        While PropertyWorks makes reasonable efforts to obtain information from sources believed to be reliable, users are solely responsible for independently verifying all aspects of any property or project, including but not limited to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Pricing and Payment plans</li>
        <li>Availability and unit configurations</li>
        <li>Carpet area and floor layout specifications</li>
        <li>Amenities and construction status</li>
        <li>Government approvals and RERA registrations</li>
        <li>Legal documentation and title verification</li>
        <li>Completion timelines and possession schedules</li>
        <li>Promotional schemes and developer benefits</li>
      </ul>
      <p>
        Final verification should always be conducted directly with the relevant developer or authorized representatives.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        4. No Guarantee of Investment Returns
      </h2>
      <p>
        PropertyWorks does not guarantee capital appreciation, rental income, future resale value, investment performance, occupancy rates, commercial success, business profitability, or future market movements.
      </p>
      <p>
        All real estate investments involve inherent risks, and market conditions may change over time.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        5. Recommendations Are Based on Stated Preferences
      </h2>
      <p>
        Where PropertyWorks provides project recommendations or shortlists, such recommendations are prepared based on information voluntarily shared by the client, including factors such as budget, preferred location, lifestyle requirements, family considerations, commercial objectives, connectivity preferences, Vastu preferences, orientation preferences, and investment goals.
      </p>
      <p>
        Recommendations represent an evaluation-oriented opinion and should not be interpreted as a guarantee that a particular property is the best or only suitable option.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        6. Vastu & Lifestyle Considerations
      </h2>
      <p>
        Where requested by clients, PropertyWorks may consider factors such as Vastu alignment, orientation preferences, natural lighting, wellness-focused living, family suitability, and township ecosystems.
      </p>
      <p>
        Such considerations are incorporated only as part of a broader evaluation framework and should not be regarded as technical, architectural, scientific, religious, or legal certification.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        7. Developer Information
      </h2>
      <p>
        References to developers, projects, brands, townships, or commercial establishments are made solely for informational and evaluation purposes. PropertyWorks does not claim ownership of third-party trademarks, logos, or brand names.
      </p>
      <p>
        Any association with developers or channel partner ecosystems does not imply endorsement of every project or guarantee of suitability for every buyer.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        8. Inventory Availability
      </h2>
      <p>
        Property availability is dynamic and may change without notice. Submission of an enquiry or receipt of a recommendation does not guarantee:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Unit availability</li>
        <li>Floor or configuration availability</li>
        <li>Pricing</li>
        <li>Promotional benefits or commercial terms</li>
        <li>Reservation rights</li>
      </ul>
      <p>
        Availability remains subject to confirmation by the respective developer or authorized representatives.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        9. Commercial Discussions
      </h2>
      <p>
        PropertyWorks may, where operationally feasible, assist in coordinating discussions relating to payment structures, developer promotions, inventory-linked opportunities, commercial feasibility, and transaction coordination.
      </p>
      <p>
        However, PropertyWorks does not guarantee discounts, negotiated pricing, promotional offers, special schemes, or approval of commercial requests. All such matters remain solely at the discretion of the respective developer or seller.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        10. Limitation of Liability
      </h2>
      <p>
        To the fullest extent permitted under applicable law, PropertyWorks shall not be liable for any direct, indirect, incidental, consequential, special, or economic loss arising from:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Reliance on website content</li>
        <li>Investment decisions or project selection</li>
        <li>Pricing changes or inventory changes</li>
        <li>Construction delays or possession schedules</li>
        <li>Regulatory actions or developer decisions</li>
        <li>Market fluctuations or transaction outcomes</li>
        <li>Financial losses</li>
      </ul>
      <p>
        Users acknowledge that all property decisions involve independent judgment and personal responsibility.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        11. Website Content
      </h2>
      <p>
        Although every reasonable effort is made to keep information accurate and current, PropertyWorks makes no warranties regarding the completeness, accuracy, reliability, timeliness, suitability, or availability of any information contained on this website. Content may be updated, modified, or removed without prior notice.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        12. External Links
      </h2>
      <p>
        This website may contain links to external websites operated by third parties. PropertyWorks does not control or assume responsibility for the content, privacy practices, services, or accuracy of information provided on such external websites. Accessing third-party websites is entirely at the user's own discretion and risk.
      </p>

      <PolicyContactSection description="For questions regarding this Disclaimer, please contact:" />
    </PolicyLayout>
  );
}
