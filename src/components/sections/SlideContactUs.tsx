import React from "react";
import { motion } from "framer-motion";
import { Logo, GOLD, SlideLogoBadge } from "./shared";
import footerIcon from "../../assets/icons/footer-icon.png";
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/motion-variants";
import { useSettings } from "@/contexts/SettingsContext";
import { formatDynamicText } from "@/lib/utils";
import facebookIcon from "@/assets/social-media-icons/facebook_icon.png";
import instagramIcon from "@/assets/social-media-icons/Instagram_icon.png";
import youtubeIcon from "@/assets/social-media-icons/YouTube_icon.webp";
import linkedinIcon from "@/assets/social-media-icons/LinkedIn_icon.webp";

export default function SlideContactUs() {
  const { settings } = useSettings();
  const contactData = settings?.sections?.contact;
  const contactItems = [
    {
      label: "Phone",
      value: "+91-8433826365",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: "support@propertyworks.in",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Service Locations",
      value: "Mumbai | Thane | Navi Mumbai | Emerging Growth Corridors",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: "Operating Hours",
      value: "11:00 AM – 7:00 PM",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      handle: "PropertyWorksIndia",
      url: "https://www.facebook.com/PropertyWorksIndia",
      icon: facebookIcon,
    },
    {
      name: "Instagram",
      handle: "@propertyworks.in",
      url: "https://www.instagram.com/propertyworks.in/",
      icon: instagramIcon,
    },
    {
      name: "YouTube",
      handle: "@PropertyWorksOfficial",
      url: "https://www.youtube.com/@PropertyWorksOfficial",
      icon: youtubeIcon,
    },
    {
      name: "LinkedIn",
      handle: "propertyworksindia",
      url: "https://linkedin.com/company/propertyworksindia",
      icon: linkedinIcon,
    },
  ];

  return (
    <section
      id="contact-details"
      className="w-full bg-[#F8FAFC] border-t border-slate-100 overflow-hidden pb-8 lg:pb-12"
    >
      {/* ── Row 1: Contact Details LEFT | Image RIGHT ── */}
      <div className=" w-full bg-[#fcfdfe] relative">
        <div className="flex flex-col lg:flex-row relative">
          {/* Left Column: logo badge, headings, info cards */}
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
                {formatDynamicText(contactData?.heading || "Contact [gold]Us[/gold]")}
              </h2>
              <h2 className="text-[#001B4F] text-[clamp(13px,1.3vw,17px)] font-bold mt-2">
                {formatDynamicText(contactData?.subheading || "Real Estate Intelligence & Advisory Services", GOLD)}
              </h2>
              <div className="gold-divider mt-3" />
            </motion.div>

            <motion.p
              variants={fadeInUp(0.2, 0.6)}
              className="p-global text-slate-600 mt-2 max-w-lg"
            >
              {formatDynamicText(contactData?.description || "We’re here to help you make confident, well-informed real estate decisions. Get in touch with our team.", GOLD)}
            </motion.p>

            <motion.div
              variants={staggerContainer(0.08, 0.3)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
            >
              {contactItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp(0, 0.5)}
                  whileHover={{
                    y: -4,
                    scale: 1.03,
                    borderColor: GOLD,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/50 shadow-sm cursor-pointer transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#001B4F] flex items-center justify-center shrink-0 shadow-md">
                    {item.icon}
                  </div>
                  <div className="w-[1.5px] h-8 bg-[#D4A13A] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9.5px] font-bold text-[#D4A13A] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-[#031B33] mt-0.5 block break-all leading-normal">
                      {item.value}
                    </span>
                  </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

          {/* Right Column: Desk image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-2/3 h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[420px] overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-contain bg-right-top bg-no-repeat "
              style={{ backgroundImage: `url('${contactData?.imageUrl || "/images/contact_desk.webp"}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001B4F]/40 via-transparent to-transparent lg:hidden" />
          </motion.div>
        </div>
      </div>

      {/* ── Row 2: Bottom Banner (Blue Stripe) ── */}
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#001B4F] via-[#012569] to-[#001B4F] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between border border-[#D4A13A]/30 shadow-xl gap-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.06),transparent_50%)] pointer-events-none" />

          {/* Left Block - Heading */}
          <div className="flex flex-col w-full lg:w-[28%] shrink-0 relative z-10">
            <span className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-wide">
              Follow Us On
            </span>
            <div className="w-1/3 h-[2px] bg-[#D4A13A] my-2" />
            <p className="text-white/80 text-[12px] sm:text-[13px] font-medium leading-relaxed">
              Stay connected for real estate insights &amp; expert perspectives.
            </p>
          </div>

          {/* Vertical Gold Divider */}
          <div className="hidden lg:block lg:w-[1px] lg:h-16 bg-[#D4A13A] shrink-0 relative z-10" />

          {/* Social Links Row - Responsive grid for 3 columns on mobile screens */}
          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-y-6 gap-x-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-6 sm:justify-center flex-grow w-full relative z-10"
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target={social.url !== "#" ? "_blank" : undefined}
                rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                variants={fadeInUp(0, 0.4)}
                className="flex flex-col items-center text-center gap-2 group shrink-0"
              >
                {/* Larger Social Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 6, borderColor: GOLD }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border border-[#D4A13A]/40 bg-[#D4A13A]/10 flex items-center justify-center p-2.5 shadow-[0_0_15px_rgba(212,161,58,0.15)] cursor-pointer transition-colors duration-300 overflow-hidden"
                >
                  <img src={social.icon} alt={social.name} className="w-full h-full object-contain" />
                </motion.div>
                <div className="min-w-0">
                  <span className="text-[12.5px] font-bold text-white group-hover:text-[#D4A13A] transition-colors block leading-tight">
                    {social.name}
                  </span>
                  <span className="text-[10px] text-white/50 block mt-0.5 leading-none">
                    {social.handle}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right Icon Block Divider */}
          <div className="w-full lg:w-[1px] h-[1px] lg:h-12 bg-white/20 shrink-0 hidden lg:block" />

          {/* Right Icon Block with bounce */}
          <div
            className="flex items-center justify-center shrink-0 relative z-10 animate-pulse-scale"
          >
            <img
              src={footerIcon}
              alt="Footer icon"
              className="h-[52px] w-auto object-contain filter brightness-110"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
