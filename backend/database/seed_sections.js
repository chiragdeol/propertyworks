import fs from "fs";

const defaultSections = {
  hero: {
    heading: "Stop Evaluating\nReal Estate [gold]Blindly.[/gold]",
    paragraph1: "Most buyers spend months visiting projects, comparing brochures, and listening to conflicting opinions.",
    paragraph2: "PropertyWorks helps professionals, businesses, investors, and families evaluate residential and commercial opportunities through structured comparison, guided coordination, and real estate intelligence.",
    imageUrl: "/images/hero-image.jpg"
  },
  noise: {
    heading: "The Real Estate Market\nIs Filled With [gold]Noise,\nPressure & Confusion.[/gold]",
    description: "Most buyers do not lack options. They lack structured guidance, comparison clarity, project intelligence, and coordinated support."
  },
  clarity: {
    headingLeft: "FROM [gold]CONFUSION[/gold]\nTO CLARITY",
    headingRight: "FROM CLARITY\nTO [gold]CONFIDENCE[/gold]",
    subtitleLeft: "Unclear comparisons. Missed opportunities. Emotional decisions.",
    subtitleRight: "Right Projects Aligned to Your Priorities. Clear Comparison & Insights. Coordinated Site Visits. Confident & Informed Decision.",
    centerTitle: "The Right Guidance\n[gold]Changes Everything[/gold]",
    centerSubtitle: "Your Partner in Better Decisions",
    imageLeftUrl: "/images/clarity-confused.jpg",
    imageRightUrl: "/images/clarity-confident.jpg"
  },
  siteVisits: {
    heading: "Guided Site Visits.\n[gold]Informed Impressions.[/gold]",
    description: "We coordinate and guide site visits that go beyond a walkthrough. See what matters. Ask the right questions. Get real clarity.",
    imageUrl: "/images/Guidedsite_img.png"
  },
  services: {
    heading: "Our [gold]Services[/gold]",
    subheading: "Real Estate Intelligence & Advisory Services",
    paragraph1: "At PropertyWorks, our services are designed to simplify the traditionally fragmented and confusing real estate evaluation journey through structured guidance, project intelligence, comparative analysis, and practical advisory support.",
    paragraph2: "Whether you are exploring a residential opportunity for your family or evaluating a commercial property for business or investment purposes, our objective is to help you make more informed and strategically aligned decisions with greater clarity and confidence."
  },
  about: {
    heading: "About Property[gold]Works[/gold]",
    subheading: "Real Estate Intelligence & Advisory Services",
    description: "We simplify the real estate evaluation journey through intelligence, structure, transparency and human guidance.",
    quote: "Helping You Evaluate Real Estate with Greater [gold]Clarity, Structure & Confidence.[/gold]",
    imageUrl: "/images/About Property Works bg.jpeg"
  },
  whyChoose: {
    heading: "Why [gold]PropertyWorks?[/gold]",
    description: "We represent you, not the developer. Our process is structured to give you unbiased market clarity and maximum transaction comfort."
  },
  developerNetwork: {
    heading: "Active [gold]Developer Network[/gold]",
    description: "We leverage our relationships across top developers to get you absolute transaction comfort and pre-negotiated priority pricing."
  },
  independentEvaluation: {
    heading: "Independent\nEvaluation Across\n[gold]Multiple Developers[/gold]",
    description: "We evaluate opportunities across the market objectively. We do not push developer inventory. Our only focus is helping you find the right property that matches your criteria and interests."
  },
  technologyAdvisory: {
    heading: "Technology &\n[gold]Advisory[/gold]",
    description: "We combine proprietary digital evaluation tools with deep market advisory to give you structured real estate intelligence."
  },
  yourJourney: {
    heading: "Your Journey With [gold]PropertyWorks[/gold]",
    description: "A structured, transparent roadmap from initial exploration to secure handover."
  },
  testimonials: {
    heading: "Client [gold]Success Stories[/gold]",
    description: "Read how professional families and businesses have moved from confusion to confidence."
  },
  faq: {
    heading: "[gold]Frequently Asked[/gold] Questions",
    description: "Common inquiries about our structured evaluation process, broker-free model, and report builder."
  },
  contact: {
    heading: "Connect with Our\n[gold]Advisory Team[/gold]",
    subheading: "Real Estate Intelligence & Advisory Services",
    description: "We’re here to help you make confident, well-informed real estate decisions. Get in touch with our team."
  }
};

const settingsPath = "./backend/database/settings.json";
if (fs.existsSync(settingsPath)) {
  const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
  settings.sections = settings.sections || {};
  
  for (const key in defaultSections) {
    if (!settings.sections[key]) {
      settings.sections[key] = defaultSections[key];
    } else {
      for (const subKey in defaultSections[key]) {
        if (settings.sections[key][subKey] === undefined || settings.sections[key][subKey] === "") {
          settings.sections[key][subKey] = defaultSections[key][subKey];
        }
      }
    }
  }
  
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
  console.log("Database successfully seeded!");
} else {
  console.log("settings.json not found!");
}
