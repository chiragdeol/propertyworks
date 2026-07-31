import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.NITRO_PORT || process.env.HTTP_PORT || 5000;

// Allowed origins: production domain + local dev
const ALLOWED_ORIGINS = [
  "https://propertyworks.in",
  "https://www.propertyworks.in",
  "http://localhost:8080",
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith(".onrender.com") ||
      origin.endsWith(".hostingersite.com") ||
      process.env.NODE_ENV !== "production"
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Database configuration
const candidateDbDirs = [
  path.join(__dirname, "database"),
  path.join(__dirname, "../database"),
  path.join(__dirname, "../backend/database"),
  path.join(process.cwd(), "backend/database"),
  path.join(process.cwd(), "database"),
  path.join(process.cwd(), "public_html/backend/database"),
  path.join(process.cwd(), "public_html/database")
];
const DB_DIR = candidateDbDirs.find((d) => fs.existsSync(d)) || path.join(__dirname, "database");
const PROJECTS_PATH = path.join(DB_DIR, "projects.json");
const ARTICLES_PATH = path.join(DB_DIR, "articles.json");
const SETTINGS_PATH = path.join(DB_DIR, "settings.json");
const ADMIN_PATH = path.join(DB_DIR, "admin.json");
const LEADS_PATH = path.join(DB_DIR, "leads.json");

const candidateUploadsDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "../uploads"),
  path.join(process.cwd(), "backend/uploads"),
  path.join(process.cwd(), "uploads"),
  path.join(process.cwd(), "public_html/uploads")
];
const UPLOADS_DIR = candidateUploadsDirs.find((d) => fs.existsSync(d)) || path.join(__dirname, "uploads");

// Serve uploads statically
app.use("/uploads", express.static(UPLOADS_DIR));

const SESSION_COOKIE_NAME = "pw_admin_session";
const SESSION_TOKEN = "pw_auth_token_983274982";

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
    description: "Receive objective real estate comparison, guided coordination, and transactional intelligence tailored for your goals."
  }
};

