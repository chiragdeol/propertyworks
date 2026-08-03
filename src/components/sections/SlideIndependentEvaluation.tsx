import { motion } from "framer-motion";
import { y, SlideLogoBadge, ie, ae, oe, se, SlideDeveloperCard, SlideImage, GOLD } from "./shared";
import {
  fadeInUp,
  scaleUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeInDown,
} from "@/lib/motion-variants";

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideIndependentEvaluation() {
  const { settings } = useSettings();
  const evaluationData = settings?.sections?.independentEvaluation;

  const pillarsList = Array.isArray(evaluationData?.pillars) && evaluationData.pillars.length > 0
    ? evaluationData.pillars.map((p: any, idx: number) => ({
        icon: ie[idx % ie.length]?.icon || y.buildingsFilled,
        title: p.title || ie[idx % ie.length]?.title || "",
        desc: p.desc || p.subtitle || ie[idx % ie.length]?.desc || "",
      }))
    : ie;

  const noBiasPointsList = Array.isArray(evaluationData?.noBiasPoints) && evaluationData.noBiasPoints.length > 0
    ? evaluationData.noBiasPoints.map((pt: any) => typeof pt === "string" ? pt : pt.title || pt.label || "")
    : Array.isArray(evaluationData?.clarityPoints) && evaluationData.clarityPoints.length > 0
    ? evaluationData.clarityPoints.map((pt: any) => typeof pt === "string" ? pt : pt.title || pt.label || "")
    : ae;

  return (
    <section className="slide-section w-full overflow-visible lg:overflow-hidden bg-[#F8FAFC]">
      {/* MOBILE LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="block md:hidden w-full bg-[#fcfdfe] text-primary relative"
      >
        <div className="px-5 pt-8 pb-4 md:px-10 md:pt-10 flex flex-col gap-4">
          <h2 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
            {formatDynamicText(evaluationData?.heading || "Independent\nEvaluation Across\n[gold]Multiple Developers[/gold]", GOLD)}
          </h2>
          <div className="gold-divider mt-2 mb-1" />
          <p className="p-global text-primary/80">
            {formatDynamicText(evaluationData?.description || "We evaluate opportunities across the market objectively. We do not push developer inventory. Our only focus is helping you find the right property that matches your criteria and interests.", GOLD)}
          </p>
        </div>
        <div className="px-5 pb-8 md:px-10 md:pb-12 flex flex-col gap-8">

          {/* Vertical Flow Diagram for Mobile */}
          <div className="flex flex-col items-center my-4 py-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,161,58,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* 1. YOU Card */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[200px] h-[68px] rounded-xl border border-gold/30 bg-white shadow-md flex items-center gap-3 px-3.5">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <SlideImage src={y.user} size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <p className="text-[12px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                    {formatDynamicText(evaluationData?.youTitle || "YOU")}
                  </p>
                  <p className="text-[10px] font-bold text-[#001B4F]/60 leading-tight">
                    {formatDynamicText(evaluationData?.youSubtitle || "Your Goals & Priorities")}
                  </p>
                </div>
              </div>
            </div>

            {/* Dotted connector */}
            <div className="h-8 w-[2px] border-l-2 border-dashed border-[#D4A13A] my-1.5" />

            {/* 2. PropertyWorks Diamond Hub */}
            <div className="relative z-10 flex items-center justify-center my-2">
              <div className="absolute inset-[-40px] rounded-full bg-[radial-gradient(circle,rgba(212,161,58,0.12)_0%,transparent_70%)] blur-md pointer-events-none" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
                className="absolute pointer-events-none"
                style={{
                  inset: "-20px",
                  borderRadius: "50%",
                  border: "3px solid rgba(212, 161, 58, 0.7)",
                  transformStyle: "preserve-3d",
                  rotateX: 70,
                }}
              />

              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#001B4F] to-[#000d2b] border-2 border-gold shadow-lg flex items-center justify-center rotate-45">
                  <div className="absolute inset-[6px] rounded-[18px] border border-gold/25" />
                </div>

                <div className="relative z-20 flex flex-col items-center justify-center text-center p-2 select-none">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center mb-1.5 shadow-sm">
                    <SlideImage src={y.logo} size={24} className="filter brightness-110" />
                  </div>
                  <p className="text-[11.5px] font-heading font-extrabold tracking-tight text-white leading-none">
                    Property<span className="text-gold">Works</span>
                  </p>
                  <div className="h-[1px] w-8 bg-gold/50 my-1.5" />
                  <div className="px-1.5 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-[7.5px] font-extrabold uppercase text-gold tracking-widest leading-none">
                    {formatDynamicText(evaluationData?.hubBadge || "Evaluation")}
                  </div>
                </div>
              </div>
            </div>

            {/* Dotted connector */}
            <div className="h-8 w-[2px] border-l-2 border-dashed border-[#D4A13A] my-1.5" />

            {/* 3. Shortlisted Card */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[200px] h-[68px] rounded-xl border border-gold/30 bg-white shadow-md flex items-center gap-3 px-3.5">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <SlideImage src={y.clipboardCheck} size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <p className="text-[12px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                    {formatDynamicText(evaluationData?.shortlistedTitle || "SHORTLISTED")}
                  </p>
                  <p className="text-[10px] font-bold text-[#001B4F]/60 leading-tight">
                    {formatDynamicText(evaluationData?.shortlistedSubtitle || "Aligned Opportunities")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Staggered checklist */}
          <motion.div variants={staggerContainer(0.08, 0.2)} className="flex flex-col gap-5">
            {pillarsList.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp(0, 0.5)}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-primary/5 cursor-default transition-all duration-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#001B4F] border border-gold/30 shadow-sm text-white">
                  <SlideImage src={item.icon} size={22} className="filter brightness-110" />
                </div>
                <div>
                  <h4 className="font-bold text-[#001B4F] text-[14px] sm:text-[15px] font-heading leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[#001B4F]/70 text-[12px] sm:text-[12.5px] font-medium leading-relaxed mt-1 whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-[14px] text-white p-6 shadow-xl border border-gold/30 flex flex-col items-center text-center gap-3 cursor-default transition-all duration-300"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center p-2.5">
              <SlideImage src={y.logo} size={48} className="filter brightness-110 animate-pulse-scale" />
            </div>
            <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-white leading-tight">
              Property
              <span className="text-gold"> Works</span>
            </h3>
            <p className="text-[12px] sm:text-[13px] text-white/80 font-medium max-w-md leading-relaxed">
              {formatDynamicText(evaluationData?.blueStripHeading || "A Wide Network. One Trusted Partner.", GOLD)}
              <br />
              {formatDynamicText(evaluationData?.blueStripSubheading || "Access to top developers, evaluated through one intelligent and objective framework.", GOLD)}
            </p>
          </motion.div>

          <div className="bg-[#fcfdfe] rounded-[14px] border border-primary/10 shadow-md flex flex-col items-center p-6 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#001B4F] flex items-center justify-center shadow-md border border-gold/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-3z"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <path
                    d="M9 11l2 2 4-4"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-primary text-[18px] sm:text-[20px] font-heading font-extrabold tracking-tight">
                {formatDynamicText(evaluationData?.noBiasTitle || "No Bias. [gold]Only Clarity.[/gold]", GOLD)}
              </h3>
            </div>

            <motion.div
              variants={staggerContainer(0.06, 0.2)}
              className="grid grid-cols-2 gap-4 w-full"
            >
              {noBiasPointsList.map((e: string, idx: number) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp(0, 0.4)}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-gold/30 hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7.2" stroke="#D4A13A" strokeWidth="1.2" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="#D4A13A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[11.5px] sm:text-[12.5px] font-bold text-primary/80 leading-tight">
                    {e}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Developer Cards list */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-[16px] sm:text-[18px] font-bold text-primary text-center">
              Market-Wide Developer Access
            </h3>

            <motion.div
              variants={staggerContainer(0.06, 0.2)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {[...oe, ...se].map((e) => (
                <motion.div
                  key={e.name}
                  variants={fadeInUp(0, 0.4)}
                  whileHover={{ y: -5, scale: 1.03, borderColor: GOLD }}
                  className="cursor-pointer"
                >
                  <SlideDeveloperCard dev={e} className="h-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 bg-primary rounded-[14px] p-5 shadow-lg">
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div
                className="w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10 animate-pulse-scale"
              >
                <SlideImage src={y.usersGroup} size={28} />
              </div>
              <p className="text-white text-[12px] sm:text-[13px] font-medium leading-normal">
                {formatDynamicText(evaluationData?.bottomCard1Text || "We bring the entire market to you. You make the right choice with [gold]confidence.[/gold]", GOLD)}
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-3">
              <div
                className="w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10 animate-pulse-scale"
                style={{ animationDelay: "1.5s" }}
              >
                <SlideImage src={y.target} size={28} />
              </div>
              <p className="text-white text-[12px] sm:text-[13px] font-medium leading-normal">
                {formatDynamicText(evaluationData?.bottomCard2Text || "More options. Better insights. [gold]Stronger decisions.[/gold]", GOLD)}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[12px] bg-gold w-full mt-4" />
      </motion.div>

      {/* MEDIUM SCREEN LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="hidden md:block lg:hidden w-full bg-[#fcfdfe] text-primary relative"
      >
        <div className="px-8 pt-10 pb-4 flex flex-col gap-4">
          <h2 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
            {formatDynamicText(evaluationData?.heading || "Independent\nEvaluation Across\n[gold]Multiple Developers[/gold]", GOLD)}
          </h2>
          <div className="gold-divider mt-2 mb-1" />
          <p className="p-global text-slate-600 mt-2 max-w-2xl">
            {formatDynamicText(evaluationData?.description || "We evaluate opportunities across the market objectively. We do not push developer inventory. Our only focus is helping you find the right property that matches your criteria and interests.", GOLD)}
          </p>
        </div>

        <div className="px-8 pb-10 flex flex-col gap-8">
          {/* Orbital comparison grid */}
          <div className="px-8 py-8 my-4 bg-slate-50/50 rounded-2xl border border-slate-100 relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,161,58,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-[20px] text-primary tracking-tight">
                {formatDynamicText(evaluationData?.centerHeading || "A Wide Network. [gold]One Trusted Partner.[/gold]", GOLD)}
              </h2>
              <p className="text-[11px] text-primary/60 font-semibold tracking-wide uppercase mt-1">
                {formatDynamicText(evaluationData?.centerSubheading || "Access to top developers. Evaluated through one intelligent framework.", GOLD)}
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-stretch w-full max-w-4xl relative z-10">
              {/* Left Column - 3 Cards */}
              <div className="flex flex-col justify-between gap-4 py-2">
                {oe.map((e, idx) => (
                  <div key={idx} className="w-full hover:-translate-y-1 transition-transform duration-300">
                    <SlideDeveloperCard dev={e} />
                  </div>
                ))}
              </div>

              {/* Center Column */}
              <div className="flex flex-col items-center justify-center px-4">
                {/* YOU Card */}
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="w-[180px] h-[68px] rounded-xl border border-gold/30 bg-white shadow-md flex items-center gap-3 px-3.5">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <SlideImage src={y.user} size={20} />
                    </div>
                    <div className="flex flex-col text-left">
                      <p className="text-[12px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                        {formatDynamicText(evaluationData?.youTitle || "YOU")}
                      </p>
                      <p className="text-[10px] font-bold text-[#001B4F]/60 leading-tight">
                        {formatDynamicText(evaluationData?.youSubtitle || "Your Goals & Priorities")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-6 w-[2px] border-l-2 border-dashed border-[#D4A13A] my-1" />

                {/* Diamond Hub */}
                <div className="relative w-36 h-36 flex items-center justify-center scale-95 my-1">
                  <div className="absolute inset-[-20px] rounded-full bg-[radial-gradient(circle,rgba(212,161,58,0.12)_0%,transparent_70%)] blur-md pointer-events-none" />
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#001B4F] to-[#000d2b] border-2 border-gold shadow-lg flex items-center justify-center rotate-45">
                    <div className="absolute inset-[6px] rounded-[18px] border border-gold/25" />
                  </div>
                  <div className="relative z-20 flex flex-col items-center justify-center text-center p-2 select-none">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center mb-1.5 shadow-sm">
                      <SlideImage src={y.logo} size={20} className="filter brightness-110" />
                    </div>
                    <p className="text-[11px] font-heading font-extrabold tracking-tight text-white leading-none">
                      Property<span className="text-gold">Works</span>
                    </p>
                    <div className="h-[1px] w-6 bg-gold/50 my-1" />
                    <div className="px-1.5 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-[7px] font-extrabold uppercase text-gold tracking-widest leading-none">
                      {formatDynamicText(evaluationData?.hubBadge || "Evaluation")}
                    </div>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-6 w-[2px] border-l-2 border-dashed border-[#D4A13A] my-1" />

                {/* SHORTLISTED Card */}
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="w-[180px] h-[68px] rounded-xl border border-gold/30 bg-white shadow-md flex items-center gap-3 px-3.5">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                      <SlideImage src={y.clipboardCheck} size={20} />
                    </div>
                    <div className="flex flex-col text-left">
                      <p className="text-[12px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                        {formatDynamicText(evaluationData?.shortlistedTitle || "SHORTLISTED")}
                      </p>
                      <p className="text-[10px] font-bold text-[#001B4F]/60 leading-tight">
                        {formatDynamicText(evaluationData?.shortlistedSubtitle || "Aligned Opportunities")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 3 Cards */}
              <div className="flex flex-col justify-between gap-4 py-2">
                {se.map((e, idx) => (
                  <div key={idx} className="w-full hover:-translate-y-1 transition-transform duration-300">
                    <SlideDeveloperCard dev={e} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* No Bias. Only Clarity Card */}
          <div className="bg-[#fcfdfe] rounded-[14px] border border-primary/10 shadow-md flex flex-col items-center p-6 gap-6 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#001B4F] flex items-center justify-center shadow-md border border-gold/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-3z"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <path
                    d="M9 11l2 2 4-4"
                    stroke="#D4A13A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-primary text-[18px] sm:text-[20px] font-heading font-extrabold tracking-tight">
                {formatDynamicText(evaluationData?.noBiasTitle || "No Bias. [gold]Only Clarity.[/gold]", GOLD)}
              </h3>
            </div>

            <motion.div
              variants={staggerContainer(0.06, 0.2)}
              className="grid grid-cols-2 gap-4 w-full"
            >
              {noBiasPointsList.map((e: string, idx: number) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp(0, 0.4)}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-gold/30 hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7.2" stroke="#D4A13A" strokeWidth="1.2" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="#D4A13A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[11.5px] sm:text-[12.5px] font-bold text-primary/80 leading-tight">
                    {e}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Staggered checklist */}
          <motion.div variants={staggerContainer(0.08, 0.2)} className="flex flex-col gap-5 w-full max-w-4xl mx-auto">
            {pillarsList.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp(0, 0.5)}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-primary/5 cursor-default transition-all duration-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#001B4F] border border-gold/30 shadow-sm text-white">
                  <SlideImage src={item.icon} size={22} className="filter brightness-110" />
                </div>
                <div>
                  <h4 className="font-bold text-[#001B4F] text-[14px] sm:text-[15px] font-heading leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[#001B4F]/70 text-[12px] sm:text-[12.5px] font-medium leading-relaxed mt-1 whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Blue highlights strip */}
          <div className="flex flex-col gap-4 bg-primary rounded-[14px] p-5 shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div
                className="w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10 animate-pulse-scale"
              >
                <SlideImage src={y.usersGroup} size={28} />
              </div>
              <p className="text-white text-[12px] sm:text-[13px] font-medium leading-normal">
                {formatDynamicText(evaluationData?.bottomCard1Text || "We bring the entire market to you. You make the right choice with [gold]confidence.[/gold]", GOLD)}
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-3">
              <div
                className="w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center shrink-0 bg-gold/10 animate-pulse-scale"
                style={{ animationDelay: "1.5s" }}
              >
                <SlideImage src={y.target} size={28} />
              </div>
              <p className="text-white text-[12px] sm:text-[13px] font-medium leading-normal">
                {formatDynamicText(evaluationData?.bottomCard2Text || "More options. Better insights. [gold]Stronger decisions.[/gold]", GOLD)}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 text-slate-400/80 text-[9px] leading-relaxed mt-6 bg-slate-100/50 p-2.5 rounded-lg border border-slate-200/30 max-w-4xl mx-auto w-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>
              {formatDynamicText(evaluationData?.disclaimer || "Developer names and logos are used solely to represent the broader project ecosystem and do not imply partnerships or endorsements.")}
            </span>
          </div>
        </div>
        <div className="h-[12px] bg-gold w-full mt-4" />
      </motion.div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block slide-canvas-16-9 relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30">
        
        {/* Ambient Blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[35%] h-[45%] bg-[#D4A13A]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-[#001B4F]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <SlideLogoBadge variant="absolute" spacing={6} />

        {/* Left Side Info - Reveal */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="absolute left-[2%] top-[9%] w-[24%] flex flex-col gap-4"
        >
          <motion.div variants={fadeInRight(0, 0.6)}>
            <h2 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
              {formatDynamicText(evaluationData?.heading || "Independent\nEvaluation Across\n[gold]Multiple Developers[/gold]", GOLD)}
              <div className="gold-divider my-[2.5%]" />
            </h2>
          </motion.div>
          <motion.p variants={fadeInRight(0.1, 0.6)} className="p-global text-primary/80 mt-1">
            {formatDynamicText(evaluationData?.description || "We evaluate opportunities across the market objectively. We do not push developer inventory. Our only focus is helping you find the right property that matches your criteria and interests.", GOLD)}
          </motion.p>

          <motion.div variants={staggerContainer(0.08, 0.3)} className="flex flex-col gap-[14px]">
            {pillarsList.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInRight(0, 0.5)}
                whileHover={{ x: 6 }}
                className="flex items-start gap-[12px] cursor-default group"
              >
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#001B4F] border border-gold/30 shadow-[0_4px_12px_rgba(0,27,79,0.1)] relative overflow-hidden transition-all duration-300 group-hover:border-gold text-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <SlideImage src={item.icon} size={22} className="relative z-10 filter brightness-110" />
                </div>
                <div>
                  <p className="font-bold text-[#001B4F] text-[clamp(15px,0.95vw,20px)] font-heading leading-tight mb-[3px] group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </p>
                  <p className="text-[#001B4F]/70 text-[clamp(11.5px,0.78vw,13.5px)] font-medium leading-relaxed whitespace-pre-line mt-[3px]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Center Top Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="absolute left-[55%] -translate-x-1/2 top-[3.5%] w-[50%] text-center flex flex-col gap-2"
        >
          <h2 className="font-heading font-bold text-[clamp(24px,1.8vw,36px)] leading-snug text-primary tracking-tight">
            {formatDynamicText(evaluationData?.centerHeading || "A Wide Network. [gold]One Trusted Partner.[/gold]", GOLD)}
          </h2>
          <p className="text-[clamp(11px,0.75vw,14px)] text-primary/60 font-semibold tracking-wide uppercase">
            {formatDynamicText(evaluationData?.centerSubheading || "Access to top developers. Evaluated through one intelligent framework.", GOLD)}
          </p>
        </motion.div>

        {/* You Badge - Redesigned Dashboard Widget */}
        <motion.div
          variants={fadeInDown(0.2, 0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-[55%] top-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        >
          {/* Radar pulse wave */}
          <motion.div
            className="absolute -inset-6 rounded-full border border-gold/20 pointer-events-none"
            animate={{ scale: [0.9, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <div
            className="w-[220px] h-[72px] rounded-2xl border border-gold/30 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(212,161,58,0.08)] hover:border-gold/80 hover:shadow-[0_12px_36px_rgba(212,161,58,0.15)] flex items-center gap-3.5 px-4 animate-float-slow transition-all duration-300 cursor-default"
          >
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 shadow-inner">
              <SlideImage src={y.user} size={24} />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-[13px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                {formatDynamicText(evaluationData?.youTitle || "YOU")}
              </p>
              <p className="text-[11px] font-bold text-[#001B4F]/60 leading-tight">
                {formatDynamicText(evaluationData?.youSubtitle || "Your Goals & Priorities")}
              </p>
            </div>
          </div>
        </motion.div>
 
        {/* Center PropertyWorks Hub - Redesigned Diamond Shape */}
        <motion.div
          variants={scaleUp(0.15, 0.75)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-[55%] top-[44.4%] -translate-x-1/2 -translate-y-1/2 z-10"
        >
          {/* Pulsing Aura */}
          <motion.div
            className="absolute inset-[-70px] rounded-full bg-[radial-gradient(circle,rgba(212,161,58,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none"
            animate={{ scale: [0.8, 1.2], opacity: [0.5, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          {/* Outer Tilted 3D Orbiting Ring 1 (Gold) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            className="absolute pointer-events-none"
            style={{
              inset: "-42px",
              borderRadius: "50%",
              border: "6px solid rgba(212, 161, 58, 0.85)",
              transformStyle: "preserve-3d",
              rotateX: 70,
              rotateY: 20,
            }}
          >
            {/* Orbiting dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-[#D4A13A] shadow-[0_0_16px_#D4A13A,0_0_28px_#D4A13A]" />
          </motion.div>

          {/* Outer Tilted 3D Orbiting Ring 2 (White/Navy) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
            className="absolute pointer-events-none"
            style={{
              inset: "-24px",
              borderRadius: "50%",
              border: "4px dashed rgba(212, 161, 58, 0.65)",
              transformStyle: "preserve-3d",
              rotateX: 70,
              rotateY: -20,
            }}
          >
            {/* Orbiting dot */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[14px] h-[14px] rounded-full bg-white shadow-[0_0_12px_#fff]" />
          </motion.div>

          {/* Outer Tilted 3D Orbiting Ring 3 (Horizontal/Subtle) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="absolute pointer-events-none"
            style={{
              inset: "-60px",
              borderRadius: "50%",
              border: "5px solid rgba(212, 161, 58, 0.35)",
              transformStyle: "preserve-3d",
              rotateX: 80,
              rotateY: 0,
            }}
          />

          {/* Main Diamond Core */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center cursor-default z-10"
            style={{
              width: "clamp(180px, 18vw, 235px)",
              height: "clamp(180px, 18vw, 235px)",
            }}
          >
            {/* Diamond Background Shape (rotated square) */}
            <div
              className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-[#001B4F] to-[#000d2b] border-[3px] border-gold shadow-[0_20px_55px_rgba(0,27,79,0.45)] flex items-center justify-center overflow-hidden"
              style={{
                transform: "rotate(45deg)",
              }}
            >
              {/* Inner double border for highlighting the "cube" structure */}
              <div className="absolute inset-[11px] rounded-[26px] border border-gold/30 pointer-events-none" />
              
              {/* Light sweep animation within the diamond */}
              <motion.div
                className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                style={{
                  transform: "rotate(-45deg)",
                }}
                animate={{
                  x: ["-100%", "100%"],
                  y: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
            </div>

            {/* Content inside the Diamond (rotated back to normal) */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 w-full h-full select-none">
              {/* Glowing glassmorphic container for logo */}
              <div className="w-[54px] h-[54px] rounded-[15px] bg-gradient-to-br from-white/12 to-white/[0.02] backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-[0_8px_24px_rgba(212,161,58,0.2),inset_0_2px_4px_rgba(255,255,255,0.1)] hover:border-gold/50 transition-all duration-300">
                <SlideImage src={y.logo} size={36} className="animate-pulse-scale filter brightness-110 animate-pulse" />
              </div>
              
              <p className="text-[clamp(15px,1.35vw,19.5px)] font-heading font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-none">
                <span className="text-white">Property</span>
                <span className="text-gold filter brightness-110 ml-[2px]">Works</span>
              </p>
              
              <div className="h-[2px] w-[45px] bg-gradient-to-r from-transparent via-gold to-transparent my-3" />
              
              {/* Highlighted Micro-Badge for Subtitle */}
              <div className="px-2.5 py-0.5 rounded-full bg-gold/12 border border-gold/30 text-gold text-[clamp(8px,0.8vw,9.5px)] font-extrabold uppercase tracking-widest leading-none mb-1.5">
                {formatDynamicText(evaluationData?.hubBadge || "Independent Evaluation")}
              </div>
              
              <p className="text-white/85 text-[clamp(7.5px,0.7vw,9px)] font-bold tracking-wide mt-0.5 leading-normal max-w-[85%]">
                {formatDynamicText(evaluationData?.hubSubtext || "Intelligent Comparison • Informed Decisions")}
              </p>
            </div>
          </motion.div>
        </motion.div>
 
        {/* Shortlisted badge - Redesigned Dashboard Widget */}
        <motion.div
          variants={fadeInUp(0.3, 0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-[55%] top-[71%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        >
          {/* Radar pulse wave */}
          <motion.div
            className="absolute -inset-6 rounded-full border border-gold/20 pointer-events-none"
            animate={{ scale: [0.9, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <div
            className="w-[220px] h-[72px] rounded-2xl border border-gold/30 bg-white/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,28,61,0.05)] hover:border-gold/80 hover:shadow-[0_12px_36px_rgba(212,161,58,0.15)] flex items-center gap-3.5 px-4 animate-float-slow transition-all duration-300 cursor-default"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 shadow-inner">
              <SlideImage src={y.clipboardCheck} size={28} />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-[13px] font-heading font-extrabold text-[#001B4F] tracking-wider leading-none mb-1">
                {formatDynamicText(evaluationData?.shortlistedTitle || "SHORTLISTED")}
              </p>
              <p className="text-[11px] font-bold text-[#001B4F]/60 leading-tight">
                {formatDynamicText(evaluationData?.shortlistedSubtitle || "Aligned Opportunities")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Developer List LEFT - Staggered Slide In */}
        <motion.div
          variants={staggerContainer(0.08, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-[29%] top-[16%] w-[15.5%] h-[63%] flex flex-col justify-between z-10"
        >
          {oe.map((e, idx) => (
            <motion.div
              key={idx}
              variants={fadeInLeft(0, 0.55)}
              whileHover={{ y: -5 }}
              className="cursor-pointer p-0.5 rounded-[12px] hover:bg-gradient-to-tr hover:from-gold/50 hover:to-[#001B4F]/30 hover:shadow-[0_8px_20px_rgba(212,161,58,0.15)] transition-all duration-300"
            >
              <SlideDeveloperCard dev={e} />
            </motion.div>
          ))}
        </motion.div>

        {/* Developer List RIGHT - Staggered Slide In */}
        <motion.div
          variants={staggerContainer(0.08, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute right-[18%] top-[16%] w-[15.5%] h-[63%] flex flex-col justify-between z-10"
        >
          {se.map((e, idx) => (
            <motion.div
              key={idx}
              variants={fadeInRight(0, 0.55)}
              whileHover={{ y: -5 }}
              className="cursor-pointer p-0.5 rounded-[12px] hover:bg-gradient-to-tr hover:from-gold/50 hover:to-[#001B4F]/30 hover:shadow-[0_8px_20px_rgba(212,161,58,0.15)] transition-all duration-300"
            >
              <SlideDeveloperCard dev={e} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Bias Card RIGHT SIDE - Reveal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="absolute right-[2%] top-[17.5%] w-[15.5%] h-auto bg-gradient-to-b from-white to-slate-50/80 backdrop-blur-md rounded-[16px] border border-[#001B4F]/10 flex flex-col items-center justify-start gap-4 shadow-[0_12px_36px_rgba(0,27,79,0.06)] z-10 cursor-default transition-all duration-300"
          style={{ padding: "24px 14px" }}
        >
          <div
            className="w-[56px] h-[56px] rounded-full bg-gradient-to-tr from-[#001B4F] to-[#012569] flex items-center justify-center flex-shrink-0 animate-pulse-scale border border-gold/30 shadow-[0_4px_12px_rgba(0,28,61,0.2)]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-3z"
                stroke="#D4A13A"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M9 11l2 2 4-4"
                stroke="#D4A13A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-[#001B4F] text-[clamp(15px,1.15vw,22px)] font-heading font-extrabold leading-snug tracking-tight">
              {formatDynamicText(evaluationData?.noBiasTitle || "No Bias.\n[gold]Only Clarity.[/gold]", GOLD)}
            </h3>
            <div className="h-[2px] w-[24px] bg-gold/50 mx-auto mt-2" />
          </div>

          <motion.div
            variants={staggerContainer(0.05, 0.6)}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col gap-[10px] text-left px-1"
          >
            {noBiasPointsList.map((e: string, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp(0, 0.45)}
                className="flex items-center gap-[8px] p-1.5 rounded-lg bg-white/50 border border-slate-100 hover:bg-white hover:border-gold/30 hover:shadow-sm transition-all duration-200 cursor-default"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="8" cy="8" r="7.2" stroke="#D4A13A" strokeWidth="1.2" />
                  <path
                    d="M5 8l2 2 4-4"
                    stroke="#D4A13A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[clamp(10.5px,0.8vw,13px)] font-bold text-primary/80 leading-none">
                  {e}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Banner Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute inset-x-[2.5%] bottom-[2%] h-[10%] rounded-2xl flex items-center justify-center gap-[3%] z-10 border border-[#D4A13A]/30 shadow-[0_12px_40px_rgba(0,27,79,0.25)] overflow-hidden"
          style={{
            paddingLeft: "4%",
            paddingRight: "4%",
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.06),transparent_50%)] pointer-events-none" />
          
          <div
            className="flex items-center gap-[12px] w-[42%] h-[75%] bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/20 rounded-[12px] transition-all duration-300 cursor-default"
            style={{ padding: "8px 16px" }}
          >
            <div className="w-[50px] h-[50px] rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 bg-[#D4A13A]/10 shadow-[0_4px_10px_rgba(212,161,58,0.15)]">
              <SlideImage src={y.usersGroup} size={32} />
            </div>
            <p className="text-white text-[clamp(12px,0.9vw,16px)] font-heading leading-snug font-medium">
              {formatDynamicText(evaluationData?.bottomCard1Text || "We bring the entire market to you.\nYou make the right choice with [gold]confidence.[/gold]", GOLD)}
            </p>
          </div>

          <div className="w-[1px] h-[45%] bg-white/15 self-center flex-shrink-0" />

          <div
            className="flex items-center gap-[12px] w-[42%] h-[75%] bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/20 rounded-[12px] transition-all duration-300 cursor-default"
            style={{ padding: "8px 16px" }}
          >
            <div className="w-[50px] h-[50px] rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 bg-[#D4A13A]/10 shadow-[0_4px_10px_rgba(212,161,58,0.15)]">
              <SlideImage src={y.target} size={32} />
            </div>
            <p className="text-white text-[clamp(12px,0.9vw,16px)] font-heading leading-snug font-medium">
              {formatDynamicText(evaluationData?.bottomCard2Text || "More options. Better insights.\n[gold]Stronger decisions.[/gold]", GOLD)}
            </p>
          </div>
        </motion.div>

        {/* Bottom Gold Strip */}
        <div className="absolute inset-x-0 bottom-0 h-[1%] bg-[#D4A13A]" />
      </div>
    </section>
  );
}
