import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";
import {
  NAVY,
  GOLD,
  GoldRule,
  RenderIcon,
  p6,
  iconOfficePW,
  iconYieldsCoins,
  iconStore,
  iconExpansionTrend,
  iconEstate,
  iconSearchGold,
  iconTargetGold,
  iconShieldCheckGold,
  iconUsersGold,
  iconGrowthTrend,
  AmbientGlows,
} from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";

interface FlippingItem {
  icon: string;
  title: string;
  body: string;
}

function CommercialHoverCard({ it, index }: { it: FlippingItem; index: number }) {
  const [isSlid, setIsSlid] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    // Stagger slide-up sequence based on index
    const delay = 2500 + (index % 6) * 1600;
    const initialTimeout = setTimeout(() => {
      setIsSlid(true);

      const interval = setInterval(() => {
        setIsSlid((prev) => !prev);
      }, 5000);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [index, isHovered]);

  const active = isSlid || isHovered;

  return (
    <div
      className="relative overflow-hidden group rounded-2xl border border-gold/30 shadow-md h-[145px] sm:h-[135px] xl:h-[140px] cursor-pointer transition-all duration-300 hover:shadow-[0_12px_28px_rgba(212,161,58,0.25)] hover:scale-[1.02]"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsSlid(false); // Return to default phase on leave
      }}
    >
      {/* Default Base: Navy Blue Background with Centered Icon and Title */}
      <div 
        style={{ background: "linear-gradient(135deg, #001B4F 0%, #002266 100%)" }}
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="h-11 w-11 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center shrink-0 shadow-sm mb-2.5">
          <RenderIcon icon={it.icon} className="h-5.5 w-5.5 object-contain filter brightness-110" />
        </div>
        <div className="font-heading font-extrabold text-white text-[13.5px] sm:text-[14px] leading-snug">
          {it.title}
        </div>
      </div>

      {/* Slide-Up Overlay: Gold Gradient containing Title & Description details */}
      <div 
        style={{ background: "linear-gradient(135deg, #d4a13a 0%, #f6d98e 50%, #d4a13a 100%)" }}
        className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center p-4 border border-white/20 ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2 pb-1 border-b border-primary/20 mb-1.5">
          <div className="h-7 w-7 rounded-full bg-[#001B4F] flex items-center justify-center shrink-0 shadow-sm">
            <RenderIcon icon={it.icon} className="h-4 w-4 object-contain filter brightness-110" />
          </div>
          <h4 className="font-heading font-extrabold text-[#001B4F] text-[12.5px] sm:text-[13px] leading-none">
            {it.title}
          </h4>
        </div>
        <p className="text-[#001B4F]/95 text-[11px] sm:text-[11.5px] font-semibold leading-relaxed">
          {it.body}
        </p>
      </div>
    </div>
  );
}

