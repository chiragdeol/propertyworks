import { motion } from "framer-motion";
import {
  y,
  SlideLogoBadge,
  SlidePanel,
  Ce,
  Se,
  we,
  Te,
  Ee,
  xe,
  De,
  Oe,
  SlideImage,
} from "./shared";
import {
  fadeInUp,
  scaleUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
} from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideAboutPropertyWorks() {
  const { settings } = useSettings();
  const aboutData = settings?.sections?.about;

  return (
    <section id="about" className="w-full bg-white border-t border-slate-100 overflow-hidden">
      <div className="w-full bg-gradient-to-br from-[#031d51] via-[#ffffff] to-[#ffffff] text-primary relative">
        {/* ── TOP: Heading+Intro LEFT | Banner Image RIGHT ── */}
        <div className="flex flex-col lg:flex-row relative">
          {/* Left: Logo badge + heading + subtitle + intro description */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="flex flex-col justify-center gap-5 px-5 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 w-full lg:w-1/2 lg:min-h-[420px]"
          >
            <motion.div variants={fadeInUp(0, 0.5)} className="hidden lg:block">
              <SlideLogoBadge variant="inline" size="small" />
            </motion.div>

            <motion.div variants={fadeInUp(0.1, 0.6)}>
              <h2 className="h1-global text-white drop-shadow-sm">
                {formatDynamicText(aboutData?.heading || "About Property[gold]Works[/gold]", "#D4A13A")}
              </h2>
              <h2 className="text-white/70 text-[clamp(15px,1.4vw,19px)] font-bold mt-2">
                {formatDynamicText(aboutData?.subheading || "Real Estate Intelligence & Advisory Services", "#D4A13A")}
              </h2>
              <div className="gold-divider mt-3" />
            </motion.div>

            <motion.div
              variants={fadeInUp(0.2, 0.6)}
              className="p-global text-white/75 max-w-[540px]"
            >
              {aboutData?.description ? (
                formatDynamicText(aboutData.description, "#D4A13A")
              ) : (
                <>
                  We simplify the real estate evaluation journey through{" "}
                  <span className="font-semibold text-gold">intelligence,</span>{" "}
                  <span className="font-semibold text-gold">structure,</span>{" "}
                  <span className="font-semibold text-gold">transparency</span> and{" "}
                  <span className="font-semibold text-gold">human guidance.</span>
                </>
              )}
            </motion.div>

            {/* Quote card - mobile */}
            <motion.div variants={fadeInUp(0.3, 0.6)}>
              <SlidePanel className="p-4 md:p-5 border-l-4 border-l-gold bg-white max-w-[420px] lg:hidden">
                <div className="font-heading text-[36px] font-bold leading-[0.2] text-gold -mt-1">
                  "
                </div>
                <p className="font-heading text-[14px] sm:text-[15px] font-semibold leading-relaxed text-primary">
                  {formatDynamicText(aboutData?.quote || "Helping You Evaluate Real Estate with Greater [gold]Clarity, Structure & Confidence.[/gold]")}
                </p>
              </SlidePanel>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-2/3 h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[420px] overflow-hidden bg-slate-100"
          >
            <ProgressiveImage
              src={aboutData?.imageUrl || "/images/About Property Works bg.webp"}
              alt="About PropertyWorks"
              className="absolute inset-0 w-full h-full object-cover object-center"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={8}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent lg:hidden" />
          </motion.div>

          {/* ── Quote card: overlaps image from left – lg only ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="hidden lg:block absolute z-20 cursor-pointer"
            style={{ top: "clamp(24px,5%,48px)", left: "clamp(36%,38%,44%)" }}
          >
            <div
              className="bg-white/95 backdrop-blur-sm border-l-4 border-l-gold shadow-[0_8px_32px_rgba(0,27,79,0.18)] rounded-[10px]"
              style={{ padding: "20px 22px", maxWidth: "clamp(220px,22vw,320px)" }}
            >
              <div className="font-heading text-[40px] font-bold leading-[0.15] text-gold -mt-1 mb-1">
                "
              </div>
              <p className="font-heading text-[clamp(14px,1.2vw,17px)] font-semibold leading-snug text-primary">
                {formatDynamicText(aboutData?.quote || "Helping You Evaluate Real Estate with Greater [gold]Clarity, Structure & Confidence.[/gold]")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── MIDDLE: Challenge | Approach | Structured+Ecosystem+Vision ── */}
        <div className="px-5 py-8 md:px-10 md:py-10 lg:px-16 flex flex-col gap-6 md:gap-8">
          <div className="grid grid-cols-1 md:hidden lg:grid lg:grid-cols-[1fr_1.5fr_1.6fr] gap-5 lg:gap-6 items-start">
            {/* ── Column 1: Challenge Today ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.7 }}
            >
              <SlidePanel
                className="relative overflow-hidden flex flex-col rounded-2xl cursor-default"
                style={{
                  backgroundImage: `url(${Se})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "24px 20px 70px 20px",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-primary shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 11v1h6v-1a6 6 0 0 0-3-11z"
                        stroke="#D4A13A"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="h4-global text-primary">
                    The Real Estate <span className="text-gold">Challenge Today</span>
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2.5 mb-4">
                  {Ce.map((e, idx) => (
                    <motion.div
                      key={e}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center gap-2.5 text-[13px] sm:text-[14px] font-bold text-primary"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0"
                      >
                        <circle cx="7" cy="7" r="7" fill="#D4A13A" />
                        <path
                          d="M4 7l2 2 4-4"
                          stroke="#ffffff"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{e}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="h-[1px] w-full bg-primary/10 my-3 " />
                <p className="text-[13px] sm:text-[14px] text-primary/80 mr-10">
                  Buyers spend months evaluating projects without complete clarity or alignment.
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-primary p-4 rounded-b-[14px]">
                  <p className="font-heading text-[13px] sm:text-[14px] md:text-[15px] leading-snug text-white">
                    We turn confusion into <span className="text-gold">clarity.</span> Information
                    into <span className="text-gold">decisions.</span>
                  </p>
                </div>
              </SlidePanel>
            </motion.div>

            {/* ── Column 2: Our Approach (Orbital Layout) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col h-full relative max-sm:-mx-5 max-sm:overflow-visible overflow-hidden"
            >
              <style>{`
                @keyframes orbit-spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes orbit-spin-reverse {
                  from { transform: rotate(360deg); }
                  to { transform: rotate(0deg); }
                }
                @keyframes gold-shine {
                  0% { box-shadow: 0 0 15px rgba(212,161,58,0.4), inset 0 0 15px rgba(212,161,58,0.2); }
                  50% { box-shadow: 0 0 35px rgba(212,161,58,0.8), inset 0 0 25px rgba(255,255,255,0.4); }
                  100% { box-shadow: 0 0 15px rgba(212,161,58,0.4), inset 0 0 15px rgba(212,161,58,0.2); }
                }
                .animate-orbit {
                  animation: orbit-spin 40s linear infinite;
                }
                .animate-orbit-item {
                  animation: orbit-spin-reverse 40s linear infinite;
                }
                .animate-shine {
                  animation: gold-shine 3s ease-in-out infinite;
                }
                .orbit-container:hover .animate-orbit,
                .orbit-container:hover .animate-orbit-item,
                .orbit-container:hover .animate-orbit-dashed {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="flex-1 flex items-center justify-center relative min-h-[460px] sm:min-h-[500px] orbit-container w-full ">
                
                {/* Inner Dashed Ring (Anti-clockwise) around Center Circle */}
                <div 
                  className="absolute inset-0 m-auto w-[170px] sm:w-[215px] h-[170px] sm:h-[215px] rounded-full border-[2px] border-[#D4A13A]/60 border-dashed animate-orbit-item"
                />

                {/* Thick Gold Gradient Outer Ring (Clockwise) */}
                <div 
                  className="absolute inset-0 m-auto w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full border-[8px] sm:border-[10px] border-transparent"
                  style={{ 
                    background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #d4a13a 0%, #f6d98e 50%, #d4a13a 100%) border-box" 
                  }} 
                />

                {/* Center Circle (Brand Color with shining gradient border) */}
                <div 
                  className="absolute inset-0 m-auto w-[150px] sm:w-[190px] h-[150px] sm:h-[190px] rounded-full shadow-[0_15px_40px_rgba(0,27,79,0.5)] flex flex-col items-center justify-center text-center p-2 z-10 border-[4px] sm:border-[6px] border-transparent animate-shine"
                  style={{
                    background: "linear-gradient(#001B4F, #001B4F) padding-box, linear-gradient(135deg, #d4a13a, #ffffff, #d4a13a, #ffffff) border-box"
                  }}
                >
                  <SlideImage src={y.logo} size={36} className="brightness-0 invert mb-1 sm:mb-2 opacity-100 drop-shadow-md" />
                  <h3 className="font-heading text-[15px] sm:text-[18px] font-bold text-white leading-tight drop-shadow-md relative z-10">
                    Our <span className="text-gold">Approach</span>
                  </h3>
                  <p className="text-[10px] sm:text-[12px] text-white/90 font-medium mt-1 sm:mt-1.5 leading-snug relative z-10">
                    Structured.<br/>Objective.<br/>Buyer-First.
                  </p>
                </div>

                {/* 6 Orbiting Circle Cards */}
                <div className="absolute inset-0 m-auto w-0 h-0 animate-orbit z-20 flex items-center justify-center">
                  {we.map(({ icon: e, title: t }, index) => {
                    const angle = index * 60;
                    return (
                      <div 
                        key={t}
                        className="absolute flex items-center justify-center w-0 h-0"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        {/* Translation matches half of the Outer Ring (125px / 175px) */}
                        <div className="-translate-y-[125px] sm:-translate-y-[175px] flex items-center justify-center w-0 h-0">
                          {/* Counter-rotation to keep cards upright */}
                          <div style={{ transform: `rotate(-${angle}deg)` }} className="flex items-center justify-center w-0 h-0">
                            {/* Counter-rotation for the animation spin */}
                            <div className="animate-orbit-item flex items-center justify-center w-0 h-0">
                              
                              {/* Actual Card (Circle) */}
                              <div className="w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] shrink-0 flex-none aspect-square bg-white border-[3px] border-[#D4A13A]/60 rounded-full shadow-[0_6px_20px_rgba(0,27,79,0.15)] flex flex-col items-center justify-center p-2 text-center hover:scale-[1.12] hover:border-[#D4A13A] hover:shadow-[0_10px_30px_rgba(212,161,58,0.45)] transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
                                {/* Subtle internal glow on hover */}
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="w-[32px] h-[32px] sm:w-[42px] sm:h-[42px] rounded-full bg-[#001B4F] flex items-center justify-center mb-1 sm:mb-1.5 shadow-md  transition-colors duration-300 relative z-10">
                                  <SlideImage src={e} size={20} className="" />
                                </div>
                                <p className="text-[9px] sm:text-[10px] font-bold text-[#001B4F] leading-tight group-hover:text-[#D4A13A] transition-colors duration-300 relative z-10">
                                  {t.replace("\n", " ")}
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── Column 3: Structured Experience + Ecosystem + Vision ── */}
            <div className="flex flex-col gap-5">
              {/* Structured Experience Panel */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
              >
                <SlidePanel className="p-5 md:p-6 bg-white">
                  <h3 className="h3-global text-primary mb-4">
                    A More Structured Real Estate Evaluation Experience
                  </h3>
                  <motion.div
                    variants={staggerContainer(0.06, 0.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3"
                  >
                    {Te.map(({ icon: e, label: t }) => (
                      <motion.div
                        key={t}
                        variants={fadeInUp(0, 0.4)}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/50 transition-colors cursor-pointer shadow-xs"
                      >
                        <SlideImage src={e} size={30} />
                        <p className="mt-2 whitespace-pre-line text-[11.5px] sm:text-[12px] font-semibold leading-snug text-primary">
                          {t}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </SlidePanel>
              </motion.div>

              {/* Ecosystem + Vision side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-4">
                {/* Multi-Developer Ecosystem */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <SlidePanel className="p-4 md:p-5 bg-white h-full">
                    <h3 className="h3-global text-primary mb-4">Multi-Developer Ecosystem</h3>
                    <motion.div
                      variants={staggerContainer(0.06, 0.2)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                    >
                      {Ee.map(({ icon: e, label: t }) => (
                        <motion.div
                          key={t}
                          variants={fadeInUp(0, 0.4)}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors cursor-pointer shadow-xs"
                        >
                          <SlideImage src={e} size={28} />
                          <p className="mt-2 whitespace-pre-line text-[11px] sm:text-[11.5px] font-semibold leading-snug text-primary">
                            {t}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </SlidePanel>
                </motion.div>

                {/* Our Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.025, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
                  className="rounded-[14px] bg-primary text-white p-4 md:p-5 flex flex-col justify-between shadow-lg cursor-default transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <SlideImage src={y.eye} size={48} className="shrink-0" />
                      <h3 className="h3-global text-gold">Our Vision</h3>
                    </div>
                    <p className="font-heading text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed">
                      Smarter evaluation. Better decisions.{" "}
                      <span className="text-gold">Brighter futures.</span>
                    </p>
                  </div>
                  <div className="mt-4 text-[11.5px] text-white/50 border-t border-white/10 pt-2.5">
                    Helping you find value with confidence.
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Medium Screen Layout (md: 768px to 1023px) ── */}
          <div className="hidden md:grid lg:hidden grid-cols-1 gap-6 items-stretch">
            {/* Row 1: The Real Estate Challenge Today + A More Structured Real Estate Evaluation Experience */}
            <div className="grid grid-cols-2 gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.7 }}
              >
                <SlidePanel
                  className="relative overflow-hidden flex flex-col rounded-2xl cursor-default h-full"
                  style={{
                    backgroundImage: `url(${Se})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "24px 20px 70px 20px",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-primary shadow-md">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 11v1h6v-1a6 6 0 0 0-3-11z"
                          stroke="#D4A13A"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="h4-global text-primary">
                      The Real Estate <span className="text-gold">Challenge Today</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 mb-4">
                    {Ce.map((e, idx) => (
                      <motion.div
                        key={e}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-center gap-2.5 text-[13px] sm:text-[14px] font-bold text-primary"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
                        >
                          <circle cx="7" cy="7" r="7" fill="#D4A13A" />
                          <path
                            d="M4 7l2 2 4-4"
                            stroke="#ffffff"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{e}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-[1px] w-full bg-primary/10 my-3 " />
                  <p className="text-[13px] sm:text-[14px] text-primary/80 mr-10">
                    Buyers spend months evaluating projects without complete clarity or alignment.
                  </p>
                  <div className="absolute inset-x-0 bottom-0 bg-primary p-4 rounded-b-[14px]">
                    <p className="font-heading text-[13px] sm:text-[14px] md:text-[15px] leading-snug text-white">
                      We turn confusion into <span className="text-gold">clarity.</span> Information
                      into <span className="text-gold">decisions.</span>
                    </p>
                  </div>
                </SlidePanel>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <SlidePanel className="p-5 md:p-6 bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="h3-global text-primary mb-4">
                      A More Structured Real Estate Evaluation Experience
                    </h3>
                    <motion.div
                      variants={staggerContainer(0.06, 0.2)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-3 gap-2 md:gap-3"
                    >
                      {Te.map(({ icon: e, label: t }) => (
                        <motion.div
                          key={t}
                          variants={fadeInUp(0, 0.4)}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className="flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/50 transition-colors cursor-pointer shadow-xs"
                        >
                          <SlideImage src={e} size={30} />
                          <p className="mt-2 whitespace-pre-line text-[11.5px] sm:text-[12px] font-semibold leading-snug text-primary">
                            {t}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </SlidePanel>
              </motion.div>
            </div>

            {/* Row 2: Our Approach orbital circle (centered) */}
            <div className="flex justify-center w-full py-4 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col h-full relative max-sm:-mx-5 max-sm:overflow-visible overflow-hidden"
              >
                <div className="flex-1 flex items-center justify-center relative min-h-[460px] sm:min-h-[500px] orbit-container w-[500px]">
                  {/* Inner Dashed Ring */}
                  <div className="absolute inset-0 m-auto w-[215px] h-[215px] rounded-full border-[2px] border-[#D4A13A]/60 border-dashed animate-orbit-item" />

                  {/* Thick Gold Gradient Outer Ring */}
                  <div 
                    className="absolute inset-0 m-auto w-[350px] h-[350px] rounded-full border-[10px] border-transparent"
                    style={{ 
                      background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #d4a13a 0%, #f6d98e 50%, #d4a13a 100%) border-box" 
                    }} 
                  />

                  {/* Center Circle */}
                  <div 
                    className="absolute inset-0 m-auto w-[190px] h-[190px] rounded-full shadow-[0_15px_40px_rgba(0,27,79,0.5)] flex flex-col items-center justify-center text-center p-2 z-10 border-[6px] border-transparent animate-shine"
                    style={{
                      background: "linear-gradient(#001B4F, #001B4F) padding-box, linear-gradient(135deg, #d4a13a, #ffffff, #d4a13a, #ffffff) border-box"
                    }}
                  >
                    <SlideImage src={y.logo} size={36} className="brightness-0 invert mb-2 opacity-100 drop-shadow-md" />
                    <h3 className="font-heading text-[18px] font-bold text-white leading-tight drop-shadow-md relative z-10">
                      Our <span className="text-gold">Approach</span>
                    </h3>
                    <p className="text-[12px] text-white/90 font-medium mt-1.5 leading-snug relative z-10">
                      Structured.<br/>Objective.<br/>Buyer-First.
                    </p>
                  </div>

                  {/* 6 Orbiting Circle Cards */}
                  <div className="absolute inset-0 m-auto w-0 h-0 animate-orbit z-20 flex items-center justify-center">
                    {we.map(({ icon: e, title: t }, index) => {
                      const angle = index * 60;
                      return (
                        <div 
                          key={t}
                          className="absolute flex items-center justify-center w-0 h-0"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <div className="-translate-y-[175px] flex items-center justify-center w-0 h-0">
                            <div style={{ transform: `rotate(-${angle}deg)` }} className="flex items-center justify-center w-0 h-0">
                              <div className="animate-orbit-item flex items-center justify-center w-0 h-0">
                                <div className="w-[125px] h-[125px] shrink-0 flex-none aspect-square bg-white border-[3px] border-[#D4A13A]/60 rounded-full shadow-[0_6px_20px_rgba(0,27,79,0.15)] flex flex-col items-center justify-center p-2 text-center hover:scale-[1.12] hover:border-[#D4A13A] hover:shadow-[0_10px_30px_rgba(212,161,58,0.45)] transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="w-[42px] h-[42px] rounded-full bg-[#001B4F] flex items-center justify-center mb-1.5 shadow-md relative z-10">
                                    <SlideImage src={e} size={20} />
                                  </div>
                                  <p className="text-[10px] font-bold text-[#001B4F] leading-tight group-hover:text-[#D4A13A] transition-colors duration-300 relative z-10">
                                    {t.replace("\n", " ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Row 3: Multi-Developer Ecosystem + Our Vision */}
            <div className="grid grid-cols-2 gap-6 items-stretch w-full">
              {/* Multi-Developer Ecosystem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <SlidePanel className="p-5 md:p-6 bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="h3-global text-primary mb-4">Multi-Developer Ecosystem</h3>
                    <motion.div
                      variants={staggerContainer(0.06, 0.2)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-4 gap-3"
                    >
                      {Ee.map(({ icon: e, label: t }) => (
                        <motion.div
                          key={t}
                          variants={fadeInUp(0, 0.4)}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors cursor-pointer shadow-xs"
                        >
                          <SlideImage src={e} size={28} />
                          <p className="mt-2 whitespace-pre-line text-[11.5px] font-semibold leading-snug text-primary">
                            {t}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </SlidePanel>
              </motion.div>

              {/* Our Vision */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.025, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
                className="rounded-[14px] bg-primary text-white p-5 flex flex-col justify-between shadow-lg cursor-default transition-colors duration-300 h-full"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <SlideImage src={y.eye} size={48} className="shrink-0" />
                    <h3 className="h3-global text-gold">Our Vision</h3>
                  </div>
                  <p className="font-heading text-[16px] md:text-[17px] leading-relaxed">
                    Smarter evaluation. Better decisions.{" "}
                    <span className="text-gold">Brighter futures.</span>
                  </p>
                </div>
                <div className="mt-4 text-[12px] text-white/50 border-t border-white/10 pt-2.5">
                  Helping you find value with confidence.
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Technology App Ribbon – Slide in from bottom ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="rounded-[16px] overflow-hidden border border-primary/8 shadow-[0_4px_20px_rgba(0,28,61,0.08)] bg-[#edf4fb]"
          >
            {/* Desktop Layout */}
            <div className="hidden sm:flex md:hidden lg:flex flex-row items-stretch min-h-0 overflow-x-auto overflow-y-hidden">
              <div className="relative flex flex-col items-center justify-end w-[96px] md:w-[118px] overflow-hidden border-r border-primary/10 pt-4">
                <img
                  src={xe}
                  alt="PropertyWorks App"
                  className="w-[82%] h-auto object-cover object-bottom translate-y-[2%] animate-float-slow"
                />

                {/* Whatsapp bubble floating/pulsing */}
                <div
                  className="absolute top-2 right-1 z-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-[3px] animate-pulse-scale"
                >
                  <SlideImage src={y.whatsappReal} size={20} />
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col justify-center px-4 py-2 w-[160px] md:w-[200px] border-r border-primary/10">
                <h3 className="h4-global text-primary leading-[1.2]">
                  Technology With <span className="text-gold">Human Guidance</span>
                </h3>
                <p className="mt-1 text-[12px] sm:text-[11.5px] md:text-[12.5px] font-medium leading-[1.4] text-primary/75">
                  Digital tools and intelligence systems to simplify evaluation — combined with
                  expert human support.
                </p>
              </div>

              <div className="flex-1 overflow-x-auto">
                <div className="flex h-full min-w-max sm:min-w-0 divide-x divide-primary/10">
                  {De.map(({ icon: e, label: t }) => (
                    <div
                      key={t}
                      className="flex flex-col items-center justify-center text-center px-3 py-3 sm:px-2 md:px-3 sm:flex-1"
                    >
                      <SlideImage src={e} size={36} />
                      <p className="mt-1 whitespace-pre-line text-[11px] sm:text-[10.5px] md:text-[11.5px] font-semibold leading-[1.2] text-primary">
                        {t}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col items-center justify-center bg-white border-t sm:border-t-0 sm:border-l border-primary/10 px-4 py-3 sm:w-[110px] md:w-[130px]">
                <p className="font-heading text-[13px] sm:text-[12px] md:text-[13.5px] font-semibold leading-[1.35] text-primary text-center">
                  We focus on you.
                  <br />
                  Your needs.
                  <br />
                  Your goals.
                  <br />
                  <span className="text-gold font-bold">Your future.</span>
                </p>
                <div
                  className="mt-2 animate-float-slow"
                >
                  <SlideImage src={y.users} size={28} />
                </div>
              </div>
            </div>

            {/* Medium Screen Layout (768px to 1023px) */}
            <div className="hidden md:flex lg:hidden flex-col min-h-0 overflow-hidden divide-y divide-primary/10">
              {/* Row 1: Left (Phone + Title) & Right (Focus banner) */}
              <div className="flex flex-row items-stretch">
                {/* Phone Image */}
                <div className="relative flex flex-col items-center justify-end w-[118px] overflow-hidden border-r border-primary/10 pt-4 bg-[#edf4fb]">
                  <img
                    src={xe}
                    alt="PropertyWorks App"
                    className="w-[82%] h-auto object-cover object-bottom translate-y-[2%] animate-float-slow"
                  />
                  <div className="absolute top-2 right-1 z-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-[3px] animate-pulse-scale">
                    <SlideImage src={y.whatsappReal} size={20} />
                  </div>
                </div>

                {/* Title & text */}
                <div className="flex-1 flex flex-col justify-center px-6 py-4 bg-[#edf4fb]">
                  <h3 className="h4-global text-primary leading-[1.2]">
                    Technology With <span className="text-gold">Human Guidance</span>
                  </h3>
                  <p className="mt-1 text-[13px] font-medium leading-[1.45] text-primary/75">
                    Digital tools and intelligence systems to simplify evaluation — combined with expert human support.
                  </p>
                </div>

                {/* Focus Banner */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-white border-l border-primary/10 px-6 py-4 w-[160px]">
                  <p className="font-heading text-[13px] font-semibold leading-[1.35] text-primary text-center">
                    We focus on you.
                    <br />
                    Your needs.
                    <br />
                    Your goals.
                    <br />
                    <span className="text-gold font-bold">Your future.</span>
                  </p>
                  <div className="mt-2 animate-float-slow">
                    <SlideImage src={y.users} size={28} />
                  </div>
                </div>
              </div>

              {/* Row 2: Tools grid (3 columns) */}
              <div className="grid grid-cols-3 divide-x divide-primary/10 bg-white">
                {De.map(({ icon: e, label: t }) => (
                  <div
                    key={t}
                    className="flex flex-col items-center justify-center text-center px-4 py-4"
                  >
                    <SlideImage src={e} size={36} />
                    <p className="mt-1.5 whitespace-pre-line text-[11.5px] font-bold leading-[1.25] text-primary">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden">
              {/* Header section (Phone Image + Title) */}
              <div className="grid grid-cols-[85px_1fr] border-b border-primary/10 bg-[#edf4fb] p-3 items-stretch">
                <div className="relative flex flex-col items-center justify-end overflow-hidden pt-2 shrink-0">
                  <img
                    src={xe}
                    alt="PropertyWorks App"
                    className="w-[85%] h-auto object-cover object-bottom translate-y-[4%] animate-float-slow"
                  />
                  <div
                    className="absolute top-1 right-0.5 z-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-[3px] animate-pulse-scale"
                  >
                    <SlideImage src={y.whatsappReal} size={22} />
                  </div>
                </div>

                <div className="flex flex-col justify-center pl-3.5 pr-1 py-1">
                  <h3 className="text-[#001B4F] font-heading font-extrabold text-[14.5px] leading-tight">
                    Technology With <span className="text-gold">Human Guidance</span>
                  </h3>
                  <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-primary/75">
                    Digital tools &amp; intelligence systems to simplify evaluation — with expert human support.
                  </p>
                </div>
              </div>

              {/* Tools Grid (3 Columns) */}
              <div className="grid grid-cols-3 divide-x divide-primary/10 border-b border-primary/10 bg-white">
                {De.map(({ icon: e, label: t }) => (
                  <div
                    key={t}
                    className="flex flex-col items-center justify-center text-center px-2 py-4"
                  >
                    <SlideImage src={e} size={36} />
                    <p className="mt-1.5 whitespace-pre-line text-[10.5px] font-bold leading-[1.25] text-primary">
                      {t}
                    </p>
                  </div>
                ))}
              </div>

              {/* Focus Banner (Full Width) */}
              <div className="flex items-center justify-between bg-[#edf4fb] px-4 py-3 border-t border-primary/5">
                <div className="text-[12.5px] font-bold leading-snug text-primary text-left">
                  We focus on <span className="text-gold font-bold">you</span>. Your needs. Your goals. <span className="text-gold font-bold">Your future.</span>
                </div>
                <div className="animate-float-slow shrink-0 ml-3">
                  <SlideImage src={y.users} size={26} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Core Values stripe – full bleed ── */}
        {/* <div className="w-full bg-primary border-t border-[#D4A13A]">
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-[1760px] mx-auto flex flex-wrap md:flex-nowrap items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10"
          >
            {Oe.map(({ icon: e, title: t, sub: n }) => (
              <motion.div
                key={t}
                variants={fadeInUp(0, 0.4)}
                whileHover={{ backgroundColor: "rgba(212,161,58,0.06)" }}
                className="flex flex-1 min-w-[33%] md:min-w-0 flex-row items-center justify-start md:justify-center gap-3 py-4 px-4 cursor-default transition-colors duration-250"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-gold/10">
                  <SlideImage src={e} size={18} />
                </div>
                <div>
                  <p className="text-[11px] sm:text-[12px] font-semibold leading-tight text-white">
                    {t}
                  </p>
                  <p className="text-[9.5px] sm:text-[10px] text-white/60 leading-tight mt-0.5">
                    {n}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}
