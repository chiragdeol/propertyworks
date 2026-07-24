import { createFileRoute } from "@tanstack/react-router";
import PolicyLayout from "@/components/PolicyLayout";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | PropertyWorks" },
      {
        name: "description",
        content: "Read the PropertyWorks Cookie Policy to learn how our website uses cookies and similar technologies to enhance your browsing experience.",
      },
      { property: "og:title", content: "Cookie Policy | PropertyWorks" },
      {
        property: "og:description",
        content: "Read the PropertyWorks Cookie Policy to learn how our website uses cookies and similar technologies to enhance your browsing experience.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/cookie-policy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cookie Policy | PropertyWorks" },
      { name: "twitter:description", content: "Read the PropertyWorks Cookie Policy." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/cookie-policy" }
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
              "name": "Cookie Policy",
              "item": "https://www.propertyworks.in/cookie-policy"
            }
          ]
        })
      }
    ]
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="June 24, 2026">
      <p className="text-slate-600 font-medium">
        Welcome to PropertyWorks.
      </p>
      
      <p>
        This Cookie Policy explains how PropertyWorks ("PropertyWorks", "we", "our", or "us") uses cookies and similar technologies when you visit <a href="https://www.propertyworks.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.propertyworks.in</a> or interact with our website.
      </p>
      
      <p>
        By continuing to browse or use our website, you consent to the use of cookies in accordance with this Cookie Policy, subject to your browser settings and applicable laws.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        1. Introduction
      </h2>
      <p>
        We respect the privacy of our website visitors and clients. This Cookie Policy explains what cookies are, how we use them on our website, and your choices regarding cookie management.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        2. What Are Cookies?
      </h2>
      <p>
        Cookies are small text files that are stored on your computer, smartphone, tablet, or other device when you visit a website. Cookies help websites remember information about your visit, improve user experience, analyze website performance, and enable certain website functionalities.
      </p>
      <p>
        Cookies do not typically contain information that directly identifies you, but they may be linked to personal information that you voluntarily provide through forms or enquiries.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        3. Why We Use Cookies
      </h2>
      <p>
        PropertyWorks uses cookies and similar technologies for purposes including:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Improving website functionality</li>
        <li>Enhancing user experience</li>
        <li>Understanding visitor behavior</li>
        <li>Measuring website performance</li>
        <li>Analyzing traffic patterns</li>
        <li>Remembering user preferences</li>
        <li>Supporting website security</li>
        <li>Improving navigation and usability</li>
        <li>Optimizing content and design</li>
      </ul>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        4. Types of Cookies We May Use
      </h2>
      
      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">A. Essential Cookies</h3>
      <p>
        These cookies are necessary for the proper functioning of the website. They help enable features such as page navigation, form submissions, security functions, and session management. Without these cookies, certain website features may not function correctly.
      </p>

      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">B. Performance & Analytics Cookies</h3>
      <p>
        These cookies help us understand how visitors interact with our website. They may collect anonymous information regarding pages visited, time spent on pages, navigation paths, device types, browser types, geographic regions (general), and website performance metrics. This information helps us continuously improve our services and website experience.
      </p>
      <p>
        Examples of analytics platforms we may use include:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Google Analytics</li>
        <li>Microsoft Clarity</li>
        <li>Similar analytics platforms</li>
      </ul>

      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">C. Functional Cookies</h3>
      <p>
        These cookies remember user preferences to provide a more personalized browsing experience. Examples include remembering language preferences, previously entered form information, display preferences, and session preferences.
      </p>

      <h3 className="text-base font-bold text-slate-800 mt-4 font-heading">D. Marketing & Advertising Cookies</h3>
      <p>
        Where applicable, PropertyWorks may use cookies provided by advertising or marketing platforms to measure campaign effectiveness, understand visitor engagement, improve advertising relevance, track conversions, and optimize marketing activities.
      </p>
      <p>
        Examples of these technologies include:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Meta (Facebook) Pixel</li>
        <li>LinkedIn Insight Tag</li>
        <li>Google Ads Conversion Tracking</li>
        <li>Similar marketing technologies</li>
      </ul>
      <p>
        These cookies may be set by third-party providers.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        5. Third-Party Cookies
      </h2>
      <p>
        Certain cookies may be placed by third-party services integrated into our website. These providers may include Google, Meta, LinkedIn, Microsoft, website analytics providers, and marketing automation platforms.
      </p>
      <p>
        PropertyWorks does not control the operation of third-party cookies and encourages users to review the respective privacy and cookie policies of those providers.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        6. Managing Cookies
      </h2>
      <p>
        Most web browsers allow users to accept cookies, reject cookies, delete stored cookies, or receive notifications before cookies are placed. Users may modify browser settings at any time.
      </p>
      <p>
        Please note that disabling certain cookies may affect website functionality and limit certain features or services.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        7. Consent
      </h2>
      <p>
        Where required by applicable law, PropertyWorks may request your consent before placing non-essential cookies on your device. By continuing to use our website after receiving the cookie notification, you may be deemed to have accepted the use of cookies in accordance with this policy.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        8. Updates to This Cookie Policy
      </h2>
      <p>
        PropertyWorks reserves the right to modify or update this Cookie Policy at any time. Any changes will be published on this page along with the revised "Last Updated" date. Users are encouraged to review this policy periodically.
      </p>

      <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2 mt-8 mb-4 font-heading">
        9. Contact Us
      </h2>
      <p>
        If you have any questions regarding this Cookie Policy or the use of cookies on our website, please contact:
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
