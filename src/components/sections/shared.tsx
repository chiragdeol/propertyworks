import React, { Fragment } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

// Asset imports
const p1 = "/images/hero-image.jpg";
const p2 = "/images/noise-image.webp";
const p3a = "/images/clarity-confused.webp";
const p3b = "/images/clarity-confident.webp";
const p5 = "/images/residential-image.webp";
const p6 = "/images/commercial-image.webp";
const pSiteVisits = "/images/site-visits-image.webp";
import logo from "@/assets/icons/logo.png";
import logoMain from "@/assets/icons/logo-main.png";
import newGoldBuildingIcon from "@/assets/icons/new-gold-building.png";

import iconEstate from "@/assets/icons/estate.png";
import iconStore from "@/assets/icons/store.png";
import iconOfficePW from "@/assets/icons/office.png";
import iconYieldsCoins from "@/assets/icons/yields-coins.png";
import iconSearchGold from "@/assets/icons/search-gold.png";
import iconGrowthTrend from "@/assets/icons/growth-trend.png";
import iconTargetGold from "@/assets/icons/target-gold-flat.png";
import iconShieldCheckGold from "@/assets/icons/shield-check-gold.png";
import iconUsersGold from "@/assets/icons/users-gold.png";
import iconMapPinGold from "@/assets/icons/map-pin-gold.png";
import iconShieldCheckBlue from "@/assets/icons/shield-check-blue.png";
import iconUsersBlue from "@/assets/icons/users-blue.png";
import iconHomeGold from "@/assets/icons/home-gold.png";
import iconExpansionTrend from "@/assets/icons/expansion-trend.png";
import iconTownshipTrees from "@/assets/icons/township-trees.png";
import iconGraduationGold from "@/assets/icons/graduation-gold.png";
import iconCalendarGold from "@/assets/icons/calendar-gold.png";
import iconHomeEye from "@/assets/icons/home-eye.png";
import iconQuestion from "@/assets/icons/question.png";
import iconCheck from "@/assets/icons/check.png";
import iconCompassCircle from "@/assets/icons/compass-circle.png";
import iconCarCircle from "@/assets/icons/car-circle.png";
import iconClarityTrend from "@/assets/icons/clarity-trend.png";
import iconInfoCircle from "@/assets/icons/info-circle.png";
import iconMegaphoneGold from "@/assets/icons/megaphone-gold.png";
import iconClipboardHand from "@/assets/icons/clipboard-hand.png";
import iconUsersDarkGroup from "@/assets/icons/users-dark-group.png";
import iconLightbulbCircle from "@/assets/icons/lightbulb-circle.png";
import iconUserSearchMagnifier from "@/assets/icons/user-search-magnifier.png";
import iconRupeeCircle from "@/assets/icons/rupee-circle.png";
import iconScaleCircle from "@/assets/icons/scale-circle.png";
import iconChecksCircle from "@/assets/icons/checks-circle.png";
import iconCalendarCircle from "@/assets/icons/calendar-circle.png";
import iconHandshakeCircle from "@/assets/icons/handshake-circle.png";
import iconBuildingPW from "@/assets/icons/building-pw.png";
import iconScaleBalanceCircle from "@/assets/icons/scale-balance-circle.png";
import iconClipboardCheckCircle from "@/assets/icons/clipboard-check-circle.png";
import iconShieldCheckCircle from "@/assets/icons/shield-check-circle.png";
import iconLightbulbCircle2 from "@/assets/icons/lightbulb-circle-2.png";
import iconGrowthTrendCircle from "@/assets/icons/growth-trend-circle.png";
import iconUsersCircle from "@/assets/icons/users-circle.png";

const terraceOnly = "/images/terrace-only.jpg";
const ourApproachWheel = "/images/our-approach-wheel.webp";
const confusedBuyerMaze = "/images/confused-buyer-maze.jpg";
const phoneAppMockup = "/images/phone-app-mockup.png";
const focusOnYouPeople = "/images/focus-on-you-people.png";
const bottomBuildingsDecor = "/images/bottom-buildings-decor.png";
const whatsappBubble1 = "/images/whatsapp-bubble-1.png";
const whatsappBubble2 = "/images/whatsapp-bubble-2.png";

