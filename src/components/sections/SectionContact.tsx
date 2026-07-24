import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVY, GOLD, GoldRule, RenderIcon, iconUsersCircle } from "./shared";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";
import { getGlobalSettings } from "@/lib/api";

export default function SectionContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Residential",
    requirements: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("918433826365");

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res?.whatsappNumber) {
        setWhatsappNumber(res.whatsappNumber);
      }
    }).catch(err => console.error("Error loading settings in SectionContact:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Subtle validation shake if name is empty or phone number is invalid
    if (!formData.name.trim() || formData.phone.replace(/\D/g, "").length < 8) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay for luxury feel
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log("Contact Request Submitted:", formData);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="w-full bg-white py-16 lg:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Heading & Checklist - Reveal on scroll */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
          >
            {/* <motion.span
              variants={fadeInUp(0, 0.5)}
              className="text-[#001B4F] text-[11px] sm:text-[12px] font-bold tracking-widest uppercase"
              style={{ color: GOLD }}
            >
              GET IN TOUCH
            </motion.span> */}
            <motion.h2 variants={fadeInUp(0.1, 0.6)} className="h1-global text-[#001B4F] mt-2">
              Request Your Guided
              <br />
              Evaluation <span className="text-gold">shortList</span>
            </motion.h2>
            <motion.div variants={fadeInUp(0.2, 0.5)}>
              <GoldRule />
            </motion.div>
            <motion.p variants={fadeInUp(0.3, 0.6)} className="p-global text-[#001B4F]/75 max-w-lg">
              Submit your requirements, and a dedicated PropertyWorks advisor will connect with you
              to organize a structured, objective, and unbiased evaluation shortlist.
            </motion.p>

            {/* Checklist items staggered */}
            <motion.div variants={staggerContainer(0.08, 0.4)} className="mt-8 space-y-5">
              {[
                {
                  title: "No buyer-side commission fees",
                  desc: "Our advisory services represent your goals exclusively.",
                },
                {
                  title: "Structured comparison frameworks",
                  desc: "Evaluate configurations, infrastructure, vastu, and location objectively.",
                },
                {
                  title: "Coordinated appointments & site visits",
                  desc: "Save time by letting us handle developer scheduling.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp(0, 0.5)}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex gap-4 cursor-default"
                >
                  <div className="h-12 w-12 rounded-full border border-[#D4A13A] flex items-center justify-center shrink-0 bg-[#001B4F]/5 text-[#001B4F]">
                    <RenderIcon icon={iconUsersCircle} className="h-5 w-5 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-[#001B4F] text-base sm:text-lg font-bold">{item.title}</h4>
                    <p className="text-[#001B4F]/70 text-sm sm:text-base mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Form Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)" }}
            className="bg-[#F8F9FB] border border-slate-200/40 p-6 sm:p-10 rounded-2xl shadow-sm transition-colors duration-300"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-4 gap-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-500 border border-emerald-100 mb-1"
                  >
                    <svg
                      className="w-6 h-6 stroke-current"
                      fill="none"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L19 7" />
                    </svg>
                  </motion.div>

                  <div className="space-y-1.5 px-2">
                    <h3 className="text-[#001B4F] font-serif text-lg sm:text-xl font-bold">
                      Request Submitted!
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Thank you,{" "}
                      <strong className="text-[#001B4F]">{formData.name || "there"}</strong>. To
                      receive your personalized Real Estate Intelligence Report, please continue on
                      WhatsApp:
                    </p>
                  </div>

                  <div className="w-full flex flex-col items-center gap-3">
                    {/* Continue on WhatsApp Button */}
                    <motion.a
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(37, 211, 102, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory and would like to receive my Real Estate Intelligence Report.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 transition-all duration-200 cursor-pointer"
                      style={{ background: "#25D366" }}
                    >
                      <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.088 1.452 4.835 1.453 5.402.002 9.794-4.39 9.797-9.798.002-2.62-1.018-5.084-2.871-6.94C16.505 2.01 14.04 1.002 12.01 1.001 6.605 1.001 2.212 5.393 2.21 10.801c-.001 1.83.483 3.42 1.47 5.008l-.997 3.642 3.734-.979.23.136z" />
                        <path d="M15.35 12.045c-.18-.09-.54-.27-.6-.3-.06-.03-.12-.045-.18-.045-.06 0-.15.03-.225.135-.075.105-.3.3-.36.375-.06.075-.12.09-.3.001-.18-.09-.76-.28-1.447-.893-.535-.477-.897-1.066-.997-1.246-.1-.18-.01-.277.08-.367.08-.08.18-.21.27-.315.09-.105.12-.18.18-.3.06-.12.03-.225-.015-.315-.045-.09-.39-1.05-.54-1.41-.15-.36-.3-.315-.39-.315-.06 0-.12-.015-.195-.015s-.195.03-.3.15c-.105.12-.39.375-.39.915s.39 1.065.45 1.14c.06.075.765 1.17 1.86 1.635.26.11.465.18.625.23.265.085.505.07.695.04.21-.03.54-.225.615-.435.075-.21.075-.39.045-.435-.03-.045-.105-.075-.285-.165z" />
                      </svg>
                      <span>Continue on WhatsApp</span>
                    </motion.a>

                    {/* OR Separator */}
                    <div className="flex items-center gap-3 w-full my-2">
                      <div className="h-px bg-slate-200 grow" />
                      <span className="text-xs font-bold text-slate-400 tracking-wider">
                        OR
                      </span>
                      <div className="h-px bg-slate-200 grow" />
                    </div>

                    {/* QR Code Section */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white border border-slate-200/50 p-4 rounded-xl flex flex-col items-center gap-2.5 w-full shadow-xs"
                    >
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory and would like to receive my Real Estate Intelligence Report.`,
                          )}`,
                        )}`}
                        alt="WhatsApp QR Code"
                        className="w-36 h-36 object-contain rounded-lg border border-slate-100 bg-white p-1 shadow-xs"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#001B4F] leading-tight">
                          Scan QR Code (Desktop Users)
                        </p>
                        <p className="text-xs text-[#001B4F]/60 mt-1 leading-snug">
                          Scan with your phone camera to continue on WhatsApp
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={`space-y-5 ${isShaking ? "animate-shake" : ""}`}
                >
                  {/* Full Name Input - Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4A13A] focus:border-[#D4A13A] transition-all placeholder-transparent"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-3.5 text-xs sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-left -translate-y-2.5 scale-75 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#D4A13A] peer-focus:font-bold"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Phone Number Input - Floating Label */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4A13A] focus:border-[#D4A13A] transition-all placeholder-transparent"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-4 top-3.5 text-xs sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-left -translate-y-2.5 scale-75 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#D4A13A] peer-focus:font-bold"
                    >
                      Phone Number
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-xs sm:text-sm font-bold text-[#001B4F]/60 uppercase tracking-wider mb-1.5 pl-1"
                    >
                      I am interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      disabled={isSubmitting}
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-base bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4A13A] transition-all"
                    >
                      <option value="Residential">Residential Advisory</option>
                      <option value="Commercial">Commercial Advisory</option>
                      {/* <option value="Investment">Real Estate Investment</option> */}
                    </select>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 mt-2">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      name="consent"
                      required
                      disabled={isSubmitting}
                      className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-slate-300 text-[#D4A13A] focus:ring-[#D4A13A]/30 cursor-pointer accent-[#D4A13A]"
                    />
                    <label
                      htmlFor="contact-consent"
                      className="text-[10px] sm:text-[11px] text-[#001B4F]/60 leading-[1.4] cursor-pointer select-none"
                    >
                      I consent to PropertyWorks collecting and processing my information to prepare
                      my personalized Real Estate Intelligence Report and authorize PropertyWorks
                      and its representatives to contact me via WhatsApp, phone call, SMS, or email
                      regarding my enquiry, recommendations, and related services, even if my number
                      is registered under DND/NDNC.
                    </label>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: isSubmitting ? 1 : 1.03,
                      y: isSubmitting ? 0 : -1,
                      boxShadow: isSubmitting ? "none" : "0 6px 15px rgba(212, 161, 58, 0.4)",
                    }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-[#001B4F] font-bold text-base tracking-wide rounded-lg hover:shadow-lg transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                    style={{ background: GOLD }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-[#001B4F]"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Continue"
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
