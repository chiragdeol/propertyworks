import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { y, SlideLogoBadge, he, ge, _e, SlideCheckIcon, SlideImage, GOLD } from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ShortlistButton from "../ShortlistButton";

function ServiceCard({ e, index, isActive }: { e: any; index: number; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = isActive || isHovered;
  const iconUrl = typeof e.icon === "string" ? e.icon : e.icon?.src || "";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col rounded-[16px] gap-4 p-5 cursor-pointer transition-all duration-500 overflow-hidden ${
        active 
          ? "shadow-[0_15px_35px_rgba(0,27,79,0.25)] -translate-y-2 scale-[1.025]" 
          : "shadow-lg"
      }`}
      style={{
        background: active 
          ? "linear-gradient(135deg, rgba(0, 27, 79, 0.95) 0%, rgba(0, 18, 51, 0.75) 100%)"
          : "linear-gradient(135deg, rgba(212, 161, 58, 0.95) 0%, rgba(246, 217, 142, 0.8) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: active ? "1.5px solid rgba(212, 161, 58, 0.8)" : "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      {/* Shimmery moving line effect */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 shimmer-effect transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-50"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          width: "80%",
          top: 0,
          bottom: 0,
        }}
      />

      <div className="relative z-10">
        <div className={`absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors duration-500 ${active ? "bg-gold" : "bg-[#001B4F]"}`}>
          <span className={`text-sm font-bold leading-none transition-colors duration-500 ${active ? "text-[#001B4F]" : "text-white"}`}>{e.num}</span>
        </div>
        <div className="mt-5 mb-2 flex justify-center shrink-0 relative h-[48px] w-[48px] mx-auto">
          {/* Active: Real Color */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
            <SlideImage src={e.icon} size={48} className="drop-shadow-sm" />
          </div>
          {/* Inactive: Brand Color (Navy #001B4F) */}
          <div 
            className={`absolute inset-0 bg-[#001B4F] transition-opacity duration-500 ${active ? "opacity-0" : "opacity-100"}`}
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
        </div>
        <h3 className={`whitespace-pre-line text-center font-heading text-[15px] sm:text-[16px] font-bold leading-tight drop-shadow-sm transition-colors duration-500 ${active ? "text-white" : "text-[#001B4F]"}`}>
          {e.title}
        </h3>
        <p className={`whitespace-pre-line text-center text-xs font-bold leading-tight mt-1 transition-colors duration-500 ${active ? "text-gold" : "text-[#001B4F]/85"}`}>
          {e.subtitle}
        </p>
        <div className={`mt-4 flex-1 space-y-2.5 flex flex-col border-t pt-4 transition-colors duration-500 ${active ? "border-white/10" : "border-[#001B4F]/15"}`}>
          {e.points.map((pt: string) => (
            <div key={pt} className={`flex items-start gap-2 text-[12.5px] font-medium leading-relaxed transition-colors duration-500 ${active ? "text-white/85" : "text-[#001B4F]/90"}`}>
              <span className={`leading-none mt-0.5 text-[14px] transition-colors duration-500 ${active ? "text-gold" : "text-white drop-shadow-sm"}`}>•</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideOurServices() {
  const { settings } = useSettings();
  const servicesData = settings?.sections?.services;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const defaultServiceIcons = [y.searchBuilding, y.commercial, y.residential];

  const displayServices = ge.map((defaultCard: any, i: number) => {
    const dbItem = servicesData?.items?.[i];
    if (!dbItem) return defaultCard;

    let dbPoints: string[] = [];
    if (typeof dbItem.bullets === "string" && dbItem.bullets.trim().length > 0) {
      dbPoints = dbItem.bullets.split("|").map((s: string) => s.trim()).filter(Boolean);
    } else if (Array.isArray(dbItem.points) && dbItem.points.length > 0) {
      dbPoints = dbItem.points;
    } else if (dbItem.description) {
      dbPoints = [dbItem.description];
    }

    const mergedPoints = dbPoints.length >= 5 ? dbPoints : [
      ...dbPoints,
      ...defaultCard.points.slice(dbPoints.length)
    ];

    return {
      ...defaultCard,
      title: dbItem.title || defaultCard.title,
      subtitle: dbItem.subtitle || defaultCard.subtitle,
      points: mergedPoints
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % displayServices.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [displayServices.length]);

  return (
    <section id="services" className="w-full bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-[1760px] mx-auto w-full bg-[#fcfdfe] text-primary relative">
        {/* ── TOP: Heading+Content LEFT | Banner Image RIGHT ── */}
        <div className="flex flex-col lg:flex-row relative">
          {/* Left: Logo + H1 + description */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="flex flex-col justify-center gap-5 px-5 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 w-full lg:w-1/2 lg:min-h-[460px]"
          >
            <motion.div variants={fadeInUp(0, 0.5)} className="hidden lg:block">
              <SlideLogoBadge variant="inline" size="small" />
            </motion.div>

            <motion.div variants={fadeInUp(0.1, 0.6)}>
              <h2 className="h1-global text-primary">
                {formatDynamicText(servicesData?.heading || "Our [gold]Services[/gold]")}
              </h2>
              <h2 className="text-primary text-[clamp(13px,1.3vw,17px)] font-bold mt-2">
                {formatDynamicText(servicesData?.subheading || "Real Estate Intelligence & Advisory Services", GOLD)}
              </h2>
              <div className="gold-divider mt-3" />
            </motion.div>

            <motion.p variants={fadeInUp(0.2, 0.6)} className="p-global text-primary/80">
              {formatDynamicText(servicesData?.paragraph1 || "At PropertyWorks, our services are designed to simplify the traditionally fragmented and confusing real estate evaluation journey through structured guidance, project intelligence, comparative analysis, and practical advisory support.", GOLD)}
            </motion.p>
            <motion.p variants={fadeInUp(0.3, 0.6)} className="p-global text-primary/80">
              {formatDynamicText(servicesData?.paragraph2 || "Whether you are exploring a residential opportunity for your family or evaluating a commercial property for business or investment purposes, our objective is to help you make more informed and strategically aligned decisions with greater clarity and confidence.", GOLD)}
            </motion.p>

            {/* Approach card - mobile */}
            <motion.div variants={fadeInUp(0.4, 0.6)}>
              <div
                className="w-full rounded-[14px] border border-gold/45 shadow-xl p-6 flex flex-col gap-4 text-white lg:hidden"
                style={{
                  background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
                  backgroundSize: "300% 300%",
                  animation: "glowMove 10s ease infinite",
                }}
              >
                <h3 className="h3-global text-gold">Our Approach</h3>
                <div className="space-y-3 flex flex-col">
                  {he.map((e) => (
                    <div key={e} className="flex items-start gap-3">
                      <SlideCheckIcon />
                      <p className="p-global text-white">{e}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gold/30 my-1" />
                <p className="p-global text-white/95">
                  through a <span className="font-bold text-gold">guided, intelligence-driven</span>{" "}
                  approach.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Banner image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-1/2 h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[460px] overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${servicesData?.imageUrl || "/images/Our Services bg.webp"}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent lg:hidden" />
          </motion.div>

          {/* ── Approach card: overlaps image from right – lg only ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block absolute z-20"
            style={{ top: "clamp(20px,4%,40px)", right: "clamp(16px,2vw,40px)" }}
          >
            <div
              className="backdrop-blur-sm border border-gold/45 shadow-[0_8px_32px_rgba(0,27,79,0.30)] rounded-[14px] flex flex-col gap-3 text-white cursor-default animate-float-slow"
              style={{
                padding: "20px 22px",
                maxWidth: "clamp(240px,24vw,340px)",
                background: "linear-gradient(270deg, rgba(0,27,79,0.95), rgba(0,51,153,0.95), rgba(0,34,102,0.95), rgba(0,27,79,0.95))",
                backgroundSize: "300% 300%",
                animation: "glowMove 10s ease infinite",
              }}
            >
              <h3 className="h3-global text-gold">Our Approach</h3>
              <div className="space-y-2 flex flex-col">
                {he.map((e) => (
                  <div key={e} className="flex items-start gap-2.5">
                    <SlideCheckIcon />
                    <p className="text-[clamp(11px,1vw,13px)] font-medium leading-snug text-white">
                      {e}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-px bg-gold/30" />
              <p className="text-[clamp(11px,1vw,13px)] font-medium text-white/90">
                through a <span className="font-bold text-gold">guided, intelligence-driven</span>{" "}
                approach.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Lower sections ── */}
        <div className="px-5 py-8 sm:px-8 md:px-10 lg:px-16 lg:py-12 flex flex-col gap-0">
          {/* Middle Specialized Solutions */}
          <div className="flex flex-col gap-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h3-global text-primary text-center"
            >
              Our Specialized Solutions
            </motion.h3>

            <style>{`
              @keyframes slide-shimmer {
                0% { transform: translateX(-150%) skewX(-25deg); }
                100% { transform: translateX(150%) skewX(-25deg); }
              }
              .shimmer-effect {
                animation: slide-shimmer 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}</style>
            <motion.div
              variants={staggerContainer(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {displayServices.map((e, i) => (
                <motion.div key={e.num} variants={fadeInUp(0, 0.55)}>
                  <ServiceCard e={e} index={i} isActive={i === activeCardIndex} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-white shadow-lg border border-[#D4A13A]/50"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="flex items-center gap-4 w-full lg:w-[40%]">
              <div className="animate-wiggle-slow">
                <SlideImage src={y.logo} size={80} />
              </div>
              <div>
                <h3 className="h3-global text-white">Begin Your Guided Evaluation Journey</h3>
                <p className="text-xs sm:text-sm font-semibold text-gold mt-1">
                  Residential or Commercial — Evaluate Real Estate With Greater Clarity &amp;
                  Confidence
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full lg:w-[55%]">
              <ShortlistButton type="Residential" />
              <ShortlistButton type="Commercial" />
            </div>
          </motion.div>

          {/* Bottom indicators strip */}
          <div className="border-t border-primary/10 pt-10 mt-12 overflow-hidden relative">
            {/* Gradient masks for smooth fading on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fcfdfe] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fcfdfe] to-transparent z-10 pointer-events-none" />
            
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-scroll {
                animation: marquee-scroll 45s linear infinite;
                will-change: transform;
              }
              .animate-marquee-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div 
              className="flex w-max animate-marquee-scroll" 
              style={{ gap: "24px", paddingRight: "24px" }}
            >
              {[..._e, ..._e].map((e, t) => (
                <div
                  key={`${e.title}-${t}`}
                  className="flex items-center gap-3.5 bg-white border border-[#D4A13A]/30 shadow-[0_4px_15px_rgba(0,27,79,0.04)] rounded-[20px] px-5 py-3.5 min-w-[300px] hover:border-[#D4A13A] hover:shadow-[0_8px_25px_rgba(212,161,58,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-[44px] h-[44px] rounded-full bg-[#001B4F]/5 flex items-center justify-center shrink-0 group-hover:bg-[#001B4F] group-hover:shadow-md transition-colors duration-300">
                    <SlideImage src={e.icon} size={28} className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-heading text-[14px] font-bold text-gold
                     leading-tight group-hover:text-[#D4A13A] transition-colors duration-300">
                      {e.title}
                    </h4>
                    <p className="text-[11.5px] text-[#001B4F]/70 font-medium mt-1 leading-snug">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