import toolIcon1 from "@/assets/icons/tool-icon-1.png";
import toolIcon2 from "@/assets/icons/tool-icon-2.png";
import toolIcon3 from "@/assets/icons/tool-icon-3.png";
import toolIcon4 from "@/assets/icons/tool-icon-4.png";
import toolIcon5 from "@/assets/icons/tool-icon-5.png";
import toolIcon6 from "@/assets/icons/tool-icon-6.png";
import ecoIcon1 from "@/assets/icons/eco-icon-1.png";
import ecoIcon2 from "@/assets/icons/eco-icon-2.png";
import ecoIcon3 from "@/assets/icons/eco-icon-3.png";
import ecoIcon4 from "@/assets/icons/eco-icon-4.png";
import structIcon1 from "@/assets/icons/struct-icon-1.png";
import structIcon2 from "@/assets/icons/struct-icon-2.png";
import structIcon3 from "@/assets/icons/struct-icon-3.png";
import structIcon4 from "@/assets/icons/struct-icon-4.png";
import structIcon5 from "@/assets/icons/struct-icon-5.png";

// Slide Canvas integration assets
import slideAsset_logo from "@/assets/icons/logo.png";
import slideAsset_target from "@/assets/icons/target.png";
import slideAsset_barChart from "@/assets/icons/barChart.png";
import slideAsset_mapNav from "@/assets/icons/mapNav.png";
import slideAsset_handshake from "@/assets/icons/handshake.png";
import slideAsset_globe from "@/assets/icons/globe.png";
import slideAsset_phone from "@/assets/icons/phone.png";
import slideAsset_whatsapp from "@/assets/icons/whatsapp.png";
import slideAsset_email from "@/assets/icons/email.png";
import slideAsset_calendar from "@/assets/icons/calendar.png";
import slideAsset_clipboard from "@/assets/icons/clipboard.png";
import slideAsset_user from "@/assets/icons/user.png";
import slideAsset_camera from "@/assets/icons/camera.png";
import slideAsset_pieChart from "@/assets/icons/pieChart.png";
import slideAsset_targetAlt from "@/assets/icons/targetAlt.png";
import slideAsset_eyeSearch from "@/assets/icons/eyeSearch.png";
import slideAsset_shield from "@/assets/icons/shield.png";
import slideAsset_scales from "@/assets/icons/scales.png";
import slideAsset_emailCircle from "@/assets/icons/emailCircle.png";
import slideAsset_users from "@/assets/icons/users.png";
import slideAsset_location from "@/assets/icons/location.png";
import slideAsset_shieldCheck from "@/assets/icons/shieldCheck.png";
import slideAsset_filter from "@/assets/icons/filter.png";
import slideAsset_usersGroup from "@/assets/icons/usersGroup.png";
import slideAsset_clock from "@/assets/icons/clock.png";
import slideAsset_searchChart from "@/assets/icons/searchChart.png";
import slideAsset_trendingUp from "@/assets/icons/trendingUp.png";
import slideAsset_dataSearch from "@/assets/icons/dataSearch.png";
import slideAsset_heart from "@/assets/icons/heart.png";
import slideAsset_expert from "@/assets/icons/expert.png";
import slideAsset_clockSearch from "@/assets/icons/clockSearch.png";
import slideAsset_magnifier from "@/assets/icons/magnifier.png";
import slideAsset_scalesGold from "@/assets/icons/scalesGold.png";
import slideAsset_userProfile from "@/assets/icons/userProfile.png";
import slideAsset_residential from "@/assets/icons/residential.png";
import slideAsset_targetGold from "@/assets/icons/targetGold.png";
import slideAsset_usersOrange from "@/assets/icons/usersOrange.png";
import slideAsset_clipboardCheck from "@/assets/icons/clipboardCheck.png";
import slideAsset_vastu from "@/assets/icons/vastu.png";
import slideAsset_eye from "@/assets/icons/eye.png";
import slideAsset_clipboardCheckDark from "@/assets/icons/clipboardCheckDark.png";
import slideAsset_commercial from "@/assets/icons/commercial.png";
import slideAsset_bridge from "@/assets/icons/bridge.png";
import slideAsset_monitor from "@/assets/icons/monitor.png";
import slideAsset_searchBuilding from "@/assets/icons/searchBuilding.png";
import slideAsset_buildingsFilled from "@/assets/icons/buildingsFilled.png";
import slideAsset_network from "@/assets/icons/network.png";
import slideAsset_citySkyline from "@/assets/icons/citySkyline.png";
import slideAsset_headset from "@/assets/icons/headset.png";
import slideAsset_human from "@/assets/icons/human.png";
import slideAsset_whatsappReal from "@/assets/icons/whatsappReal.png";
import slideAsset_analysis from "@/assets/icons/analysis.png";
import slideAsset_evaluation from "@/assets/icons/evaluation.png";
import slideAsset_bulb from "@/assets/icons/bulb.png";
import slideAsset_way from "@/assets/icons/way.png";
import footerIcon from "@/assets/icons/footer-icon.png";

