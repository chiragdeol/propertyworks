import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  NAVY,
  GOLD,
  RenderIcon,
  iconLightbulbCircle,
  iconCarCircle,
  iconMegaphoneGold,
  iconRupeeCircle,
  iconInfoCircle,
  iconCompassCircle,
  p2,
  AmbientGlows,
} from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import { CheckCircle2 } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

interface NoiseItem {
  icon: string;
  title: React.ReactNode;
  body: React.ReactNode;
  solTitle: string;
  solBody: string;
  tags?: string[];
  solTags?: string[];
  titleVariants: any;
  bodyVariants: any;
}

function NoiseFlippingCard({ it, index }: { it: NoiseItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    // Stagger flipping times dynamically for each card
    const delay = 3500 + (index % 3) * 1600 + Math.floor(index / 3) * 500;
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
    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
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
      className={`group perspective-[1000px] w-full ${
        index === 4
          ? "h-[200px] xs:h-[180px] sm:h-[180px] md:col-span-2 lg:col-span-1 xl:col-span-2"
          : "h-[145px] xs:h-[135px] sm:h-[180px]"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsFlipped(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
    >
      <div
        style={cardInnerStyle}
        className="relative h-full w-full rounded-2xl shadow-lg hover:shadow-[0_16px_36px_rgba(0,51,153,0.35)]"
      >
        {/* Front Side */}
        <div
          style={{
            ...cardSideStyle,
            background: "linear-gradient(135deg, #001b4f 0%, #002266 50%, #000c24 100%)",
          }}
          className="flex items-start gap-3.5 cursor-default p-3.5 sm:p-5 rounded-2xl border border-white/10"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/15 flex items-center justify-center shrink-0 bg-white/10 shadow-inner text-white group-hover:scale-105 group-hover:border-[#D4A13A]/60 group-hover:bg-[#001B4F] transition-all duration-300">
            <RenderIcon icon={it.icon} className="h-5.5 w-5.5 object-contain" />
          </div>
          <div className="flex-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={it.titleVariants}
              className="font-serif font-bold text-white text-[14px] sm:text-[15.5px] leading-snug tracking-wide"
            >
              {it.title}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={it.bodyVariants}
              className="text-white/70 text-[12px] sm:text-[13px] font-sans leading-relaxed mt-1.5"
            >
              {it.body}
            </motion.div>

            {/* Staggered tags for additional spacing & aesthetics on Card 5 */}
            {it.tags && (
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-3.5">
                {it.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-[11px] font-medium text-[#D4A13A] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            ...cardSideStyle,
            background: "linear-gradient(135deg, #d4a13a 0%, #f6d98e 50%, #d4a13a 100%)",
            transform: "rotateX(180deg)",
          }}
          className="flex items-start gap-3.5 cursor-default p-3.5 sm:p-5 rounded-2xl border border-white/20"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#001B4F]/20 flex items-center justify-center shrink-0 bg-[#001B4F]/10 shadow-inner text-[#001B4F] transition-colors duration-300">
            <CheckCircle2 className="h-5.5 w-5.5" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div className="font-serif font-bold text-[#001B4F] text-[14px] sm:text-[15.5px] leading-snug tracking-wide">
              {it.solTitle}
            </div>
            <div className="text-[#001B4F]/90 text-[12px] sm:text-[13px] font-sans leading-relaxed mt-2 font-medium">
              {it.solBody}
            </div>

            {/* Staggered solution tags for additional spacing & aesthetics on Card 5 */}
            {it.solTags && (
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-3.5">
                {it.solTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-[11px] font-bold text-white bg-[#001B4F]/80 border border-white/10 px-2.5 py-0.5 rounded-full select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SectionNoise() {
  const { settings } = useSettings();
  const noiseData = settings?.sections?.noise;

  const items = [
// ... (omitting items inside, we only target the beginning of SectionNoise component)

    {
      icon: iconCarCircle,
      title: (
        <>
          <span className="text-white">Endless</span> <span style={{ color: GOLD }}>Site Visits</span>
        </>
      ),
      body: (
        <>
          Traveling between projects creates <span className="text-white font-semibold">more confusion</span> than clarity.
        </>
      ),
      solTitle: "Guided Site Visits",
      solBody: "We pre-filter and coordinate structured site visits so you save weeks of unnecessary effort.",
      titleVariants: {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
      },
      bodyVariants: {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" as const } }
      }
    },
    {
      icon: iconMegaphoneGold,
      title: (
        <>
          <span style={{ color: GOLD }}>Builder-Driven</span> <span className="text-white">Inventory Pushing</span>
        </>
      ),
      body: (
        <>
          You only see what the developer's sales team <span className="text-white font-semibold">wants to sell first</span>.
        </>
      ),
      solTitle: "Unbiased Representation",
      solBody: "We represent you, showing you the absolute best market options, not just builder inventory.",
      titleVariants: {
        hidden: { opacity: 0, scale: 0.82 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 10 } }
      },
      bodyVariants: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" as const } }
      }
    },
    {
      icon: iconRupeeCircle,
      title: (
        <>
          <span className="text-white">Retail Pricing</span> <span style={{ color: GOLD }}>Confusion</span>
        </>
      ),
      body: (
        <>
          Uncertainty about <span className="text-white font-semibold">pricing flexibility</span> and the right transaction position.
        </>
      ),
      solTitle: "Transaction Intelligence",
      solBody: "Get transparent pricing analytics, developer flexibility insights, and commercial guidance.",
      titleVariants: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
      },
      bodyVariants: {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" as const } }
      }
    },
    {
      icon: iconInfoCircle,
      title: (
        <>
          <span style={{ color: GOLD }}>Information</span> <span className="text-white">Overload</span>
        </>
      ),
      body: (
        <>
          Too much unorganized information eventually leads to <span className="text-white font-semibold">decision paralysis</span>.
        </>
      ),
      solTitle: "Evaluation Frameworks",
      solBody: "We simplify comparison details into a clear checklist so you can decide with confidence.",
      titleVariants: {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
      },
      bodyVariants: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" as const } }
      }
    },
    {
      icon: iconCompassCircle,
      title: (
        <>
          <span className="text-white">Alignment &amp;</span> <span style={{ color: GOLD }}>Vastu Concerns</span>
        </>
      ),
      body: (
        <>
          Vastu preferences and orientation are <span className="text-white font-semibold">often completely overlooked</span>.
        </>
      ),
      solTitle: "Personalized Alignment",
      solBody: "We analyze vastu compatibility, home orientation, and lifestyle fit for your family's peace of mind.",
      tags: ["Vastu Compliance", "Sunlight & Airflow", "Orientation Analysis", "Numerology Check"],
      solTags: ["Detailed Direction Audit", "Energy Flow Check", "Lifestyle Fit Analysis"],
      titleVariants: {
        hidden: { opacity: 0, scale: 0.9, rotate: -2 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 100, damping: 8 } }
      },
      bodyVariants: {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" as const } }
      }
    },
  ];

  const defaultIcons = [iconCarCircle, iconMegaphoneGold, iconRupeeCircle, iconInfoCircle, iconCompassCircle];

  const displayItems = items.map((defaultCard: any, i: number) => {
    const dbItem = noiseData?.items?.[i];
    if (!dbItem) return defaultCard;

    return {
      ...defaultCard,
      title: dbItem.title ? formatDynamicText(dbItem.title, GOLD) : defaultCard.title,
      body: dbItem.body ? formatDynamicText(dbItem.body, GOLD) : defaultCard.body,
      solTitle: dbItem.solTitle || defaultCard.solTitle,
      solBody: dbItem.solBody || defaultCard.solBody,
      tags: (Array.isArray(dbItem.tags) && dbItem.tags.length > 0) ? dbItem.tags : defaultCard.tags,
      solTags: (Array.isArray(dbItem.solTags) && dbItem.solTags.length > 0) ? dbItem.solTags : defaultCard.solTags,
    };
  });

  return (
    <section className="w-full bg-white relative overflow-hidden">
      <AmbientGlows variant="light" />
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1.4fr] lg:min-h-screen">
          {/* Left Column Content - Animate on scroll */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="px-5 sm:px-8 lg:px-8 xl:px-12 py-6 lg:py-8 xl:py-10 flex flex-col justify-center"
          >
            <motion.h2 variants={fadeInUp(0, 0.6)} className="h1-global text-[#001B4F]">
              {formatDynamicText(noiseData?.heading || "The Real Estate Market Is Filled With [gold]Noise, Pressure & Confusion.[/gold]", GOLD)}
            </motion.h2>
            <motion.div
              variants={fadeInUp(0.1, 0.5)}
              className="h-[3px] w-20 mt-2.5 mb-4"
              style={{ background: GOLD }}
            />
            <motion.p variants={fadeInUp(0.2, 0.6)} className="p-global text-[#001B4F]/75 max-w-sm md:max-w-none lg:max-w-sm">
              {formatDynamicText(noiseData?.description || "Most buyers do not lack options. They lack structured guidance, comparison clarity, project intelligence, and coordinated support.", GOLD)}
            </motion.p>

            {/* Grid Items - Staggered POP-in & hover tilt */}
            <motion.div
              variants={staggerContainer(0.08, 0.3)}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-4 xl:gap-y-5 max-w-xl md:max-w-none lg:max-w-xl"
            >
              {displayItems.map((it: any, i: number) => (
                <NoiseFlippingCard key={i} it={it} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Container - Reveal on scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-1764/1412 lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[400px] bg-[#000c24] overflow-hidden"
          >
            <ProgressiveImage
              src={noiseData?.imageUrl || p2}
              alt="Overwhelmed buyer surrounded by brochures"
              className="absolute inset-0 w-full h-full object-cover object-center"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={4}
            />
            <div className="absolute top-0 left-0 right-0 h-16 lg:hidden bg-linear-to-b from-white to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Bottom strip animation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full border-t border-[#D4A13A]/70 shadow-[0_-8px_30px_rgba(0,12,36,0.15)] select-none cursor-default group/strip"
        style={{
          background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
          backgroundSize: "300% 300%",
          animation: "glowMove 10s ease infinite",
        }}
      >
        <div className="max-w-[1760px] mx-auto py-6 px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          {/* Icon frame with pulse glow */}
          <div className="relative h-12 w-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover/strip:border-[#D4A13A]/50 transition-all duration-300 shrink-0">
            <RenderIcon icon={iconLightbulbCircle} className="h-5.5 w-5.5 object-contain transition-transform duration-500 group-hover/strip:scale-110" />
          </div>
          <p className="text-white font-serif text-[16px] sm:text-[18px] tracking-wide text-center sm:text-left leading-relaxed font-semibold">
            {formatDynamicText(noiseData?.stripText || "Without the right guidance and structure, the entire process becomes [gold]emotionally exhausting.[/gold]", GOLD)}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
