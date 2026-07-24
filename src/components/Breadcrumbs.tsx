import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wide select-none ${className}`}
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-450 hover:text-gold transition-colors duration-200"
      >
        <Home size={14} className="stroke-[2.5]" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={12} className="text-slate-400 stroke-[3]" />
            {isLast || !item.to ? (
              <span 
                className="text-gold font-black truncate max-w-[200px] sm:max-w-xs" 
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="text-slate-450 hover:text-gold transition-colors duration-200 truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