const xe = "/images/PropertyWorks.webp";
const Se = "/images/TheRealStateChallengToday.webp";

// Re-export images/assets for sections
export {
  p1,
  p2,
  p3a,
  p3b,
  p5,
  p6,
  pSiteVisits,
  logo,
  newGoldBuildingIcon,
  iconEstate,
  iconStore,
  iconOfficePW,
  iconYieldsCoins,
  iconSearchGold,
  iconGrowthTrend,
  iconTargetGold,
  iconShieldCheckGold,
  iconUsersGold,
  iconMapPinGold,
  iconShieldCheckBlue,
  iconUsersBlue,
  iconHomeGold,
  iconExpansionTrend,
  iconTownshipTrees,
  iconGraduationGold,
  iconCalendarGold,
  iconHomeEye,
  iconQuestion,
  iconCheck,
  iconCompassCircle,
  iconCarCircle,
  iconClarityTrend,
  iconInfoCircle,
  iconMegaphoneGold,
  iconClipboardHand,
  iconUsersDarkGroup,
  iconLightbulbCircle,
  iconUserSearchMagnifier,
  iconRupeeCircle,
  iconScaleCircle,
  iconChecksCircle,
  iconCalendarCircle,
  iconHandshakeCircle,
  iconBuildingPW,
  iconScaleBalanceCircle,
  iconClipboardCheckCircle,
  iconShieldCheckCircle,
  iconLightbulbCircle2,
  iconGrowthTrendCircle,
  iconUsersCircle,
  terraceOnly,
  ourApproachWheel,
  confusedBuyerMaze,
  phoneAppMockup,
  focusOnYouPeople,
  bottomBuildingsDecor,
  whatsappBubble1,
  whatsappBubble2,
  toolIcon1,
  toolIcon2,
  toolIcon3,
  toolIcon4,
  toolIcon5,
  toolIcon6,
  ecoIcon1,
  ecoIcon2,
  ecoIcon3,
  ecoIcon4,
  structIcon1,
  structIcon2,
  structIcon3,
  structIcon4,
  structIcon5,
  xe,
  Se,
  footerIcon,
};

// Theme Constants
export const NAVY = "#001B4F";
export const GOLD = "#D4A13A";

// Common UI Helper Components
export function RenderIcon({
  icon: Icon,
  className,
  style,
  ...props
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  className?: string;
  style?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  if (!Icon) return null;
  if (typeof Icon === "string") {
    return <img src={Icon} alt="icon" className={className} style={style} {...props} />;
  }
  return <Icon className={className} style={style} {...props} />;
}

export function Logo({
  light = false,
  className = "",
  imageClassName = "h-[106px] lg:h-[114px]",
}: {
  light?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoMain}
        alt="PropertyWorks Logo"
        className={`w-auto object-contain shrink-0 ${imageClassName}`}
      />
    </div>
  );
}

export function GoldRule() {
  return <div className="h-[3px] w-20 mt-3.5 mb-6" style={{ background: GOLD }} />;
}

export function AmbientGlows({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {variant === "light" ? (
        <>
          <div
            className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#D4A13A]/[0.04] blur-[80px] will-change-transform"
          />
          <div
            className="absolute -bottom-24 -right-24 w-[600px] h-[600px] rounded-full bg-[#001B4F]/[0.03] blur-[100px] will-change-transform"
          />
        </>
      ) : (
        <>
          <div
            className="absolute top-1/4 -left-24 w-[500px] h-[500px] rounded-full bg-[#D4A13A]/[0.05] blur-[100px] will-change-transform"
          />
          <div
            className="absolute bottom-1/4 -right-24 w-[450px] h-[450px] rounded-full bg-white/[0.02] blur-[90px] will-change-transform"
          />
        </>
      )}
    </div>
  );
}

