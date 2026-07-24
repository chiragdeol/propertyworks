import { motion } from "framer-motion";
import { y, SlideLogoBadge, de, fe, SlideImage, GOLD } from "./shared";
import {
  fadeInUp,
  scaleUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
} from "@/lib/motion-variants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideYourJourney() {
  const { settings } = useSettings();
  const journeyData = settings?.sections?.yourJourney;

  return (
    <section className="slide-section w-full overflow-visible lg:overflow-hidden bg-[#F8FAFC]">
      {/* MOBILE LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="block lg:hidden w-full bg-[#fcfdfe] text-primary relative"
      >
        <div className="relative w-full aspect-[3/2] min-h-[220px] overflow-hidden flex flex-col justify-end p-6 md:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${journeyData?.imageUrl || "/images/Yourjourney_img_1.webp"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
         
          <div className="relative z-10 text-white max-w-[90%]">
            <h2 className="h1-global text-white">
              {formatDynamicText(journeyData?.heading || "Your Journey.\n[gold]Our Guidance. Better Decisions.[/gold]", "#D4A13A")}
            </h2>
            <p className="p-global text-white/80 mt-1">Real Estate Evaluation Process</p>
            <div className="gold-divider mt-3" />
          </div>
        </div>
        <div className="px-5 py-8 md:px-10 md:py-12 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="p-global text-primary/80">
              {formatDynamicText(journeyData?.description || "We simplify your real estate journey with a proven process designed to save time, reduce risk, and deliver confidence at every step.", GOLD)}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-[12px] flex flex-col items-center justify-center gap-[12px] shadow-lg border border-[#D4A13A]/30 p-5 text-white max-w-sm md:max-w-full mx-auto w-full cursor-default transition-all duration-300"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="w-[44px] h-[44px] flex items-center justify-center flex-shrink-0">
              <SlideImage src={y.usersGroup} size={40} />
            </div>
            <div className="text-center">
              <p className="text-white font-heading font-bold text-[14px] sm:text-[15px]">
                From Confusion to Confidence.
              </p>
              <p className="text-gold font-heading font-bold text-[12.5px] sm:text-[13.5px] mt-[1%]">
                We're with you all the way.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-primary text-center">
              Our 6 Step Journey
            </h3>

            <motion.div variants={staggerContainer(0.08, 0.2)} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {de.map((e) => (
                <motion.div
                  key={e.num}
                  variants={fadeInUp(0, 0.55)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-sm border border-primary/5 cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-gold text-sm font-bold shrink-0">
                      <AnimatedCounter value={e.num} />
                    </div>
                    <h4 className="font-bold text-primary text-[14.5px] sm:text-[15.5px] font-heading leading-tight">
                      {e.title}
                    </h4>
                  </div>
                  <img
                    src={e.img}
                    alt={e.title}
                    className="w-full h-[180px] rounded-[8px] object-cover shadow-sm border border-primary/5"
                  />
                  <p className="text-primary/70 text-[12px] sm:text-[13px] font-medium leading-relaxed">
                    {e.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-[14px] p-5 shadow-lg flex flex-col gap-5 text-white"
          >
            <h3 className="font-heading text-[15px] text-gold text-center font-bold pb-2 border-b border-white/10 uppercase tracking-wider">
              What You Gain at Every Step
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fe.map((e) => (
                <div key={e.title} className="flex items-start gap-3.5 group">
                  <div className="shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-300">
                    <SlideImage src={e.icon} size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[13px] sm:text-[14px] leading-tight font-heading group-hover:text-gold transition-colors duration-250">
                      {e.title}
                    </h4>
                    <p className="text-white/75 text-[11px] sm:text-[12px] leading-relaxed mt-1 whitespace-pre-line font-medium">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* <div className="w-full bg-white flex items-center justify-center py-4 border-b-[10px] border-gold px-4 text-center mt-4">
          <p className="text-primary text-[13.5px] sm:text-[15px] font-heading font-semibold">
            A well-guided journey leads to a{" "}
            <span className="text-gold">
              better home, a stronger investment, and a brighter future.
            </span>
          </p>
        </div> */}
      </motion.div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block slide-canvas-16-9 relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30">
        
        {/* Ambient Blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[35%] h-[45%] bg-[#D4A13A]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-[#001B4F]/5 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 h-[50%] w-[58%] bg-cover bg-center rounded-bl-[32px] overflow-hidden shadow-sm z-0"
          style={{ backgroundImage: `url('${journeyData?.imageUrl || "/images/Yourjourney_img_1.webp"}')` }}
        />
        <SlideLogoBadge variant="absolute" spacing={6} />

        {/* Left text column */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="absolute left-[3%] top-[12%] w-[32%] flex flex-col gap-3 z-10"
        >
          <motion.h2
            variants={fadeInRight(0, 0.6)}
            className="h1-global text-[#001B4F] tracking-tight leading-[1.2]"
          >
            {formatDynamicText(journeyData?.heading || "Your Journey.\n[gold]Our Guidance. Better Decisions.[/gold]", GOLD)}
            <div className="gold-divider mt-[3%] mb-[6%]" />
          </motion.h2>
          <motion.p variants={fadeInRight(0.1, 0.6)} className="p-global text-primary/80 mt-1">
            {formatDynamicText(journeyData?.description || "We simplify your real estate journey with a proven process designed to save time, reduce risk, and deliver confidence at every step.", GOLD)}
          </motion.p>
        </motion.div>

        {/* Overlapping slide badge */}
        <div
          className="absolute left-[36%] top-[3%] bg-primary rounded-[12px] shadow-[0_8px_25px_rgba(0,28,61,0.22)] border border-white/10 flex flex-col items-center z-20 cursor-default animate-float-slow"
          style={{ width: "clamp(160px,18vw,220px)", padding: "8px 12px" }}
        >
          <div
            className="flex items-center justify-center mb-[4%]"
            style={{ width: "clamp(36px,4.5vw,52px)", height: "clamp(36px,4.5vw,52px)" }}
          >
            <SlideImage src={y.usersGroup} size="clamp(36px,4.5vw,52px)" />
          </div>
          <p className="text-white font-heading font-bold text-center text-[clamp(13px,1vw,18px)] leading-tight">
            From Confusion
            <br />
            to Confidence.
          </p>
          <p className="text-gold font-heading font-bold text-center text-[clamp(11px,0.85vw,14px)] mt-[4px] leading-tight">
            We're with you
            <br />
            all the way.
          </p>
        </div>

        {/* Journey steps grid staggered pop-up - shifted down to top-[53%] using flex items-stretch */}
        <motion.div
          variants={staggerContainer(0.08, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="absolute inset-x-[2.5%] top-[53%] h-[29%] flex justify-between items-stretch z-10"
        >
          {de.map((e, t) => (
            <motion.div
              key={e.num}
              variants={fadeInUp(0, 0.55)}
              whileHover={{ y: -6 }}
              className="relative w-[15.5%] flex flex-col justify-start gap-2 cursor-pointer group bg-white/70 hover:bg-white border border-[#001B4F]/5 hover:border-gold/30 rounded-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,27,79,0.06)] p-3 transition-all duration-300"
            >
              {t < de.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: t * 0.15 + 0.5 }}
                  className="absolute right-[-7%] top-[30%] -translate-y-1/2 z-20 text-gold text-[clamp(18px,1.8vw,28px)] font-bold select-none leading-none group-hover:translate-x-1 transition-transform"
                >
                  ›
                </motion.div>
              )}
              <div className="relative">
                <div className="absolute -top-[24px] left-[50%] -translate-x-1/2 z-20 w-[32px] h-[32px] rounded-full bg-[#001B4F] border-2 border-white flex items-center justify-center shadow-md">
                  <SlideImage src={e.icon} size={18} className="filter brightness-110" />
                </div>
                <img
                  src={e.img}
                  alt={e.title}
                  className="w-full rounded-[8px] object-cover mt-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 group-hover:scale-102"
                  style={{ height: "clamp(90px,9.2vw,120px)" }}
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-[20px] h-[20px] rounded-full bg-[#001B4F] flex items-center justify-center text-gold text-[10px] font-extrabold shrink-0">
                  <AnimatedCounter value={e.num} />
                </div>
                <h4 className="text-[#001B4F] font-heading font-extrabold text-[clamp(11.5px,0.8vw,14px)] leading-tight group-hover:text-gold transition-colors duration-300">
                  {e.title}
                </h4>
              </div>
              <p className="text-primary/70 text-[clamp(10px,0.72vw,12.5px)] leading-relaxed mt-0.5 font-medium">
                {e.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom outcomes panel */}
        <div
          className="absolute inset-x-[2.5%] bottom-[2.5%] h-[11.5%] flex flex-col justify-center z-10 border border-[#D4A13A]/30 rounded-2xl shadow-[0_12px_40px_rgba(0,27,79,0.25)]"
          style={{
            paddingLeft: "4%",
            paddingRight: "4%",
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.06),transparent_50%)] rounded-2xl pointer-events-none" />
          
          {/* Labeled Pill overlapping the top edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold px-6 py-1 rounded-full shadow-md z-20 border border-white/20">
            <h3 className="text-white text-[clamp(11.5px,0.8vw,14px)] font-sans font-bold tracking-widest uppercase leading-none">
              What You Gain at Every Step
            </h3>
          </div>

          <motion.div
            variants={staggerContainer(0.08, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-between items-center w-full h-full py-1 mt-1"
          >
            {fe.map((e, t) => (
              <motion.div
                key={e.title}
                variants={fadeInUp(0, 0.5)}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-[10px] w-[18%] h-3/4 ${t < fe.length - 1 ? `border-r border-white/10` : ``} cursor-default group transition-transform duration-250`}
                style={t < fe.length - 1 ? { paddingRight: "1.5%" } : {}}
              >
                <div className="shrink-0 p-1 rounded-lg bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-300">
                  <SlideImage src={e.icon} size="clamp(22px, 2.2vw, 32px)" />
                </div>
                <div className="min-w-0">
                  <p className="text-gold font-bold text-[clamp(13px,0.9vw,15.5px)] leading-tight font-heading group-hover:text-gold transition-colors duration-250">
                    {e.title}
                  </p>
                  <p className="text-white/70 text-[clamp(10.5px,0.72vw,12.5px)] leading-[1.3] mt-[2px] whitespace-pre-line font-medium group-hover:text-white/90 transition-colors duration-250">
                    {e.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Gold Strip */}
        {/* <div className="absolute inset-x-0 bottom-0 h-[0.8%] bg-[#D4A13A]" /> */}
      </div>
    </section>
  );
}
