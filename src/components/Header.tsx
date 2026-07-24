import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, Logo } from "./sections/shared";
import { useLocation, Link } from "@tanstack/react-router";
import ShortlistButton from "./ShortlistButton";

// ─── Link type definitions ──────────────────────────────────────────────────
type SimpleLink = { label: string; href: string; dropdown?: never };
type DropdownLink = {
  label: string;
  href?: never;
  dropdown: { label: string; href: string }[];
};
type NavLink = SimpleLink | DropdownLink;

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;
  const currentSearch = location.search as { type?: string };

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveLinkLabel = (): string => {
    if (currentPath.startsWith("/projects")) {
      return "Project Directory";
    }
    if (currentPath.startsWith("/knowledge-center")) {
      return "Knowledge Center";
    }
    if (currentPath === "/about") {
      return "About Us";
    }
    if (currentPath === "/services") {
      return "Our Services";
    }
    if (currentPath === "/contact") {
      return "Contact Us";
    }
    if (currentPath === "/") {
      if (currentHash === "about") return "About Us";
      if (currentHash === "services") return "Our Services";
      if (currentHash === "contact") return "Contact Us";
      return "Home";
    }
    return "";
  };

  const activeLink = getActiveLinkLabel();

  // Helper to check if a specific dropdown sub-item is active
  const isSubItemActive = (subHref: string): boolean => {
    if (subHref === "/projects") {
      return currentPath === "/projects" && !currentSearch.type;
    }
    if (subHref.includes("type=Residential")) {
      return currentPath === "/projects" && currentSearch.type === "Residential";
    }
    if (subHref.includes("type=Commercial")) {
      return currentPath === "/projects" && currentSearch.type === "Commercial";
    }
    return false;
  };

  const links: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    {
      label: "Project Directory",
      dropdown: [
        { label: "All Projects", href: "/projects" },
        { label: "Residential Advisory", href: "/projects?type=Residential" },
        { label: "Commercial Advisory", href: "/projects?type=Commercial" },
      ],
    },
    { label: "Knowledge Center", href: "/knowledge-center" },
    { label: "Contact Us", href: "/contact" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-white/10 bg-primary/95 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-0" : "py-1.5"}`}
      >
        <div
          className={`max-w-[1760px] mx-auto w-full px-5 sm:px-8 xl:px-8 2xl:px-16 flex items-center justify-between gap-4 transition-all duration-300 ${isScrolled ? "h-16 xl:h-20" : "h-20 xl:h-24"}`}
        >
          {/* LOGO WITH FLOAT EFFECT */}
          <Link to="/" className="inline-flex items-center">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <Logo light={true} imageClassName="h-[75px] xl:h-[95px] 2xl:h-[115px]" />
            </motion.div>
          </Link>

          {/* NAVIGATION – DESKTOP */}
          <nav className="hidden xl:flex items-center xl:gap-5 2xl:gap-7 h-full">
            {links.map((link) => {
              if (link.dropdown) {
                // Dropdown item
                const isActive = activeLink === link.label;
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => setHoveredDropdown(link.label)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                    className="relative h-full flex items-center cursor-pointer py-2"
                  >
                    <div className="relative py-1 flex items-center">
                      <span
                        className={`text-[12.5px] xl:text-[13px] 2xl:text-[14px] font-semibold tracking-wide transition-colors flex items-center gap-1 xl:gap-1.5
                          ${isActive ? "text-gold" : "text-white/75 hover:text-white"}`}
                      >
                        {link.label}
                        <svg
                          className={`w-3 h-3 stroke-current transition-transform duration-250 ${hoveredDropdown === link.label ? "rotate-180" : ""}`}
                          fill="none"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>

                      {/* Active gold underline - slides smoothly */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavUnderline"
                          className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gold rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </div>

                    {/* Dropdown panel with elegant fade & slide */}
                    <AnimatePresence>
                      {hoveredDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-[80%] left-0 mt-1 w-52 rounded-lg bg-primary border border-white/10 shadow-2xl py-2.5 z-50 overflow-hidden"
                        >
                          {link.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={handleNavClick}
                              className={`block px-5 py-2.5 text-[12.5px] xl:text-[13px] font-semibold transition-colors
                                ${
                                  isSubItemActive(subItem.href)
                                    ? "text-gold bg-white/5"
                                    : "text-white/80 hover:text-white hover:bg-white/5"
                                }`}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Simple link
              const isActive = activeLink === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`relative text-[12.5px] xl:text-[13px] 2xl:text-[14px] font-semibold tracking-wide transition-colors pb-1
                    ${isActive ? "text-gold" : "text-white/75 hover:text-white"}`}
                >
                  {link.label}
                  {/* Gold underline for active - slides smoothly */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ACTION BUTTONS – DESKTOP */}
          <div className="hidden xl:flex items-center xl:gap-2.5 2xl:gap-3 shrink-0">
            <ShortlistButton type="Residential" onClick={() => setIsOpen(false)} />
            <ShortlistButton type="Commercial" onClick={() => setIsOpen(false)} />
          </div>

          {/* MOBILE MENU TRIGGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/10 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN - ANIMATED COLLAPSIBLE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden border-t border-white/10 bg-primary px-5 py-4 space-y-4 shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col gap-3">
                {links.map((link, idx) => {
                  if (link.dropdown) {
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.35, ease: "easeOut" }}
                        className="flex flex-col gap-2 mt-1"
                      >
                        <span className="text-white/40 text-[10.5px] font-bold tracking-wider uppercase px-0.5">
                          {link.label}
                        </span>
                        <div className="flex flex-col gap-2 pl-3 border-l-2 border-gold/40">
                          {link.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={handleNavClick}
                              className={`text-sm font-semibold py-1 transition-colors
                                ${isSubItemActive(subItem.href) ? "text-gold" : "text-white/75 hover:text-white"}`}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }

                  const isActive = activeLink === link.label;
                  return (
                    <motion.a
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.35, ease: "easeOut" }}
                      href={link.href}
                      onClick={handleNavClick}
                      className={`text-sm font-semibold py-1.5 transition-colors
                        ${isActive ? "text-gold" : "text-white/75 hover:text-white"}`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>
              <div className="h-px bg-white/10" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.04, duration: 0.35, ease: "easeOut" }}
                className="space-y-3"
              >
                <div onClick={() => setIsOpen(false)}>
                  <ShortlistButton type="Residential" className="w-full flex" buttonClassName="mobile-btn-click" />
                </div>
                <div onClick={() => setIsOpen(false)}>
                  <ShortlistButton type="Commercial" className="w-full flex" buttonClassName="mobile-btn-click" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
