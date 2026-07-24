import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProjectById, getGlobalSettings } from "@/lib/api";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";
import ShortlistModal, { type ShortlistType } from "@/components/ShortlistModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Lock, 
  Unlock, 
  Download, 
  Eye, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Maximize2,
  Building2, 
  Trees, 
  Leaf, 
  Cpu, 
  Shield, 
  Sparkles, 
  Award, 
  Briefcase, 
  Zap, 
  Utensils, 
  Settings, 
  TrendingUp, 
  Coffee, 
  Layers, 
  CheckCircle, 
  Waves, 
  Activity, 
  Dumbbell, 
  Target, 
  Smile, 
  ShieldCheck, 
  Wifi, 
  Users,
  Car
} from "lucide-react";
import { GOLD, NAVY } from "@/components/sections/shared";
import Breadcrumbs from "@/components/Breadcrumbs";

// Search params schema for access unlock
export const Route = createFileRoute("/projects/$projectId")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      access: search.access as string | undefined,
    };
  },
  loader: async ({ params }) => {
    const project = await getProjectById({ data: { id: params.projectId } });
    const settings = await getGlobalSettings();
    return { project, settings };
  },
  head: ({ loaderData }: any) => {
    const project = loaderData?.project;
    if (!project) {
      return {
        meta: [{ title: "Project Not Found | PropertyWorks" }]
      };
    }

    const breadcrumbSchema = {
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
          "name": "Projects",
          "item": "https://www.propertyworks.in/projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.name,
          "item": `https://www.propertyworks.in/projects/${project.id}`
        }
      ]
    };

    const faqSchema = project.faqs && project.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": project.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    const seoTitle = `${project.name} | Real Estate Project Evaluation | PropertyWorks`;
    const seoDescription = project.description?.overview 
      ? project.description.overview.slice(0, 155) + "..."
      : `Verify configuration specifications, price lists, layout plans, and connectivity reports for ${project.name} in ${project.location?.city}.`;

    const schemas = [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema)
      }
    ];

    if (faqSchema) {
      schemas.push({
        type: "application/ld+json",
        children: JSON.stringify(faqSchema)
      });
    }

    return {
      meta: [
        { title: seoTitle },
        { name: "description", content: seoDescription },
        { property: "og:title", content: seoTitle },
        { property: "og:description", content: seoDescription },
        { property: "og:image", content: project.media?.heroImage ? `https://www.propertyworks.in${project.media.heroImage}` : "https://www.propertyworks.in/images/logo-main.png" },
        { property: "og:url", content: `https://www.propertyworks.in/projects/${project.id}` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seoTitle },
        { name: "twitter:description", content: seoDescription },
        { name: "twitter:image", content: project.media?.heroImage ? `https://www.propertyworks.in${project.media.heroImage}` : "https://www.propertyworks.in/images/logo-main.png" },
      ],
      links: [
        { rel: "canonical", href: `https://www.propertyworks.in/projects/${project.id}` }
      ],
      scripts: schemas
    };
  },
  component: ProjectTemplatePage,
});

