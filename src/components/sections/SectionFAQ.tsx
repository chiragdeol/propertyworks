import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, Variants } from "framer-motion";
import { GOLD, NAVY } from "./shared";
import { getGlobalSettings } from "@/lib/api";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";
import {
  Search,
  X,
  ChevronDown,
  MessageCircle,
  HelpCircle,
  Info,
  Sparkles,
  Layers,
  Building,
  Shield,
} from "lucide-react";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";

const slideInFromRight = (delay: number = 0, duration: number = 0.55): Variants => ({
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

interface FAQItem {
  category: "general" | "process" | "services" | "inventory" | "trust";
  q: string;
  a: string;
}

export default function SectionFAQ() {
  const { settings } = useSettings();
  const faqData = settings?.sections?.faq;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("918433826365");

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res?.whatsappNumber) {
        setWhatsappNumber(res.whatsappNumber);
      }
    }).catch(err => console.error("Error loading settings in SectionFAQ:", err));
  }, []);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "general", label: "General & Model", icon: Info },
    { id: "process", label: "Process & Vastu", icon: Sparkles },
    { id: "services", label: "Services & Fees", icon: Layers },
    { id: "inventory", label: "Inventory & Coverage", icon: Building },
    { id: "trust", label: "Trust & Compliance", icon: Shield },
  ];

  const faqs: FAQItem[] = [
    {
      category: "general",
      q: "What is PropertyWorks?",
      a: "PropertyWorks is a Real Estate Intelligence & Advisory Services platform designed to simplify the residential and commercial property evaluation process.\n\nInstead of functioning like a traditional brokerage or listing portal, PropertyWorks helps buyers and investors make more structured, informed, and strategically aligned property decisions through guided evaluation, project intelligence, comparative analysis, and coordinated advisory support.",
    },
    {
      category: "general",
      q: "How is PropertyWorks different from traditional brokers or property portals?",
      a: "Traditional property platforms usually focus on:\n  • listing inventory\n  • generating leads\n  • promoting projects\n\nPropertyWorks focuses on:\n  • understanding your actual requirements\n  • evaluating alignment between your priorities and available projects\n  • simplifying comparison complexity\n  • coordinating inventory validation\n  • helping you make clearer and more confident decisions\n\nOur approach is advisory-driven rather than sales-driven.",
    },
    {
      category: "services",
      q: "Does PropertyWorks charge buyers for property evaluation assistance?",
      a: "Currently, PropertyWorks offers guided evaluation assistance and shortlisted recommendations at no direct cost to buyers for eligible residential and commercial opportunities.\n\nOur objective is to help simplify the decision-making process and improve evaluation clarity for prospects exploring suitable opportunities.",
    },
    {
      category: "general",
      q: "Does PropertyWorks directly sell properties?",
      a: "No.\n\nPropertyWorks does not function as a direct property seller or developer. We operate as a guided intelligence and advisory platform coordinating with developers, channel partner networks, and project teams to help prospects evaluate suitable opportunities more effectively.",
    },
    {
      category: "process",
      q: "How does the PropertyWorks evaluation process work?",
      a: "The general evaluation journey works as follows:\n  • Prospect shares their requirements through WhatsApp or guided interaction.\n  • PropertyWorks understands:\n    • budget\n    • location preferences\n    • family needs\n    • lifestyle expectations\n    • investment goals\n    • Vastu considerations\n    • configuration requirements\n    • commercial or residential intent\n  • Suitable projects are identified through structured evaluation and comparative alignment.\n  • PropertyWorks coordinates with developers to check inventory feasibility.\n  • A guided shortlist and intelligence-based recommendation summary is shared with the prospect.\n  • Site visits and further evaluation coordination are then arranged.",
    },
    {
      category: "process",
      q: "What type of requirements does PropertyWorks consider during evaluation?",
      a: "PropertyWorks considers multiple practical and personal evaluation parameters including:\n  • budget range\n  • preferred locations\n  • office commute\n  • family requirements\n  • configuration preferences\n  • township ecosystem\n  • open spaces\n  • investment outlook\n  • future appreciation potential\n  • Vastu alignment\n  • orientation preferences\n  • floor preferences\n  • wellness-focused living\n  • commercial utility requirements\n  • future scalability considerations\n\nThe objective is to create stronger alignment between buyer priorities and project suitability.",
    },
    {
      category: "process",
      q: "Why does PropertyWorks ask detailed questions during the evaluation process?",
      a: "Real estate decisions are highly personal and involve multiple emotional, financial, lifestyle, and long-term considerations.\n\nThe more accurately we understand your priorities, the better we can:\n  • narrow suitable options\n  • avoid irrelevant project recommendations\n  • simplify comparison complexity\n  • coordinate more aligned inventory opportunities\n\nThis helps reduce confusion and improves evaluation quality significantly.",
    },
    {
      category: "services",
      q: "Does PropertyWorks provide only residential property recommendations?",
      a: "No.\n\nPropertyWorks supports both:\n  • Residential Property Evaluation\n  • Commercial Property Evaluation\n\nThis includes:\n  • apartments\n  • township developments\n  • premium residences\n  • office spaces\n  • commercial investments\n  • retail opportunities\n  • business expansion requirements\ndepending on the prospect’s requirements.",
    },
    {
      category: "inventory",
      q: "Does PropertyWorks guarantee inventory availability?",
      a: "No.\n\nInventory availability is dynamic and controlled by the respective developers.\n\nHowever, before sharing final shortlisted recommendations, PropertyWorks manually coordinates with developer teams to verify the feasibility of matching inventory based on the prospect’s stated requirements.",
    },
    {
      category: "inventory",
      q: "Does PropertyWorks recommend only one developer or multiple developers?",
      a: "PropertyWorks works with multiple developers and evaluates projects across various locations and categories.\n\nRecommendations are based on:\n  • alignment suitability\n  • project fit\n  • lifestyle compatibility\n  • inventory feasibility\n  • stated priorities\nand not on promoting a single developer exclusively.",
    },
    {
      category: "trust",
      q: "Does PropertyWorks provide legal or financial advice?",
      a: "No.\n\nPropertyWorks does not provide:\n  • legal advice\n  • taxation advice\n  • home loan approval services\n  • investment guarantees\n  • financial planning services\n\nClients are advised to independently verify all legal, financial, contractual, and taxation-related aspects before making final transaction decisions.",
    },
    {
      category: "process",
      q: "Can PropertyWorks help with Vastu-oriented property preferences?",
      a: "Yes.\n\nPropertyWorks understands that many buyers consider:\n  • Vastu alignment\n  • directional preferences\n  • entrance orientation\n  • natural light\n  • spatial balance\n  • numerology considerations\nas important parts of their evaluation process.\n\nWhere possible, these preferences are considered during project alignment and inventory coordination discussions.",
    },
    {
      category: "services",
      q: "Does PropertyWorks help coordinate site visits?",
      a: "Yes.\n\nOnce suitable alignment options are identified, PropertyWorks can help coordinate:\n  • guided site evaluations\n  • developer appointments\n  • project walkthrough scheduling\n  • evaluation sequencing\nto help streamline the decision-making journey.",
    },
    {
      category: "inventory",
      q: "Is PropertyWorks associated with specific developers?",
      a: "PropertyWorks may work with multiple developers and channel partner networks across Mumbai Metropolitan Region and surrounding growth corridors.\n\nHowever, recommendations are intended to be alignment-based rather than promotional in nature.",
    },
    {
      category: "general",
      q: "Why should I use PropertyWorks instead of directly visiting a developer sales office?",
      a: "Most buyers today face:\n  • information overload\n  • multiple conflicting opinions\n  • comparison confusion\n  • inconsistent guidance\n  • pressure-driven sales interactions\n\nPropertyWorks helps simplify this process through:\n  • structured evaluation\n  • guided comparison\n  • project alignment support\n  • inventory coordination\n  • intelligence-driven recommendations\n\nThe objective is to help buyers make more informed and confident decisions.",
    },
    {
      category: "trust",
      q: "Does PropertyWorks maintain confidentiality of client information?",
      a: "Yes.\n\nClient information shared during the evaluation process is treated with reasonable confidentiality and used only for:\n  • evaluation purposes\n  • project coordination\n  • recommendation support\n  • communication related to the requested services\n\nPlease refer to our Privacy Policy for more details.",
    },
    {
      category: "services",
      q: "How do I begin my evaluation journey with PropertyWorks?",
      a: "You can begin by selecting:\n“Get My FREE Residential Shortlist”\nor\n“Get My FREE Commercial Shortlist”\nthrough our guided WhatsApp evaluation flow.\n\nA PropertyWorks guided interaction will then help understand your priorities and begin the structured evaluation process.",
    },
    {
      category: "inventory",
      q: "Is PropertyWorks available only in Mumbai?",
      a: "Currently, PropertyWorks primarily focuses on:\n  • Mumbai\n  • Thane\n  • Navi Mumbai\n  • surrounding growth corridors\n\nHowever, our operational scope may expand over time depending on partnerships and market opportunities.",
    },
    {
      category: "trust",
      q: "Does PropertyWorks provide investment guarantees or return commitments?",
      a: "No.\n\nReal estate markets are subject to:\n  • market conditions\n  • infrastructure changes\n  • regulatory developments\n  • demand cycles\n  • economic factors\n\nAccordingly, PropertyWorks does not provide guaranteed return commitments or investment assurances. All recommendations are intended purely as guided evaluation support.",
    },
    {
      category: "general",
      q: "What is the core objective of PropertyWorks?",
      a: "The core objective of PropertyWorks is to simplify the traditionally fragmented and confusing real estate evaluation process through:\n  • structured guidance\n  • real estate intelligence\n  • practical comparison support\n  • coordinated evaluation\n  • advisory-driven assistance\nso, buyers and businesses can make more informed property decisions with greater confidence and clarity.",
    },
    {
      category: "services",
      q: "Does PropertyWorks receive compensation or commission from developers?",
      a: "Yes.\n\nLike most organized real estate advisory and channel partner ecosystems, PropertyWorks may receive compensation, referral fees, or commissions from developers or authorized sales partners for successful transactions.\n\nHowever, compensation structures do not determine our recommendation approach.\nSince PropertyWorks works with multiple developers and projects across Mumbai, Thane, Navi Mumbai, and surrounding growth corridors, our focus remains on understanding the customer’s actual:\n  • needs\n  • priorities\n  • lifestyle preferences\n  • investment outlook\n  • family requirements\n  • commercial objectives\n  • Vastu considerations\n  • long-term goals\nand then identifying projects that demonstrate stronger overall alignment with those priorities.\n\nOur objective is not to push specific developer inventory, but to help simplify evaluation complexity through:\n  • guided comparison\n  • structured evaluation\n  • inventory coordination\n  • alignment-based recommendations\n  • practical decision support\n\nAccordingly, recommendations are intended to remain:\n  • advisory-driven\n  • structured\n  • comparative\n  • suitability-focused\nrather than purely sales-oriented.",
    },
  ];

  const displayCategories = useMemo(() => {
    if (!Array.isArray(faqData?.categories) || faqData.categories.length === 0) return categories;
    return categories.map((defaultCat, idx) => {
      const dbCat = faqData.categories[idx];
      if (!dbCat) return defaultCat;
      return {
        ...defaultCat,
        label: typeof dbCat === 'string' ? dbCat : (dbCat.label || defaultCat.label),
      };
    });
  }, [faqData]);

  const displayFaqs = useMemo(() => {
    if (Array.isArray(faqData?.items) && faqData.items.length > 0) {
      return faqData.items.map((dbFaq: any, idx: number) => {
        const defaultFaq = faqs[idx];
        return {
          category: (dbFaq.category as any) || defaultFaq?.category || "general",
          q: dbFaq.question || dbFaq.q || defaultFaq?.q || "",
          a: dbFaq.answer || dbFaq.a || defaultFaq?.a || "",
        };
      });
    }
    return faqs;
  }, [faqData]);

  const filteredFaqs = useMemo(() => {
    return displayFaqs.filter((faq: any) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !searchTerm ||
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [displayFaqs, activeCategory, searchTerm]);

  // Helper to dynamically render styled paragraphs and bullet lists
  const renderAnswer = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: { text: string; indent: boolean }[] = [];

    const flushList = (key: number) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="space-y-2.5 my-3 pl-6">
            {currentList.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2.5 text-[13.5px] sm:text-sm md:text-[14.5px] text-[#001B4F]/80 ${item.indent ? "pl-5 border-l border-slate-100 mt-1.5" : ""}`}
              >
                <span
                  className={`shrink-0 ${item.indent ? "text-[#D4A13A]/60 mt-2 text-[11px]" : "text-[#D4A13A] mt-1.5 text-lg leading-none"}`}
                >
                  {item.indent ? "◦" : "•"}
                </span>
                <span className={item.indent ? "text-[#001B4F]/70" : "font-medium"}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>,
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const leadingWhitespace = line.match(/^\s*/)?.[0] || "";
      const isIndented = leadingWhitespace.length >= 2 || leadingWhitespace.includes("\t");
      const trimmed = line.trim();

      if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
        const bulletText = trimmed.replace(/^[•\-\t\s]+/, "");
        currentList.push({ text: bulletText, indent: isIndented });
      } else {
        flushList(index);
        if (trimmed) {
          elements.push(
            <p key={index} className="text-[13.5px] sm:text-sm md:text-[14.5px] text-[#001B4F]/75 mb-3 leading-relaxed">
              {trimmed}
            </p>,
          );
        }
      }
    });
    flushList(lines.length);

    return <div className="space-y-1">{elements}</div>;
  };

  // Memoized counts matching search
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    displayCategories.forEach((c) => {
      if (c.id !== "all") counts[c.id] = 0;
    });

    displayFaqs.forEach((faq: any) => {
      const matchesSearch =
        !searchTerm ||
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase());

      if (matchesSearch) {
        counts.all++;
        if (faq.category in counts) {
          counts[faq.category]++;
        }
      }
    });

    return counts;
  }, [searchTerm, displayCategories, displayFaqs]);

  return (
    <section
      id="faq"
      className="relative w-full bg-slate-50/60 py-8 lg:py-12 overflow-hidden border-t border-slate-100"
    >
      {/* Visual background ambient blurs */}
      <div className="absolute top-1/4 -left-48 w-[400px] h-[400px] rounded-full bg-[#D4A13A]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] rounded-full bg-[#001B4F]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 relative z-10">
        {/* Modern Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column (Desktop: Sticky Sidebar & Search, Mobile: Top Panel) */}
          <motion.div
            variants={staggerContainer(0.12, 0.8)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
          >
            <motion.div variants={fadeInUp(0, 0.5)}>
              <h2 className="h1-global text-[#001B4F] font-bold tracking-tight">
                {formatDynamicText(faqData?.heading || "Frequently Asked [gold]Questions[/gold]", GOLD)}
              </h2>
              <p className="p-global text-[#001B4F]/70 mt-3">
                {formatDynamicText(faqData?.description || "Find clear, structured, and intelligence-backed answers regarding the PropertyWorks advisory model, processes, and service features.", GOLD)}
              </p>
            </motion.div>

            {/* Live Search Bar */}
            <motion.div variants={fadeInUp(0.08, 0.55)} className="relative shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#001B4F]/40" />
              </div>
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // Default to 'all' if category doesn't have matches when typing
                  if (activeCategory !== "all" && categoryCounts[activeCategory] === 0) {
                    setActiveCategory("all");
                  }
                }}
                className="block w-full pl-10 pr-10 py-3 border border-slate-200/80 rounded-xl bg-white text-[13px] sm:text-sm text-[#001B4F] placeholder-[#001B4F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A13A]/30 focus:border-[#D4A13A] transition-all"
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#001B4F]/30 hover:text-[#001B4F]/60 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Desktop Category Menu */}
            <LayoutGroup id="desktop-categories">
              <motion.div variants={fadeInUp(0.15, 0.6)} className="hidden lg:block space-y-2">
                <div className="text-slate-400 font-bold text-[11px] tracking-wider uppercase pl-1 pb-1">
                  CATEGORIES
                </div>
                <div className="space-y-1.5">
                  {displayCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const count = categoryCounts[cat.id] || 0;

                    return (
                      <motion.button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        disabled={count === 0 && cat.id !== "all"}
                        whileHover={count > 0 && !isActive ? { x: 4 } : {}}
                        whileTap={count > 0 ? { scale: 0.98 } : {}}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left text-[13px] sm:text-sm font-semibold transition-colors relative ${
                          isActive
                            ? "bg-[#001B4F] border-[#001B4F] text-white shadow-md shadow-[#001B4F]/10 scale-[1.02]"
                            : count === 0
                              ? "opacity-40 bg-transparent border-transparent text-[#001B4F]/40 cursor-not-allowed"
                              : "bg-white/80 border-slate-200/60 text-[#001B4F]/75 hover:bg-slate-50/80 hover:text-[#001B4F]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeCategoryIndicator"
                            className="absolute left-0 top-3 bottom-3 w-1 bg-[#D4A13A] rounded-r-md"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center gap-3">
                          <CatIcon
                            className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D4A13A]" : "text-[#001B4F]/50"}`}
                          />
                          <span className="relative z-10">{cat.label}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[11px] rounded-md font-mono relative z-10 ${
                            isActive
                              ? "bg-white/20 text-[#D4A13A] font-bold"
                              : "bg-slate-100 text-[#001B4F]/60"
                          }`}
                        >
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </LayoutGroup>

            {/* Mobile Category Horizontal Scrolling Pills */}
            <motion.div variants={fadeInUp(0.15, 0.6)} className="lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 mask-image">
                {displayCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;

                  if (count === 0 && cat.id !== "all") return null;

                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[13px] font-semibold shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#001B4F] border-[#001B4F] text-white shadow-xs"
                          : "bg-white border-slate-200/70 text-[#001B4F]/75 hover:bg-slate-50"
                      }`}
                    >
                      <CatIcon
                        className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#D4A13A]" : "text-[#001B4F]/40"}`}
                      />
                      <span>{cat.label}</span>
                      <span
                        className={`px-1.5 py-0.1 text-[9px] rounded-md font-mono ${
                          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-[#001B4F]/55"
                        }`}
                      >
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (FAQ List Accordion) */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.length === 0 ? (
                /* No Search Results State */
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border border-slate-100 p-12 rounded-3xl text-center shadow-xs flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100/50 flex items-center justify-center mb-4 text-[#D4A13A]/80">
                    <Search className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-[#001B4F] text-base sm:text-lg font-bold mb-1.5">
                    No matching questions found
                  </h4>
                  <p className="text-[13.5px] sm:text-sm text-[#001B4F]/60 max-w-sm mx-auto leading-normal">
                    We couldn't find any FAQs matching "{searchTerm}". Try broadening your search
                    terms or resetting the filters.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="mt-5 px-5 py-2.5 bg-[#001B4F] hover:bg-[#001B4F]/90 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Reset Search & Filters
                  </motion.button>
                </motion.div>
              ) : (
                /* FAQ Accordion List */
                <LayoutGroup id="faq-accordion-group">
                  <motion.div
                    key={`faq-list-${activeCategory}`}
                    variants={staggerContainer(0.05, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    className="space-y-3.5"
                  >
                    {filteredFaqs.map((faq: any) => {
                      const isOpen = openFAQ === faq.q;
                      return (
                        <motion.div
                          key={faq.q}
                          variants={slideInFromRight(0, 0.55)}
                          whileHover={{
                            y: -4,
                            scale: 1.025,
                            boxShadow: "0 20px 40px rgba(0, 27, 79, 0.08)",
                            borderColor: "rgba(212, 161, 58, 0.4)"
                          }}
                          whileTap={{ scale: 1.002 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`relative group bg-white border rounded-2xl transition-colors duration-300 ${
                            isOpen
                              ? "border-[#D4A13A]/50 shadow-[0_12px_32px_rgba(0,27,79,0.05)] bg-linear-to-r from-white to-[#D4A13A]/2"
                              : "border-slate-100/80 hover:border-slate-200/80 shadow-xs hover:shadow-[0_6px_20px_rgba(0,27,79,0.02)]"
                          }`}
                        >
                          {/* Left color bar indicator */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 bg-[#D4A13A] rounded-l-2xl transition-all duration-300 ${
                              isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                            }`}
                          />

                          {/* Question Toggle Area */}
                          <button
                            onClick={() => setOpenFAQ(isOpen ? null : faq.q)}
                            className="w-full text-left p-5 sm:p-6 flex items-start gap-4 focus:outline-none cursor-pointer select-none"
                          >
                            <span
                              className={`font-mono text-[15px] sm:text-[17px] font-bold shrink-0 transition-colors duration-300 mt-px ${
                                isOpen ? "text-[#D4A13A]" : "text-[#001B4F]/40"
                              }`}
                            >
                              Q.
                            </span>

                            <span
                              className={`flex-1 font-serif text-[15px] sm:text-[17px] font-semibold leading-snug transition-colors duration-300 ${
                                isOpen
                                  ? "text-[#001B4F]"
                                  : "text-[#001B4F]/85 group-hover:text-[#001B4F]"
                              }`}
                            >
                              {faq.q}
                            </span>

                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                                isOpen
                                  ? "bg-[#D4A13A]/10 border-[#D4A13A]/30 text-[#D4A13A] rotate-180"
                                  : "bg-slate-50 border-slate-200/60 text-[#001B4F]/40 group-hover:bg-[#001B4F]/5 group-hover:text-[#001B4F]/60"
                              }`}
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </div>
                          </button>

                          {/* Answer Collapsible Section with Framer Motion AnimatePresence height transitions */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 sm:px-6 pl-[42px] sm:pl-[46px] border-t border-dashed border-slate-100 pt-4 pb-5 sm:pb-6">
                                  {renderAnswer(faq.a)}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </LayoutGroup>
              )}
            </AnimatePresence>

            <motion.div
              variants={scaleUp(0.1, 0.65)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white border border-[#D4A13A]/40 p-6 sm:p-8 rounded-3xl relative overflow-hidden mt-6 shadow-md"
              style={{
                background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
                backgroundSize: "300% 300%",
                animation: "glowMove 10s ease infinite",
              }}
            >
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none translate-x-8 translate-y-8">
                <MessageCircle className="w-48 h-48 text-white" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-md">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                    {formatDynamicText(faqData?.blueStripHeading || "Still have questions?", GOLD, "#ffffff")}
                  </h4>
                  <p className="text-[13.5px] sm:text-sm text-white leading-relaxed">
                    {formatDynamicText(faqData?.blueStripSubheading || "Can't find the answers you're looking for? Reach out directly to our PropertyWorks advisory team on WhatsApp.", GOLD, "#ffffff")}
                  </p>
                </div>
                <motion.a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20PropertyWorks%2C%20I%20have%20some%20questions%20about%20your%20property%20advisory%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4A13A] hover:bg-[#D4A13A]/90 text-[#001B4F] hover:shadow-lg transition-colors rounded-xl text-xs sm:text-sm font-bold shrink-0 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.088 1.452 4.835 1.453 5.402.002 9.794-4.39 9.797-9.798.002-2.62-1.018-5.084-2.871-6.94C16.505 2.01 14.04 1.002 12.01 1.001 6.605 1.001 2.212 5.393 2.21 10.801c-.001 1.83.483 3.42 1.47 5.008l-.997 3.642 3.734-.979.23.136z" />
                    <path d="M15.35 12.045c-.18-.09-.54-.27-.6-.3-.06-.03-.12-.045-.18-.045-.06 0-.15.03-.225.135-.075.105-.3.3-.36.375-.06.075-.12.09-.3.001-.18-.09-.76-.28-1.447-.893-.535-.477-.897-1.066-.997-1.246-.1-.18-.01-.277.08-.367.08-.08.18-.21.27-.315.09-.105.12-.18.18-.3.06-.12.03-.225-.015-.315-.045-.09-.39-1.05-.54-1.41-.15-.36-.3-.315-.39-.315-.06 0-.12-.015-.195-.015s-.195.03-.3.15c-.105.12-.39.375-.39.915s.39 1.065.45 1.14c.06.075.765 1.17 1.86 1.635.26.11.465.18.625.23.265.085.505.07.695.04.21-.03.54-.225.615-.435.075-.21.075-.39.045-.435-.03-.045-.105-.075-.285-.165z" />
                  </svg>
                  <span>{formatDynamicText(faqData?.blueStripCtaText || "Chat on WhatsApp")}</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
