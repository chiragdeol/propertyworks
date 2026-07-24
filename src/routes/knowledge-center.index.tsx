import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getArticles, getGlobalSettings } from "@/lib/api";
import { Article } from "./knowledge-center.$articleSlug";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";
import ShortlistButton from "@/components/ShortlistButton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/knowledge-center/")({
  loader: async () => {
    const articles = await getArticles();
    const settings = await getGlobalSettings();
    return { articles, settings };
  },
  head: () => ({
    meta: [
      { title: "Real Estate Knowledge Center | PropertyWorks" },
      {
        name: "description",
        content: "Explore data-backed real estate reports, buyer guidelines, price trends, and township comparisons from objective advisory experts at PropertyWorks.",
      },
      { property: "og:title", content: "Real Estate Knowledge Center | PropertyWorks" },
      {
        property: "og:description",
        content: "Explore data-backed real estate reports, buyer guidelines, price trends, and township comparisons from objective advisory experts.",
      },
      { property: "og:image", content: "https://www.propertyworks.in/images/logo-main.png" },
      { property: "og:url", content: "https://www.propertyworks.in/knowledge-center" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Real Estate Knowledge Center | PropertyWorks" },
      { name: "twitter:description", content: "Explore data-backed real estate reports, buyer guidelines, and township comparisons." },
      { name: "twitter:image", content: "https://www.propertyworks.in/images/logo-main.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.propertyworks.in/knowledge-center" }
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
              "name": "Knowledge Center",
              "item": "https://www.propertyworks.in/knowledge-center"
            }
          ]
        })
      }
    ]
  }),
  component: KnowledgeCenterPage,
});

const CATEGORIES = [
  "All",
  "Market Insights",
  "Project Comparisons",
  "Location Guides",
  "Buyer Education",
  "Commercial Intelligence",
];

function KnowledgeCenterPage() {
  const loaderData = Route.useLoaderData();
  const articles = loaderData.articles as Article[];
  const settings = loaderData.settings;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fallback settings if not loaded
  const activeSettings = settings || {
    whatsappNumber: "918433826365",
    consentText: "...",
    residential: { heading: "Need Help?", description: "...", buttonLabel: "..." },
    ctaStyle: { bgClass: "bg-[#001B4F]", textColorClass: "text-white", buttonBgClass: "..." }
  };

  // Filter published articles
  const publishedArticles = articles.filter(a => a.status === "Published");

  // Filter by search term & category
  const filteredArticles = publishedArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || article.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Featured article (first one, or latest)
  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const remainingArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Knowledge Center" }]} />
        </div>
      </div>

      <section 
        className="relative py-16 sm:py-20 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001233 0%, #001B4F 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] rounded-full bg-blue-500/[0.03] blur-[80px]" />
        </div>

        <div className="relative max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-gold">PROPERTYWORKS ADVISORY HUB</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Knowledge <span className="text-gold">Center</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            Data-backed real estate reports, buyer guidelines, price trends, and locality guides curated by objective advisory experts.
          </p>
        </div>
      </section>

      {/* ─── SEARCH & FILTER CONTROLS ─────────────────────────────────────────── */}
      <section className="relative -mt-8 z-20 max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
        <div className="bg-white border border-slate-100/80 rounded-3xl p-5 sm:p-7 shadow-[0_24px_50px_rgba(0,27,79,0.06)] space-y-6">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search articles, comparisons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Scrolling Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar justify-start lg:justify-end w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-10 px-4 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-gold text-[#001B4F] shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLES GRID ────────────────────────────────────────────────────── */}
      <section className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        {filteredArticles.length > 0 ? (
          <div className="space-y-16">
            
            {/* Featured Article Layout */}
            {featuredArticle && selectedCategory === "All" && !searchTerm && (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,27,79,0.02)] grid grid-cols-1 lg:grid-cols-12 hover:shadow-[0_20px_50px_rgba(0,27,79,0.07)] transition-all duration-300 group">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
                  <img
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {featuredArticle.categories.map((c) => (
                      <span key={c} className="px-3 py-1 bg-gold text-[#001B4F] text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="text-xs font-black uppercase tracking-widest text-gold">FEATURED ARTICLE</span>
                    <Link
                      to="/knowledge-center/$articleSlug"
                      params={{ articleSlug: featuredArticle.slug }}
                      className="block hover:text-gold transition-colors"
                    >
                      <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#001B4F] leading-tight">
                        {featuredArticle.title}
                      </h2>
                    </Link>
                    <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                      {featuredArticle.metaDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(featuredArticle.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredArticle.readingTime} min read
                      </span>
                    </div>

                    <Link
                      to="/knowledge-center/$articleSlug"
                      params={{ articleSlug: featuredArticle.slug }}
                      className="h-10 px-5 text-[#001B4F] border border-gold hover:bg-gold hover:text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-97 cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={12} className="stroke-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory !== "All" || searchTerm ? filteredArticles : remainingArticles).map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,27,79,0.02)] hover:shadow-[0_20px_50px_rgba(0,27,79,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {article.categories.map((c) => (
                        <span key={c} className="px-2.5 py-0.5 bg-gold text-[#001B4F] text-[9px] font-black uppercase tracking-wider rounded-md shadow-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <Link
                        to="/knowledge-center/$articleSlug"
                        params={{ articleSlug: article.slug }}
                        className="block hover:text-gold transition-colors"
                      >
                        <h3 className="text-lg font-heading font-black text-[#001B4F] leading-tight">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-slate-400 text-xs font-semibold line-clamp-3 leading-relaxed">
                        {article.metaDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(article.publishDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readingTime}m read
                        </span>
                      </div>
                      
                      <Link
                        to="/knowledge-center/$articleSlug"
                        params={{ articleSlug: article.slug }}
                        className="h-9 px-3.5 text-[#001B4F] border border-gold hover:bg-gold hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all active:scale-97 cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowRight size={10} className="stroke-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white border border-slate-100 rounded-3xl max-w-xl mx-auto shadow-md">
            <div className="h-16 w-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#001B4F] mb-1">No Articles Found</h3>
            <p className="text-slate-500 text-sm font-semibold mb-6">
              We couldn't find any articles matching your search criteria. Try adjusting your query or category selection.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="h-11 px-5 bg-gold hover:bg-gold/90 text-[#001B4F] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
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
