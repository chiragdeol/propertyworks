export interface CTAConfig {
  heading: string;
  description: string;
  buttonLabel: string;
}

export interface CTAStyleConfig {
  bgClass: string;
  textColorClass: string;
  buttonBgClass: string;
  badgeColorClass: string;
  badgeLabel: string;
  iconType: "arrow" | "check" | "download" | "none";
  hasDecorations: boolean;
  showPlacement1: boolean; // Immediately after Project Overview section
  showPlacement2: boolean; // Immediately before FAQ / End of page
}

export interface ProjectSettings {
  whatsappNumber: string;
  consentText: string;
  qrCodeBaseUrl: string;
  residential: CTAConfig;
  commercial: CTAConfig;
  ctaStyle: CTAStyleConfig;
}

export const PROJECT_SETTINGS: ProjectSettings = {
  whatsappNumber: "918433826365",
  consentText: "I consent to PropertyWorks collecting and processing my information to prepare my personalized Real Estate Intelligence Report and authorize PropertyWorks and its representatives to contact me via WhatsApp, phone call, SMS, or email regarding my enquiry, recommendations, and related services, even if my number is registered under DND/NDNC.",
  qrCodeBaseUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150",
  residential: {
    heading: "Not Sure if This is the Right Property for Your Needs?",
    description: "Every buyer has different priorities—budget, lifestyle, office connectivity, Vastu preferences, investment goals, and family requirements. Get your FREE Personalized Residential Intelligence Report from PropertyWorks and discover the opportunities that best align with your requirements.",
    buttonLabel: "Get My Free Residential Shortlist",
  },
  commercial: {
    heading: "Is This the Right Commercial Opportunity for Your Business or Investment Goals?",
    description: "Every business and investor has different priorities—location, accessibility, employee convenience, customer reach, scalability, rental potential, and long-term returns. Get your FREE Personalized Commercial Intelligence Report from PropertyWorks and discover the opportunities that best align with your business objectives.",
    buttonLabel: "Get My Free Commercial Shortlist",
  },
  ctaStyle: {
    bgClass: "bg-[#001B4F]",
    textColorClass: "text-white",
    buttonBgClass: "bg-[#D4A13A] text-[#001B4F] hover:bg-[#D4A13A]/90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(212,161,58,0.2)] font-black text-sm uppercase tracking-wider rounded-xl px-6 py-4 flex items-center justify-center gap-2.5 w-full md:w-auto shrink-0 cursor-pointer text-center",
    badgeColorClass: "text-gold",
    badgeLabel: "ADVISORY INTELLIGENCE",
    iconType: "arrow",
    hasDecorations: true,
    showPlacement1: true,
    showPlacement2: true,
  },
};