// Initialize Database Files
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  if (!fs.existsSync(LEADS_PATH)) {
    fs.writeFileSync(LEADS_PATH, JSON.stringify([], null, 2), "utf-8");
  }

  // Seeding Projects if empty
  if (!fs.existsSync(PROJECTS_PATH)) {
    // Import from static project files
    const srcProjectsPath = path.join(__dirname, "../src/data/projects.ts");
    let initialProjects = [];
    try {
      // Basic fallback since parsing TS in node is hard, let's write simple defaults or parse if possible
      initialProjects = [
        {
          id: "prestige-sanctuary",
          name: "Prestige Sanctuary",
          developer: "Prestige Group",
          type: "Residential",
          status: "Limited Availability",
          location: {
            city: "Bengaluru",
            locality: "Nandi Hills",
            address: "Karalahalli Village, Nandi Hills Road, Devanahalli, Bengaluru, Karnataka 562110",
            mapsLink: "https://maps.google.com/?q=Prestige+Sanctuary+Nandi+Hills"
          },
          pricing: { startingPrice: "₹3.75 Cr", maxPrice: "₹5.50 Cr" },
          configurations: [
            { name: "3 BHK Luxury Villa", carpetArea: "3,200 sq.ft.", startingPrice: "₹3.75 Cr" },
            { name: "4 BHK Premium Villa", carpetArea: "4,100 sq.ft.", startingPrice: "₹4.85 Cr" }
          ],
          media: {
            heroImage: "/images/hero-image.jpg",
            galleryImages: ["/images/residential-image.jpg", "/images/site-visits-image.jpg"],
            floorPlans: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400"],
            masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
            brochurePdf: "#"
          },
          description: {
            overview: "Prestige Sanctuary offers an exquisite collection of luxury villas nestled in the serene foothills of Nandi Hills.",
            amenities: ["Signature Clubhouse & Lounge", "Infinity Pool"],
            highlights: ["Scenic view of Nandi Hills", "Private landscaped gardens"],
            connectivity: ["20 mins to Kempegowda International Airport"],
            locationAdvantages: ["Clean and pollution free microclimate"],
            lifestyle: "Built for a premium lifestyle balancing nature and city connections."
          },
          faqs: [{ question: "What is the total acreage?", answer: "Prestige Sanctuary is spread across 23 acres." }]
        },
        {
          id: "lodha-world-towers",
          name: "Lodha World Towers",
          developer: "Lodha Group",
          type: "Residential",
          status: "Active",
          location: {
            city: "Mumbai",
            locality: "Lower Parel",
            address: "Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
            mapsLink: "https://maps.google.com/?q=Lodha+World+Towers+Lower+Parel"
          },
          pricing: { startingPrice: "₹8.50 Cr", maxPrice: "₹18.00 Cr" },
          configurations: [
            { name: "3 BHK Residences", carpetArea: "1,850 sq.ft.", startingPrice: "₹8.50 Cr" }
          ],
          media: {
            heroImage: "/images/residential-image.jpg",
            galleryImages: ["/images/hero-image.jpg", "/images/site-visits-image.jpg"],
            floorPlans: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400"],
            masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
            brochurePdf: "#"
          },
          description: {
            overview: "Lodha World Towers redefines ultra-luxury skyscraper living.",
            amenities: ["Sky Lounge", "Indoor Heated Lap Pool"],
            highlights: ["Interiors curated by Armani/Casa", "Arabian Sea Views"],
            connectivity: ["5 mins to Lower Parel corporate hubs"],
            locationAdvantages: ["Epicenter of South Mumbai's corporate life"],
            lifestyle: "Status, comfort, and luxury."
          },
          faqs: [{ question: "Is it gated?", answer: "Yes, fully secured." }]
        },
        {
          id: "dlf-cybercity",
          name: "DLF CyberCity",
          developer: "DLF Limited",
          type: "Commercial",
          status: "Active",
          location: {
            city: "Gurugram",
            locality: "Sector 24, Phase 3",
            address: "DLF Cyber City, Sector 24, Gurugram, Haryana 122002",
            mapsLink: "https://maps.google.com/?q=DLF+Cyber+City+Gurugram"
          },
          pricing: { startingPrice: "₹2.20 Cr", maxPrice: "₹15.00 Cr" },
          configurations: [
            { name: "Grade-A Office Space", carpetArea: "800 sq.ft.", startingPrice: "₹2.20 Cr" }
          ],
          media: {
            heroImage: "/images/commercial-image.jpg",
            galleryImages: ["/images/hero-image.jpg", "/images/site-visits-image.jpg"],
            floorPlans: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400"],
            masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
            brochurePdf: "#"
          },
          description: {
            overview: "DLF CyberCity is the corporate hub of Gurugram.",
            amenities: ["Power Backups", "Fiber Connectivity"],
            highlights: ["LEED Certified", "Integrated CyberHub access"],
            connectivity: ["Metro station inside campus"],
            locationAdvantages: ["Corporate district with top social infrastructure"],
            lifestyle: "High productivity office workspace."
          },
          faqs: [{ question: "Is there access control?", answer: "Yes, card control." }]
        }
      ];
    } catch (e) {
      console.error("Failed parsing projects", e);
    }
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(initialProjects, null, 2), "utf-8");
  }

  // Seeding Settings if empty
  if (!fs.existsSync(SETTINGS_PATH)) {
    const initialSettings = {
      whatsappNumber: "918433826365",
      consentText: "I consent to PropertyWorks collecting and processing my information to prepare my personalized Real Estate Intelligence Report and authorize PropertyWorks and its representatives to contact me via WhatsApp, phone call, SMS, or email regarding my enquiry, recommendations, and related services, even if my number is registered under DND/NDNC.",
      qrCodeBaseUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150",
      residential: {
        heading: "Not Sure if This is the Right Property for Your Needs?",
        description: "Every buyer has different priorities—budget, lifestyle, office connectivity, Vastu preferences, investment goals, and family requirements. Get your FREE Personalized Residential Intelligence Report from PropertyWorks and discover the opportunities that best align with your requirements.",
        buttonLabel: "Get My FREE Residential Intelligence Report",
      },
      commercial: {
        heading: "Is This the Right Commercial Opportunity for Your Business or Investment Goals?",
        description: "Every business and investor has different priorities—location, accessibility, employee convenience, customer reach, scalability, rental potential, and long-term returns. Get your FREE Personalized Commercial Intelligence Report from PropertyWorks and discover the opportunities that best align with your business objectives.",
        buttonLabel: "Get My FREE Commercial Intelligence Report",
      },
      ctaStyle: {
        bgClass: "bg-[#001B4F]",
        textColorClass: "text-white",
        buttonBgClass: "bg-[#D4A13A] text-[#001B4F] hover:bg-[#D4A13A]/90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(212,161,58,0.25)] font-black text-sm uppercase tracking-wider rounded-xl px-6 py-4 flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 cursor-pointer text-center",
        badgeColorClass: "text-gold",
        badgeLabel: "ADVISORY INTELLIGENCE",
        iconType: "arrow",
        hasDecorations: true,
        showPlacement1: true,
        showPlacement2: true,
      },
      sections: defaultSections
    };
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(initialSettings, null, 2), "utf-8");
  }

  // Seeding Articles if empty
  if (!fs.existsSync(ARTICLES_PATH)) {
    const initialArticles = [
      {
        id: "art-1",
        slug: "best-townships-in-thane",
        title: "Best Family Townships in Thane: A Complete Evaluation",
        content: `<h2>Why Thane is Becoming the Preferred Destination for Townships</h2>
<p>Over the last decade, Thane has transformed from an industrial hub into one of Mumbai Metropolitan Region's (MMR) most desirable residential zones. Premium developers have built expansive self-contained townships that offer residents a resort-style living experience.</p>
<h3>Top Townships Compared</h3>
<p>When looking at the top townships such as Raymond Ten X, Lodha Amara, and Kalpataru Parkcity, several factors stand out:</p>
<ul>
  <li><strong>Amenities:</strong> Most of these developments feature multiple swimming pools, huge sports fields, organic farming areas, and sprawling clubhouses.</li>
  <li><strong>Connectivity:</strong> Easy connectivity to Ghodbunder Road and Eastern Express Highway.</li>
  <li><strong>Security:</strong> Low-density designs with multi-tier access control.</li>
</ul>
<p>Choosing the right township depends heavily on your budget, vastu requirements, and workplace commute goals.</p>`,
        categories: ["Project Comparisons", "Location Guides"],
        featuredImage: "/images/residential-image.jpg",
        seoTitle: "Best Family Townships in Thane - Raymond Ten X, Lodha Amara",
        metaDescription: "An unbiased and data-backed comparison of the top townships in Thane for home buyers and investors.",
        publishDate: new Date().toISOString(),
        readingTime: 4,
        status: "Published"
      },
      {
        id: "art-2",
        slug: "understanding-carpet-area-vs-built-up-area",
        title: "Understanding Carpet Area vs. Built-up Area before buying a home",
        content: `<h2>The Area Calculation Dilemma</h2>
<p>Many first-time homebuyers get confused between carpet area, built-up area, and super built-up area. RERA has made it mandatory for developers to sell properties based on carpet area, yet understanding the differences is key to getting what you pay for.</p>
<h3>1. Carpet Area</h3>
<p>Carpet area is the net usable floor area of an apartment, excluding the area covered by external walls, areas under services shafts, exclusive balcony or verandah area, and exclusive open terrace area. It literally means the area where you can lay a carpet.</p>
<h3>2. Built-Up Area</h3>
<p>Built-up area includes the carpet area plus the thickness of inner/outer walls and any balcony area.</p>
<h3>3. Super Built-Up Area</h3>
<p>This includes the built-up area plus the proportionate share of common areas like lobby, lifts, staircases, and clubhouse.</p>`,
        categories: ["Buyer Education"],
        featuredImage: "/images/clarity-confident.jpg",
        seoTitle: "Carpet Area vs Built-up Area: What is the difference?",
        metaDescription: "Learn how to calculate and evaluate carpet area, built-up area, and super built-up area under RERA guidelines.",
        publishDate: new Date().toISOString(),
        readingTime: 3,
        status: "Published"
      }
    ];
    fs.writeFileSync(ARTICLES_PATH, JSON.stringify(initialArticles, null, 2), "utf-8");
  }

  // Seeding Admin Credentials
  if (!fs.existsSync(ADMIN_PATH)) {
    const initialAdmin = {
      passwordHash: "admin123" // Default password
    };
    fs.writeFileSync(ADMIN_PATH, JSON.stringify(initialAdmin, null, 2), "utf-8");
  }
}

