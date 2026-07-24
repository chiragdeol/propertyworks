import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ShortlistButtonProps {
  type: "Residential" | "Commercial";
  className?: string; // For wrapper styling if needed
  buttonClassName?: string; // For adding extra classes to the button itself
  label?: string; // Optional custom label
  onClick?: () => void;
}

export default function ShortlistButton({ type, className = "", buttonClassName = "", label, onClick }: ShortlistButtonProps) {
  const isResidential = type === "Residential";
  const baseClass = isResidential ? "btn-glowing-gold" : "btn-glowing-navy";
  const defaultLabel = `Get My Free ${type} Shortlist`;
  
  return (
    <motion.a
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.98 }}
      href={`#${isResidential ? "residential" : "commercial"}`}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 xl:gap-2.5 2xl:gap-3 px-3 py-2 xl:px-3.5 xl:py-2 2xl:px-4 2xl:py-2.5 text-white text-[12.5px] xl:text-[12.5px] 2xl:text-[14px] font-semibold tracking-wide rounded-md transition-colors shrink-0 cursor-pointer ${baseClass} ${className} ${buttonClassName}`}
    >
      {label || defaultLabel}{" "}
      {/* <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0"
        strokeWidth={1.5}
      /> */}
    </motion.a>
  );
}
