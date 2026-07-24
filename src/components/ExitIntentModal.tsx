import { useState, useEffect } from "react";
import { GOLD } from "./sections/shared";
import { motion, AnimatePresence } from "framer-motion";
import { getGlobalSettings } from "@/lib/api";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "Residential",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("918433826365");
  const [consentText, setConsentText] = useState(
    "I consent to PropertyWorks collecting and processing my information to prepare my personalized Real Estate Intelligence Report and authorize PropertyWorks and its representatives to contact me via WhatsApp, phone call, SMS, or email regarding my enquiry, recommendations, and related services, even if my number is registered under DND/NDNC."
  );

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res?.whatsappNumber) {
        setWhatsappNumber(res.whatsappNumber);
      }
      if (res?.consentText) {
        setConsentText(res.consentText);
      }
    }).catch(err => console.error("Error loading settings in ExitIntentModal:", err));
  }, []);

  useEffect(() => {
    // Check if already shown in this session
    const isShown = sessionStorage.getItem("exit-popup-shown");
    if (isShown === "true") return;

    // Show modal function
    const showModal = () => {
      setIsVisible(true);
      sessionStorage.setItem("exit-popup-shown", "true");
      cleanup();
    };

    // 1. Desktop: Mouse leave at the top of the viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        showModal();
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // 2. Mobile: Scroll up rapidly after scrolling down a bit
    let lastScrollY = window.scrollY;
    let hasScrolledDown = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = pageHeight > 0 ? (currentScrollY / pageHeight) * 100 : 0;

      if (scrollPercent > 20) {
        hasScrolledDown = true;
      }

      // If user has scrolled down and then scrolls up rapidly
      if (hasScrolledDown && lastScrollY - currentScrollY > 80) {
        showModal();
      }

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Fallback/Mobile: Timer trigger (show after 25 seconds of inactivity)
    const timer = setTimeout(() => {
      showModal();
    }, 25000);

    const cleanup = () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };

    return cleanup;
  }, []);

  // Lock body scroll while modal is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone length
    if (!formData.name.trim() || formData.phone.replace(/\D/g, "").length < 8) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log("Exit Intent Shortlist Request:", formData);
    }, 1200);
  };

  const accentColor = GOLD; // #D4A13A

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,27,79,0.72)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsVisible(false)}
        >
          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,27,79,0.25)] overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header stripe */}
            <div
              className="px-6 py-5 flex items-start justify-between"
              style={{ background: "#001B4F" }}
            >
              <div>
                {/* <span
                  className="text-[13px] sm:text-sm font-bold tracking-widest uppercase"
                  style={{ color: accentColor }}
                >
                  WAIT! BEFORE YOU LEAVE
                </span> */}
                <h2 className="text-white text-xl sm:text-2xl font-heading font-bold leading-tight mt-1">
                  Get Your Free{" "}
                  <span style={{ color: accentColor }}>Property Shortlist</span>
                </h2>
                <p className="text-white/70 text-[13px] sm:text-sm mt-1 font-medium">
                  We analyze hundreds of properties to find your perfect match.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="ml-4 mt-0.5 shrink-0 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Gold divider */}
            <div className="h-[3px] w-full" style={{ background: accentColor }} />

            {/* Body */}
            <div className="px-6 py-6 overflow-y-auto flex-1">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center text-center py-4 gap-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-500 border border-emerald-100 mb-1">
                    <svg
                      className="w-6 h-6 stroke-current"
                      fill="none"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-1.5 px-2">
                    <h3 className="text-[#001B4F] font-serif text-lg sm:text-xl font-bold">
                      Report Ready!
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Thank you, <strong className="text-[#001B4F]">{formData.name || "there"}</strong>.
                      To receive your personalized Real Estate Intelligence Report, please continue on
                      WhatsApp:
                    </p>
                  </div>

                  <div className="w-full flex flex-col items-center gap-3">
                    {/* Continue on WhatsApp Button */}
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory from the exit-intent popup and would like to receive my Real Estate Intelligence Report.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 cursor-pointer active:scale-98"
                      style={{ background: "#25D366" }}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.088 1.452 4.835 1.453 5.402.002 9.794-4.39 9.797-9.798.002-2.62-1.018-5.084-2.871-6.94C16.505 2.01 14.04 1.002 12.01 1.001 6.605 1.001 2.212 5.393 2.21 10.801c-.001 1.83.483 3.42 1.47 5.008l-.997 3.642 3.734-.979.23.136z" />
                        <path d="M15.35 12.045c-.18-.09-.54-.27-.6-.3-.06-.03-.12-.045-.18-.045-.06 0-.15.03-.225.135-.075.105-.3.3-.36.375-.06.075-.12.09-.3.001-.18-.09-.76-.28-1.447-.893-.535-.477-.897-1.066-.997-1.246-.1-.18-.01-.277.08-.367.08-.08.18-.21.27-.315.09-.105.12-.18.18-.3.06-.12.03-.225-.015-.315-.045-.09-.39-1.05-.54-1.41-.15-.36-.3-.315-.39-.315-.06 0-.12-.015-.195-.015s-.195.03-.3.15c-.105.12-.39.375-.39.915s.39 1.065.45 1.14c.06.075.765 1.17 1.86 1.635.26.11.465.18.625.23.265.085.505.07.695.04.21-.03.54-.225.615-.435.075-.21.075-.39.045-.435-.03-.045-.105-.075-.285-.165z" />
                      </svg>
                      <span>Continue on WhatsApp</span>
                    </a>

                    {/* OR Separator */}
                    <div className="flex items-center gap-3 w-full my-1">
                      <div className="h-px bg-slate-200 flex-grow" />
                      <span className="text-xs font-bold text-slate-400 tracking-wider">OR</span>
                      <div className="h-px bg-slate-200 flex-grow" />
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-slate-50 border border-slate-200/40 p-3 rounded-xl flex flex-col items-center gap-1.5 w-full">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory from the exit-intent popup and would like to receive my Real Estate Intelligence Report.`,
                          )}`,
                        )}`}
                        alt="WhatsApp QR Code"
                        className="w-28 h-28 object-contain rounded-lg border border-slate-100 bg-white p-1 shadow-xs"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#001B4F] leading-tight">
                          Scan QR Code (Desktop Users)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={`space-y-4 ${isShaking ? "animate-shake" : ""}`}
                >
                  {/* Full Name - Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="exit-modal-name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base bg-[#F8F9FB] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 transition-all"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                    <label
                      htmlFor="exit-modal-name"
                      className="absolute left-4 top-3.5 text-[13px] sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-[0] -translate-y-2.5 scale-75 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#D4A13A] peer-focus:font-bold"
                    >
                      Full Name <span style={{ color: accentColor }}>*</span>
                    </label>
                  </div>

                  {/* Phone - Floating Label */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="exit-modal-phone"
                      name="phone"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base bg-[#F8F9FB] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 transition-all"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                    <label
                      htmlFor="exit-modal-phone"
                      className="absolute left-4 top-3.5 text-[13px] sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-[0] -translate-y-2.5 scale-75 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#D4A13A] peer-focus:font-bold"
                    >
                      Phone Number <span style={{ color: accentColor }}>*</span>
                    </label>
                  </div>

                  {/* Interest dropdown */}
                  <div>
                    <label
                      htmlFor="exit-modal-interest"
                    className="block text-[10px] sm:text-sm font-semibold text-[#001B4F]/60 uppercase tracking-wider mb-1.5 pl-1"
                    >
                      I am interested in
                    </label>
                    <select
                      id="exit-modal-interest"
                      name="interest"
                      disabled={isSubmitting}
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full h-11 px-4 text-base bg-[#F8F9FB] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 transition-all"
                    >
                      <option value="Residential">Residential Advisory</option>
                      <option value="Commercial">Commercial Advisory</option>
                      {/* <option value="Investment">Real Estate Investment</option> */}
                    </select>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 mt-2.5">
                    <input
                      type="checkbox"
                      id="exit-modal-consent"
                      name="consent"
                      required
                      disabled={isSubmitting}
                      className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-slate-300 text-[#D4A13A] focus:ring-[#D4A13A]/30 cursor-pointer accent-[#D4A13A]"
                    />
                    <label
                      htmlFor="exit-modal-consent"
                      className="text-[10px] sm:text-[11px] text-[#001B4F]/60 leading-[1.4] cursor-pointer select-none"
                    >
                      {consentText}
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-[#001B4F] font-bold text-base tracking-wide rounded-lg hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer mt-2 flex items-center justify-center gap-2 btn-glowing-gold"
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
                      "Submit"
                    )}
                  </button>

                  <p className="text-center text-[11.5px] sm:text-xs text-[#001B4F]/50 leading-snug">
                    No spam. Your advisor will only call to understand your requirements.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
