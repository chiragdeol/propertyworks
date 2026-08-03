import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Logo, SlideLogoBadge, GOLD, y } from "./shared";
import {
  fadeInUp,
  scaleUp,
  staggerContainer,
} from "@/lib/motion-variants";

import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";

export default function SlideClientTestimonials() {
  const { settings } = useSettings();
  const testimonialsData = settings?.sections?.testimonials;

  const testimonials = [
    {
      name: "Ritu Sharma",
      role: "Residential Buyer, Thane",
      text: "We had already visited multiple projects before connecting with PropertyWorks, but eventually everything started feeling similar. PropertyWorks helped simplify the process and brought much better comparison clarity.",
      img: "/images/prop-1-img.webp",
    },
    {
      name: "Vivek Menon",
      role: "Senior Corporate Professional, Powai",
      text: "Instead of spending weekends randomly visiting projects, the process became much more focused and manageable.",
      img: "/images/prop-5-img.webp",
    },
    {
      name: "Neha Iyer",
      role: "Commercial Client, Mumbai",
      text: "Most interactions in the market felt extremely sales-driven. PropertyWorks felt more evaluation-focused and professionally structured.",
      img: "/images/prop-4-img.webp",
    },
    {
      name: "Ajay & Sunita Patil",
      role: "Kalyan | Family Buyer",
      text: "PropertyWorks helped us evaluate projects beyond just price and location. The structured guidance gave us confidence in our final decision.",
      img: "/images/prop-3-img.webp",
    },
    {
      name: "Sandeep Iyer",
      role: "Navi Mumbai | Investor",
      text: "The comparative evaluation support made a significant difference. We could clearly see which project truly aligned with our requirements.",
      img: "/images/prop-7-img.webp",
    },
    {
      name: "Arjun Malhotra",
      role: "Andheri | Business Owner",
      text: "From understanding our business needs to shortlisting the right commercial options, the entire experience was smooth and well-coordinated.",
      img: "/images/prop-8-img.webp",
    },
    {
      name: "Meera Shah",
      role: "Mulund | Home Buyer",
      text: "We appreciated the transparency and honest guidance throughout the evaluation process. No unnecessary pressure, just clarity.",
      img: "/images/prop-2-img.webp",
    },
    {
      img: "/images/prop-6-img.webp",
    },
  ];

  const defaultTestimonialImgs = [
    "/images/prop-1-img.webp",
    "/images/prop-5-img.webp",
    "/images/prop-4-img.webp",
    "/images/prop-3-img.webp",
    "/images/prop-7-img.webp",
    "/images/prop-8-img.webp",
    "/images/prop-2-img.webp",
    "/images/prop-6-img.webp",
  ];

  const displayTestimonials = testimonials.map((defaultCard: any, idx: number) => {
    const dbItem = testimonialsData?.items?.[idx];
    if (!dbItem) return defaultCard;
    return {
      ...defaultCard,
      name: dbItem.name || defaultCard.name,
      role: dbItem.role || defaultCard.role,
      text: dbItem.quote || defaultCard.text,
    };
  });

  const pillars = [
    {
      title: "Trusted Guidance",
      desc: "Your goals come first",
      icon: y.shieldCheck,
    },
    {
      title: "Proven Expertise",
      desc: "Backed by experience and intelligence",
      icon: y.expert,
    },
    {
      title: "Better Clarity",
      desc: "For smarter real estate decisions",
      icon: y.searchChart,
    },
    {
      title: "Long-Term Confidence",
      desc: "Building relationships that last",
      icon: y.handshake,
    },
  ];

  return (
    <section
      id="testimonials"
      className="slide-section w-full overflow-hidden bg-slate-50/50 relative "
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />

      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-linear-to-br from-[#D4A13A]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-linear-to-tl from-[#001B4F]/5 to-transparent blur-[150px] rounded-full pointer-events-none" />

      {/* MOBILE LAYOUT */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        className="block lg:hidden w-full text-primary relative px-5 py-8"
      >
        <motion.div variants={fadeInUp(0, 0.5)}>
        
          <h2 className="h1-global text-[#001B4F] mt-1">
            {formatDynamicText(testimonialsData?.heading || "What Our [gold]Clients Say[/gold]")}
          </h2>
          <p className="p-global text-slate-500 mt-1">{formatDynamicText(testimonialsData?.description || "Real Experiences. Better Decisions.", GOLD)}</p>
        </motion.div>

        {/* Featured Image and Quote Card for Mobile - Re-layout to have a clean image and separate overlapping text card */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="relative h-44 md:h-80 rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <img
              src={testimonialsData?.imageUrl || "/images/prop-upper-img.webp"}
              alt="Upper setup"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <motion.div
            variants={fadeInUp(0.1, 0.6)}
            className="bg-white border-l-4 border-l-[#D4A13A] shadow-md rounded-xl p-5 cursor-default relative z-10 mt-3 mx-0"
          >
            <div className="font-heading text-[32px] font-bold leading-[0.15] text-gold -mt-1 mb-2">
              "
            </div>
            <p className="font-heading text-[13.5px] font-semibold leading-relaxed text-[#001B4F]">
              {formatDynamicText(testimonialsData?.stripQuote || "Guided by [gold]Intelligence.[/gold] Evaluated with [gold]Clarity.[/gold] Decided with [gold]Confidence.[/gold]", GOLD)}
            </p>
            <div className="flex gap-1 items-center mt-3.5 pt-2 border-t border-slate-100">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} viewBox="0 0 24 24" fill="#D4A13A" className="w-4 h-4">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Marquee Mobile */}
        <div className="mt-6 w-screen relative left-1/2 -translate-x-1/2">
          <Marquee speed={35} pauseOnHover={true} gradient={false}>
            {displayTestimonials.map((t: any, idx: number) => (
              <div key={`${t.name}-${idx}`} className="w-[320px] md:w-[400px] px-2 py-2 shrink-0">
                <div
                  className="bg-white p-4.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex gap-4 cursor-pointer h-full hover:border-[#D4A13A] transition-colors duration-300"
                >
                  <div className="w-[52px] md:w-[80px] h-[74px] md:h-[112px] shrink-0 rounded-t-full rounded-b-none overflow-hidden border border-[#D4A13A]/25 bg-slate-50">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between min-w-0 flex-1">
                    <div>
                      <span className="text-[#D4A13A]/30 text-2xl font-serif leading-none block -mt-1 select-none">
                        “
                      </span>
                      <p className="text-slate-600 text-[12px] leading-relaxed -mt-2">{t.text}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <p className="text-[#001B4F] font-bold text-[13px]">{t.name}</p>
                      <p className="text-slate-500 text-[10.5px] flex items-center gap-1.5 mt-1 font-semibold">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#D4A13A"
                          strokeWidth="2.5"
                          className="w-3.5 h-3.5 shrink-0"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Pillars mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-white rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 shadow-md border border-[#D4A13A]/30"
          style={{
            background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
            backgroundSize: "300% 300%",
            animation: "glowMove 10s ease infinite",
          }}
        >
          {pillars.map((p, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5 p-2">
                <img
                  src={p.icon}
                  alt={p.title}
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div>
                <p className="text-gold font-heading font-bold text-xs">{p.title}</p>
                <p className="text-white/60 text-[10px] mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block w-full relative z-10">
        {/* ── Row 1: Left info | Right Image ── */}
        <div className="max-w-[1760px] mx-auto w-full bg-[#fcfdfe] relative">
          <div className="flex flex-col lg:flex-row relative">
            {/* Left side: Heading and paragraph */}
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
                <h2 className="h1-global text-[#001B4F] tracking-tight leading-[1.2]">
                  {formatDynamicText(testimonialsData?.heading || "What Our [gold]Clients Say[/gold]")}
                </h2>
                <h2 className="text-[#001B4F] text-[clamp(13px,1.3vw,17px)] font-bold mt-2">
                  {formatDynamicText(testimonialsData?.description || "Real Experiences. Better Decisions.", GOLD)}
                </h2>
                <div className="gold-divider mt-3" />
              </motion.div>
              <motion.p
                variants={fadeInUp(0.2, 0.6)}
                className="p-global text-primary/80 max-w-[500px]"
              >
                {formatDynamicText(testimonialsData?.paragraph || "At PropertyWorks, every evaluation is guided by clarity, structure, and your best interests. Here's what clients have shared about their journey with us.", GOLD)}
              </motion.p>
            </motion.div>

            {/* Right side: Banner image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:w-2/3 h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[420px] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${testimonialsData?.imageUrl || "/images/prop-upper-img.webp"}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001B4F]/40 via-transparent to-transparent lg:hidden" />
            </motion.div>

            {/* Overlapping quote card with float animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              animate={{ y: [0, -4, 0] }}
              className="hidden lg:block absolute z-20"
              style={{ top: "50%", left: "42.86%", transform: "translate(-50%, -50%)" }}
            >
              <div
                className="bg-white/95 backdrop-blur-sm border-l-4 border-l-[#D4A13A] shadow-[0_12px_36px_rgba(0,27,79,0.16)] rounded-[10px] cursor-default"
                style={{ padding: "16px 18px", maxWidth: "clamp(190px,19vw,240px)" }}
              >
                <div className="font-heading text-[36px] font-bold leading-[0.15] text-gold -mt-1 mb-1">
                  "
                </div>
                <p className="font-heading text-[clamp(11.5px,1.05vw,14px)] font-semibold leading-snug text-[#001B4F]">
                  {formatDynamicText(testimonialsData?.stripQuote || "Guided by [gold]Intelligence.[/gold] Evaluated with [gold]Clarity.[/gold] Decided with [gold]Confidence.[/gold]", GOLD)}
                </p>
                <div className="flex gap-0.5 items-center mt-2.5 pt-2 border-t border-slate-100">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" fill="#D4A13A" className="w-3.5 h-3.5">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* ── Row 2: Marquee for Testimonials ── */}
        <div className="w-full mt-4 relative">
          <Marquee speed={40} pauseOnHover={true} gradient={false} className="py-4">
            {displayTestimonials.map((t: any, idx: number) => (
              <div key={`${t.name}-${idx}`} className="w-[380px] xl:w-[420px] px-3 shrink-0">
                <div
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-row gap-4.5 p-5 min-h-[190px] group relative overflow-hidden cursor-pointer h-full hover:-translate-y-1 hover:border-[#D4A13A] hover:shadow-[0_20px_40px_rgba(0,27,79,0.08)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#D4A13A]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  {/* Left side: Vertical capsule image */}
                  <div className="w-[80px] h-[112px] shrink-0 rounded-t-full rounded-b-none overflow-hidden border border-[#D4A13A]/20 shadow-[0_4px_12px_rgba(0,27,79,0.04)] bg-slate-50">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Right side content */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className="text-[#D4A13A]/30 text-3xl font-serif leading-none block -mt-2 mb-0.5 select-none">
                        “
                      </span>
                      <div className="border-b border-[#D4A13A]/20 pb-2.5 mb-2">
                        <p className="text-slate-600 text-[13px] xl:text-[14px] leading-relaxed font-medium -mt-2 line-clamp-4">
                          {t.text}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#001B4F] font-extrabold text-[14px] xl:text-[15px] tracking-tight truncate">
                        {t.name}
                      </p>
                      <p className="text-slate-500 text-[11px] xl:text-[12px] truncate font-semibold mt-1 flex items-center gap-1.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#D4A13A"
                          strokeWidth="2.5"
                          className="w-3.5 h-3.5 shrink-0"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* ── Row 3: Bottom Blue Stripe ── */}
        <div className="max-w-[1760px] mx-auto w-full px-8 lg:px-16 mt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl px-8 py-6 flex items-center justify-between shadow-xl border border-[#D4A13A]/30 relative overflow-hidden"
            style={{
              background: "linear-gradient(270deg, #001b4f, #003399, #002266, #001b4f)",
              backgroundSize: "300% 300%",
              animation: "glowMove 10s ease infinite",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.06),transparent_50%)] pointer-events-none" />

            {pillars.map((p, idx) => (
              <React.Fragment key={p.title}>
                <div className="flex items-center gap-5 flex-1 relative z-10 pl-4 first:pl-0">
                  <div className="relative w-14 h-14 shrink-0 bg-[#D4A13A]/15 rounded-full flex items-center justify-center border border-[#D4A13A]/40 shadow-[0_0_15px_rgba(212,161,58,0.2)] p-3">
                    <div className="absolute inset-0 bg-[#D4A13A]/5 rounded-full pulsing-ring pointer-events-none" />
                    <img
                      src={p.icon}
                      alt={p.title}
                      className="w-full h-full object-contain filter brightness-110 relative z-10"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#D4A13A] font-heading font-bold text-sm tracking-wider uppercase">
                      {p.title}
                    </p>
                    <p className="text-white/80 text-[11.5px] mt-1 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
                {idx < pillars.length - 1 && (
                  <div className="w-px h-12 bg-slate-400/25 shrink-0 self-center hidden lg:block mx-4" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
