import { motion } from "framer-motion";
import { NAVY, GOLD, Logo, footerIcon } from "./sections/shared";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getGlobalSettings } from "@/lib/api";

export default function Footer() {
  const [whatsappNumber, setWhatsappNumber] = useState("918433826365");
  const [contactPhone, setContactPhone] = useState("+91 98205 44427");
  const [contactEmail, setContactEmail] = useState("stany.brahmane@gmail.com");
  const [mahaReraNumber, setMahaReraNumber] = useState("P51700077890");

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res?.whatsappNumber) {
        setWhatsappNumber(res.whatsappNumber);
      }
      if (res?.contactPhone) {
        setContactPhone(res.contactPhone);
      }
      if (res?.contactEmail) {
        setContactEmail(res.contactEmail);
      }
      if (res?.mahaReraNumber) {
        setMahaReraNumber(res.mahaReraNumber);
      }
    }).catch(err => console.error("Error loading settings in Footer:", err));
  }, []);

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Why Choose PropertyWorks", href: "/about#why-choose" },
    { label: "Active Developer Network", href: "/about#developer-network" },
    { label: "How It Works", href: "/services#process" },
    { label: "Client Success Stories", href: "/services#testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ];

  const serviceLinks = [
    { label: "Residential Advisory", href: "/projects?type=Residential" },
    { label: "Commercial Advisory", href: "/projects?type=Commercial" },
  ];

  const forYouLinks = [
    { label: "Request Your FREE Shortlist", href: "/contact" },
    { label: "Understanding Our Process", href: "/services#process" },
  ];

  return (
    <footer
      className="w-full relative overflow-hidden border-t-2 border-gold text-white"
      style={{ background: NAVY }}
    >
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <Logo light={true} imageClassName="h-[160px] lg:h-[190px]" />
              </Link>
              {/* MahaRERA Number Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-[11px] font-black text-gold uppercase tracking-wider">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 stroke-gold stroke-[2]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  MahaRERA: {mahaReraNumber}
                </span>
              </div>
              <h3 className="font-serif font-bold text-white text-base sm:text-[17px] leading-tight">
                Helping You Evaluate Real Estate With Greater Clarity, Structure & Confidence.
              </h3>
              <p className="text-slate-400 text-[13px] sm:text-sm leading-relaxed">
                We bring intelligence, objectivity, and insight to one of life’s most important
                decisions.
              </p>
            </div>
            {/* Gold skyline outline decoration - float effect */}
            <div
              className="pt-6 opacity-60 select-none animate-float-medium"
            >
              <img
                src={footerIcon}
                alt="PropertyWorks Footer Icon"
                className="h-36 w-auto object-contain"
              />
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center bg-gold/10">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-white stroke-[1.8]">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h4 className="text-gold font-sans font-bold text-sm tracking-wider uppercase">
                EXPLORE
              </h4>
            </div>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between text-slate-400 hover:text-white text-[13.5px] sm:text-sm font-medium transition-colors group/link"
                  >
                    <span className="relative pb-0.5">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <span className="text-gold font-bold text-[10px] transform group-hover/link:translate-x-1.5 transition-transform duration-250">
                      &gt;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OUR SERVICES */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center bg-gold/10">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-white stroke-[1.8]">
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                  <line x1="9" y1="22" x2="9" y2="16" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                  <line x1="15" y1="16" x2="15" y2="22" />
                </svg>
              </div>
              <h4 className="text-gold font-sans font-bold text-sm tracking-wider uppercase">
                OUR SERVICES
              </h4>
            </div>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between text-slate-400 hover:text-white text-[13.5px] sm:text-sm font-medium transition-colors group/link"
                  >
                    <span className="relative pb-0.5">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <span className="text-gold font-bold text-[10px] transform group-hover/link:translate-x-1.5 transition-transform duration-250">
                      &gt;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: FOR YOU */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center bg-gold/10">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-white stroke-[1.8]">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M16 11h6M19 8l3 3-3 3" />
                </svg>
              </div>
              <h4 className="text-gold font-sans font-bold text-sm tracking-wider uppercase">
                FOR YOU
              </h4>
            </div>
            <ul className="space-y-2.5">
              {forYouLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between text-slate-400 hover:text-white text-[13.5px] sm:text-sm font-medium transition-colors group/link"
                  >
                    <span className="relative pb-0.5">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <span className="text-gold font-bold text-[10px] transform group-hover/link:translate-x-1.5 transition-transform duration-250">
                      &gt;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: LET'S CONNECT */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3">
              <h4 className="text-gold font-sans font-bold text-sm tracking-wider uppercase">
                LET'S CONNECT
              </h4>
              <p className="text-slate-400 text-[13px] sm:text-sm leading-relaxed">
                Have questions or need guidance? We’re here to help you make confident real estate
                decisions.
              </p>
            </div>

            <div className="space-y-3">
              {/* Phone */}
              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 group/connect">
                <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-gold/5 shrink-0 transition-colors group-hover/connect:bg-gold/20">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-gold stroke-[1.8]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-semibold group-hover/connect:text-gold transition-colors">{contactPhone}</span>
              </a>
              {/* Email */}
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 group/connect">
                <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-gold/5 shrink-0 transition-colors group-hover/connect:bg-gold/20">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-gold stroke-[1.8]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="text-white text-sm font-semibold group-hover/connect:text-gold transition-colors">
                  {contactEmail}
                </span>
              </a>
              {/* WhatsApp */}
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/connect">
                <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-gold/5 shrink-0 transition-colors group-hover/connect:bg-gold/20">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-gold stroke-[1.8]">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-semibold group-hover/connect:text-gold transition-colors">Chat on WhatsApp</span>
              </a>
            </div>

            {/* CTA Book Consultation Button with floating hover effect */}
            {/* <motion.a
              href="/contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(212, 161, 58, 0.4)",
                backgroundColor: "rgba(212, 161, 58, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gold rounded-lg text-gold font-bold text-[13px] sm:text-sm hover:bg-gold/10 transition-colors w-full sm:w-auto mt-2 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 stroke-gold stroke-[1.8] fill-none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book a Free Consultation</span>
            </motion.a> */}
          </div>
        </div>

        {/* Sub-Footer Divider */}
        <div className="h-px bg-white/10 w-full" />

        {/* Sub-Footer Row */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Copyright Info */}
          <div className="flex items-center gap-2 text-slate-400 text-[12px] sm:text-[13px] text-center lg:text-left">
            <img
              src={footerIcon}
              alt="PropertyWorks icon"
              className="w-5 h-5 object-contain shrink-0"
            />
            <span>
              © 2026 PropertyWorks. All Rights Reserved. Real Estate Intelligence & Advisory
              Services.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400 text-[12px] sm:text-[13px] font-semibold">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/15">|</span>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/15">|</span>
            <Link to="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer
            </Link>
            <span className="text-white/15">|</span>
            <Link to="/cookie-policy" className="hover:text-gold transition-colors">
              Cookie Policy
            </Link>
            <span className="text-white/15">|</span>
            <Link to="/refund-cancellation-policy" className="hover:text-gold transition-colors">
              Refund & Cancellation Policy
            </Link>
          </div>

          {/* Social Icons with pulse effects */}
          <div className="flex items-center gap-3.5">
            {[
              {
                name: "Facebook",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                name: "Instagram",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 stroke-current stroke-2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                name: "YouTube",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.002 3.002 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ scale: 1.18, borderColor: GOLD, color: "#fff", rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative cursor-pointer"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