initDb();

// Database Reading/Writing Helpers
const readJSON = (filePath, fallback = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading JSON file at ${filePath}:`, err);
  }
  return fallback;
};
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

// Authentication middleware
const authGuard = (req, res, next) => {
  const token = req.cookies[SESSION_COOKIE_NAME];
  if (token === SESSION_TOKEN) {
    next();
  } else {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

// ENDPOINTS

// 1. Auth routes
app.post("/api/auth/login", (req, res) => {
  const { password } = req.body;
  const admin = readJSON(ADMIN_PATH);
  
  if (password === admin.passwordHash) {
    res.cookie(SESSION_COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1000 // 1 day
    });
    return res.json({ success: true });
  }
  
  return res.status(400).json({ success: false, error: "Incorrect password" });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
  res.json({ success: true });
});

app.get("/api/auth/check", (req, res) => {
  const token = req.cookies[SESSION_COOKIE_NAME];
  res.json({ isAuthenticated: token === SESSION_TOKEN });
});

// 2. Project routes
app.get("/api/projects", (req, res) => {
  const projects = readJSON(PROJECTS_PATH);
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const projects = readJSON(PROJECTS_PATH);
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

app.post("/api/projects", authGuard, (req, res) => {
  const { project } = req.body;
  const projects = readJSON(PROJECTS_PATH);
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index > -1) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  
  writeJSON(PROJECTS_PATH, projects);
  res.json({ success: true, project });
});

app.delete("/api/projects/:id", authGuard, (req, res) => {
  const projects = readJSON(PROJECTS_PATH);
  const filtered = projects.filter(p => p.id !== req.params.id);
  writeJSON(PROJECTS_PATH, filtered);
  res.json({ success: true });
});

// 3. Article routes
app.get("/api/articles", (req, res) => {
  const articles = readJSON(ARTICLES_PATH);
  res.json(articles);
});

app.get("/api/articles/:slug", (req, res) => {
  const articles = readJSON(ARTICLES_PATH);
  const article = articles.find(a => a.slug === req.params.slug);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ error: "Article not found" });
  }
});

app.post("/api/articles", authGuard, (req, res) => {
  const { article } = req.body;
  const articles = readJSON(ARTICLES_PATH);
  const index = articles.findIndex(a => a.id === article.id);
  
  // Calculate reading time
  const words = article.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  article.readingTime = Math.max(1, Math.ceil(words / 225));

  if (index > -1) {
    articles[index] = article;
  } else {
    articles.push(article);
  }
  
  writeJSON(ARTICLES_PATH, articles);
  res.json({ success: true, article });
});

app.delete("/api/articles/:id", authGuard, (req, res) => {
  const articles = readJSON(ARTICLES_PATH);
  const filtered = articles.filter(a => a.id !== req.params.id);
  writeJSON(ARTICLES_PATH, filtered);
  res.json({ success: true });
});

// 4. Settings routes
app.get("/api/settings", (req, res) => {
  const settings = readJSON(SETTINGS_PATH);
  
  // Migration for SEO
  if (!settings.seo) {
    settings.seo = {
      canonicalUrl: "https://www.propertyworks.in",
      titleSuffix: " | PropertyWorks",
      defaultMetaDescription: "Structured evaluation, guided coordination, and real estate intelligence for residential and commercial buyers.",
      robotsTxt: "User-agent: *\nAllow: /"
    };
  }

  // Migration for Dynamic Sections
  if (!settings.sections) {
    settings.sections = defaultSections;
    writeJSON(SETTINGS_PATH, settings);
  } else {
    let updated = false;
    for (const key in defaultSections) {
      if (!settings.sections[key]) {
        settings.sections[key] = defaultSections[key];
        updated = true;
      } else {
        for (const subKey in defaultSections[key]) {
          if (settings.sections[key][subKey] === undefined) {
            settings.sections[key][subKey] = defaultSections[key][subKey];
            updated = true;
          }
        }
      }
    }
    if (updated) {
      writeJSON(SETTINGS_PATH, settings);
    }
  }
  
  res.json(settings);
});

app.post("/api/settings", authGuard, (req, res) => {
  const { settings } = req.body;
  writeJSON(SETTINGS_PATH, settings);
  res.json({ success: true, settings });
});

// 5. Leads routes
app.get("/api/leads", authGuard, (req, res) => {
  const leads = readJSON(LEADS_PATH);
  res.json(leads);
});

app.post("/api/leads", (req, res) => {
  const { lead } = req.body;
  if (!lead || !lead.name || !lead.phone) {
    return res.status(400).json({ success: false, error: "Name and phone are required" });
  }
  
  const leads = readJSON(LEADS_PATH);
  
  const newLead = {
    id: "lead_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    name: lead.name,
    phone: lead.phone,
    interest: lead.interest || "Residential",
    budget: lead.budget || "",
    location: lead.location || "",
    projectName: lead.projectName || "",
    timestamp: new Date().toISOString()
  };
  
  leads.push(newLead);
  writeJSON(LEADS_PATH, leads);
  
  res.json({ success: true, lead: newLead });
});

// 6. Media Library routes
app.get("/api/media", authGuard, (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const mediaFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".pdf"].includes(ext);
      })
      .map(file => {
        const stats = fs.statSync(path.join(UPLOADS_DIR, file));
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: stats.size,
          createdAt: stats.birthtime
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json(mediaFiles);
  } catch (err) {
    res.status(500).json({ error: "Failed to scan media uploads folder" });
  }
});

app.post("/api/media/upload", authGuard, (req, res) => {
  const { file, filename } = req.body;
  if (!file || !filename) {
    return res.status(400).json({ error: "File data and filename are required" });
  }

  try {
    const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    let cleanName = filename.toLowerCase().replace(/[^a-z0-9._-]/g, "_");
    let targetPath = path.join(UPLOADS_DIR, cleanName);
    
    if (fs.existsSync(targetPath)) {
      const ext = path.extname(cleanName);
      const base = path.basename(cleanName, ext);
      cleanName = `${base}_${Date.now()}${ext}`;
      targetPath = path.join(UPLOADS_DIR, cleanName);
    }

    fs.writeFileSync(targetPath, buffer);
    res.json({
      success: true,
      media: {
        filename: cleanName,
        url: `/uploads/${cleanName}`,
        createdAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error("Failed to upload image:", err);
    res.status(500).json({ error: "Failed to write file to disk" });
  }
});

// Serve dynamic robots.txt from settings
app.get("/robots.txt", (req, res) => {
  try {
    const settings = readJSON(SETTINGS_PATH);
    const robots = (settings.seo && settings.seo.robotsTxt) || "User-agent: *\nAllow: /";
    res.type("text/plain");
    res.send(robots);
  } catch (err) {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /");
  }
});

// Serve dynamic sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  try {
    const staticUrls = [
      "",
      "about",
      "services",
      "contact",
      "faq",
      "privacy-policy",
      "terms-and-conditions",
      "disclaimer",
      "cookie-policy",
      "refund-cancellation-policy",
      "knowledge-center",
      "projects"
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static URLs
    staticUrls.forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>https://www.propertyworks.in/${url}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${url === "" ? "1.0" : "0.8"}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Projects
    if (fs.existsSync(PROJECTS_PATH)) {
      const projects = readJSON(PROJECTS_PATH);
      projects.forEach(project => {
        xml += `  <url>\n`;
        xml += `    <loc>https://www.propertyworks.in/projects/${project.id}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
    }

    // Dynamic Articles (Blogs)
    if (fs.existsSync(ARTICLES_PATH)) {
      const articles = readJSON(ARTICLES_PATH);
      articles.forEach(article => {
        if (article.status === "Published") {
          xml += `  <url>\n`;
          xml += `    <loc>https://www.propertyworks.in/knowledge-center/${article.slug}</loc>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.7</priority>\n`;
          xml += `  </url>\n`;
        }
      });
    }

    xml += `</urlset>`;
    res.type("application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Failed to generate sitemap.xml:", err);
    res.status(500).send("Error generating sitemap.xml");
  }
});

