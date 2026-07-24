import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProjects } from "@/lib/api";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";
import ShortlistButton from "@/components/ShortlistButton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight, Lock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
// Setup dynamic route search queries for filtering
export const Route = createFileRoute("/projects/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: search.type as string | undefined,
      city: search.city as string | undefined,
    };
  },
  loader: async () => {
    const projects = await getProjects();
    return { projects };
  },
  head: () => ({
    meta: [
      { title: "Verified Real Estate Projects | PropertyWorks" },
      {
        name: "description",
        content: "Explore objectively evaluated residential and commercial real estate projects in Mumbai, Thane, and Navi Mumbai with configuration specifications and pricing details.",
      },
      { property: "og:title", content: "Verified Real Estate Projects | PropertyWorks" },
      {
        property: "og:description",
        content: "Explore objectively evaluated residential and commercial real estate projects in Mumbai, Thane, and Navi Mumbai.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/projects" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Verified Real Estate Projects | PropertyWorks" },
      { name: "twitter:description", content: "Explore objectively evaluated real estate projects." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/projects" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.propertyworks.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Projects",
              "item": "https://www.propertyworks.in/projects"
            }
          ]
        })
      }
    ]
  }),
  component: BlogDirectoryPage,
});

function BlogDirectoryPage() {
  const loaderData = Route.useLoaderData();
  const projects = loaderData.projects as Project[];
  const searchParams = Route.useSearch();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  // Sync state with URL search params on load or search param change
  useEffect(() => {
    if (searchParams.type) {
      setSelectedType(searchParams.type);
    } else {
      setSelectedType("All");
    }

    if (searchParams.city) {
      setSelectedCity(searchParams.city);
    } else {
      setSelectedCity("All");
    }
  }, [searchParams.type, searchParams.city]);

  // Extract unique cities from projects data for filters
  const cities = ["All", ...Array.from(new Set(projects.map((p) => p.location.city)))];

  // Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "All" || project.type === selectedType;
    const matchesCity = selectedCity === "All" || project.location.city === selectedCity;

    return matchesSearch && matchesType && matchesCity;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedCity("All");
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Projects" }]} />
        </div>
      </div>

      <section 
        className="relative py-16 sm:py-20 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001233 0%, #001B4F 100%)" }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] rounded-full bg-blue-500/[0.03] blur-[80px]" />
        </div>

        <div className="relative max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-gold">VERIFIED REAL ESTATE LISTINGS</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight max-w-3xl mx-auto">
            PropertyWorks <span className="text-gold">Projects</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            Access objectively analyzed residential and commercial projects. Unlock configuration metrics, developer papers, and pricing guides.
          </p>
        </div>
      </section>

      {/* ─── SEARCH & FILTER CONTROLS ─────────────────────────────────────────── */}
      <section className="relative -mt-8 z-20 max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
        <div className="bg-white border border-slate-100/80 rounded-3xl p-5 sm:p-7 shadow-[0_24px_50px_rgba(0,27,79,0.06)] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                placeholder="Search projects, developers, localities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-xl focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold cursor-pointer appearance-none"
                >
                  <option value="All">All Property Types</option>
                  <option value="Residential">Residential Advisory</option>
                  <option value="Commercial">Commercial Advisory</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* City Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-xl focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold cursor-pointer appearance-none"
                >
                  <option value="All">All Cities</option>
                  {cities.filter(c => c !== "All").map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-1">
              <button
                onClick={resetFilters}
                className="w-full h-12 flex items-center justify-center gap-2 border border-slate-200 hover:border-gold text-slate-500 hover:text-gold rounded-xl hover:bg-slate-50/50 transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer"
                title="Reset Filters"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span className="md:hidden">Reset</span>
              </button>
            </div>

          </div>

          {/* Applied filters summary */}
          {(searchTerm || selectedType !== "All" || selectedCity !== "All") && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs font-bold text-slate-500">
              <div className="flex flex-wrap items-center gap-2">
                <span>Showing {filteredProjects.length} matching results:</span>
                {searchTerm && (
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/50">Keyword: "{searchTerm}"</span>
                )}
                {selectedType !== "All" && (
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/50">Type: {selectedType}</span>
                )}
                {selectedCity !== "All" && (
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/50">City: {selectedCity}</span>
                )}
              </div>
              <button 
                onClick={resetFilters}
                className="text-gold hover:underline cursor-pointer flex items-center gap-1.5"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── PROJECT GRID LISTING ──────────────────────────────────────────────── */}
      <section className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,27,79,0.02)] hover:shadow-[0_20px_50px_rgba(0,27,79,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Card Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={project.media.heroImage} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    />
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gold text-[#001B4F] text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md">
                        {project.type}
                      </span>
                      <span className="px-3 py-1 bg-[#001B4F]/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-lg border border-white/10">
                        {project.location.city}
                      </span>
                    </div>
                    {/* Gated Tag */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-600 border border-slate-100 flex items-center gap-1">
                      <Lock size={10} /> Gated Data Included
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        {project.status}
                      </span>
                      <h3 className="text-xl font-heading font-black text-[#001B4F] group-hover:text-gold transition-colors leading-tight">
                        {project.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                        <MapPin size={14} className="text-gold" />
                        <span>{project.location.locality}, {project.location.city}</span>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Footer Row */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Starting Price</span>
                        <span className="text-base font-extrabold text-[#001B4F]">{project.pricing.startingPrice}</span>
                      </div>
                      
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.id }}
                        className="h-10 px-4 text-[#001B4F] border border-gold hover:bg-gold hover:text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-97 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight size={12} className="stroke-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 px-4 bg-white border border-slate-100 rounded-3xl max-w-xl mx-auto shadow-md"
            >
              <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#001B4F] mb-1">No Projects Found</h3>
              <p className="text-slate-500 text-sm font-semibold mb-6">
                We couldn't find any projects matching your search filters. Try adjusting your search term or selection.
              </p>
              <button
                onClick={resetFilters}
                className="h-11 px-5 bg-gold hover:bg-gold/90 text-[#001B4F] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── CALL TO ACTION BANNER ────────────────────────────────────────────── */}
      <section className="bg-primary text-white relative overflow-hidden py-16 lg:py-20 border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 right-0 w-96 h-96 bg-gold/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 z-10 text-center space-y-8 max-w-3xl">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-gold">UNBIASED PROPERTY ADVISORY</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black leading-tight text-white">
              Looking for a Custom Built Property Shortlist?
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-semibold">
              Don't spend weekends visiting dozens of developers blindly. Specify your budget, preferred localities, Vastu rules, and lifestyle goals. We will prepare a customized Real Estate Intelligence Report matching your priorities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <ShortlistButton type="Residential" />
            <ShortlistButton type="Commercial" />
          </div>
        </div>
      </section>

      <Footer />
      <ExitIntentModal />
    </main>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
