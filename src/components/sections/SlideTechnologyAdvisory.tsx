import { motion } from "framer-motion";
import { y, SlideLogoBadge, E, D, SlideImage, GOLD } from "./shared";
import {
  fadeInUp,
  scaleUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
} from "@/lib/motion-variants";

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideTechnologyAdvisory() {
  const { settings } = useSettings();
  const techData = settings?.sections?.technologyAdvisory;

  return (
    <section className="slide-section w-full overflow-visible lg:overflow-hidden">
      {/* MOBILE LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="block lg:hidden w-full bg-[#fcfdfe] text-primary relative"
      >
        <div className="relative w-full aspect-[1672/941] min-h-[220px] overflow-hidden flex flex-col justify-end p-6 md:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${techData?.imageUrl || "/images/Technologyassisted_img.webp"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        
          <div className="relative z-10 text-white">
            <h2 className="h1-global text-white">
              {formatDynamicText(techData?.heading || "Technology [gold]Assisted.[/gold]\nHuman [gold]Guided.[/gold]", "#D4A13A")}
            </h2>
            <p className="p-global text-white/80 mt-1">Intelligence & Advisory Services</p>
            <div className="gold-divider mt-3" />
          </div>
        </div>

        <div className="px-5 py-8 md:px-10 md:py-12 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="p-global text-primary/80">
              {formatDynamicText(techData?.description || "We combine smart technology with real expertise to deliver clarity, confidence, and better decisions.", GOLD)}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-[12px] flex items-center justify-center gap-[12px] shadow-lg border border-white/10 p-5 text-white max-w-sm md:max-w-full mx-auto w-full cursor-default"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div
              className="w-[76px] h-[76px] flex items-center justify-center flex-shrink-0 animate-wiggle-slow"
            >
              <SlideImage src={y.logo} size={72} />
            </div>
            <div>
              <p className="text-white font-heading font-bold text-[14px] sm:text-[15px]">
                Powerful Technology.
              </p>
              <p className="text-gold font-heading font-bold text-[12.5px] sm:text-[13.5px] mt-[1%]">
                Trusted People.
              </p>
            </div>
          </motion.div>

          {/* Staggered checklist */}
          <motion.div variants={staggerContainer(0.08, 0.2)} className="flex flex-col gap-5">
            {E.map((e) => (
              <motion.div
                key={e.title}
                variants={fadeInUp(0, 0.55)}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-sm border border-primary/5 cursor-default"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#001B4F] border border-gold/30 shadow-sm text-white">
                  <SlideImage src={e.icon} size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-[#001B4F] text-[14px] sm:text-[15px] font-heading leading-tight mb-1">
                    {e.title}
                  </h4>
                  <p className="text-[#001B4F]/70 text-[12px] sm:text-[12.5px] font-medium leading-relaxed mt-1 whitespace-pre-line">
                    {e.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-[14px] p-5 shadow-lg flex flex-col gap-5 text-white"
          >
            <h3 className="font-heading text-[15px] text-gold text-center font-bold pb-2 border-b border-white/10">
              What You Gain
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {D.map((e) => (
                <div key={e.title} className="flex items-start gap-3.5">
                  <SlideImage src={e.icon} size={48} className="shrink-0" />
                  <div>
                    <h4 className="text-white font-bold text-[13px] sm:text-[14px] leading-tight font-heading">
                      {e.title}
                    </h4>
                    <p className="text-white/65 text-[11px] sm:text-[12px] leading-relaxed mt-1 whitespace-pre-line font-medium">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="w-full bg-white flex items-center justify-center py-4 border-t border-b-2 px-4 text-center mt-4">
          <p className="text-primary text-[13.5px] sm:text-[15px] font-heading font-semibold">
            Smart Technology. Real Expertise. <span className="italic font-bold text-gold">Better Decisions.</span>
          </p>
        </div>
      </motion.div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block slide-canvas-16-9">
        <SlideLogoBadge variant="absolute" spacing={6} />

        {/* Left Side Content - Reveal */}
        <div className="absolute left-[3%] top-[14%] w-[32%] h-[52%] flex flex-col justify-between z-10">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <motion.h2
              variants={fadeInRight(0, 0.6)}
              className="h1-global text-[#001B4F] tracking-tight leading-[1.2]"
            >
              {formatDynamicText(techData?.heading || "Technology [gold]Assisted.[/gold]\nHuman [gold]Guided.[/gold]", GOLD)}
              <div className="gold-divider my-[3%]" />
            </motion.h2>
            <motion.div variants={fadeInRight(0.1, 0.6)} className="p-global text-primary/80 mt-4">
              {techData?.description ? (
                formatDynamicText(techData.description, GOLD)
              ) : (
              <>
                We combine smart technology with real expertise
                <br />
                to deliver clarity, confidence, and better decisions.
              </>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
            style={{ marginTop: "30px" }}
          >
            {E.map((e, t) => (
              <motion.div key={e.title} variants={fadeInRight(0, 0.5)}>
                {t > 0 && <div className="h-[2px] bg-[#001B4F]/10 my-3 w-[70%]" />}
                <div className="flex items-start gap-[12px]">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#001B4F] border border-gold/30 shadow-sm text-white cursor-pointer"
                  >
                    <SlideImage src={e.icon} size={24} />
                  </motion.div>
                  <div>
                    <p className="font-bold text-[#001B4F] text-[clamp(16.5px,0.95vw,22.5px)] font-heading leading-tight mb-1">
                      {e.title}
                    </p>
                    <p className="text-[#001B4F]/70 text-[clamp(11px,0.78vw,13px)] font-medium leading-relaxed whitespace-pre-line mt-[3px]">
                      {e.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side Image - Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 top-0 w-[60%] h-[80%] overflow-hidden shadow-sm"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${techData?.imageUrl || "/images/Technologyassisted_img.webp"}')` }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" /> */}

          {/* Floating logo badge with infinite float */}
          <div
            className="absolute right-[32%] top-[5%] bg-primary rounded-[12px] flex items-center gap-[12px] shadow-2xl border border-white/10 cursor-default animate-float-slow"
            style={{ padding: "12px 18px" }}
          >
            <div className="w-[84px] h-[84px] flex items-center justify-center flex-shrink-0">
              <SlideImage src={y.logo} size={80} />
            </div>
            <div>
              <p className="text-white font-heading font-bold text-[clamp(14px,1.05vw,18px)]">
                Powerful Technology.
              </p>
              <p className="text-gold font-heading font-bold text-[clamp(12px,0.95vw,16px)] mt-[1%] text-center">
                Trusted People.
              </p>
          </div>
        </div>
      </motion.div>

        {/* Bottom Outcomes - Staggered slide in */}
        <motion.div
          variants={staggerContainer(0.08, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute inset-x-0 bottom-[5%] h-[15%] flex items-center justify-between z-10 border border-white/10"
          style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          {D.map((e, t) => (
            <motion.div
              key={e.title}
              variants={fadeInUp(0, 0.55)}
              className={`flex items-start gap-[12px] w-[22%] ${t < D.length - 1 ? `border-r border-white/15` : ``}`}
              style={t < D.length - 1 ? { paddingRight: "3%" } : {}}
            >
              <SlideImage src={e.icon} size="clamp(40px, 4.2vw, 70px)" className="shrink-0" />
              <div>
                <p className="text-gold font-bold text-[clamp(13px,0.95vw,16px)] leading-tight">
                  {e.title}
                </p>
                <p className="text-white/65 text-[clamp(11.5px,0.75vw,13px)] leading-normal mt-[2px] whitespace-pre-line font-medium">
                  {e.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Gold Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 h-[6%] bg-white flex items-center justify-center border-t border-b-2"
        >
          <p className="font-sans text-[#001B4F] text-[15px] sm:text-base">
            Smart Technology. Real Expertise. <span className="italic font-bold text-gold">Better Decisions.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