// Helper to locate index.html across all possible Hostinger deployment directories
function getIndexHtmlPath() {
  const candidates = [
    path.resolve(__dirname, "../dist/index.html"),
    path.resolve(__dirname, "dist/index.html"),
    path.resolve(__dirname, "../backend/dist/index.html"),
    path.resolve(__dirname, "../public_html/index.html"),
    path.resolve(__dirname, "../../public_html/index.html"),
    path.resolve(__dirname, "../../../public_html/index.html"),
    path.resolve(__dirname, "../build/index.html"),
    path.resolve(__dirname, "../.output/public/index.html"),
    path.resolve(__dirname, "../index.html"),
    path.resolve(process.cwd(), "dist/index.html"),
    path.resolve(process.cwd(), "backend/dist/index.html"),
    path.resolve(process.cwd(), "public_html/index.html"),
    path.resolve(process.cwd(), "../public_html/index.html"),
    path.resolve(process.cwd(), "../dist/index.html"),
    path.resolve(process.cwd(), ".output/public/index.html"),
    path.resolve(process.cwd(), "build/index.html"),
    path.resolve(process.cwd(), "index.html")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

const distDir = getIndexHtmlPath() ? path.dirname(getIndexHtmlPath()) : null;

if (distDir) {
  app.use(express.static(distDir));
}

// Fallback for SPA routing: serve index.html for all non-API GET requests
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  if (req.path.startsWith("/api") || req.path.startsWith("/uploads") || req.path === "/robots.txt" || req.path === "/sitemap.xml") {
    return next();
  }

  const indexPath = getIndexHtmlPath();
  if (indexPath) {
    try {
      const htmlContent = fs.readFileSync(indexPath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(htmlContent);
    } catch (err) {
      console.error("Error reading index.html from path:", indexPath, err);
      return res.status(500).send("Error loading application page");
    }
  }

  console.error("index.html not found in any candidate directory. __dirname:", __dirname, "cwd:", process.cwd());
  next();
});

// 404 Handler for unhandled API routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global Error Handler for debugging
app.use((err, req, res, next) => {
  if (err.status === 404 || err.statusCode === 404 || err.name === "NotFoundError" || err.code === "ENOENT") {
    return res.status(404).json({ error: "Not Found" });
  }
  console.error("SERVER ERROR:", err);
  res.status(err.status || err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`PropertyWorks backend server running on port ${PORT}`);
});

export default app;
