import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useLocation, HeadContent } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Lenis from "lenis";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import ShortlistModal, { type ShortlistType } from "@/components/ShortlistModal";
import { SettingsProvider } from "@/contexts/SettingsContext";

function GlobalShortlistModal() {
  const router = useRouter();
  const location = useLocation();
  const [modalType, setModalType] = useState<ShortlistType>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#residential") {
      setModalType("Residential");
      router.navigate({ to: location.pathname, search: location.search, replace: true });
    } else if (hash === "#commercial") {
      setModalType("Commercial");
      router.navigate({ to: location.pathname, search: location.search, replace: true });
    }
  }, [location.hash, location.pathname, location.search, router]);

  if (!modalType) return null;

  return <ShortlistModal type={modalType} onClose={() => setModalType(null)} />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Setup Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Only run on the browser
    if (typeof window === "undefined") return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Scroll listener for Back-to-Top visibility
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        {/* Render route-managed head tags (title, meta, links, styles, scripts) */}
        <HeadContent />

        {/* Top Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-[#D4A13A] origin-left z-[99999]"
          style={{ scaleX }}
        />

        <Outlet />

        {/* Back to top button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              key="back-to-top"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1, y: -2, boxShadow: "0 0 15px rgba(212, 161, 58, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-[#001B4F] border border-[#D4A13A] text-white flex items-center justify-center shadow-lg cursor-pointer focus:outline-none transition-all duration-300"
              aria-label="Scroll back to top"
            >
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <GlobalShortlistModal />
      </SettingsProvider>
    </QueryClientProvider>
  );
}