export function TrendingUpCustom({
  className,
  style,
  strokeWidth = 1.5,
}: {
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M3 17c5 0 10-2 14-6l4-4" />
      <path d="M16 7h5v5" />
      <rect x="6" y="14" width="2" height="6" rx="0.5" />
      <rect x="11" y="11" width="2" height="9" rx="0.5" />
      <rect x="16" y="8" width="2" height="12" rx="0.5" />
    </svg>
  );
}

// Slide helper components and y mapping
export const y = {
  logo: "/images/logo-icon.png",
  target: slideAsset_target,
  barChart: slideAsset_barChart,
  mapNav: slideAsset_mapNav,
  handshake: slideAsset_handshake,
  globe: slideAsset_globe,
  phone: slideAsset_phone,
  whatsapp: slideAsset_whatsapp,
  email: slideAsset_email,
  calendar: slideAsset_calendar,
  clipboard: slideAsset_clipboard,
  user: slideAsset_user,
  camera: slideAsset_camera,
  pieChart: slideAsset_pieChart,
  targetAlt: slideAsset_targetAlt,
  eyeSearch: slideAsset_eyeSearch,
  shield: slideAsset_shield,
  scales: slideAsset_scales,
  emailCircle: slideAsset_emailCircle,
  users: slideAsset_users,
  location: slideAsset_location,
  shieldCheck: slideAsset_shieldCheck,
  filter: slideAsset_filter,
  usersGroup: slideAsset_usersGroup,
  clock: slideAsset_clock,
  searchChart: slideAsset_searchChart,
  trendingUp: slideAsset_trendingUp,
  dataSearch: slideAsset_dataSearch,
  heart: slideAsset_heart,
  expert: slideAsset_expert,
  clockSearch: slideAsset_clockSearch,
  magnifier: slideAsset_magnifier,
  scalesGold: slideAsset_scalesGold,
  userProfile: slideAsset_userProfile,
  residential: slideAsset_residential,
  targetGold: slideAsset_targetGold,
  usersOrange: slideAsset_usersOrange,
  clipboardCheck: slideAsset_clipboardCheck,
  vastu: slideAsset_vastu,
  eye: slideAsset_eye,
  clipboardCheckDark: slideAsset_clipboardCheckDark,
  commercial: slideAsset_commercial,
  bridge: slideAsset_bridge,
  monitor: slideAsset_monitor,
  searchBuilding: slideAsset_searchBuilding,
  buildingsFilled: slideAsset_buildingsFilled,
  network: slideAsset_network,
  citySkyline: slideAsset_citySkyline,
  headset: slideAsset_headset,
  human: slideAsset_human,
  whatsappReal: slideAsset_whatsappReal,
  analysis: slideAsset_analysis,
  evaluation: slideAsset_evaluation,
  bulb: slideAsset_bulb,
  way: slideAsset_way,
};

export interface SlideImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
  size?: number | string;
}

export function SlideImage({
  src,
  alt = "",
  className = "",
  size = 48,
  ...props
}: SlideImageProps) {
  const styleSize = typeof size === "number" ? `${size}px` : size;
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      style={{ width: styleSize, height: styleSize, ...props.style }}
      draggable={false}
      {...props}
    />
  );
}

export interface SlideLogoBadgeProps {
  variant?: "absolute" | "inline";
  size?: "small" | "medium" | "large";
  spacing?: number;
}

export function SlideLogoBadge({
  variant = "absolute",
  size = "large",
  spacing = 6,
}: SlideLogoBadgeProps) {
  return null;
}

export interface SlidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export function SlidePanel({ children, className = "", ...props }: SlidePanelProps) {
  return (
    <div className={`section-panel ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface SlideCircleIconProps {
  icon: string;
  size?: "small" | "normal" | "large";
  dark?: boolean;
}

export function SlideCircleIcon({ icon, size = "normal", dark = false }: SlideCircleIconProps) {
  const iconSize = size === "small" ? 24 : size === "large" ? 36 : 32;
  const containerSize = size === "large" ? 68 : size === "small" ? 44 : 56;
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${dark ? "bg-primary" : "bg-white"} shadow-[0_6px_16px_rgba(0,28,61,0.18)]`}
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
    >
      <SlideImage src={icon} size={iconSize} />
    </div>
  );
}

export interface SlideCheckIconProps {
  className?: string;
}