function ProjectTemplatePage() {
  const loaderData = Route.useLoaderData();
  const project = loaderData.project as Project | null;
  const settings = loaderData.settings;
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const isUnlocked = search.access === "unlocked";

  // States
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<string>("overview");

  // Scrollspy to detect active section in viewport
  useEffect(() => {
    if (!project) return;
    const sections = ["overview", "highlights", "amenities", "configurations", "gallery", "location", "faq"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px",
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [projectId, project]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [projectId]);

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header />
        <div className="grow flex items-center justify-center p-8">
          <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
            <h1 className="text-6xl font-black text-[#001B4F] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-[#001B4F] mb-2">Project Not Found</h2>
            <p className="text-slate-500 mb-6">
              The project you are looking for does not exist or has been relocated.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl text-primary font-bold transition-all btn-glowing-gold"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleOpenLeadModal = () => {
    setIsLeadModalOpen(true);
  };

  // central configs
  const activeSettings = settings || {
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
      buttonBgClass: "bg-[#D4A13A] text-[#001B4F] hover:bg-[#D4A13A]/90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(212,161,58,0.2)] font-black text-sm uppercase tracking-wider rounded-xl px-6 py-4 flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 cursor-pointer text-center",
      badgeColorClass: "text-gold",
      badgeLabel: "ADVISORY INTELLIGENCE",
      iconType: "arrow" as const,
      hasDecorations: true,
      showPlacement1: true,
      showPlacement2: true,
    }
  };
  const ctaConfig = project.type === "Commercial" ? activeSettings.commercial : activeSettings.residential;

  return (
    <main className="min-h-screen bg-white font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Projects", to: "/projects" }, { label: project.name }]} />
        </div>
      </div>

      {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[500px] lg:min-h-[620px] flex items-end py-16 bg-primary text-white overflow-hidden">
        {/* Banner background with overlay blur */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.media.heroImage} 
            alt={project.name} 
            className="w-full h-full object-cover " 
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-primary/20 " />
        </div>

        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-gold/8 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]" />
        </div>

        <div className="relative max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 z-10">
          <div className="max-w-4xl space-y-6">
            {/* Status & Type badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-gold text-[#001B4F] rounded-full shadow-[0_2px_10px_rgba(212,161,58,0.3)]">
                {project.type}
              </span>
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-white/10 text-white border border-white/20 rounded-full">
                {project.status}
              </span>
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1.5 shadow-sm">
                <Unlock size={12} className="stroke-3" /> Verified Project
              </span>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-gold/90">
                {project.developer}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
                {project.name}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-white/80 font-medium text-sm sm:text-base pt-1">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  <span>{project.location.locality}, {project.location.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">Starting from:</span>
                  <span className="text-white text-lg font-bold">{project.pricing.startingPrice}</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ─── QUICK NAV METRICS ─────────────────────────────────────────────────── */}
      <div className="border-y border-slate-100 bg-white/80 sticky top-16 lg:top-20 z-40 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.02)] hidden md:block">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex items-center justify-start gap-8 py-4 text-xs font-extrabold uppercase tracking-wider">
          {[
            { id: "overview", label: "Overview" },
            { id: "highlights", label: "Highlights" },
            { id: "amenities", label: "Amenities" },
            { id: "configurations", label: "Configurations & Plans" },
            { id: "gallery", label: "Gallery" },
            { id: "location", label: "Location" },
            { id: "faq", label: "FAQ" }
          ].map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <a 
                key={tab.id}
                href={`#${tab.id}`} 
                className={`relative py-1.5 transition-all duration-300 ${isActive ? "text-gold font-black" : "text-slate-500 hover:text-gold"}`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT 8 COLUMNS: Project Details */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            
            {/* Overview Section */}
            <div id="overview" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Project Overview
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-3">
                {project.description.overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                {/* Card 1: Property Type */}
                <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,27,79,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group cursor-default">
                  <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <Building size={20} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Property Type</span>
                    <span className="font-heading font-black text-[#001B4F] text-sm sm:text-base leading-tight">{project.type}</span>
                  </div>
                </div>

                {/* Card 2: Developer */}
                <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,27,79,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group cursor-default">
                  <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <Award size={20} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Developer</span>
                    <span className="font-heading font-black text-[#001B4F] text-sm sm:text-base leading-tight truncate block max-w-[130px]">
                      {project.developer}
                    </span>
                  </div>
                </div>

                {/* Card 3: Price Range */}
                <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,27,79,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group cursor-default">
                  <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <DollarSign size={20} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Price Range</span>
                    <span className="font-heading font-black text-[#001B4F] text-sm sm:text-base leading-tight">
                      {project.pricing.startingPrice} - {project.pricing.maxPrice}
                    </span>
                  </div>
                </div>

                {/* Card 4: Availability */}
                <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,27,79,0.04)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group cursor-default">
                  <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <Layers size={20} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Availability</span>
                    <span className="font-heading font-black text-emerald-600 text-sm sm:text-base leading-tight">{project.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── DYNAMIC CTA BLOCK 1 (After Overview) ─────────────────────────── */}
            {activeSettings.ctaStyle.showPlacement1 && (
              <CTASection
                heading={ctaConfig.heading}
                description={ctaConfig.description}
                buttonLabel={ctaConfig.buttonLabel}
                style={activeSettings.ctaStyle}
                onButtonClick={handleOpenLeadModal}
              />
            )}

            {/* Highlights Section */}
            <div id="highlights" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Project Highlights
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {project.description.highlights.map((highlight, idx) => {
                  const icon = getHighlightIcon(highlight);
                  return (
                    <div 
                      key={idx} 
                      className="p-6 rounded-3xl border border-slate-100 bg-white hover:border-gold/30 hover:shadow-[0_20px_40px_rgba(0,27,79,0.05)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col gap-4"
                    >
                      <div className="h-10 w-10 shrink-0 bg-gold/10 text-gold rounded-2xl flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-300">
                        {icon}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">HIGHLIGHT 0{idx + 1}</span>
                        <p className="text-slate-700 font-bold text-sm sm:text-base leading-snug">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities Section */}
            <div id="amenities" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Amenities & Facilities
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
                {project.description.amenities.map((amenity, idx) => {
                  const icon = getAmenityIcon(amenity);
                  return (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(0,27,79,0.04)] hover:-translate-y-0.5 transition-all duration-300 cursor-default group"
                    >
                      <div className="h-14 w-14 rounded-full bg-white border border-slate-100 text-[#001B4F] flex items-center justify-center shadow-xs group-hover:bg-[#001B4F] group-hover:text-white group-hover:border-transparent transition-all duration-300 mb-3">
                        {icon}
                      </div>
                      <span className="text-[#001B4F] font-bold text-xs sm:text-sm leading-snug">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configurations & Floor Plans Section */}
            <div id="configurations" className="space-y-8 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                  Configurations & Pricing
                  <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
                </h2>
              </div>

              {/* Configurations List Wrapper */}
              <div className="relative">
                <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,27,79,0.02)] bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="p-4 sm:p-5">Unit Type</th>
                        <th className="p-4 sm:p-5">Carpet Area</th>
                        <th className="p-4 sm:p-5 text-right">Starting Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.configurations.map((config, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-slate-100 font-semibold text-sm sm:text-base text-slate-700 hover:bg-slate-50/40 transition-colors last:border-b-0"
                        >
                          <td className="p-4 sm:p-5 font-bold text-[#001B4F]">{config.name}</td>
                          <td className="p-4 sm:p-5 font-medium text-slate-500">{config.carpetArea}</td>
                          <td className="p-4 sm:p-5 text-right font-bold text-[#001B4F]">
                            <span className="text-slate-800">{config.startingPrice}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>


              </div>

              {/* Gated Floor & Master Plans */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#001B4F]">Floor & Master Plans</h3>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Click on any card to zoom</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.media.floorPlans.map((plan, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,27,79,0.02)] hover:shadow-[0_15px_30px_rgba(0,27,79,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer group"
                      onClick={() => setActiveGalleryImage(plan)}
                    >
                      {/* Image container */}
                      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden border-b border-slate-100">
                        <img 
                          src={plan} 
                          alt={`Typical Floor Plan - Plan ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                        />
                      </div>
                      {/* Card Content */}
                      <div className="p-5 flex flex-col justify-between grow gap-2">
                        <h4 className="font-bold text-[#001B4F] text-sm leading-snug">
                          Typical Floor Plan - Plan {idx + 1}
                        </h4>
                        <div className="text-gold font-bold text-xs flex items-center gap-1 group-hover:underline">
                          <span>View Plan</span>
                          <ArrowRight size={12} className="stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Master Plan Card */}
                  <div 
                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,27,79,0.02)] hover:shadow-[0_15px_30px_rgba(0,27,79,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer group"
                    onClick={() => setActiveGalleryImage(project.media.masterPlan)}
                  >
                    {/* Image container */}
                    <div className="relative aspect-4/3 bg-slate-50 overflow-hidden border-b border-slate-100">
                      <img 
                        src={project.media.masterPlan} 
                        alt="Master Layout Plan" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                      />
                    </div>
                    {/* Card Content */}
                    <div className="p-5 flex flex-col justify-between grow gap-2">
                      <h4 className="font-bold text-[#001B4F] text-sm leading-snug">
                        Master Layout Plan
                      </h4>
                      <div className="text-gold font-bold text-xs flex items-center gap-1 group-hover:underline">
                        <span>View Plan</span>
                        <ArrowRight size={12} className="stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brochure Download Card */}
                <div className="pt-2">
                  <div className="p-6 sm:p-8 bg-slate-50/40 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-gold/20 hover:shadow-[0_15px_30px_rgba(0,27,79,0.03)] hover:-translate-y-0.5 transition-all duration-300">
                    <div className="space-y-1.5 max-w-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">OFFICIAL DOWNLOADS</span>
                      <h4 className="text-base font-bold text-[#001B4F]">Project Brochure PDF</h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                        Official developer documentation featuring architectural designs, construction specifications, and legal papers.
                      </p>
                    </div>
                    <a 
                      href={project.media.brochurePdf} 
                      download
                      className="h-12 px-6 rounded-xl border border-[#25D366] text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-white hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer"
                    >
                      <Download size={14} className="stroke-[2.5]" /> Download Brochure PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div id="gallery" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Project Gallery
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {project.media.galleryImages.map((image, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-video sm:aspect-square rounded-3xl overflow-hidden border border-slate-100/60 bg-slate-50/50 cursor-pointer hover:border-gold/30 hover:shadow-[0_15px_35px_rgba(0,27,79,0.06)] hover:-translate-y-1 transition-all duration-300 group relative"
                    onClick={() => setActiveGalleryImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${project.name} Gallery View ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    />
                    {/* Interactive visual glass overlay on hover */}
                    <div className="absolute inset-0 bg-[#001B4F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/90 backdrop-blur-xs text-[#001B4F] rounded-full shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Eye size={18} className="stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div id="location" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Location & Accessibility
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
                {/* Left panel: Info and advantages list */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div className="space-y-6">
                    {/* Address Card */}
                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-gold/20 hover:shadow-xs transition-all duration-300">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 leading-none">Address</span>
                      <p className="text-slate-700 font-bold text-sm sm:text-base leading-relaxed">
                        {project.location.address}
                      </p>
                    </div>

                    {/* Connectivity Advantages */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1 leading-none">Connectivity & Transit</span>
                      <div className="grid grid-cols-1 gap-3">
                        {project.description.connectivity.map((conn, idx) => (
                          <div 
                            key={idx} 
                            className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-gold/20 hover:shadow-xs transition-all duration-300"
                          >
                            <div className="h-6 w-6 shrink-0 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-0.5">
                              <MapPin size={12} className="stroke-3" />
                            </div>
                            <span className="text-slate-600 font-semibold text-xs sm:text-sm leading-relaxed">
                              {conn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location Advantages */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1 leading-none">Location Advantages</span>
                      <div className="grid grid-cols-1 gap-3">
                        {project.description.locationAdvantages.map((adv, idx) => (
                          <div 
                            key={idx} 
                            className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-gold/20 hover:shadow-xs transition-all duration-300"
                          >
                            <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mt-0.5">
                              <Check size={12} className="stroke-3" />
                            </div>
                            <span className="text-slate-600 font-semibold text-xs sm:text-sm leading-relaxed">
                              {adv}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right panel: Maps Card with stretching capability */}
                <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between p-6 relative group hover:shadow-md hover:border-gold/20 transition-all duration-300 min-h-[450px] lg:h-auto" style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=1000')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}>
                  {/* Backdrop blur & overlay gradient */}
                  <div className="absolute inset-0 bg-[#001B4F]/40 backdrop-blur-[1px] group-hover:bg-[#001B4F]/30 transition-colors duration-300 z-0" />
                  
                  {/* Top tags */}
                  <div className="relative z-10 w-full flex justify-end">
                    <span className="px-3.5 py-1.5 bg-[#001B4F]/90 backdrop-blur-md border border-white/10 text-[9px] font-black text-gold uppercase tracking-wider rounded-xl shadow-md">
                      Interactive Local Map
                    </span>
                  </div>

                  {/* Pulsing Beacon */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-gold/30 animate-ping" />
                      <div className="absolute -inset-8 rounded-full bg-gold/10 animate-pulse" />
                      <div className="h-14 w-14 rounded-full bg-[#001B4F] border-2 border-gold flex items-center justify-center shadow-lg relative z-20">
                        <MapPin size={22} className="text-gold" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation Box */}
                  <div className="relative z-10 w-full pt-20">
                    <div className="p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-[#001B4F] text-sm">Transit & Locality Boundary Map</h4>
                        <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                          Verify local commute times, nearest highways, airports, and upcoming transit links directly in the Google Maps console.
                        </p>
                      </div>
                      <a 
                        href={project.location.mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-11 rounded-xl bg-[#001B4F] text-white hover:bg-gold hover:text-[#001B4F] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md w-full"
                      >
                        <span>Navigate via Google Maps</span>
                        <ArrowRight size={14} className="stroke-3" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ─── DYNAMIC CTA BLOCK 2 (Before FAQs / End of page) ───────────────── */}
            {activeSettings.ctaStyle.showPlacement2 && (
              <CTASection
                heading={ctaConfig.heading}
                description={ctaConfig.description}
                buttonLabel={ctaConfig.buttonLabel}
                style={activeSettings.ctaStyle}
                onButtonClick={handleOpenLeadModal}
              />
            )}

            {/* FAQs Section */}
            <div id="faq" className="space-y-6 scroll-mt-28 pb-4">
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary relative pb-2">
                Frequently Asked Questions
                <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
              </h2>
              
              <div className="space-y-4 pt-4">
                {project.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-3xl overflow-hidden bg-white transition-all duration-300 ${isOpen ? "border-gold/30 shadow-[0_15px_30px_rgba(0,27,79,0.06)]" : "border-slate-100 shadow-[0_4px_20px_rgba(0,27,79,0.01)] hover:border-gold/20 hover:shadow-[0_12px_24px_rgba(0,27,79,0.03)]"}`}
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#001B4F] text-sm sm:text-base cursor-pointer hover:bg-slate-50/20 transition-colors"
                      >
                        <span className="pr-4 leading-snug">{faq.question}</span>
                        <span className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-gold text-[#001B4F]" : "bg-slate-50 text-slate-400"}`}>
                          {isOpen ? <ChevronUp size={16} className="stroke-[2.5]" /> : <ChevronDown size={16} className="stroke-[2.5]" />}
                        </span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed border-t border-slate-50">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Sticky Enquiry Advisory Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,27,79,0.05)] hover:shadow-[0_25px_60px_rgba(0,27,79,0.1)] transition-all duration-300 space-y-6 relative overflow-hidden group">
              {/* Gold stripe top */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: GOLD }} />
              
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PROPERTYWORKS ADVISORY</span>
                <Link
                  to="/projects"
                  className="text-xs font-black text-gold hover:underline flex items-center gap-1 active:scale-97 transition-transform cursor-pointer"
                >
                  <ArrowLeft size={10} className="stroke-3" /> Projects
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-heading font-black text-primary leading-tight">
                  Interested in {project.name}?
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  Submit your details and get an objective analysis, pricing forecasts, and layout reviews compiled for this project.
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-4">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">STATUS</span>
                    <span className="text-emerald-600">{project.status}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">LOCATION</span>
                    <span className="text-[#001B4F]">{project.location.locality}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">TYPE</span>
                    <span className="text-[#001B4F]">{project.type}</span>
                  </div>
                </div>

                <button
                  onClick={handleOpenLeadModal}
                  className="w-full min-h-[48px] py-3 px-4 rounded-xl text-[#001B4F] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 btn-glowing-gold transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg text-center"
                >
                  <span>{project.type === "Commercial" ? "Get My FREE Commercial Intelligence Report" : "Get My FREE Residential Intelligence Report"}</span>
                  <ArrowRight size={14} className="stroke-3 shrink-0" />
                </button>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-semibold text-slate-400 leading-normal">
                  🔒 No buyer-side commission charges.<br />100% unbiased project evaluation.
                </p>
              </div>
            </div>
            
            {/* Quick WhatsApp helper widget */}
            <div className="bg-white/50 border border-[#25D366]/10 hover:border-[#25D366]/30 rounded-3xl p-6 flex flex-col gap-4 text-center hover:shadow-[0_15px_30px_rgba(37,211,102,0.04)] transition-all duration-300 cursor-default group">
              <div className="h-10 w-10 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto group-hover:scale-105 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.088 1.452 4.835 1.453 5.402.002 9.794-4.39 9.797-9.798.002-2.62-1.018-5.084-2.871-6.94C16.505 2.01 14.04 1.002 12.01 1.001 6.605 1.001 2.212 5.393 2.21 10.801c-.001 1.83.483 3.42 1.47 5.008l-.997 3.642 3.734-.979.23.136z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-800">Quick Advisory Chat</h4>
                <p className="text-slate-500 text-xs leading-normal font-semibold">
                  Skip the forms. Connect directly via WhatsApp to chat with a PropertyWorks advisor.
                </p>
              </div>
              <a 
                href={`https://wa.me/${activeSettings.whatsappNumber}?text=${encodeURIComponent(
                  `Hi PropertyWorks, I am interested in evaluating "${project.name}" (${project.type}). Please share the project report and details.`
                )}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 active:scale-98 transition-all text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <ExitIntentModal />

      {/* ─── FULLSCREEN LIGHTBOX FOR GALLERY ────────────────────────────────────── */}
      <AnimatePresence>
        {activeGalleryImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10000 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveGalleryImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
              onClick={() => setActiveGalleryImage(null)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={activeGalleryImage} 
              alt="Gallery Preview Enlarged" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── LEAD CAPTURE MODAL ────────────────────────────────────────────────── */}
      {isLeadModalOpen && (
        <ShortlistModal 
          type={project.type as ShortlistType} 
          onClose={() => setIsLeadModalOpen(false)} 
          projectName={project.name}
        />
      )}
    </main>
  );
}

interface CTASectionProps {
  heading: string;
  description: string;
  buttonLabel: string;
  style: any;
  onButtonClick: () => void;
}

function CTASection({ heading, description, buttonLabel, style, onButtonClick }: CTASectionProps) {

  // Icon mapping
  const renderIcon = () => {
    switch (style.iconType) {
      case "arrow":
        return <ArrowRight size={16} className="stroke-3" />;
      case "check":
        return <Check size={16} className="stroke-3" />;
      case "download":
        return <Download size={16} className="stroke-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,27,79,0.06)] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${style.bgClass} ${style.textColorClass}`}>
      {/* Decorative background accents */}
      {style.hasDecorations && (
        <>
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="space-y-4 max-w-2xl">
        <span className={`text-xs font-black uppercase tracking-widest ${style.badgeColorClass}`}>
          {style.badgeLabel}
        </span>
        <h3 className="text-xl sm:text-2xl font-heading font-black leading-tight">
          {heading}
        </h3>
        <p className="opacity-70 text-sm sm:text-base leading-relaxed font-medium">
          {description}
        </p>
      </div>

      <button
        onClick={onButtonClick}
        className={style.buttonBgClass}
      >
        <span>{buttonLabel}</span>
        {renderIcon()}
      </button>
    </div>
  );
}

// Icon resolvers for Highlights and Amenities based on content keywords
const getHighlightIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("view") || t.includes("scenic")) return <Eye size={20} />;
  if (t.includes("garden") || t.includes("park") || t.includes("landscape") || t.includes("trees")) return <Trees size={20} />;
  if (t.includes("smart") || t.includes("automation") || t.includes("cpu")) return <Cpu size={20} />;
  if (t.includes("pedestrian") || t.includes("vehicle") || t.includes("noise")) return <Shield size={20} />;
  if (t.includes("location") || t.includes("address") || t.includes("corridor")) return <MapPin size={20} />;
  if (t.includes("skyscraper") || t.includes("architectural") || t.includes("workspace") || t.includes("township")) return <Building2 size={20} />;
  if (t.includes("interior") || t.includes("curated") || t.includes("armani")) return <Sparkles size={20} />;
  if (t.includes("coveted") || t.includes("brand") || t.includes("award")) return <Award size={20} />;
  if (t.includes("corporate") || t.includes("business") || t.includes("global")) return <Briefcase size={20} />;
  if (t.includes("leed") || t.includes("green") || t.includes("eco")) return <Leaf size={20} />;
  if (t.includes("cyberhub") || t.includes("food") || t.includes("retail")) return <Utensils size={20} />;
  if (t.includes("mechanical") || t.includes("system") || t.includes("hvac")) return <Settings size={20} />;
  if (t.includes("networking") || t.includes("growth") || t.includes("trending")) return <TrendingUp size={20} />;
  if (t.includes("lobby") || t.includes("lounge")) return <Coffee size={20} />;
  if (t.includes("efficiency") || t.includes("plates") || t.includes("floor")) return <Layers size={20} />;
  if (t.includes("energy") || t.includes("electricity") || t.includes("power") || t.includes("zap")) return <Zap size={20} />;
  return <CheckCircle size={20} />;
};

const getAmenityIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("clubhouse") || t.includes("lounge") || t.includes("lobby")) return <Coffee size={22} />;
  if (t.includes("pool") || t.includes("swimming")) return <Waves size={22} />;
  if (t.includes("spa") || t.includes("meditation") || t.includes("wellness")) return <Activity size={22} />;
  if (t.includes("gym") || t.includes("fitness") || t.includes("health")) return <Dumbbell size={22} />;
  if (t.includes("court") || t.includes("tennis") || t.includes("badminton") || t.includes("sports")) return <Target size={22} />;
  if (t.includes("children") || t.includes("play") || t.includes("kids")) return <Smile size={22} />;
  if (t.includes("security") || t.includes("patrol") || t.includes("safe") || t.includes("cctv")) return <ShieldCheck size={22} />;
  if (t.includes("power") || t.includes("backup")) return <Zap size={22} />;
  if (t.includes("ev") || t.includes("charging")) return <Car size={22} />;
  if (t.includes("parking")) return <Car size={22} />;
  if (t.includes("elevator") || t.includes("lift")) return <Layers size={22} />;
  if (t.includes("fiber") || t.includes("wifi") || t.includes("internet")) return <Wifi size={22} />;
  if (t.includes("conference") || t.includes("meeting")) return <Users size={22} />;
  if (t.includes("food") || t.includes("cafeteria") || t.includes("canteen")) return <Utensils size={22} />;
  return <Check size={22} />;
};
