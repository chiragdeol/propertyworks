import { useState, useEffect } from "react";
import { 
  GOLD, 
  RenderIcon, 
  iconRupeeCircle, 
  iconScaleBalanceCircle, 
  iconCalendarCircle 
} from "./sections/shared";
import { PROJECT_SETTINGS } from "@/data/projectSettings";
import { submitLead, getGlobalSettings } from "@/lib/api";

export type ShortlistType = "Residential" | "Commercial" | null;

interface ShortlistModalProps {
  type: ShortlistType;
  onClose: () => void;
  projectName?: string;
}

export default function ShortlistModal({ type, onClose, projectName }: ShortlistModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: type === "Commercial" ? "Commercial" : "Residential",
    budget: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getGlobalSettings().then(res => {
      if (res) setSettings(res);
    }).catch(err => console.error("Error loading settings in modal:", err));
  }, []);

  const activeWhatsappNumber = settings?.whatsappNumber || PROJECT_SETTINGS.whatsappNumber;
  const activeConsentText = settings?.consentText || PROJECT_SETTINGS.consentText;

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone length
    if (!formData.name.trim() || formData.phone.replace(/\D/g, "").length < 8) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsSubmitting(true);
    try {
      const leadData = {
        ...formData,
        projectName: projectName || "General Site Enquiry"
      };
      await submitLead({ data: { lead: leadData } });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save lead to database, fallback to client redirect:", err);
      // Fallback: still show success state so user redirect isn't blocked
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const isResidential = type === "Residential";
  const accentColor = GOLD; // #D4A13A

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto flex items-start md:items-center justify-center p-4 py-8 animate-in fade-in duration-300"
      style={{ background: "rgba(0, 27, 79, 0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg md:max-w-4xl bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,27,79,0.35)] overflow-hidden my-auto border border-slate-100 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header stripe */}
        <div
          className="px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between border-b border-white/10"
          style={{ background: "linear-gradient(135deg, #001233 0%, #001B4F 100%)" }}
        >
          <div>
            <span
              className="text-[13px] sm:text-sm font-bold tracking-widest uppercase opacity-90"
              style={{ color: accentColor }}
            >
              {isResidential ? "Residential Advisory" : "Commercial Advisory"}
            </span>
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold leading-tight mt-1">
              Get Your FREE{" "}
              <span style={{ color: accentColor }}>
                {isResidential ? "Residential" : "Commercial"}
              </span>{" "}
              Shortlist
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Gold divider line */}
        <div className="h-[4px] w-full" style={{ background: `linear-gradient(90deg, ${accentColor} 0%, #E5B84E 50%, ${accentColor} 100%)` }} />

        {/* Body */}
        <div className="px-6 py-6 sm:p-8 md:p-10 bg-slate-50/20">
          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-center text-center py-6 px-4 gap-6 animate-in fade-in zoom-in-95 duration-300 max-w-lg mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,27,79,0.06)]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-500 border border-emerald-100/80 mb-1 shadow-[0_4px_12px_rgba(16,185,129,0.15)] animate-bounce-short">
                <svg
                  className="w-8 h-8 stroke-current"
                  fill="none"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L19 7" />
                </svg>
              </div>

              <div className="space-y-3 px-2">
                <h3 className="text-[#001B4F] text-2xl font-serif font-black">
                  Request Submitted!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Thank you, <strong className="text-[#001B4F] font-bold">{formData.name || "there"}</strong>.
                  To receive your personalized Real Estate Intelligence Report, please continue on
                  WhatsApp:
                </p>
              </div>

              <div className="w-full flex flex-col items-center gap-4">
                {/* Continue on WhatsApp Button */}
                <a
                  href={`https://wa.me/${activeWhatsappNumber}?text=${encodeURIComponent(
                    projectName 
                      ? `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for the project "${projectName}" (${formData.interest} Advisory) and would like to receive my Real Estate Intelligence Report.`
                      : `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory and would like to receive my Real Estate Intelligence Report.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-13 rounded-2xl text-white font-black text-base flex items-center justify-center gap-3 shadow-[0_4px_18px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer"
                  style={{ background: "#25D366" }}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.088 1.452 4.835 1.453 5.402.002 9.794-4.39 9.797-9.798.002-2.62-1.018-5.084-2.871-6.94C16.505 2.01 14.04 1.002 12.01 1.001 6.605 1.001 2.212 5.393 2.21 10.801c-.001 1.83.483 3.42 1.47 5.008l-.997 3.642 3.734-.979.23.136z" />
                    <path d="M15.35 12.045c-.18-.09-.54-.27-.6-.3-.06-.03-.12-.045-.18-.045-.06 0-.15.03-.225.135-.075.105-.3.3-.36.375-.06.075-.12.09-.3.001-.18-.09-.76-.28-1.447-.893-.535-.477-.897-1.066-.997-1.246-.1-.18-.01-.277.08-.367.08-.08.18-.21.27-.315.09-.105.12-.18.18-.3.06-.12.03-.225-.015-.315-.045-.09-.39-1.05-.54-1.41-.15-.36-.3-.315-.39-.315-.06 0-.12-.015-.195-.015s-.195.03-.3.15c-.105.12-.39.375-.39.915s.39 1.065.45 1.14c.06.075.765 1.17 1.86 1.635.26.11.465.18.625.23.265.085.505.07.695.04.21-.03.54-.225.615-.435.075-.21.075-.39.045-.435-.03-.045-.105-.075-.285-.165z" />
                  </svg>
                  <span>Continue on WhatsApp</span>
                </a>

                {/* OR Separator */}
                <div className="flex items-center gap-4 w-full my-2">
                  <div className="h-px bg-slate-200 flex-grow" />
                  <span className="text-xs font-black text-slate-400 tracking-widest uppercase">OR</span>
                  <div className="h-px bg-slate-200 flex-grow" />
                </div>

                {/* QR Code Section */}
                <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col items-center gap-2.5 w-full">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                      `https://wa.me/${activeWhatsappNumber}?text=${encodeURIComponent(
                        projectName 
                          ? `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for the project "${projectName}" (${formData.interest} Advisory) and would like to receive my Real Estate Intelligence Report.`
                          : `Hi PropertyWorks, I am ${formData.name}. I have submitted my enquiry for ${formData.interest} advisory and would like to receive my Real Estate Intelligence Report.`
                      )}`
                    )}`}
                    alt="WhatsApp QR Code"
                    className="w-32 h-32 object-contain rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-black text-[#001B4F] tracking-wide">
                      Scan QR Code (Desktop Users)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Paragraph & Checklist */}
              <div className="md:col-span-6 space-y-6">
                <div className="border-l-4 border-[#D4A13A] pl-4 py-1.5">
                  <p className="text-[#001B4F] text-base sm:text-lg leading-relaxed font-semibold">
                    Submit your requirements, and a dedicated PropertyWorks advisor will connect with you
                    to organize a structured, objective, and unbiased evaluation shortlist.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "No buyer-side commission fees",
                      desc: "Our advisory services represent your goals exclusively.",
                      icon: iconRupeeCircle,
                    },
                    {
                      title: "Structured comparison frameworks",
                      desc: "Evaluate configurations, infrastructure, vastu, and location objectively.",
                      icon: iconScaleBalanceCircle,
                    },
                    {
                      title: "Coordinated appointments & site visits",
                      desc: "Save time by letting us handle developer scheduling.",
                      icon: iconCalendarCircle,
                    },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex gap-4 p-4 rounded-2xl border border-slate-100/80 bg-white hover:bg-slate-50/50 hover:border-slate-200/80 hover:shadow-[0_8px_20px_rgba(0,27,79,0.02)] transition-all duration-300 cursor-default group"
                    >
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-[#D4A13A]/10 text-[#001B4F] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <RenderIcon icon={item.icon} className="h-6 w-6 object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#001B4F] text-base sm:text-lg font-bold tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-[13px] sm:text-sm mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="md:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,27,79,0.03)]">
                <form
                  onSubmit={handleSubmit}
                  className={`space-y-5 ${isShaking ? "animate-shake" : ""}`}
                >
                  {/* Full Name - Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D4A13A] focus:ring-4 focus:ring-[#D4A13A]/10 outline-none transition-all duration-200"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                    <label
                      htmlFor="modal-name"
                      className="absolute left-4 top-3 text-[13px] sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-[0] -translate-y-2.5 scale-75 
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
                      id="modal-phone"
                      name="phone"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full h-12 pt-4 pb-1 px-4 text-base text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D4A13A] focus:ring-4 focus:ring-[#D4A13A]/10 outline-none transition-all duration-200"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                    <label
                      htmlFor="modal-phone"
                      className="absolute left-4 top-3 text-[13px] sm:text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-[0] -translate-y-2.5 scale-75 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#D4A13A] peer-focus:font-bold"
                    >
                      Phone Number <span style={{ color: accentColor }}>*</span>
                    </label>
                  </div>

                  {/* Interest dropdown */}
                  <div>
                    <label
                      htmlFor="modal-interest"
                      className="block text-[10px] sm:text-sm font-semibold text-[#001B4F]/60 uppercase tracking-wider mb-1.5 pl-1"
                    >
                      I am interested in
                    </label>
                    <div className="relative">
                      <select
                        id="modal-interest"
                        name="interest"
                        disabled={isSubmitting}
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full h-12 pl-4 pr-10 text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D4A13A] focus:ring-4 focus:ring-[#D4A13A]/10 outline-none transition-all duration-200 cursor-pointer appearance-none"
                      >
                        <option value="Residential">Residential Advisory</option>
                        <option value="Commercial">Commercial Advisory</option>
                        {/* <option value="Investment">Real Estate Investment</option> */}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#001B4F]/60">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 mt-2.5">
                    <input
                      type="checkbox"
                      id="modal-consent"
                      name="consent"
                      required
                      disabled={isSubmitting}
                      className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-slate-300 text-[#D4A13A] focus:ring-[#D4A13A]/30 cursor-pointer accent-[#D4A13A]"
                    />
                    <label
                      htmlFor="modal-consent"
                      className="text-[10px] sm:text-[11px] text-slate-400 leading-[1.4] cursor-pointer select-none"
                    >
                      {activeConsentText}
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-[#001B4F] font-extrabold text-base tracking-wider rounded-xl shadow-[0_4px_15px_rgba(212,161,58,0.25)] hover:shadow-[0_6px_20px_rgba(212,161,58,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer mt-3 flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #E5B84E 100%)` }}
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
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-center text-[11.5px] sm:text-xs font-semibold text-slate-400">
                      No spam. Your advisor will only call to understand your requirements.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