export default function SectionCommercial() {
  const { settings } = useSettings();
  const commData = settings?.sections?.commercial;
  const items = [
    {
      icon: iconOfficePW,
      title: "Office Spaces",
      body: "Find the right spaces to attract talent, improve productivity, and scale faster.",
    },
    {
      icon: iconYieldsCoins,
      title: "Commercial Investments",
      body: "Analyze opportunities with strong rental yields, capital appreciation, and risk-adjusted returns.",
    },
    {
      icon: iconStore,
      title: "Retail & High Street",
      body: "Identify high visibility locations with strong footfalls and business potential.",
    },
    {
      icon: iconExpansionTrend,
      title: "Business Expansion",
      body: "Assess locations that support your expansion strategy and future growth plans.",
    },
    {
      icon: iconEstate,
      title: "Industrial & Warehousing",
      body: "Evaluate infrastructure, connectivity, and operational efficiency for long-term advantage.",
    },
    {
      icon: iconSearchGold,
      title: "Market Intelligence",
      body: "Access real-time market insights, demand trends, and micro-market data for better decisions.",
    },
  ];
  const bottom = [
    { icon: iconTargetGold, t: "Strategic Locations.", s: "Stronger Business Impact." },
    { icon: iconShieldCheckGold, t: "Data-Backed Decisions.", s: "Lower Risk. Higher Returns." },
    { icon: iconUsersGold, t: "Expert Guidance.", s: "End-to-End Support." },
    { icon: iconGrowthTrend, t: "Future-Ready Investments.", s: "Sustainable Growth." },
  ];

  return (
    <section id="commercial" className="w-full bg-white overflow-hidden relative">
      <AmbientGlows variant="light" />
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] lg:min-h-[640px] xl:min-h-[720px]">
          {/* Left Column Content - Staggered fade in */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="px-5 sm:px-8 lg:px-16 py-10 lg:py-14 overflow-hidden"
          >
            <motion.h2 variants={fadeInUp(0, 0.6)} className="h1-global text-[#001B4F]">
              {formatDynamicText(commData?.heading || "Commercial\nReal Estate\n[gold]Intelligence[/gold]", GOLD)}
            </motion.h2>
            <motion.div variants={fadeInUp(0.1, 0.5)}>
              <GoldRule />
            </motion.div>
            <motion.p variants={fadeInUp(0.2, 0.6)} className="p-global text-[#001B4F]/75 max-w-md md:max-w-none lg:max-w-md">
              {formatDynamicText(commData?.description || "We help businesses and investors make smarter commercial real estate decisions aligned with their growth and returns.", GOLD)}
            </motion.p>

            {/* Interactive Grid Cards with hover scale & shadow */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 max-w-xl md:max-w-none lg:max-w-xl xl:max-w-3xl">
              {items.map((it, i) => (
                <CommercialHoverCard key={i} it={it} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right Image Content - Ken burns zoom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[280px] sm:min-h-[400px] lg:h-full overflow-hidden"
          >
            <ProgressiveImage
              src={commData?.imageUrl || p6}
              alt="Advisors reviewing a commercial dashboard"
              className="absolute inset-0 w-full h-full object-contain md:object-cover lg:object-contain lg:object-right bg-white"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={3}
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              whileHover={{ scale: 1.04 }}
            />
            {/* Left/Top white blend */}
            <div className="absolute top-0 left-0 right-0 h-16 lg:right-auto lg:h-full lg:w-[15%] bg-linear-to-b lg:bg-linear-to-r from-white to-transparent pointer-events-none" />
            {/* Bottom navy blend overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-[#001B4F] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="max-w-[1760px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-6 px-5 sm:px-8 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-6 items-center border-t border-[#D4A13A]/70 shadow-[0_-8px_30px_rgba(0,12,36,0.15)] group/strip"
          style={{
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:divide-x divide-white/20 gap-y-5 gap-x-4 w-full">
            {bottom.map((b, i) => (
              <div key={i} className="flex items-center gap-3.5 text-white sm:pl-0 lg:pl-6 first:pl-0">
                <div
                  style={{ animationDelay: `${i * 0.4}s` }}
                  className="h-12 w-12 rounded-full border-2 border-[#D4A13A]/80 flex items-center justify-center shrink-0 p-2 bg-[#001B4F]/50 shadow-[0_0_15px_rgba(212,161,58,0.25)] animate-float-slow"
                >
                  <RenderIcon icon={b.icon} className="h-7 w-7 object-contain" />
                </div>
                <div className="text-[14px] leading-snug">
                  <div className="font-bold text-gold text-[15px] drop-shadow-sm">{b.t}</div>
                  <div className="text-white/90 text-[13.5px] mt-0.5 font-medium">{b.s}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white text-[15px] font-medium border-l-[4px] pl-4 lg:pl-6 w-full max-w-full lg:max-w-xs leading-relaxed shrink-0 drop-shadow-md"
            style={{ borderColor: GOLD }}
          >
            We help you find spaces that drive performance and{" "}
            <span className="font-bold" style={{ color: GOLD }}>create value.</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full text-center py-4 px-5 bg-white border-b-2">
        <p className="font-sans text-[#001B4F] text-[15px] sm:text-base">
          Better decisions today.{" "}
          <span className="italic font-bold" style={{ color: GOLD }}>
            Stronger returns tomorrow.
          </span>
        </p>
      </div>
    </section>
  );
}
