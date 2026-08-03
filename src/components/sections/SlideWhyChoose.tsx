import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { y, SlideLogoBadge, SlideImage, iconRupeeCircle, GOLD } from "./shared";
import { fadeInUp, scaleUp, staggerContainer, fadeInLeft } from "@/lib/motion-variants";

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideWhyChoose() {
  const { settings } = useSettings();
  const chooseData = settings?.sections?.whyChoose;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const chooseItems = [
    {
      icon: y.targetGold,
      title: "Buyer First Always",
      desc: "Your goals come first. Every recommendation is designed solely in your best interest.",
    },
    {
      icon: y.barChart,
      title: "Structured & Objective",
      desc: "We follow a proven evaluation framework to compare projects across parameters objectively.",
    },
    {
      icon: y.searchBuilding,
      title: "Comprehensive Intelligence",
      desc: "Access verified, real-time information across developers, projects, amenities, and infrastructure.",
    },
    {
      icon: y.shieldCheck,
      title: "Independent & Unbiased",
      desc: "We are not tied to any developer. Our only commitment is to your best decision.",
    },
    {
      icon: y.monitor,
      title: "Data + Experience Driven",
      desc: "Powerful data, local market insights and deep domain expertise lead to better outcomes.",
    },
    {
      icon: y.location,
      title: "Lifestyle & Location",
      desc: "We evaluate connectivity, social infrastructure, lifestyle fit and future readiness.",
    },
    {
      icon: y.vastu,
      title: "Vastu & Wellness",
      desc: "Vastu alignment and wellness-focused living factors are part of our evaluation process.",
    },
    {
      icon: iconRupeeCircle,
      title: "Future Value Focus",
      desc: "We assess appreciation potential, rental yields and investment fundamentals – not just today's price.",
    },
    {
      icon: y.handshake,
      title: "End-to-End Empowerment",
      desc: "From defining your needs to final shortlist – we guide you at every step of the journey.",
    },
  ];

  const defaultIcons = [y.targetGold, y.barChart, y.searchBuilding, y.shieldCheck, y.monitor, y.location, y.vastu, iconRupeeCircle, y.handshake];

  const displayItems = Array.isArray(chooseData?.items) && chooseData.items.length > 0
    ? chooseData.items.map((it: any, idx: number) => ({
        icon: defaultIcons[idx % defaultIcons.length],
        title: it.title || "",
        desc: it.desc || "",
      }))
    : chooseItems;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [displayItems.length]);

  const bottomCard = [
    { icon: y.eye, title: "Better Clarity", desc: "See the full picture." },
    { icon: y.shieldCheck, title: "Greater Confidence", desc: "Decide with conviction." },
    { icon: y.heart, title: "Lasting Satisfaction", desc: "Invest in what's right for you." },
  ];

  return (
    <section
      id="why-choose"
      className="w-full border-t border-slate-900 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020B14 0%, #001B4F 55%, #020B14 100%)",
      }}
    >
      {/* ── TOP: Left heading | Right image ── */}
      <div className="flex flex-col lg:flex-row relative min-h-[420px] lg:min-h-[480px]">
        {/* Left: text column */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="flex flex-col justify-center gap-5 px-5 py-10 sm:px-8 lg:px-16 lg:py-14 w-full lg:w-[46%] relative z-10"
        >
          <motion.div variants={fadeInUp(0, 0.5)} className="hidden lg:block">
            <SlideLogoBadge variant="inline" size="small" />
          </motion.div>

          <motion.h2 variants={fadeInUp(0.1, 0.6)} className="h1-global text-white">
            {formatDynamicText(chooseData?.heading || "Why Choose Property[gold]Works?[/gold]", GOLD)}
          </motion.h2>

          <motion.div variants={fadeInUp(0.2, 0.5)}>
            <div className="gold-divider" />
          </motion.div>

          <motion.p variants={fadeInUp(0.3, 0.6)} className="p-global text-white/75 max-w-[480px]">
            {formatDynamicText(chooseData?.description || "Because real estate decisions deserve more than just listings. They deserve intelligence, structure and unbiased guidance.", GOLD)}
          </motion.p>
        </motion.div>

        {/* Right: banner image with Ken burns reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-[54%] h-[240px] sm:h-[300px] lg:h-auto overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.6 }}
            whileHover={{ scale: 1.04 }}
            src={chooseData?.imageUrl || "/images/whyChoose-main.jpeg"}
            alt="Why Choose PropertyWorks"
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />
          {/* Left gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #001B4F 0%, rgba(0,27,79,0.7) 30%, rgba(0,27,79,0.15) 65%, transparent 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #020B14 0%, transparent 50%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── MIDDLE: 9-column features grid staggered ── */}
      <div className="max-w-[1760px] mx-auto w-full px-0">
        <div className="h-px w-full" style={{ background: "rgba(212,161,58,0.2)" }} />

        <style>{`
          @keyframes slide-shimmer {
            0% { transform: translateX(-150%) skewX(-25deg); }
            100% { transform: translateX(150%) skewX(-25deg); }
          }
          .shimmer-effect {
            animation: slide-shimmer 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>

        <motion.div
          variants={staggerContainer(0.06, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 divide-x divide-white/10"
        >
          {displayItems.map((item: any, index: number) => {
            const isActive = activeIndex === index;
            const isFlipped = hoverIndex === index || (hoverIndex === null && isActive);
                const iconUrl = typeof item.icon === "string" ? item.icon : (item.icon as any)?.src || "";

            return (
              <motion.div
                key={item.title}
                variants={fadeInUp(0, 0.45)}
                className="group cursor-pointer relative h-[180px] lg:h-[220px]"
                style={{ perspective: 1200 }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div 
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 sm:px-3 gap-4"
                    style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
                  >
                    {/* Glowing effect under icon when inactive but next in line */}
                    <div className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-white/5 border border-gold/40 transition-transform duration-500 relative">
                      <SlideImage src={item.icon} size={24} className="relative z-10" />
                    </div>
                    <p className="text-white text-[12.5px] sm:text-[13px] lg:text-[14px] font-bold leading-snug">
                      {item.title}
                    </p>
                  </div>

                  {/* Back Side (Gold gradient with Navy Text & Icon) */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 lg:px-3 bg-gradient-to-br from-[#D4A13A] via-[#f6d98e] to-[#D4A13A] z-10 shadow-[0_0_25px_rgba(212,161,58,0.5)] overflow-hidden"
                    style={{ 
                      WebkitBackfaceVisibility: "hidden", 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* White Shimmer Effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-0 shimmer-effect opacity-70"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                        width: "80%",
                        top: 0,
                        bottom: 0,
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-1.5 lg:gap-2">
                      <div 
                        className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px] bg-[#001B4F] shrink-0"
                        style={{
                          WebkitMaskImage: `url("${iconUrl}")`,
                          WebkitMaskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskImage: `url("${iconUrl}")`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center"
                        }}
                      />
                      <p className="text-[#001B4F] text-[12px] lg:text-[13.5px] font-bold leading-tight">
                        {item.title}
                      </p>
                      <div className="w-8 h-[2px] shrink-0 rounded-full bg-[#001B4F]/40 my-0.5" />
                      <p className="text-[#001B4F]/95 text-[10.5px] lg:text-[11.5px] font-semibold leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="h-px w-full" style={{ background: "rgba(212,161,58,0.2)" }} />
      </div>

      {/* ── BOTTOM: Full-width gold-bordered card outcomes ── */}
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ boxShadow: "0 15px 30px rgba(212,161,58,0.1)" }}
          className="w-full rounded-xl border border-gold/50 overflow-hidden transition-colors duration-300"
          style={{ background: "rgba(0,27,79,0.6)", backdropFilter: "blur(6px)" }}
        >
          <div className="flex flex-col md:flex-wrap md:flex-row lg:flex-nowrap divide-y md:divide-y-0 lg:divide-x divide-gold/20">
            {/* Section 1 – Shield tagline */}
            <div className="flex items-center gap-4 px-6 py-5 w-full md:w-1/2 lg:w-[30%] shrink-0 md:border-r md:border-b lg:border-r-0 lg:border-b-0 border-gold/20">
              <div
                className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-gold/60 bg-gold/10 animate-pulse-scale"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="9 12 11 14 15 10"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="border-l border-gold/30 pl-4">
                <p className="text-gold font-heading font-bold text-[13px] sm:text-[14px] leading-snug">
                  {formatDynamicText(chooseData?.blueStripTagline1 || "We Don't Just Show Properties.", GOLD, "#ffffff")}
                </p>
                <p className="text-white text-[13.5px] sm:text-[14px] font-medium mt-0.5 leading-snug">
                  {formatDynamicText(chooseData?.blueStripTagline2 || "We Help You Make the Right Decision.", GOLD, "#ffffff")}
                </p>
              </div>
            </div>

            {/* Sections 2-4 – Outcomes */}
            {bottomCard.map((defaultCard, idx) => {
              const dbItem = chooseData?.blueStripOutcomes?.[idx] || chooseData?.bottomCard?.[idx];
              const title = dbItem?.title || defaultCard.title;
              const desc = dbItem?.desc || defaultCard.desc;
              const borderClass = idx === 1
                ? "md:border-r md:border-b lg:border-r-0 lg:border-b-0 border-gold/20"
                : "md:border-b lg:border-b-0 border-gold/20";
              return (
                <motion.div
                  key={idx}
                  whileHover={{ backgroundColor: "rgba(212,161,58,0.06)" }}
                  className={`flex items-center gap-3 px-5 py-5 w-full md:w-1/2 lg:w-auto lg:flex-1 cursor-default transition-colors duration-200 ${borderClass}`}
                >
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                    <SlideImage src={defaultCard.icon} size={18} />
                  </div>
                  <div>
                    <p className="text-gold font-bold text-[13px] sm:text-[13.5px] leading-tight">
                      {formatDynamicText(title, GOLD, "#ffffff")}
                    </p>
                    <p className="text-white text-[11.5px] sm:text-[12px] mt-0.5 font-medium leading-tight">
                      {formatDynamicText(desc, GOLD, "#ffffff")}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Section 5 – calendar */}
            <motion.div
              whileHover={{ backgroundColor: "rgba(212,161,58,0.06)" }}
              className="flex items-center gap-3 px-5 py-5 w-full md:w-1/2 lg:w-auto lg:flex-1 cursor-default transition-colors duration-200 md:border-r lg:border-r-0 border-gold/20"
            >
              <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                <SlideImage src={y.calendar} size={18} />
              </div>
              <div>
                <p className="text-gold font-bold text-[13px] sm:text-[13.5px] leading-tight">
                  {formatDynamicText(chooseData?.blueStripJourneyTitle || "Guided Journey", GOLD, "#ffffff")}
                </p>
                <p className="text-white text-[11.5px] sm:text-[12px] mt-0.5 font-medium leading-tight">
                  {formatDynamicText(chooseData?.blueStripJourneyDesc || "From first call to final decision.", GOLD, "#ffffff")}
                </p>
              </div>
            </motion.div>

            {/* Section 6 – CTA text */}
            <div className="flex items-center px-6 py-5 w-full md:w-1/2 lg:w-[18%] shrink-0">
              <p className="text-white text-[12px] sm:text-[13px] font-semibold leading-snug italic">
                {formatDynamicText(chooseData?.blueStripCtaText || "Let's make your next property decision your [gold]best decision.[/gold]", GOLD, "#ffffff")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
