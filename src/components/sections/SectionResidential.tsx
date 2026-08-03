import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";
import {
  NAVY,
  GOLD,
  GoldRule,
  RenderIcon,
  p5,
  iconTownshipTrees,
  iconUsersGold,
  iconGraduationGold,
  iconHomeEye,
  iconGrowthTrend,
  iconCalendarGold,
  iconMapPinGold,
  iconShieldCheckGold,
  iconExpansionTrend,
  iconHomeGold,
  AmbientGlows,
} from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";

interface FlippingItem {
  icon: string;
  title: string;
  body: string;
}

function ResidentialFlippingCard({ it, index }: { it: FlippingItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    // Stagger flipping times dynamically for each card
    const delay = 3000 + (index % 3) * 1800 + Math.floor(index / 3) * 600;
    const initialTimeout = setTimeout(() => {
      setIsFlipped(true);

      const interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 5000);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [index, isHovered]);

  const cardInnerStyle: React.CSSProperties = {
    transformStyle: "preserve-3d",
    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const cardSideStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className="perspective-[1000px] w-full h-[145px] sm:h-[135px] xl:h-[140px] cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsFlipped(true); // Flip to Solution (Back side) on hover
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFlipped(false); // Flip to Front side on leave
      }}
    >
      <div style={cardInnerStyle} className="relative h-full w-full rounded-2xl shadow-md hover:shadow-[0_12px_28px_rgba(212,161,58,0.3)]">
        {/* Front Side: Title and Icon */}
        <div
          style={{
            ...cardSideStyle,
            background: "linear-gradient(135deg, #d4a13a 0%, #f6d98e 50%, #d4a13a 100%)",
          }}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/40 text-center"
        >
          <div className="h-11 w-11 rounded-full bg-[#001B4F] flex items-center justify-center shrink-0 shadow-md mb-2">
            <RenderIcon icon={it.icon} className="h-5.5 w-5.5 object-contain filter brightness-110" />
          </div>
          <div className="font-heading font-extrabold text-[#001B4F] text-[13.5px] sm:text-[14px] leading-snug">
            {it.title}
          </div>
        </div>

        {/* Back Side: Title and Detailed Body Description */}
        <div
          style={{
            ...cardSideStyle,
            background: "linear-gradient(135deg, #09152e 0%, #001B4F 50%, #001233 100%)",
            transform: "rotateY(180deg)",
          }}
          className="flex items-start gap-3 p-4 rounded-2xl border border-gold/30"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-gold/35 flex items-center justify-center shrink-0 bg-gold/10 text-gold shadow-sm">
            <RenderIcon icon={it.icon} className="h-5.5 w-5.5 object-contain filter brightness-110" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-heading font-bold text-gold text-[13px] sm:text-[13.5px] leading-snug pb-1 border-b border-white/10 mb-1.5">
              {it.title}
            </div>
            <div className="text-white/85 text-[11px] sm:text-[11.5px] font-medium leading-relaxed">
              {it.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SectionResidential() {
  const { settings } = useSettings();
  const resData = settings?.sections?.residential;
  const items: FlippingItem[] = [
    {
      icon: iconTownshipTrees,
      title: "Township Ecosystem",
      body: "We evaluate the overall planning, community design, and future development.",
    },
    {
      icon: iconUsersGold,
      title: "Lifestyle Alignment",
      body: "We match your lifestyle preferences with the right communities.",
    },
    {
      icon: iconGraduationGold,
      title: "Family Requirements",
      body: "We consider schools, safety, healthcare, recreation, and everyday convenience.",
    },
    {
      icon: iconHomeEye,
      title: "Vastu & Orientation",
      body: "We factor in vastu preferences, orientation, and energy flow for peace of mind.",
    },
    {
      icon: iconGrowthTrend,
      title: "Future Growth Corridors",
      body: "We identify locations with strong infrastructure growth and long-term value potential.",
    },
    {
      icon: iconCalendarGold,
      title: "Long-Term Usability",
      body: "We look at resale potential, liquidity, rental demand, and long-term suitability.",
    },
  ];

  const bottom = [
    { icon: iconMapPinGold, t: "The Right Location" },
    { icon: iconUsersGold, t: "The Right Community" },
    { icon: iconShieldCheckGold, t: "The Right Environment" },
    { icon: iconGrowthTrend, t: "The Right Future" },
    { icon: iconHomeGold, t: "The Right Choice" },
  ];

  const displayItems = items.map((defaultCard, i) => {
    const dbItem = resData?.items?.[i] || resData?.cards?.[i];
    if (!dbItem) return defaultCard;
    return {
      ...defaultCard,
      title: dbItem.title || defaultCard.title,
      body: dbItem.body || defaultCard.body,
    };
  });

  const displayBottom = bottom.map((defaultItem, i) => {
    const dbItem = resData?.blueStrip?.[i] || resData?.bottomFeatures?.[i];
    if (!dbItem) return defaultItem;
    return {
      ...defaultItem,
      t: dbItem.title || dbItem.t || defaultItem.t,
    };
  });

  return (
    <section id="residential" className="w-full bg-white overflow-hidden relative">
      <AmbientGlows variant="light" />
      <div className=" w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] lg:min-h-[640px] xl:min-h-[720px] relative">
          {/* Left: Text & Features - Reveal on scroll */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="px-5 sm:px-8 lg:pl-10 lg:pr-6 py-8 lg:py-10 flex flex-col justify-center relative z-10 bg-white lg:bg-transparent"
          >
            <motion.h2 variants={fadeInUp(0, 0.6)} className="h1-global text-[#001B4F]">
              {formatDynamicText(resData?.heading || "Residential\nReal Estate [gold]Intelligence[/gold]", GOLD)}
            </motion.h2>
            <motion.div variants={fadeInUp(0.1, 0.5)}>
              <GoldRule />
            </motion.div>
            <motion.p variants={fadeInUp(0.2, 0.6)} className="p-global text-[#001B4F]/75 max-w-md md:max-w-none lg:max-w-md">
              {formatDynamicText(resData?.description || "We help families evaluate more than just properties. We help you choose a lifestyle that fits your values, plans, and future.", GOLD)}
            </motion.p>

            {/* Interactive Grid Cards with hover scale & shadow */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-xl md:max-w-none lg:max-w-xl">
              {displayItems.map((it, i) => (
                <ResidentialFlippingCard key={i} it={it} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right Image Container - Reveal with slight Ken Burns effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[400px] lg:h-full overflow-hidden bg-white z-0"
          >
            <ProgressiveImage
              src={resData?.imageUrl || p5}
              alt="Family reviewing a residential project"
              className="absolute inset-0 w-full h-full object-contain md:object-cover lg:object-contain lg:object-right bg-white"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={2}
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              whileHover={{ scale: 1.04 }}
            />
            {/* White transition gradient */}
            <div className="absolute top-0 left-0 bottom-0 w-[15%] bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden lg:block" />
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
          className="py-6 px-5 sm:px-8 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-center border-t border-[#D4A13A]/70 shadow-[0_-8px_30px_rgba(0,12,36,0.15)] group/strip"
          style={{
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x divide-white/20 gap-y-5 gap-x-4 lg:gap-y-0 w-full">
            {displayBottom.map((b, i) => {
              const words = b.t.split(" ");
              const t1 = words.slice(0, 2).join(" ");
              const t2 = words.slice(2).join(" ");
              return (
                <div
                  key={i}
                  className="flex items-center gap-3.5 text-white sm:pl-0 lg:pl-8 xl:pl-10 first:pl-0 lg:justify-start"
                >
                  <div
                    className="h-12 w-12 rounded-full border-2 border-[#D4A13A]/80 flex items-center justify-center shrink-0 p-2 bg-[#001B4F]/50 shadow-[0_0_15px_rgba(212,161,58,0.25)] animate-float-slow"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <RenderIcon icon={b.icon} className="h-7 w-7 object-contain" />
                  </div>
                  <div className="leading-snug">
                    <div className="text-white/90 font-medium text-[13px] xl:text-[13.5px]">{t1}</div>
                    <div className="text-gold font-bold text-[14px] xl:text-[14.5px] drop-shadow-sm">{t2}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white text-[15px] font-medium border-l-[4px] pl-4 lg:pl-6 w-full max-w-full lg:max-w-xs leading-relaxed shrink-0 drop-shadow-md"
            style={{ borderColor: GOLD }}
          >
            {formatDynamicText(resData?.sideText || "We help you build\nthe [gold]right life[/gold], not just\nfind the right property.", GOLD)}
          </motion.div>
        </motion.div>
      </div>
       {/* Bottom Statement strip */}

      <div className="w-full text-center py-4 px-5 bg-white border-b-2">
        <p className="font-sans text-[#001B4F] text-[15px] sm:text-base">
          {formatDynamicText(resData?.bottomStatement || "Smarter evaluation. Better choices. [gold]A stronger future for your family.[/gold]", GOLD)}
        </p>
      </div>
    </section>
  );
}
