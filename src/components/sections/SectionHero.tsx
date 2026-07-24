import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  NAVY,
  GOLD,
  GoldRule,
  RenderIcon,
  p1,
  iconShieldCheckCircle,
  iconUsersCircle,
  iconGrowthTrendCircle,
  AmbientGlows,
} from "./shared";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import ShortlistButton from "../ShortlistButton";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SectionHero() {
  const { settings } = useSettings();
  const heroData = settings?.sections?.hero;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: `linear-gradient(to bottom, ${NAVY} 0%, #000c24 100%)` }}>
      <AmbientGlows variant="dark" />
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[45%_55%] lg:min-h-[540px] xl:min-h-[620px]">
          {/* Hero Left Content - Staggered entrance */}
          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            animate="visible"
            className="pl-5 pr-5 sm:pl-8 sm:pr-8 lg:pl-16 lg:pr-6 xl:pr-10 py-10 lg:py-12 flex flex-col justify-center"
          >
            <div className="mt-2 lg:mt-4">
              <motion.h1 variants={fadeInUp(0, 0.7)} className="h1-global text-white">
                {formatDynamicText(heroData?.heading || "Stop Evaluating\nReal Estate [gold]Blindly.[/gold]", GOLD)}
              </motion.h1>

              <motion.div variants={fadeInUp(0.15, 0.5)}>
                <GoldRule />
              </motion.div>

              <motion.p variants={fadeInUp(0.3, 0.6)} className="p-global text-white/85 max-w-xl md:max-w-none lg:max-w-xl">
                {formatDynamicText(heroData?.paragraph1 || "Most buyers spend months visiting projects, comparing brochures, and listening to conflicting opinions.", GOLD)}
              </motion.p>

              <motion.p
                variants={fadeInUp(0.4, 0.6)}
                className="p-global text-white/85 max-w-xl md:max-w-none lg:max-w-xl mt-4"
              >
                {heroData?.paragraph2 ? (
                  formatDynamicText(heroData.paragraph2, GOLD)
                ) : (
                  <Fragment>
                    <span className="text-white font-semibold">Property</span>
                    <span className="font-semibold" style={{ color: GOLD }}>Works</span> helps professionals, businesses,
                    investors, and families evaluate residential and commercial opportunities through
                    structured comparison, guided coordination, and real estate intelligence.
                  </Fragment>
                )}
              </motion.p>

              {/* Animated Action Buttons */}
              <motion.div
                variants={fadeInUp(0.5, 0.6)}
                className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center"
              >
                <ShortlistButton type="Residential" />
                <ShortlistButton type="Commercial" />
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Right Image - Ken Burns zoom/fade entrance */}
          <motion.div
            variants={scaleUp(0.2, 0.9)}
            initial="hidden"
            animate="visible"
            className="relative min-h-[280px] sm:min-h-[400px] lg:h-full overflow-hidden bg-[#001B4F]"
          >
            <ProgressiveImage
              src={heroData?.imageUrl || p1}
              alt="Advisor reviewing project comparison with a couple"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-right"
              containerClassName="absolute inset-0 w-full h-full"
              videoLook={true}
              animationType={1}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            />
            {/* Smooth left-to-right navy gradient overlay (blends the left edge into the text panel) */}
            <div className="absolute top-0 left-0 right-0 h-16 lg:right-auto lg:h-full lg:w-[15%] bg-linear-to-b lg:bg-linear-to-r from-[#001B4F] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Redesigned Feature Strip - Single Blue Strip with Different Text Animations */}
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-6 lg:px-12 pb-12 lg:pb-16 relative z-20">
        {/* Subtle background glow effect behind the strip */}
        <div 
          className="absolute inset-x-0 -bottom-16 mx-auto w-full max-w-5xl h-32 pointer-events-none -z-10" 
          style={{ background: "radial-gradient(circle, rgba(212, 161, 58, 0.06) 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
          className="shadow-2xl flex flex-col md:flex-row rounded-2xl border border-white/20 divide-y md:divide-y-0 md:divide-x divide-white/15 overflow-hidden py-3 md:py-5"
        >
          {[
            {
              icon: iconShieldCheckCircle,
              title: (
                <>
                  <span className="text-white">No</span> <span style={{ color: GOLD }}>Buyer-Side Fee</span>
                </>
              ),
              sub: (
                <>
                  We represent <span className="text-white font-semibold">you</span>, not the builder. 100% unbiased advisory.
                </>
              ),
              titleVariants: {
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
              },
              subVariants: {
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as const } }
              }
            },
            {
              icon: iconUsersCircle,
              title: (
                <>
                  <span className="text-white">Premium</span> <span style={{ color: GOLD }}>Guided Advisory</span>
                </>
              ),
              sub: (
                <>
                  <span className="text-white font-medium">Structured.</span>{" "}
                  <span style={{ color: GOLD }} className="font-semibold">Transparent.</span>{" "}
                  <span className="text-white font-medium">Practical.</span>
                </>
              ),
              titleVariants: {
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 10, delay: 0.1 } }
              },
              subVariants: {
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" as const } }
              }
            },
            {
              icon: iconGrowthTrendCircle,
              title: (
                <>
                  <span className="text-white">Built For</span> <span style={{ color: GOLD }}>Decision Makers</span>
                </>
              ),
              sub: (
                <>
                  Designed for professionals and families.{" "}
                  <span style={{ color: GOLD }} className="font-semibold block sm:inline md:block xl:inline">Better decisions.</span>
                </>
              ),
              titleVariants: {
                hidden: { opacity: 0, x: 25 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as const } }
              },
              subVariants: {
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" as const } }
              }
            },
          ].map((f, i) => (
            <div
              key={i}
              className="flex-1 px-6 sm:px-8 py-5 sm:py-6 flex items-start gap-4 sm:gap-5 cursor-default transition-all duration-300 hover:bg-white/3 group"
            >
              <div
                className="shrink-0 animate-float-slow"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#D4A13A]/40 group-hover:bg-[#001B4F] transition-all duration-300 shadow-inner">
                  <RenderIcon
                    icon={f.icon}
                    className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={f.titleVariants}
                  className="font-serif font-bold text-[16px] sm:text-[18px] leading-snug tracking-wide"
                >
                  {f.title}
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={f.subVariants}
                  className="text-white/70 text-[12.5px] sm:text-[13.5px] mt-1.5 leading-relaxed font-sans"
                >
                  {f.sub}
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
