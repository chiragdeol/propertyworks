import { createFileRoute } from "@tanstack/react-router";
import PolicyLayout from "@/components/PolicyLayout";
import PolicyContactSection from "@/components/PolicyContactSection";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | PropertyWorks" },
      {
        name: "description",
        content: "Review the PropertyWorks Terms and Conditions. Understand the rules, obligations, and legal agreements for utilizing our property advisory services.",
      },
      { property: "og:title", content: "Terms & Conditions | PropertyWorks" },
      {
        property: "og:description",
        content: "Review the PropertyWorks Terms and Conditions. Understand the rules, obligations, and legal agreements for utilizing our property advisory services.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/terms-and-conditions" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Terms & Conditions | PropertyWorks" },
      { name: "twitter:description", content: "Review the PropertyWorks Terms and Conditions." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/terms-and-conditions" }
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
              "name": "Terms & Conditions",
              "item": "https://www.propertyworks.in/terms-and-conditions"
            }
          ]
        })
      }
    ]
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="June 24, 2026">
      <p className="text-slate-600 font-medium">
        Welcome to PropertyWorks.
      </p>
      
      <p>
        These Terms & Conditions ("Terms") govern your access to and use of the PropertyWorks website, services, forms, communications, and related platforms.
      </p>
      
      <p>
        By accessing or using this website, submitting information, requesting property recommendations, or interacting with PropertyWorks in any manner, you agree to be bound by these Terms. If you do not agree with these Terms, you should discontinue use of the website and services.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        1. Acceptance of Terms
      </h2>
      <p>
        By using our website, you signify your acceptance of these Terms. PropertyWorks reserves the right to modify these terms at any time. Your continued use of the website following any changes indicates your agreement to be bound by the modified terms.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        2. About PropertyWorks
      </h2>
      <p>
        PropertyWorks provides Real Estate Intelligence & Advisory Services designed to assist residential and commercial buyers in evaluating property opportunities through structured guidance, project intelligence, comparative analysis, inventory coordination assistance, and technology-assisted recommendation workflows.
      </p>
      <p>
        PropertyWorks is not intended to function solely as a property listing platform or advertising portal.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        3. Nature of Services
      </h2>
      <p>
        PropertyWorks aims to simplify the property evaluation process by providing guidance and structured support. Services may include:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Residential property evaluation support</li>
        <li>Commercial property evaluation support</li>
        <li>Guided project shortlisting</li>
        <li>Comparative project analysis</li>
        <li>Inventory coordination assistance</li>
        <li>Site visit coordination</li>
        <li>Vastu and lifestyle-oriented evaluation support</li>
        <li>Technology-assisted recommendation workflows</li>
        <li>Practical decision support</li>
      </ul>
      <p>
        The availability and scope of services may vary depending on project availability and operational considerations.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        4. No Investment, Financial or Legal Advice
      </h2>
      <p>
        Information provided by PropertyWorks is intended solely for informational and evaluation purposes. Nothing contained on this website or communicated by PropertyWorks shall constitute:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Investment advice</li>
        <li>Financial advice</li>
        <li>Tax advice</li>
        <li>Legal advice</li>
        <li>Accounting advice</li>
        <li>Architectural certification</li>
        <li>Structural certification</li>
        <li>Regulatory approval confirmation</li>
      </ul>
      <p>
        Users are encouraged to independently consult qualified professionals before making any real estate transaction or investment decision.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        5. Property Information
      </h2>
      <p>
        Information relating to projects, developers, inventory, pricing, specifications, amenities, layouts, approvals, timelines, payment structures, or promotional offers may change without prior notice.
      </p>
      <p>
        While PropertyWorks makes reasonable efforts to present accurate information, we do not guarantee that such information is complete, current, or error-free. Users should independently verify all project details directly with the relevant developer or authorized representatives.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        6. No Guarantee of Availability
      </h2>
      <p>
        Property availability is dynamic. Submission of an enquiry, request for a shortlist, or consultation with PropertyWorks does not guarantee:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Inventory availability</li>
        <li>Unit reservation</li>
        <li>Pricing</li>
        <li>Payment terms</li>
        <li>Floor availability</li>
        <li>Orientation availability</li>
        <li>Developer offers</li>
        <li>Promotional schemes</li>
      </ul>
      <p>
        Availability remains subject to confirmation by the respective developer or authorized representatives.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        7. Commercial Discussions
      </h2>
      <p>
        Where operationally feasible, PropertyWorks may facilitate discussions relating to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Payment structures</li>
        <li>Developer promotions</li>
        <li>Inventory-linked opportunities</li>
        <li>Transaction coordination</li>
      </ul>
      <p>
        However, PropertyWorks does not guarantee discounts, negotiated pricing, commercial benefits, promotional eligibility, or transaction approval. Final commercial terms remain solely at the discretion of the respective developer or seller.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        8. User Responsibilities
      </h2>
      <p>
        Users agree that information submitted through the website shall be accurate, truthful, current, and complete.
      </p>
      <p>
        Users agree not to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Submit misleading information</li>
        <li>Attempt unauthorized access to website systems</li>
        <li>Introduce malicious software</li>
        <li>Interfere with website operations</li>
        <li>Misuse forms or communication channels</li>
        <li>Copy or reproduce website content without authorization</li>
      </ul>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        9. Intellectual Property
      </h2>
      <p>
        Unless otherwise stated, all content available on this website, including but not limited to text, branding, logos, graphics, icons, layouts, images, illustrations, design elements, reports, evaluation frameworks, and website structure, is the intellectual property of PropertyWorks and is protected under applicable copyright and intellectual property laws.
      </p>
      <p>
        No material may be copied, reproduced, distributed, modified, republished, or commercially exploited without prior written permission from PropertyWorks.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        10. Third-Party Content
      </h2>
      <p>
        The website may reference developers, projects, external resources, or third-party websites. Such references do not constitute endorsement or guarantee. PropertyWorks is not responsible for the content, policies, accuracy, or practices of third-party websites or organizations.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        11. Limitation of Liability
      </h2>
      <p>
        To the fullest extent permitted by applicable law, PropertyWorks shall not be liable for investment losses, business losses, opportunity costs, project delays, pricing changes, developer decisions, regulatory actions, construction timelines, approval-related issues, or financial consequences arising from reliance on website information.
      </p>
      <p>
        Users acknowledge that all real estate decisions involve independent judgment and risk.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        12. Privacy
      </h2>
      <p>
        Collection and use of personal information are governed by the PropertyWorks Privacy Policy. By using the website, users consent to the collection and processing of information as described in that policy.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        13. Website Availability
      </h2>
      <p>
        PropertyWorks does not guarantee uninterrupted access to the website. The website may be modified, suspended, updated, or temporarily unavailable without prior notice for maintenance, upgrades, or operational reasons.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        14. Changes to Services
      </h2>
      <p>
        PropertyWorks reserves the right to modify services, update evaluation processes, change workflows, add or discontinue features, and revise website content without prior notice.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        15. Amendments to These Terms
      </h2>
      <p>
        These Terms & Conditions may be updated periodically. Revised versions become effective upon publication on the website. Continued use of the website constitutes acceptance of the updated Terms.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        16. Governing Law
      </h2>
      <p>
        These Terms shall be governed and interpreted in accordance with the laws of India.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        17. Jurisdiction
      </h2>
      <p>
        Any disputes arising from the use of this website or PropertyWorks services shall be subject to the exclusive jurisdiction of the competent courts located in Mumbai, Maharashtra, India.
      </p>

      <PolicyContactSection description="For questions regarding these Terms and Conditions, please contact:" />
    </PolicyLayout>
  );
}