export function SlideCheckIcon({ className = "" }: SlideCheckIconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`flex-shrink-0 mt-[3px] ${className || "w-[18px] h-[18px]"}`}
    >
      <circle cx="6" cy="6" r="5.5" stroke="#d4a13a" strokeWidth="1" />
      <path
        d="M3.5 6L5.5 8L8.5 4.5"
        stroke="#d4a13a"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ServiceData {
  num: number;
  icon: string;
  title: string;
  subtitle: string;
  points: string[];
  highlight?: boolean;
}

export interface SlideServiceCardProps {
  service: ServiceData;
}

export function SlideServiceCard({ service }: SlideServiceCardProps) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-[10px] bg-white shadow-[0_4px_14px_rgba(0,28,61,0.08)] gap-1.5 ${service.highlight ? "border-2 border-gold/70" : "border border-primary/10"}`}
      style={{ padding: "clamp(10px, 1vw, 20px) clamp(8px, 0.8vw, 24px)" }}
    >
      <div className="absolute left-[8px] top-[8px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#001B4F]">
        <span className="text-[14px] font-bold text-white leading-none">{service.num}</span>
      </div>
      <div className="mb-1 mt-1 flex justify-center shrink-0">
        <SlideImage src={service.icon} size={32} />
      </div>
      <h3 className="whitespace-pre-line px-1 text-center font-heading text-[clamp(13px,1.1vw,18px)] font-semibold leading-snug text-primary">
        {service.title}
      </h3>
      <p className="mt-[1px] whitespace-pre-line px-1 text-center text-[clamp(11px,0.8vw,13px)] font-semibold leading-normal text-gold">
        {service.subtitle}
      </p>
      <div className="mt-[2px] flex-1 space-y-[1px] pl-[4px] flex flex-col justify-center">
        {service.points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-[4px] text-[clamp(11.5px,0.75vw,14px)] font-medium leading-relaxed text-primary"
          >
            <span className="text-[12px] leading-none mt-[1px]">•</span>
            <span>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface DeveloperData {
  name: string;
  sub: string;
  img: string;
}
export interface SlideDeveloperCardProps {
  dev: DeveloperData;
  className?: string;
}

export function SlideDeveloperCard({ dev, className = "" }: SlideDeveloperCardProps) {
  return (
    <div
      className={`bg-white border border-primary/10 rounded-[10px] flex flex-col justify-between shadow-[0_4px_12px_rgba(0,28,61,0.05)] ${className}`}
      style={{ padding: "9px" }}
    >
      <div>
        <p className="text-primary font-bold text-[clamp(12.5px,1vw,15.5px)] tracking-wide leading-none">
          {dev.name}
        </p>
        <p
          className="text-[#001B4F]/60 text-[clamp(11px,0.85vw,13px)] font-semibold mt-[3px] leading-none"
          style={{ marginBottom: "2px" }}
        >
          {dev.sub}
        </p>
      </div>
      {dev.img && (
        <div
          className="w-full aspect-[22/13.5] overflow-hidden rounded-[6px]"
          style={{ marginTop: "6px" }}
        >
          <img src={dev.img} alt={dev.name} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

// Data arrays
export const Ce = [
  "Endless listings",
  "Conflicting opinions",
  "Aggressive sales approaches",
  "Incomplete information",
  "Inventory confusion",
  "Project comparison challenges",
];

export const we = [
  { icon: y.usersGroup, title: "Guided\nConsultation", x: "50%", y: "9%" },
  { icon: y.searchBuilding, title: "Project\nIntelligence", x: "84%", y: "31%" },
  { icon: y.scales, title: "Structured\nComparison", x: "83%", y: "69%" },
  { icon: y.target, title: "Alignment-Based\nRecommendations", x: "50%", y: "91%" },
  { icon: y.buildingsFilled, title: "Inventory\nCoordination", x: "17%", y: "69%" },
  { icon: y.handshake, title: "Decision\nSupport", x: "16%", y: "31%" },
];

export const Te = [
  { icon: y.evaluation, label: "Evaluation\nFrameworks" },
  { icon: y.analysis, label: "Comparative\nAnalysis" },
  { icon: y.monitor, label: "Technology\nWorkflows" },
  { icon: y.commercial, label: "Multi-Developer\nAccess" },
  { icon: y.human, label: "Human\nGuidance" },
];

export const Ee = [
  { icon: y.citySkyline, label: "Mumbai" },
  { icon: y.bridge, label: "Thane" },
  { icon: y.citySkyline, label: "Navi Mumbai" },
  { icon: y.way, label: "Growth\nCorridors" },
];

export const De = [
  { icon: y.monitor, label: "Structured\nDigital Workflows" },
  { icon: y.whatsappReal, label: "Guided WhatsApp\nInteractions" },
  { icon: y.network, label: "Project Intelligence\nSystems" },
  { icon: y.human, label: "Expert Guidance\nat Every Step" },
  { icon: y.handshake, label: "Developer\nCoordination" },
  { icon: y.barChart, label: "Practical Decision\nAssistance" },
];

export const Oe = [
  { icon: y.users, title: "Buyer First", sub: "Always." },
  { icon: y.shieldCheck, title: "Transparent", sub: "Process." },
  { icon: y.barChart, title: "Data-Backed", sub: "Insights." },
  { icon: y.scales, title: "Unbiased", sub: "Advice." },
  { icon: y.shield, title: "Confidential", sub: "& Secure." },
  { icon: y.handshake, title: "Long-Term", sub: "Partnership." },
];

export const he = [
  "Understanding your actual priorities",
  "Simplifying project comparison complexity",
  "Improving evaluation clarity",
  "Coordinating suitable opportunities",
  "Assisting with structured decision-making",
];

export const ge = [
  {
    num: 1,
    icon: y.residential,
    title: "Residential Property\nIntelligence & Evaluation",
    subtitle: "Helping Families Evaluate Beyond\nJust Price & Location",
    points: [
      "Structured requirement understanding",
      "Project shortlisting assistance",
      "Comparative evaluation support",
      "Township ecosystem analysis",
      "Site visit coordination support",
    ],
  },
  {
    num: 2,
    icon: y.commercial,
    title: "Commercial Property\nEvaluation & Advisory",
    subtitle: "Strategic Commercial Space\nEvaluation Assistance",
    points: [
      "Commercial requirement understanding",
      "Location & accessibility analysis",
      "Project comparison support",
      "Inventory coordination assistance",
      "Scalability-oriented evaluation",
    ],
  },
  {
    num: 3,
    icon: y.clipboard,
    title: "Guided Project\nShortlisting",
    subtitle: "Structured Alignment-Based\nRecommendations",
    points: [
      "Alignment-based shortlisting",
      "Lifestyle & connectivity compatibility",
      "Future growth & investment potential",
      "Vastu preferences consideration",
      "Focused & relevant evaluation",
    ],
  },
  {
    num: 4,
    icon: y.scales,
    title: "Comparative Project\nEvaluation Support",
    subtitle: "Simplifying Complex\nReal Estate Decisions",
    points: [
      "Location & ecosystem evaluation",
      "Connectivity & infrastructure analysis",
      "Configuration & usability review",
      "Investment outlook assessment",
      "Objective comparison support",
    ],
  },
  {
    num: 5,
    icon: y.usersGroup,
    title: "Inventory Coordination\nAssistance",
    subtitle: "Helping Align Buyer Requirements\nwith Available Opportunities",
    points: [
      "Configuration & floor availability",
      "Orientation & inventory feasibility",
      "Budget alignment support",
      "Practical suitability coordination",
      "Developer inventory coordination",
    ],
  },
  {
    num: 6,
    icon: y.handshake,
    title: "Strategic Transaction\nCoordination Support",
    subtitle: "Helping Simplify the Commercial\nEvaluation Process",
    points: [
      "Payment flexibility opportunities",
      "Transaction convenience support",
      "Phased payment structures",
      "Developer schemes & offers",
      "Commercial feasibility assistance",
    ],
  },
  {
    num: 7,
    icon: y.vastu,
    title: "Vastu & Lifestyle-\nOriented Evaluation Support",
    subtitle: "Because Real Estate Decisions\nAre Also Personal Decisions",
    points: [
      "Vastu alignment consideration",
      "Orientation & natural lighting",
      "Wellness-focused living evaluation",
      "Township & community fit",
      "Long-term lifestyle suitability",
    ],
  },
  {
    num: 8,
    icon: y.calendar,
    title: "Site Visit Coordination\nSupport",
    subtitle: "Guided Project Evaluation\nAssistance",
    points: [
      "Guided site visits",
      "Developer appointments",
      "Project walkthrough scheduling",
      "Evaluation sequencing",
      "Comparative exploration support",
    ],
  },
  {
    num: 9,
    icon: y.dataSearch,
    title: "Technology-Assisted\nReal Estate Intelligence",
    subtitle: "Combining Structured Guidance\nwith Modern Workflows",
    points: [
      "Project intelligence & insights",
      "Structured evaluation workflows",
      "Comparative analysis support",
      "Tech-enabled recommendation",
      "Practical coordination assistance",
    ],
  },
  {
    num: 10,
    icon: y.eyeSearch,
    title: "Our Focus. Your Confidence.",
    subtitle: "Intelligent Evaluation.\nBetter Decisions.",
    points: [
      "Improving evaluation clarity",
      "Reducing confusion",
      "Simplifying project comparison",
      "Helping buyers make more informed decisions",
    ],
    highlight: true,
  },
];

export const _e = [
  { icon: y.target, title: "Buyer-Focused", desc: "Your goals come first." },
  { icon: y.shield, title: "Transparent", desc: "Honest guidance. No hidden agenda." },
  { icon: y.barChart, title: "Data-Backed", desc: "Insights for smarter evaluation." },
  { icon: y.users, title: "Structured Process", desc: "From clarity to confident decisions." },
  { icon: y.handshake, title: "End-to-End Support", desc: "We're with you at every step." },
  {
    icon: y.trendingUp,
    title: "Better Outcomes",
    desc: "Better properties. Better returns. Better life.",
  },
];

export const ie = [
  {
    icon: y.shield,
    title: "Developer Neutral",
    desc: "We are not tied to any developer\nor project.",
  },
  {
    icon: y.scales,
    title: "Market Wide Access",
    desc: "We evaluate across multiple developers,\nlocations, and asset types.",
  },
  {
    icon: y.usersGroup,
    title: "Client First Approach",
    desc: "Your goals come first.\nOur recommendations are always unbiased.",
  },
];

export const oe = [
  {
    name: "DEVELOPER A",
    sub: "Premium Residences",
    img: "/images/Independent_evaluation_img_1.webp",
  },
  {
    name: "DEVELOPER B",
    sub: "Integrated Township",
    img: "/images/Independent_evaluation_img_2.webp",
  },
  { name: "DEVELOPER C", sub: "Luxury Living", img: "/images/Independent_evaluation_img_3.webp" },
];

export const se = [
  {
    name: "DEVELOPER D",
    sub: "Commercial Spaces",
    img: "/images/Independent_evaluation_img_4.webp",
  },
  {
    name: "DEVELOPER E",
    sub: "High Street Retail",
    img: "/images/Independent_evaluation_img_5.webp",
  },
  {
    name: "DEVELOPER F",
    sub: "Mixed Use Development",
    img: "/images/Independent_evaluation_img_6.webp",
  },
];

export const ae = [
  "Compare objectively",
  "Evaluate thoroughly",
  "Shortlist intelligently",
  "Decide confidently",
];

export const de = [
  {
    num: 1,
    icon: y.usersGroup,
    title: "Understand Your Goals",
    desc: "We listen, understand your needs, lifestyle, budget, and investment objectives in detail.",
    img: "/images/Yourjourney_img_1.webp",
  },
  {
    num: 2,
    icon: y.searchChart,
    title: "In-Depth Research",
    desc: "We analyze market data, project details, developer track record, and location dynamics.",
    img: "/images/Yourjourney_img_2.webp",
  },
  {
    num: 3,
    icon: y.filter,
    title: "Shortlist & Recommend",
    desc: "We create a personalized shortlist that matches your goals with the best opportunities.",
    img: "/images/Yourjourney_img_3.webp",
  },
  {
    num: 4,
    icon: y.logo,
    title: "Site Visits & Evaluation",
    desc: "We accompany you on site visits and help evaluate projects objectively.",
    img: "/images/Yourjourney_img_4.webp",
  },
  {
    num: 5,
    icon: y.handshake,
    title: "Negotiate & Secure",
    desc: "We help you negotiate the best terms and ensure a smooth, transparent transaction.",
    img: "/images/Yourjourney_img_5.webp",
  },
  {
    num: 6,
    icon: y.shieldCheck,
    title: "Move In With Confidence",
    desc: "From paperwork to possession, we support you until you move in with peace of mind.",
    img: "/images/Yourjourney_img_6.webp",
  },
];

export const fe = [
  { icon: y.clock, title: "Save Time", desc: "We handle the heavy\nlifting for you." },
  {
    icon: y.shieldCheck,
    title: "Reduce Risk",
    desc: "Data-backed insights\nminimize uncertainty.",
  },
  {
    icon: y.magnifier,
    title: "Make Informed Choices",
    desc: "Clear, objective guidance\nyou can trust.",
  },
  { icon: y.trendingUp, title: "Better Outcomes", desc: "Stronger returns and\nlasting value." },
  { icon: y.heart, title: "Peace of Mind", desc: "You're never alone\nin the decision." },
];

export const E = [
  {
    icon: y.monitor,
    title: "Digital Workflows",
    desc: "Digital tools streamline evaluation, comparisons, and scheduling.",
  },
  {
    icon: y.users,
    title: "Human Guidance",
    desc: "Expert advisors provide local insights, objective comparisons, and trusted advice lead to confident outcomes.",
  },
];

export const D = [
  {
    icon: y.clockSearch,
    title: "Save Time",
    desc: "Smart tools and expert\nsupport streamline\nyour evaluation.",
  },
  {
    icon: y.magnifier,
    title: "See Clearly",
    desc: "Data-backed insights\nreveal what truly\nmatters.",
  },
  {
    icon: y.shieldCheck,
    title: "Reduce Risk",
    desc: "Thorough evaluation\nhelps you avoid costly\nmistakes.",
  },
  {
    icon: y.trendingUp,
    title: "Maximize Value",
    desc: "Make informed decisions\nthat create long-term\nvalue and growth.",
  },
];

export const ne = [
  {
    icon: y.calendar,
    title: "Planned with Purpose",
    desc: "We schedule visits based on your priorities\nand evaluation checklist.",
  },
  {
    icon: y.user,
    title: "Expert Accompaniment",
    desc: "Our advisors accompany you to provide context,\nanswer questions, and highlight key factors.",
  },
  {
    icon: y.clipboard,
    title: "On-Site Evaluation",
    desc: "We help you assess location, amenities, quality,\nand overall suitability on the ground.",
  },
  {
    icon: y.camera,
    title: "Document & Compare",
    desc: "We capture insights and help you compare\noptions objectively.",
  },
];

export const T = [
  {
    icon: y.targetGold,
    title: "Right Questions",
    desc: "We help you ask\nwhat truly matters.",
  },
  {
    icon: y.eyeSearch,
    title: "Local Insights",
    desc: "On-ground perspective\nyou can trust.",
  },
  {
    icon: y.shieldCheck,
    title: "Risk Awareness",
    desc: "Identify potential red flags\nbefore you decide.",
  },
  {
    icon: y.scales,
    title: "Objective View",
    desc: "Unbiased guidance for\nclearer decisions.",
  },
  {
    icon: y.pieChart,
    title: "Better Decisions",
    desc: "Real clarity comes from\nseeing what counts.",
  },
];

export const O = [
  { icon: y.targetGold, title: "Our Commitment", desc: "Your goals are\nour priority." },
  { icon: y.handshake, title: "Our Promise", desc: "Honest advice.\nZero bias." },
  { icon: y.trendingUp, title: "Our Focus", desc: "Creating better\nfutures, together." },
];

export const k = [
  { icon: y.phone, lines: ["+91-8433826365"] },
  { icon: y.whatsapp, lines: ["+91-8433826365"] },
  { icon: y.email, lines: ["support@propertyworks.in"] },
];

export const w = [
  {
    icon: y.handshake,
    title: "Trust",
    desc: "Built on transparency,\nintegrity, and\nunbiased advice.",
  },
  {
    icon: y.target,
    title: "Insight",
    desc: "Powered by data,\nexpertise, and\nreal-world experience.",
  },
  {
    icon: y.usersGroup,
    title: "Partnership",
    desc: "We work with you,\nnot just for you.\nYour goals, our priority.",
  },
  {
    icon: y.barChart,
    title: "Impact",
    desc: "Better decisions today.\nStronger returns\ntomorrow.",
  },
];

export const ee = [
  { bold: "Understand", sub: "your needs deeply" },
  { bold: "Evaluate", sub: "with complete objectivity" },
  { bold: "Guide", sub: "with expertise" },
  { bold: "Support", sub: "at every step" },
  { bold: "Deliver", sub: "lasting value" },
];
