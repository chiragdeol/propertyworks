import { createFileRoute } from "@tanstack/react-router";
import PolicyLayout from "@/components/PolicyLayout";
import PolicyContactSection from "@/components/PolicyContactSection";

export const Route = createFileRoute("/refund-cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy | PropertyWorks" },
      {
        name: "description",
        content:
          "Read the PropertyWorks Refund and Cancellation Policy. Understand the terms, conditions, and eligibility rules for our real estate advisory and property intelligence services.",
      },
      { property: "og:title", content: "Refund & Cancellation Policy | PropertyWorks" },
      {
        property: "og:description",
        content:
          "Read the PropertyWorks Refund and Cancellation Policy. Understand the terms, conditions, and eligibility rules for our real estate advisory and property intelligence services.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/refund-cancellation-policy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Refund & Cancellation Policy | PropertyWorks" },
      { name: "twitter:description", content: "Read the PropertyWorks Refund and Cancellation Policy." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/refund-cancellation-policy" }
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
              "name": "Refund & Cancellation Policy",
              "item": "https://www.propertyworks.in/refund-cancellation-policy"
            }
          ]
        })
      }
    ]
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund & Cancellation Policy" lastUpdated="June 29, 2026">
      <p className="text-slate-600 font-medium">
        Welcome to PropertyWorks.
      </p>
      
      <p>
        At PropertyWorks, we are committed to providing a transparent, professional, and client-focused real estate evaluation experience. This Refund & Cancellation Policy outlines the terms applicable to services offered through our website and advisory platform.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        1. Introduction
      </h2>
      <p>
        PropertyWorks provides evaluation assistance and property intelligence workflows. This policy is designed to help you understand refund eligibility, cancellation conditions, and payment protocols.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        2. Current Services
      </h2>
      <p>
        As of the Effective Date of this Policy, PropertyWorks primarily provides:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Guided real estate evaluation support</li>
        <li>Residential property intelligence</li>
        <li>Commercial property intelligence</li>
        <li>Project shortlisting assistance</li>
        <li>Comparative project evaluation support</li>
        <li>Inventory coordination assistance</li>
        <li>Site visit coordination support</li>
        <li>Technology-assisted recommendation workflows</li>
      </ul>
      <p className="mt-4">
        Many of these services are currently offered without any direct fee to the client, unless otherwise specifically communicated.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        3. Free Services
      </h2>
      <p>
        Where services are provided free of charge, including but not limited to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Free Residential Shortlists</li>
        <li>Free Commercial Shortlists</li>
        <li>Initial Consultations</li>
        <li>Preliminary Evaluation Guidance</li>
        <li>Project Coordination Assistance</li>
      </ul>
      <p className="mt-4">
        there are no payments collected and therefore no refunds are applicable.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        4. Future Paid Services
      </h2>
      <p>
        PropertyWorks may introduce paid services in the future, including but not limited to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Premium advisory consultations</li>
        <li>Detailed evaluation reports</li>
        <li>Specialized market intelligence reports</li>
        <li>Customized research services</li>
        <li>Strategic advisory engagements</li>
        <li>Other professional services</li>
      </ul>
      <p className="mt-4">
        Any payment terms applicable to such services will be communicated separately at the time of engagement.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        5. Cancellation of Advisory Appointments
      </h2>
      <p>
        Clients who schedule consultations or advisory discussions may request to cancel or reschedule their appointment by contacting PropertyWorks through the available communication channels.
      </p>
      <p>
        While we make reasonable efforts to accommodate rescheduling requests, appointment availability remains subject to operational scheduling.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        6. Refund Policy for Paid Services (If Introduced)
      </h2>
      <p>
        Where PropertyWorks introduces paid services in the future:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Refund eligibility, if any, will be governed by the specific service agreement applicable to that engagement.</li>
        <li>Refund requests will be evaluated on a case-by-case basis.</li>
        <li>Once advisory services have been substantially delivered or completed, refunds may not be available.</li>
        <li>Customized reports, research deliverables, and personalized advisory work may be non-refundable due to their tailored nature.</li>
        <li>The applicable refund terms, if any, will be clearly communicated before payment is accepted.</li>
      </ul>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        7. Third-Party Payments
      </h2>
      <p>
        PropertyWorks is not responsible for payments made directly to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Developers or Builders</li>
        <li>Financial institutions or Banks</li>
        <li>Legal consultants or representatives</li>
        <li>Government or regulatory authorities</li>
        <li>Third-party vendors or external providers</li>
      </ul>
      <p className="mt-4">
        Any refund or cancellation relating to such payments shall be governed solely by the policies of the respective third party.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        8. Transaction Coordination
      </h2>
      <p>
        Where PropertyWorks assists in coordinating project discussions or facilitating communication with developers or channel partners, such coordination does not constitute acceptance of responsibility for booking amounts, reservation fees, developer cancellations, project withdrawals, commercial disputes, or refunds offered by developers. Any refund related to developer transactions remains subject to the terms and conditions of the respective developer or seller.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        9. Right to Refuse or Cancel Services
      </h2>
      <p>
        PropertyWorks reserves the right to decline, suspend, or discontinue advisory services where necessary, including but not limited to situations involving misuse of services, false or misleading information, inappropriate conduct, abuse of staff or representatives, fraudulent activity, or legal/regulatory requirements. Where no payment has been collected, no refund obligations shall arise.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        10. Changes to This Policy
      </h2>
      <p>
        PropertyWorks reserves the right to modify or update this Refund & Cancellation Policy at any time. Updated versions will be published on this page together with the revised "Last Updated" date.
      </p>

      <PolicyContactSection description="For questions regarding this Refund & Cancellation Policy, please contact:" />
    </PolicyLayout>
  );
}
