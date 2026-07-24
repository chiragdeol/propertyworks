import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated = "June 24, 2026", children }: PolicyLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />
      
      {/* Policy Hero Header */}
      <section className="bg-primary text-white py-12 lg:py-16 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,161,58,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-[1760px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2"
          >
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h1>
            <div className="h-[3px] w-20 bg-gold mt-2" />
            <p className="text-white/60 text-xs sm:text-sm mt-2 font-medium">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)] max-w-none"
        >
          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            {children}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
