import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { y, SlideLogoBadge, ne, T, SlideImage, GOLD } from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";

function SiteVisitSpotlightCard({ e, index, isActive }: { e: any; index: number; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = isHovered || isActive;

  return (
    <div
      className={`relative w-full h-full min-h-[155px] sm:min-h-[145px] xl:min-h-[150px] p-5 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
        active 
          ? "border-[#D4A13A] shadow-[0_15px_30px_rgba(0,27,79,0.2)] -translate-y-1.5 scale-[1.02]" 
          : "bg-white border-slate-100 shadow-sm hover:border-[#D4A13A]/50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with deep navy gradient when active */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-[#001B4F] to-[#001233] transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Subtle glow effect overlay */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4A13A]/20 via-transparent to-transparent transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`} 
      />

      <div className="relative z-10 flex flex-col h-full justify-center">
        <div className="flex items-center gap-3 mb-2.5">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
            active ? "bg-[#D4A13A] text-[#001B4F] shadow-lg scale-110 -rotate-3" : "bg-[#001B4F]/5 text-[#001B4F]"
          }`}>
            <SlideImage src={e.icon} size={22} className={`transition-all duration-500 ${active ? "brightness-0" : ""}`} />
          </div>
          <h4 className={`font-bold text-[15px] sm:text-[16px] font-heading leading-tight transition-colors duration-500 ${
            active ? "text-[#D4A13A]" : "text-[#001B4F]"
          }`}>
            {e.title}
          </h4>
        </div>
        
        <p className={`text-[12.5px] sm:text-[13px] font-medium leading-relaxed whitespace-pre-line transition-colors duration-500 ${
          active ? "text-white/90" : "text-slate-500"
        }`}>
          {e.desc}
        </p>
      </div>
    </div>
  );
}

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideGuidedSiteVisits() {
  const { settings } = useSettings();
  const visitsData = settings?.sections?.siteVisits;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Cross pattern: 0 (Top-Left) -> 3 (Bottom-Right) -> 1 (Top-Right) -> 2 (Bottom-Left)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 2500); // Flip every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  const crossSequence = [0, 3, 1, 2];
  const displaySpotlightCards = ne.map((defaultCard: any, i: number) => {
    const dbCard = visitsData?.spotlightCards?.[i] || visitsData?.items?.[i];
    if (!dbCard) return defaultCard;
    return {
      ...defaultCard,
      title: dbCard.title || defaultCard.title,
      desc: dbCard.desc || defaultCard.desc,
    };
  });

  const displayFeatures = T.map((defaultFeature: any, i: number) => {
    const dbFeature = visitsData?.features?.[i] || visitsData?.blueStrip?.[i];
    if (!dbFeature) return defaultFeature;
    return {
      ...defaultFeature,
      title: dbFeature.title || defaultFeature.title,
      desc: dbFeature.desc || defaultFeature.desc,
    };
  });

  return (
    <section
      id="guided-site-visits"
      className="w-full bg-[#fcfdfe] py-12 lg:py-20 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-10 lg:gap-16 items-stretch">
          {/* Left Column: Heading, Subheading & Checklist - Reveal on scroll */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp(0, 0.5)} className="flex items-center gap-3 mb-3">
              <SlideLogoBadge variant="inline" size="small" />
            </motion.div>
            <motion.h2 variants={fadeInUp(0.1, 0.6)} className="h1-global text-primary mt-2">
              {formatDynamicText(visitsData?.heading || "Guided Site Visits.\n[gold]Informed Impressions.[/gold]")}
            </motion.h2>
            <motion.div variants={fadeInUp(0.2, 0.5)}>
              <div className="gold-divider my-4" />
            </motion.div>
            <motion.p
              variants={fadeInUp(0.3, 0.6)}
              className="p-global text-primary/80 max-w-lg md:max-w-none lg:max-w-lg mb-8"
            >
              {formatDynamicText(visitsData?.description || "We coordinate and guide site visits that go beyond a walkthrough. See what matters. Ask the right questions. Get real clarity.", GOLD)}
            </motion.p>

            {/* Interactive Grid Cards with hover scale & shadow */}
            <motion.div variants={staggerContainer(0.08, 0.4)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-5 mt-6 max-w-2xl md:max-w-none lg:max-w-2xl">
              {displaySpotlightCards.map((e: any, index: number) => (
                <motion.div key={e.title} variants={fadeInUp(0, 0.5)} className="h-full">
                  <SiteVisitSpotlightCard e={e} index={index} isActive={index === crossSequence[activeIndex]} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Image and Overlapping Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] xs:aspect-video sm:aspect-auto min-h-[240px] sm:min-h-[450px] lg:min-h-[500px] max-sm:-mx-5 max-sm:rounded-none max-sm:border-none max-sm:shadow-none rounded-2xl overflow-hidden shadow-lg border border-slate-200"
          >
            <ProgressiveImage
              src={visitsData?.imageUrl || "/images/Guidedsite_img.webp"}
              alt="Guided Site Visits"
              className="absolute inset-0 w-full h-full object-contain bg-slate-50/50 sm:object-cover"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={7}
            />

            {/* Floating Badge with breathing pulse effect */}
            <div
              className="absolute right-4 top-4 bg-primary rounded-xl hidden sm:flex items-center gap-3.5 shadow-2xl border border-white/10 z-20 p-4 animate-float-slow"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <SlideImage src={y.location} size={38} />
              </div>
              <div>
                <p className="text-white font-heading font-bold text-sm sm:text-base leading-tight">
                  {formatDynamicText(visitsData?.badgeTitle || "See Beyond. Understand Deeply.", GOLD)}
                </p>
                <p className="text-gold font-heading font-bold text-xs sm:text-sm mt-1 leading-tight">
                  {formatDynamicText(visitsData?.badgeSubtitle || "Decide Confidently.", GOLD)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pillars Section below grid with staggered entrance (Edge to Edge) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
        className="mt-16 w-full py-10 px-5 sm:px-8 lg:px-16 border-t border-[#D4A13A]/70 shadow-[0_-8px_30px_rgba(0,12,36,0.15)] group/strip"
        style={{
          background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
          backgroundSize: "300% 300%",
          animation: "glowMove 10s ease infinite",
        }}
      >
        <div className="max-w-[1760px] mx-auto w-full">
          <h3 className="font-heading text-lg text-gold text-center font-extrabold pb-4 border-b border-white/20 uppercase tracking-[0.2em] mb-8 drop-shadow-md">
            {formatDynamicText(visitsData?.stripHeading || "Our Perspective", GOLD)}
          </h3>
          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
          >
            {displayFeatures.map((e: any, i: number) => (
              <motion.div
                key={e.title || i}
                variants={fadeInUp(0, 0.5)}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-start gap-3.5 cursor-default group"
              >
                <div
                  style={{ animationDelay: `${i * 0.4}s` }}
                  className="h-12 w-12 rounded-full border-2 border-[#D4A13A]/80 flex items-center justify-center shrink-0 p-2.5 bg-[#001B4F]/50 shadow-[0_0_15px_rgba(212,161,58,0.25)] animate-float-slow group-hover:bg-[#D4A13A] group-hover:shadow-[0_0_20px_rgba(212,161,58,0.5)] transition-all duration-300"
                >
                  <SlideImage src={e.icon} size={26} className="object-contain group-hover:brightness-0 transition-all duration-300" />
                </div>
                <div className="text-[14px] leading-snug">
                  <div className="font-bold text-gold text-[15px] drop-shadow-sm group-hover:text-white transition-colors duration-300">
                    {e.title}
                  </div>
                  <div className="text-white/90 text-[13px] mt-1 font-medium whitespace-pre-line leading-relaxed group-hover:text-gold transition-colors duration-300">
                    {e.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Statement strip */}
      <div className="w-full text-center py-4 px-5 bg-white border-b-2">
        <p className="font-sans text-[#001B4F] text-[15px] sm:text-base">
          {formatDynamicText(visitsData?.stripText || "We don't just show you properties. We help you choose [gold]the right one.[/gold]", GOLD)}
        </p>
      </div>
    </section>
  );
}
