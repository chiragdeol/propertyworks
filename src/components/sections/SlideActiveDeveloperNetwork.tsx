import { motion } from "framer-motion";
import { Logo, GOLD, NAVY, y } from "./shared";
import logoMark from "../../assets/icons/logo-mark.png";
import raymondLogo from "../../assets/brand-logos/raymond-1.png";
import hiranandaniLogo from "../../assets/brand-logos/Hiranandani-logo.png";
import lodhaLogo from "../../assets/brand-logos/Lodha.png";
import kalpataruLogo from "../../assets/brand-logos/kalpataru.png";
import godrejLogo from "../../assets/brand-logos/godrej-properties-logo.png";
import oberoiLogo from "../../assets/brand-logos/oberoi-realty.png";
import piramalLogo from "../../assets/brand-logos/piramal-realty.webp";
import runwalLogo from "../../assets/brand-logos/runwal.webp";
import rustomjeeLogo from "../../assets/brand-logos/rustomjee.png";
import dostiLogo from "../../assets/brand-logos/dosti-realty-logo.webp";
import footerIcon from "../../assets/icons/footer-icon.png";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import { SlideLogoBadge } from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideActiveDeveloperNetwork() {
  const { settings } = useSettings();
  const devNetworkData = settings?.sections?.developerNetwork;
  const developers = [
    { name: "Raymond Realty", logo: raymondLogo, scale: "scale-[1.4]" },
    { name: "Hiranandani", logo: hiranandaniLogo },
    { name: "Lodha", logo: lodhaLogo },
    { name: "Kalpataru", logo: kalpataruLogo },
    { name: "Godrej Properties", logo: godrejLogo, scale: "scale-[1.45]" },
    { name: "Oberoi Realty", logo: oberoiLogo },
    { name: "Piramal Realty", logo: piramalLogo, scale: "scale-[1.4]" },
    { name: "Runwal", logo: runwalLogo },
    { name: "Rustomjee", logo: rustomjeeLogo },
    { name: "Dosti Realty", logo: dostiLogo },
  ];

  const spokes = [
    {
      label: "STRONG PARTNERSHIPS",
      icon: y.handshake,
    },
    {
      label: "TRUSTED RELATIONSHIPS",
      icon: y.users,
    },
    {
      label: "STRUCTURED COORDINATION",
      icon: y.clipboardCheck,
    },
    {
      label: "INFORMED DECISIONS",
      icon: y.bulb,
    },
    {
      label: "BUYER FIRST ALIGNMENT",
      icon: y.targetGold,
    },
    {
      label: "OPPORTUNITY CLARITY",
      icon: y.eyeSearch,
    },
    {
      label: "BETTER PROJECT EVALUATION",
      icon: y.evaluation,
    },
    {
      label: "LEADING DEVELOPERS",
      icon: y.buildingsFilled,
    },
  ];

  const displaySpokes = (devNetworkData?.spokes || devNetworkData?.movingCircle || []).length > 0
    ? (devNetworkData?.spokes || devNetworkData?.movingCircle).map((s: any, idx: number) => ({
        ...spokes[idx % spokes.length],
        label: typeof s === "string" ? s : s.label || s.title || s.text || spokes[idx % spokes.length].label
      }))
    : spokes;

  const displayDevelopers = (devNetworkData?.developers || devNetworkData?.items || []).length > 0
    ? (devNetworkData?.developers || devNetworkData?.items).map((d: any, idx: number) => ({
        ...developers[idx % developers.length],
        name: typeof d === "string" ? d : d.name || d.title || developers[idx % developers.length].name
      }))
    : developers;

  return (
    <section
      id="developer-network"
      className="slide-section w-full overflow-hidden bg-slate-50/50 relative"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animated-spoke-line {
          stroke-dasharray: 6 4;
          animation: dash 1.2s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(212, 161, 58, 0.25), 0 8px 32px rgba(0, 27, 79, 0.12);
            border-color: rgba(212, 161, 58, 0.6);
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            box-shadow: 0 0 25px rgba(212, 161, 58, 0.45), 0 8px 40px rgba(0, 27, 79, 0.22);
            border-color: rgba(212, 161, 58, 0.95);
            transform: translate(-50%, -50%) scale(1.03);
          }
        }
        .pulsing-hub {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .network-grid-bg {
          background-image: radial-gradient(rgba(0, 27, 79, 0.04) 1.2px, transparent 1.2px);
          background-size: 24px 24px;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.7;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.3;
          }
        }
        .pulsing-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes cube-border-anti {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .diagram-scale-wrapper {
          transform: scale(0.55);
          margin-top: -115px;
          margin-bottom: -115px;
        }
        @media (min-width: 375px) {
          .diagram-scale-wrapper {
            transform: scale(0.65);
            margin-top: -95px;
            margin-bottom: -95px;
          }
        }
        @media (min-width: 440px) {
          .diagram-scale-wrapper {
            transform: scale(0.78);
            margin-top: -60px;
            margin-bottom: -60px;
          }
        }
        @media (min-width: 540px) {
          .diagram-scale-wrapper {
            transform: scale(0.92);
            margin-top: -20px;
            margin-bottom: -20px;
          }
        }
        @media (min-width: 640px) {
          .diagram-scale-wrapper {
            transform: scale(1);
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `,
        }}
      />

      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#D4A13A]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#001B4F]/5 to-transparent blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 network-grid-bg opacity-75 pointer-events-none" />

      {/* MOBILE LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="block lg:hidden w-full px-5 py-8 text-[#031B33] relative z-10"
      >
        <motion.div variants={fadeInUp(0, 0.5)}>
          <h2 className="h1-global text-[#001B4F] mt-1 leading-[1.2]">
            {formatDynamicText(devNetworkData?.heading || "Active Developer &\n[gold]Channel Partner Network[/gold]")}
          </h2>
          <div className="gold-divider my-3" />
          <p className="p-global text-slate-600 mt-2">
            {formatDynamicText(devNetworkData?.description || "PropertyWorks works across an active network of leading residential and commercial developers to help clients evaluate opportunities more efficiently through structured coordination and guided project alignment.", GOLD)}
          </p>
        </motion.div>

        {/* Spoke node icons grid replaced with Scaled Hub & Spoke Diagram */}
        <div className="w-full flex items-center justify-center overflow-visible py-4 mt-6">
          <div className="diagram-scale-wrapper origin-center shrink-0">
            <div className="relative" style={{ width: 540, height: 540 }}>
              
              {/* Outer orbit ring (rotates, nodes sit on it) */}
              <div
                className="hub-ring hub-diagram absolute"
                style={{ inset: 0, transformOrigin: "270px 270px" }}
              >
                {/* SVG dotted lines — rendered FIRST so they appear behind cards */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: 540, height: 540, zIndex: 0 }}
                >
                  {displaySpokes.map((_: any, i: number) => {
                    const angleRad = (i * 45 * Math.PI) / 180;
                    const orbitR = 225;
                    const x2 = 270 + orbitR * Math.cos(angleRad);
                    const y2 = 270 + orbitR * Math.sin(angleRad);
                    return (
                      <line
                        key={i}
                        x1={270}
                        y1={270}
                        x2={x2}
                        y2={y2}
                        stroke="#D4A13A"
                        strokeWidth="2"
                        strokeDasharray="6,5"
                        strokeOpacity="0.75"
                        className="animated-spoke-line"
                      />
                    );
                  })}
                </svg>

                {/* Nodes — rendered AFTER SVG so they appear on top */}
                {displaySpokes.map((s: any, i: number) => {
                  const angleDeg = i * 45;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const orbitR = 225;
                  const cx = 270 + orbitR * Math.cos(angleRad);
                  const cy = 270 + orbitR * Math.sin(angleRad);
                  return (
                    <div
                      key={i}
                      className="absolute group cursor-pointer"
                      style={{
                        left: cx,
                        top: cy,
                        transform: "translate(-50%, -50%)",
                        transformOrigin: "50% 50%",
                        zIndex: 10,
                      }}
                    >
                      <div className="flex flex-col items-center">
                        {/* Cube node — border rotates anti-clockwise */}
                        <div className="relative w-[100px] h-[112px] flex items-center justify-center group-hover:scale-[1.1] transition-transform duration-300">
                          {/* Anti-clockwise spinning gradient border */}
                          <div 
                            className="absolute inset-0 border border-[#D4A13A] shadow-[0_4px_20px_rgba(212,161,58,0.25)] bg-[#001B4F]"
                            style={{ animation: "cube-border-anti 25s linear infinite" }}
                          />
                          {/* Inner cube — content counter-rotates to stay upright */}
                          <div
                            className="hub-content-upright absolute inset-[3px] rounded-[10px] flex flex-col items-center justify-center gap-1.5 z-10 shadow-[0_6px_20px_rgba(0,27,79,0.3)] group-hover:shadow-[0_0_28px_rgba(212,161,58,0.55)] transition-shadow duration-300 px-2"
                            style={{ background: "#001B4F" }}
                          >
                            <img
                              src={s.icon}
                              alt={s.label}
                              className="w-10 h-10 object-contain relative z-10 drop-shadow-sm"
                            />
                            <span className="text-[8.5px] font-bold text-[#D4A13A] tracking-wider leading-tight uppercase text-center relative z-10">
                              {s.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central hub — gold gradient bg + blue border */}
              <div
                className="absolute pulsing-hub select-none"
                style={{
                  width: 192,
                  height: 192,
                  top: 270,
                  left: 270,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  zIndex: 40,
                  border: "6px solid #001B4F",
                  background: "linear-gradient(135deg, #D4A13A, #f6d98e, #e8c05a, #D4A13A)",
                  boxShadow: "0 0 0 2px rgba(212, 161, 58, 0.4), 0 15px 40px rgba(0,27,79,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "16px",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-white/10 to-transparent pointer-events-none" />
                <img
                  src={logoMark}
                  alt="Property Works Logo"
                  className="w-11 h-11 object-contain brightness-0 mb-1 relative z-10 drop-shadow-md"
                />
                <span className="text-white font-serif font-bold text-[15px] tracking-wide relative z-10 drop-shadow-sm leading-tight">
                  Property<span style={{ color: GOLD }}>Works</span>
                </span>
                <div className="w-10 h-[2px] bg-[#001B4F]/60 my-1.5 relative z-10" />
                <span className="text-[8.5px] font-sans font-bold text-[#001B4F]/90 tracking-wider leading-tight relative z-10 whitespace-pre-line">
                  {formatDynamicText(devNetworkData?.centerSubtitle || "INTELLIGENCE.\nEVALUATION.\nBETTER DECISIONS.", GOLD)}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Association title */}
        <div className="flex items-center gap-3 my-8">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#D4A13A]/50" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#D4A13A] bg-[#D4A13A]/20" />
          <h3 className="font-heading text-xs font-bold text-[#001B4F] tracking-widest uppercase whitespace-nowrap">
            {formatDynamicText(devNetworkData?.associationsHeading || "Developer & Channel Partner Associations", GOLD)}
          </h3>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#D4A13A] bg-[#D4A13A]/20" />
          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#D4A13A]/50" />
        </div>

        {/* Grid of 10 Developer Cards - Replaced with Marquee for automatic scrolling on mobile */}
        <div className="w-full relative mt-6 px-0 overflow-hidden">
          <div className="relative w-full">
            {/* Fade edges to blend into background */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none" />
            
            <Marquee speed={30} gradient={false} className="py-2">
              {displayDevelopers.map((dev: any, idx: number) => (
                <div
                  key={`${dev.name}-${idx}`}
                  className="pr-3.5 shrink-0"
                >
                  <div
                    className="bg-white rounded-xl border border-slate-200/60 shadow-xs flex flex-col items-center justify-center p-3.5 w-[140px] h-[100px] relative overflow-hidden cursor-pointer"
                  >
                    <div className="h-10 w-full flex items-center justify-center shrink-0">
                      <img
                        src={dev.logo}
                        alt={dev.name}
                        className={`max-h-8 w-auto object-contain max-w-[85%] ${dev.scale || ""}`}
                      />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 mt-1.5 truncate max-w-full font-sans tracking-wide">
                      {dev.name}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-xl p-5 text-white flex flex-col gap-4 relative overflow-hidden border border-[#D4A13A]/30 shadow-lg"
          style={{
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 shrink-0 bg-[#D4A13A]/10 rounded-full flex items-center justify-center border border-[#D4A13A]/40 shadow-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4A13A"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[#D4A13A] font-heading font-bold text-xs uppercase tracking-wider leading-snug">
                {formatDynamicText(devNetworkData?.blueStripHeading || "Access to Multiple Developers. Guidance Focused on Your Requirements.", GOLD, "#ffffff")}
              </p>
              <p className="text-white text-[10.5px] leading-relaxed mt-1.5 font-medium">
                {formatDynamicText(devNetworkData?.blueStripSubheading || "PropertyWorks helps clients evaluate opportunities across multiple developer ecosystems through structured comparison and guided advisory support.", GOLD, "#ffffff")}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-1 relative z-10 border-t border-white/10 pt-3">
            <img
              src={footerIcon}
              alt="Footer icon"
              className="h-8 w-auto object-contain filter brightness-110"
            />
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-slate-400/80 text-[9px] leading-relaxed mt-6 bg-slate-100/50 p-2.5 rounded-lg border border-slate-200/30">
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
            Developer names and logos are used solely to represent the broader project ecosystem and
            do not imply partnerships or endorsements.
          </span>
        </div>
      </motion.div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block w-full relative z-10">
        {/* ── Row 1: Left text | Right hub-and-spoke ── */}
        <div className="max-w-[1760px] mx-auto w-full px-8 lg:px-16 pt-10 lg:pt-14 pb-6">
          <div className="flex items-center gap-10 xl:gap-14">
            {/* Left: heading + paragraph */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-5 w-1/2 shrink-0 pt-4"
            >
              <h2 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
                {formatDynamicText(devNetworkData?.heading || "Active Developer &\n[gold]Channel Partner Network[/gold]")}
              </h2>
              <div className="gold-divider" />
              <p className="p-global text-slate-600 mt-2 max-w-[520px]">
                {formatDynamicText(devNetworkData?.description || "PropertyWorks works across an active network of leading residential and commercial developers to help clients evaluate opportunities more efficiently through structured coordination and guided project alignment.", GOLD)}
              </p>
            </motion.div>

            {/* Right: hub-and-spoke diagram — rebuilt from scratch */}
            <div className="flex-1 flex items-center justify-center py-10">
              <div className="relative" style={{ width: 540, height: 540 }}>
                
                <style>{`
                  @keyframes hub-orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes hub-orbit-counter {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                  }
                  @keyframes cube-border-anti {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                  }
                  .hub-ring {
                    animation: hub-orbit-spin 45s linear infinite;
                    transform-origin: 270px 270px;
                    will-change: transform;
                  }
                  .hub-content-upright {
                    animation: hub-orbit-counter 45s linear infinite;
                    transform-origin: 50% 50%;
                    transform-box: fill-box;
                    will-change: transform;
                  }
                  .hub-diagram:hover .hub-ring,
                  .hub-diagram:hover .cube-border-spin-el,
                  .hub-diagram:hover .hub-content-upright {
                    animation-play-state: paused;
                  }
                `}</style>

                {/* Outer orbit ring (rotates, nodes sit on it) */}
                <div
                  className="hub-ring hub-diagram absolute"
                  style={{ inset: 0, transformOrigin: "270px 270px" }}
                >
                  {/* SVG dotted lines — rendered FIRST so they appear behind cards */}
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    style={{ width: 540, height: 540, zIndex: 0 }}
                  >
                    {displaySpokes.map((_: any, i: number) => {
                      const angleRad = (i * 45 * Math.PI) / 180;
                      const orbitR = 225;
                      const x2 = 270 + orbitR * Math.cos(angleRad);
                      const y2 = 270 + orbitR * Math.sin(angleRad);
                      return (
                        <line
                          key={i}
                          x1={270}
                          y1={270}
                          x2={x2}
                          y2={y2}
                          stroke="#D4A13A"
                          strokeWidth="2"
                          strokeDasharray="6,5"
                          strokeOpacity="0.75"
                          className="animated-spoke-line"
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes — rendered AFTER SVG so they appear on top */}
                  {displaySpokes.map((s: any, i: number) => {
                    const angleDeg = i * 45;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const orbitR = 225;
                    const cx = 270 + orbitR * Math.cos(angleRad);
                    const cy = 270 + orbitR * Math.sin(angleRad);
                    return (
                      <div
                        key={i}
                        className="absolute group cursor-pointer"
                        style={{
                          left: cx,
                          top: cy,
                          transform: "translate(-50%, -50%)",
                          transformOrigin: "50% 50%",
                          zIndex: 10,
                        }}
                      >
                        <div className="flex flex-col items-center">
                          {/* Cube node — border rotates anti-clockwise */}
                          <div className="relative w-[100px] h-[112px] flex items-center justify-center group-hover:scale-[1.1] transition-transform duration-300">
                            {/* Anti-clockwise spinning gradient border */}
                            <div
                              className="cube-border-spin-el absolute inset-[-3px] rounded-[12px] overflow-hidden"
                              style={{
                                background: "conic-gradient(from 0deg, #D4A13A, #f6d98e, #ffffff, #D4A13A, #001B4F, #D4A13A)",
                                animation: "cube-border-anti 5s linear infinite",
                                zIndex: 0,
                              }}
                            />
                            {/* Inner cube — content counter-rotates to stay upright */}
                            <div
                              className="hub-content-upright absolute inset-[3px] rounded-[10px] flex flex-col items-center justify-center gap-1.5 z-10 shadow-[0_6px_20px_rgba(0,27,79,0.3)] group-hover:shadow-[0_0_28px_rgba(212,161,58,0.55)] transition-shadow duration-300 px-2"
                              style={{ background: "#001B4F" }}
                            >
                              <img
                                src={s.icon}
                                alt={s.label}
                                className="w-10 h-10 object-contain relative z-10 drop-shadow-sm"
                              />
                              <span className="text-[8.5px] font-bold text-[#D4A13A] tracking-wider leading-tight uppercase text-center relative z-10">
                                {s.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Central hub — gold gradient bg + blue border */}
                <div
                  className="absolute pulsing-hub select-none"
                  style={{
                    width: 192,
                    height: 192,
                    top: 270,
                    left: 270,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    zIndex: 40,
                    border: "6px solid #001B4F",
                    background: "linear-gradient(135deg, #D4A13A, #f6d98e, #e8c05a, #D4A13A)",
                    boxShadow: "0 0 0 2px rgba(212,161,58,0.4), 0 15px 40px rgba(0,27,79,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-white/10 to-transparent pointer-events-none" />
                  <img
                    src={logoMark}
                    alt="Property Works Logo"
                    className="w-11 h-11 object-contain brightness-0 mb-1 relative z-10 drop-shadow-md"
                  />
                  <span className="text-white font-serif font-bold text-[15px] tracking-wide relative z-10 drop-shadow-sm leading-tight">
                    Property<span style={{ color: GOLD }}>Works</span>
                  </span>
                  <div className="w-10 h-[2px] bg-[#001B4F]/60 my-1.5 relative z-10" />
                  <span className="text-[8.5px] font-sans font-bold text-[#001B4F]/90 tracking-wider leading-tight relative z-10 whitespace-pre-line">
                    {formatDynamicText(devNetworkData?.centerSubtitle || "INTELLIGENCE.\nEVALUATION.\nBETTER DECISIONS.", GOLD)}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Section divider with title ── */}
        <div className="max-w-[1760px] mx-auto w-full px-8 lg:px-16 mt-4 mb-6 flex items-center gap-6">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#D4A13A]" />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#D4A13A] bg-[#D4A13A]/10 shadow-[0_0_8px_rgba(212,161,58,0.4)] shrink-0" />
          <h2 className="font-heading font-bold text-center text-[#001B4F] text-[clamp(16px,1.3vw,22px)] tracking-wider whitespace-nowrap uppercase">
            {formatDynamicText(devNetworkData?.associationsHeading || "Developer & Channel Partner Associations", GOLD)}
          </h2>
          <div className="w-2.5 h-2.5 rotate-45 border border-[#D4A13A] bg-[#D4A13A]/10 shadow-[0_0_8px_rgba(212,161,58,0.4)] shrink-0" />
          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#D4A13A]" />
        </div>

        {/* ── Developer logo marquee (Single Row Automatic Scroll) ── */}
        <div className="w-full relative mt-4 px-0">
          <div className="relative w-full">
            {/* Fade edges to blend into background */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <Marquee speed={35} pauseOnHover={true} gradient={false} className="py-3">
              {displayDevelopers.map((dev: any, idx: number) => (
                <div
                  key={`${dev.name}-${idx}`}
                  className="pr-5 shrink-0"
                >
                  <div
                    className="bg-white rounded-xl border-2 border-gray/60 shadow-md transition-all duration-300 flex flex-col items-center justify-center px-5 pt-4 pb-4 w-[200px] h-[140px] group relative overflow-visible cursor-pointer hover:-translate-y-1.5 hover:scale-105 hover:border-[#D4A13A] hover:shadow-[0_15px_30px_rgba(0,27,79,0.1)]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4A13A] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                    <div className="h-14 w-full flex items-center justify-center shrink-0">
                      <img
                        src={dev.logo}
                        alt={dev.name}
                        className={`max-h-12 w-auto object-contain max-w-[85%] transition-transform duration-300 group-hover:scale-[1.06] ${dev.scale || ""}`}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#001B4F]/80 group-hover:text-[#001B4F] mt-2 transition-colors duration-300 truncate max-w-full font-sans tracking-wide shrink-0">
                      {dev.name}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* ── Bottom blue stripe ── */}
        <div className="max-w-[1760px] mx-auto w-full px-8 lg:px-16 mt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl px-8 py-6 flex items-center justify-between gap-6 shadow-xl border border-[#D4A13A]/30 relative overflow-hidden"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.08),transparent_50%)] pointer-events-none" />
            <div className="flex items-center gap-6 flex-1 relative z-10">
              <div className="relative w-14 h-14 shrink-0 bg-[#D4A13A]/15 rounded-full flex items-center justify-center border border-[#D4A13A]/40 shadow-[0_0_15px_rgba(212,161,58,0.25)]">
                <div className="absolute inset-0 bg-[#D4A13A]/5 rounded-full pulsing-ring pointer-events-none" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A13A"
                  strokeWidth="2.2"
                  className="w-6.5 h-6.5 relative z-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="w-px h-12 bg-white/20 shrink-0" />
              <div>
                <p className="text-[#D4A13A] font-heading font-bold text-[clamp(15px,1.1vw,18px)] tracking-wide leading-snug uppercase">
                  {formatDynamicText(devNetworkData?.blueStripHeading || "Access to Multiple Developers. Guidance Focused on Your Requirements.", GOLD)}
                </p>
                <p className="text-white/80 text-[clamp(12px,0.85vw,14px)] mt-1.5 font-medium leading-relaxed max-w-[960px]">
                  {formatDynamicText(devNetworkData?.blueStripSubheading || "PropertyWorks helps clients evaluate opportunities across multiple developer ecosystems through structured comparison and guided advisory support.", GOLD)}
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={footerIcon}
                alt="Footer icon"
                className="h-16 w-auto object-contain filter brightness-110 shrink-0 ml-6 relative z-10"
              />
            </motion.div>
          </motion.div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 text-slate-400 text-[10px] leading-relaxed mt-4 bg-slate-100/60 p-3 rounded-xl border border-slate-200/40">
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
              {formatDynamicText(devNetworkData?.disclaimer || "Developer names and logos are used solely to represent the broader project ecosystem and do not imply partnerships or endorsements.")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
