import { createFileRoute } from "@tanstack/react-router";
import PolicyLayout from "@/components/PolicyLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | PropertyWorks" },
      {
        name: "description",
        content: "Read the PropertyWorks Privacy Policy. Learn how we collect, process, secure, and protect your personal information and real estate requirements.",
      },
      { property: "og:title", content: "Privacy Policy | PropertyWorks" },
      {
        property: "og:description",
        content: "Read the PropertyWorks Privacy Policy. Learn how we collect, process, secure, and protect your personal information and real estate requirements.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/privacy-policy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy | PropertyWorks" },
      { name: "twitter:description", content: "Read the PropertyWorks Privacy Policy." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/privacy-policy" }
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
              "name": "Privacy Policy",
              "item": "https://www.propertyworks.in/privacy-policy"
            }
          ]
        })
      }
    ]
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="June 24, 2026">
      <p className="text-slate-600 font-medium">
        Welcome to PropertyWorks (“PropertyWorks”, “we”, “our”, or “us”).
      </p>
      
      <p>
        PropertyWorks is committed to respecting your privacy and protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, submit enquiries, request property shortlists, communicate with us through WhatsApp or other channels, or otherwise interact with our services.
      </p>
      
      <p>
        By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        1. Introduction
      </h2>
      <p>
        We respect the privacy of our website visitors and clients. This policy is designed to help you understand what data we collect, why we collect it, and what we do with it. Your trust is important to us, and we are committed to safeguarding your personal data.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        2. Information We Collect
      </h2>
      <p>
        Depending on your interaction with PropertyWorks, we may collect information including but not limited to:
      </p>
      
      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">Personal Information</h3>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Full Name</li>
        <li>Mobile Number</li>
        <li>Email Address</li>
        <li>City or Preferred Location</li>
        <li>Residential or Commercial Property Preferences</li>
        <li>Budget Range</li>
        <li>Preferred Micro-Markets</li>
        <li>Investment Objectives</li>
        <li>Lifestyle Preferences</li>
        <li>Vastu or Orientation Preferences (where voluntarily shared)</li>
        <li>Business or Commercial Requirements (where applicable)</li>
      </ul>

      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">Technical Information</h3>
      <p>
        When you browse our website, certain technical information may also be collected automatically, including:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>IP Address</li>
        <li>Browser Type</li>
        <li>Device Information</li>
        <li>Operating System</li>
        <li>Pages Visited</li>
        <li>Referral Source</li>
        <li>Date and Time of Visit</li>
        <li>General Website Usage Statistics</li>
      </ul>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        3. How We Collect Information
      </h2>
      <p>
        Information may be collected through:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Contact forms</li>
        <li>Residential shortlist forms</li>
        <li>Commercial shortlist forms</li>
        <li>WhatsApp conversations</li>
        <li>Email communications</li>
        <li>Telephone enquiries</li>
        <li>Newsletter or subscription forms (if applicable)</li>
        <li>Cookies and website analytics technologies</li>
        <li>Voluntary information provided during consultations</li>
      </ul>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        4. How We Use Your Information
      </h2>
      <p>
        PropertyWorks may use your information for purposes including:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Understanding your property requirements</li>
        <li>Providing guided evaluation support</li>
        <li>Preparing project recommendations</li>
        <li>Coordinating project information</li>
        <li>Assisting with inventory-related enquiries</li>
        <li>Scheduling consultations or callbacks</li>
        <li>Responding to enquiries</li>
        <li>Improving website functionality</li>
        <li>Enhancing user experience</li>
        <li>Internal analytics and service improvement</li>
        <li>Sending relevant service-related communications where appropriate</li>
      </ul>
      <p>
        We use information only for legitimate business purposes connected with our advisory and evaluation services.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        5. Information Sharing
      </h2>
      <p>
        PropertyWorks does not sell personal information to third parties.
      </p>
      <p>
        Where operationally necessary, limited information may be shared with:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Developer representatives</li>
        <li>Channel partner teams</li>
        <li>Project coordination teams</li>
        <li>Technology service providers</li>
        <li>Website hosting providers</li>
        <li>Communication service providers</li>
        <li>Professional advisors where legally required</li>
      </ul>
      <p>
        Such sharing is undertaken only where reasonably necessary to facilitate the evaluation process or operate our services.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        6. Data Security
      </h2>
      <p>
        We take commercially reasonable measures to protect personal information against unauthorized access, misuse, disclosure, alteration, or destruction.
      </p>
      <p>
        While we implement appropriate safeguards, no method of electronic storage or internet transmission can be guaranteed to be completely secure. Accordingly, PropertyWorks cannot guarantee absolute security of information transmitted electronically.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        7. Cookies and Analytics
      </h2>
      <p>
        Our website may use cookies and similar technologies to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Improve website performance</li>
        <li>Understand visitor behaviour</li>
        <li>Measure traffic patterns</li>
        <li>Enhance user experience</li>
        <li>Support website analytics</li>
      </ul>
      <p>
        Users may choose to disable cookies through their browser settings, although certain website functionality may be affected.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        8. Third-Party Links
      </h2>
      <p>
        Our website may contain links to third-party websites, developer websites, partner websites, or external resources. PropertyWorks is not responsible for the privacy practices, content, or policies of external websites. Users are encouraged to review the privacy policies of any third-party websites they visit.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        9. Data Retention
      </h2>
      <p>
        We retain personal information only for as long as reasonably necessary to:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Provide requested services</li>
        <li>Maintain business records</li>
        <li>Comply with legal obligations</li>
        <li>Resolve disputes</li>
        <li>Improve service delivery</li>
      </ul>
      <p>
        Retention periods may vary depending on the nature of the enquiry and applicable legal requirements.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        10. Your Rights
      </h2>
      <p>
        Subject to applicable law, you may request:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Access to your personal information</li>
        <li>Correction of inaccurate information</li>
        <li>Updating of your information</li>
        <li>Withdrawal of certain communications</li>
        <li>Deletion of information where legally permissible</li>
      </ul>
      <p>
        Requests may be submitted using the contact details provided below.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        11. Children's Privacy
      </h2>
      <p>
        PropertyWorks services are intended for adults involved in residential or commercial property evaluation. We do not knowingly collect personal information from children under the age permitted by applicable law without appropriate authorization.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        12. Changes to This Privacy Policy
      </h2>
      <p>
        PropertyWorks reserves the right to modify or update this Privacy Policy at any time. Updated versions will be published on this page with the revised effective date. Users are encouraged to periodically review this Privacy Policy.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        13. Contact Us
      </h2>
      <p>
        For questions regarding this Privacy Policy or requests relating to your personal information, please contact:
      </p>
      <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-xl p-6 mt-4 space-y-2 font-medium text-slate-700">
        <p className="font-bold text-primary">PropertyWorks</p>
        <p className="text-xs text-slate-500 uppercase tracking-wider">Real Estate Intelligence & Advisory Services</p>
        <p>Email: <a href="mailto:support@PropertyWorks.in" className="text-gold hover:underline">support@PropertyWorks.in</a></p>
        <p>Phone: +91 98205 44427</p>
        <p>Website: <a href="https://www.propertyworks.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.propertyworks.in</a></p>
      </div>
    </PolicyLayout>
  );
}
