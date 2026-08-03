import { motion } from "framer-motion";
import {
  NAVY,
  GOLD,
  RenderIcon,
  iconQuestion,
  iconCheck,
  p3a,
  p3b,
  iconClipboardHand,
  iconUsersDarkGroup,
  iconClarityTrend,
  iconShieldCheckBlue,
  iconTargetGold,
  iconSearchGold,
  iconCalendarGold,
  SlideImage,
  y,
  AmbientGlows,
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

export default function SectionClarity() {
  const { settings } = useSettings();
  const clarityData = settings?.sections?.clarity;

  const steps = [
    {
      icon: iconClipboardHand,
      title: "Structured Evaluation",
      body: "We analyze what truly matters.",
    },
    {
      icon: iconUsersDarkGroup,
      title: "Guided Coordination",
      body: "We handle the process for you.",
    },
    {
      icon: iconClarityTrend,
      title: "Better Comparison Clarity",
      body: "We simplify complex choices.",
    },
    {
      icon: iconShieldCheckBlue,
      title: "Confident Decisions",
      body: "We help you decide with confidence.",
    },
  ];

  const rightItems = [
    { icon: iconTargetGold, t: "Right Projects Aligned to Your Priorities" },
    { icon: iconSearchGold, t: "Clear Comparison & Insights" },
    { icon: iconCheck, t: "Confident & Informed Decision" },
  ];

  const leftPointsList = Array.isArray(clarityData?.leftPoints) && clarityData.leftPoints.length > 0
    ? clarityData.leftPoints
    : [
        "Too many projects",
        "Conflicting advice",
        "Endless site visits",
        "Aggressive sales pitches",
        "Information overload",
        "Decision fatigue",
      ];

  const defaultRightIcons = [iconTargetGold, iconSearchGold, iconCalendarGold, iconCheck];
  const rightPointsList = Array.isArray(clarityData?.rightPoints) && clarityData.rightPoints.length > 0
    ? clarityData.rightPoints.map((pt: string, idx: number) => ({
        icon: defaultRightIcons[idx % defaultRightIcons.length],
        t: pt
      }))
    : rightItems;

  const positions = [
    { top: "6%", left: "6%" },
    { top: "18%", right: "6%" },
    { top: "40%", left: "4%" },
    { top: "50%", right: "10%" },
    { top: "68%", left: "6%" },
    { top: "78%", right: "6%" },
  ];

  return (
    <section className="w-full bg-white  overflow-hidden relative">
      <AmbientGlows variant="light" />
      <div className=" w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden border-y border-slate-100">
          {/* Left: Confusion Panel - Slide from left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col h-full bg-white relative"
          >
            {/* Header banner */}
            <div
              className="pl-5 sm:pl-8 lg:pl-16 pr-6 py-5 shrink-0"
              style={{ background: "linear-gradient(to right, #001B4F 70%, #ffffff)" }}
            >
              <h3 className="h3-global text-white tracking-wide">
                {formatDynamicText(clarityData?.headingLeft || "FROM [gold]CONFUSION[/gold]\nTO CLARITY", GOLD)}
              </h3>
            </div>
            <div className="relative flex-1">
              <ProgressiveImage
                src={clarityData?.imageLeftUrl || p3a}
                alt="Confused buyer"
                className="w-full h-full object-cover min-h-[350px] lg:min-h-[420px]"
                containerClassName="w-full h-full min-h-[350px] lg:min-h-[420px]"
                videoLook={true}
                animationType={5}
              />

              {/* Animated float overlays for left column */}
              {leftPointsList.map((tag: string, idx: number) => {
                const pos = positions[idx % positions.length];
                return (
                  <span
                    key={idx}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      right: pos.right,
                      animation: `floatSlow ${3 + idx * 0.5}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.2}s`,
                      willChange: "transform",
                    }}
                    className="absolute bg-slate-800/90 text-white text-[10px] sm:text-[11px] px-3 py-1.5 rounded-md shadow-md z-20 cursor-default"
                  >
                    {tag}
                  </span>
                );
              })}

              <div className="absolute top-0 right-0 bottom-0 w-[100px] bg-linear-to-r from-transparent to-white pointer-events-none hidden lg:block" />
              <div className="absolute left-0 right-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent pointer-events-none lg:hidden" />

              {/* Callout box overlay */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 right-4 px-5 py-4 bg-[#001B4F] border border-[#D4A13A] rounded-xl flex items-center gap-3.5 shadow-lg z-20"
              >
                <div className="h-9 w-9 rounded-full border border-[#D4A13A] flex items-center justify-center shrink-0">
                  <RenderIcon icon={iconQuestion} className="h-5 w-5 object-contain" />
                </div>
                <p className="p-global text-white">
                  {formatDynamicText(clarityData?.subtitleLeft || "Unclear comparisons. Missed opportunities. [gold]Emotional decisions.[/gold]", GOLD)}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Center: Interactive Hub & Steps */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="bg-white px-4 lg:px-2 xl:px-6 py-8 flex flex-col items-center justify-center border-y lg:border-y-0 border-slate-100"
          >
            <motion.div
              variants={fadeInUp(0, 0.5)}
              className="font-serif text-[#001B4F] text-xl sm:text-[22px] lg:text-[23px] text-center font-bold mb-8 leading-snug tracking-wide"
            >
              {formatDynamicText(clarityData?.centerTitle || "The Right Guidance\n[gold]Changes Everything[/gold]", GOLD)}
            </motion.div>

            {/* Redesigned Center Dial - Minimalist Diamond Clarity Portal */}
            <motion.div
              variants={scaleUp(0.15, 0.7)}
              className="flex items-center justify-center w-full my-8"
            >
              {/* Outer rotated diamond card */}
              <div 
                className="relative w-52 h-52 rounded-[32px] border-2 border-[#D4A13A] bg-gradient-to-br from-[#001B4F] to-[#000c24] rotate-45 flex items-center justify-center shadow-[0_0_36px_rgba(212,161,58,0.25)] transition-transform duration-500 hover:scale-105 hover:rotate-[50deg] group/portal cursor-pointer"
              >
                {/* Inner rotating thick solid gold border */}
                <div 
                  className="absolute inset-2.5 rounded-[22px] border-4 border-[#D4A13A] animate-spin" 
                  style={{ animationDuration: "20s" }}
                />

                {/* Content wrapper - rotated back to stay upright */}
                <div className="-rotate-45 flex flex-col items-center justify-center text-center p-4">
                  {/* Glowing Logo core */}
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-[#D4A13A]/20 blur-md rounded-full animate-pulse" />
                    <SlideImage src={y.logo} size={54} className="relative z-10" />
                  </div>
                  
                  <div className="font-serif text-[17px] font-bold mt-1 tracking-wide text-white leading-none">
                    Property<span style={{ color: GOLD }}>Works</span>
                  </div>
                  
                  <div className="h-[1.5px] w-12 bg-[#D4A13A]/50 my-2.5" />
                  
                  <div className="text-[10px] leading-normal text-[#D4A13A] font-sans tracking-widest uppercase font-semibold">
                    {formatDynamicText(clarityData?.centerSubtitle || "Your Partner in\nBetter Decisions", GOLD)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08, 0.4)}
              className="mt-8 space-y-3.5 w-full max-w-sm px-4"
            >
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp(0, 0.5)}
                  whileHover={{ x: 6, scale: 1.015 }}
                  style={{
                    background: "linear-gradient(135deg, #e5b858 0%, #f6d98e 50%, #d4a13a 100%)",
                  }}
                  className="relative overflow-hidden flex gap-4 items-center cursor-default p-3.5 rounded-2xl border border-white/20 shadow-xs hover:shadow-[0_12px_28px_rgba(212,161,58,0.25)] transition-all duration-300 group w-full"
                >
                  {/* Shimmery line effect overlay */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                    <div 
                      className="absolute top-0 h-full w-[40%] bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer-sweep"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  </div>

                  {/* Icon Wrapper */}
                  <div className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center bg-white/90 border border-white/30 shadow-xs group-hover:scale-105 transition-all duration-300 z-10">
                    <RenderIcon icon={s.icon} className="h-5.5 w-5.5 object-contain" />
                  </div>
                  <div className="z-10">
                    <div className="font-bold text-[#001B4F] text-[13.5px] sm:text-[14.5px] font-sans tracking-wide leading-tight">
                      {s.title}
                    </div>
                    <div className="text-[#001B4F]/85 text-[11.5px] sm:text-[12px] font-sans leading-relaxed mt-1 font-semibold">
                      {s.body}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Confidence Panel - Slide from right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col h-full bg-white relative"
          >
            <div className="relative flex-1">
              <ProgressiveImage
                src={clarityData?.imageRightUrl || p3b}
                alt="Confident family reviewing options"
                className="w-full h-full object-cover min-h-[350px] lg:min-h-[420px]"
                containerClassName="w-full h-full min-h-[350px] lg:min-h-[420px]"
                videoLook={true}
                animationType={6}
              />

              {/* Checklist Boxes - Staggered Slide In with cardHover triggers */}
              <motion.div
                variants={staggerContainer(0.1, 0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute inset-0 z-20 hidden sm:flex flex-col justify-start pt-[6%] pr-4 items-end space-y-[4.5%]"
              >
                {rightPointsList.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={fadeInLeft(0, 0.5)}
                    whileHover={{
                      scale: 1.05,
                      x: -4,
                      borderColor: GOLD,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white shadow-md px-3 py-2 flex items-center gap-2 text-[10px] sm:text-[11px] text-[#001B4F] font-semibold w-[170px] border border-slate-100 rounded-md cursor-pointer transition-shadow duration-300"
                  >
                    <RenderIcon icon={item.icon} className="h-4 w-4 shrink-0 object-contain" />
                    <span className="leading-tight">{item.t}</span>
                  </motion.div>
                ))}
              </motion.div>
 
              <div className="absolute top-0 left-0 bottom-0 w-[100px] bg-linear-to-r from-white to-transparent pointer-events-none hidden lg:block" />
              <div className="absolute left-0 right-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none lg:hidden" />
 
              {/* Callout box overlay */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 right-4 px-5 py-4 bg-[#001B4F] border border-[#D4A13A] rounded-xl flex items-center gap-3.5 shadow-lg z-20"
              >
                <div className="h-9 w-9 rounded-full border border-[#D4A13A] flex items-center justify-center shrink-0">
                  <RenderIcon icon={iconCheck} className="h-5 w-5 object-contain" />
                </div>
                <p className="p-global text-white">
                  {formatDynamicText(clarityData?.subtitleRight || "Structured guidance. [gold]Better clarity.[/gold] Stronger decisions.", GOLD)}
                </p>
              </motion.div>
            </div>
 
            {/* Mobile checklist layout (shown below the image container, not absolute) */}
            <div className="sm:hidden bg-white shadow-md  p-5 border-t border-b border-slate-100 relative z-10">
              <div className="grid grid-cols-2 gap-3.5">
                {rightItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 shadow-xs px-3.5 py-3 flex items-center gap-2.5 text-[11px] text-[#001B4F] font-medium rounded-xl"
                  >
                    <RenderIcon icon={item.icon} className="h-4.5 w-4.5 shrink-0 object-contain " />
                    <span className="leading-tight">{item.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer row spanning all 3 columns inside the grid card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
            className="col-span-1 lg:col-span-3 py-6 px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 shrink-0 border-t border-[#D4A13A]/70 shadow-[0_-8px_30px_rgba(0,12,36,0.15)] select-none cursor-default group/strip"
          >
            {/* Logo frame with pulse glow */}
            <div className="relative h-12 w-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover/strip:border-[#D4A13A]/50 transition-all duration-300">
              <SlideImage src={y.logo} size={30} className="transition-transform duration-500 group-hover/strip:scale-110" />
            </div>
            
            <p className="text-white font-serif text-[16px] sm:text-[18px] tracking-wide text-center sm:text-left leading-relaxed font-semibold">
              Clarity today. <span style={{ color: GOLD }} className="font-bold transition-colors duration-300">Confidence for a lifetime.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
