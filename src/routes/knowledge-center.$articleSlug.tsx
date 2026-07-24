import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getArticleBySlug, getArticles, getGlobalSettings } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExitIntentModal from "@/components/ExitIntentModal";
import ShortlistModal, { type ShortlistType } from "@/components/ShortlistModal";
import { Clock, Calendar, ArrowLeft, ArrowRight, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  categories: string[];
  featuredImage: string;
  seoTitle: string;
  metaDescription: string;
  publishDate: string;
  readingTime: number;
  status: "Published" | "Draft";
}

export const Route = createFileRoute("/knowledge-center/$articleSlug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug({ data: { slug: params.articleSlug } });
    const allArticles = await getArticles();
    const settings = await getGlobalSettings();
    return { article, allArticles, settings };
  },
  head: ({ loaderData }: any) => {
    const article = loaderData?.article as Article | null;
    if (!article) {
      return {
        meta: [{ title: "Article Not Found | PropertyWorks" }]
      };
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "image": [article.featuredImage.startsWith("http") ? article.featuredImage : `https://www.propertyworks.in${article.featuredImage}`],
      "datePublished": article.publishDate,
      "dateModified": article.publishDate,
      "author": {
        "@type": "Organization",
        "name": "PropertyWorks Advisory",
        "url": "https://www.propertyworks.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PropertyWorks",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.propertyworks.in/images/logo-main.png"
        }
      },
      "description": article.metaDescription
    };

    const breadcrumbSchema = {
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.title,
          "item": `https://www.propertyworks.in/knowledge-center/${article.slug}`
        }
      ]
    };

    const ogImage = article.featuredImage.startsWith("http") ? article.featuredImage : `https://www.propertyworks.in${article.featuredImage}`;

    return {
      meta: [
        { title: `${article.seoTitle} | PropertyWorks Knowledge Center` },
        { name: "description", content: article.metaDescription },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.metaDescription },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: `https://www.propertyworks.in/knowledge-center/${article.slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.metaDescription },
        { name: "twitter:image", content: ogImage },
      ],
      links: [
        { rel: "canonical", href: `https://www.propertyworks.in/knowledge-center/${article.slug}` }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(schema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema)
        }
      ]
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const loaderData = Route.useLoaderData();
  const article = loaderData.article as Article | null;
  const allArticles = loaderData.allArticles as Article[];
  const settings = loaderData.settings;
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalType, setLeadModalType] = useState<ShortlistType>(null);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
            <h1 className="text-6xl font-black text-[#001B4F] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-[#001B4F] mb-2">Article Not Found</h2>
            <p className="text-slate-500 mb-6">
              The article you are looking for does not exist or has been relocated.
            </p>
            <Link
              to="/knowledge-center"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl text-[#001B4F] border border-gold hover:bg-gold hover:text-white font-bold transition-all"
            >
              Back to Knowledge Center
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Fallback settings if not loaded
  const activeSettings = settings || {
    whatsappNumber: "918433826365",
    consentText: "...",
    residential: {
      heading: "Not Sure if This is the Right Property for Your Needs?",
      description: "Get your FREE Personalized Residential Intelligence Report from PropertyWorks.",
      buttonLabel: "Get My FREE Residential Intelligence Report",
    },
    commercial: {
      heading: "Is This the Right Commercial Opportunity?",
      description: "Get your FREE Personalized Commercial Intelligence Report from PropertyWorks.",
      buttonLabel: "Get My FREE Commercial Intelligence Report",
    },
    ctaStyle: {
      bgClass: "bg-[#001B4F]",
      textColorClass: "text-white",
      buttonBgClass: "bg-[#D4A13A] text-[#001B4F] hover:bg-[#D4A13A]/90 hover:scale-[1.01] rounded-xl px-6 py-4 flex items-center justify-center gap-2",
      badgeColorClass: "text-gold",
      badgeLabel: "ADVISORY INTELLIGENCE",
      showPlacement1: true,
      showPlacement2: true,
    }
  };

  // Determine which CTA to show based on category
  const isCommercialArticle = article.categories.includes("Commercial Intelligence");
  const ctaConfig = isCommercialArticle ? activeSettings.commercial : activeSettings.residential;

  // Related Articles Logic:
  // Show 3 to 6 articles from same category, excluding current article
  const otherPublishedArticles = allArticles.filter(a => a.status === "Published" && a.id !== article.id);
  
  let related = otherPublishedArticles.filter(a => 
    a.categories.some(cat => article.categories.includes(cat))
  );

  // If we have less than 3, backfill with general latest articles
  if (related.length < 3) {
    const ids = new Set(related.map(r => r.id));
    const backfill = otherPublishedArticles.filter(a => !ids.has(a.id));
    related = [...related, ...backfill].slice(0, 6);
  } else {
    related = related.slice(0, 6);
  }

  const handleOpenLeadModal = () => {
    setLeadModalType(isCommercialArticle ? "Commercial" : "Residential");
    setIsLeadModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-[#001B4F] selection:bg-gold/30">
      <Header />
      
      {/* Visual Breadcrumbs Section */}
      <div className="bg-[#F8F8F6] border-b border-slate-100 py-3">
        <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16">
          <Breadcrumbs items={[{ label: "Knowledge Center", to: "/knowledge-center" }, { label: article.title }]} />
        </div>
      </div>

      <div 
        className="text-white py-12 lg:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001233 0%, #001B4F 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] rounded-full bg-blue-500/[0.03] blur-[80px]" />
        </div>

        <div className="relative max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 z-10 space-y-6">
          <Link 
            to="/knowledge-center"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-gold font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={14} className="stroke-3" />
            Back to Knowledge Center
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <span key={cat} className="px-3 py-1 bg-gold text-[#001B4F] text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm">
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white max-w-4xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-slate-350 pt-2 border-t border-white/10 pt-4">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-gold" />
                PropertyWorks Advisory
              </span>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(article.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
              <span className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT CONTAINER (Split Grid) ─────────────────────────────────── */}
      <div className="max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Article Body */}
          <div className="lg:col-span-8 space-y-8 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,27,79,0.01)]">
            {/* Featured Image */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xs">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rich Text content body */}
            <div 
              className="prose prose-slate max-w-none pt-2 text-slate-700 leading-relaxed font-semibold text-sm sm:text-base space-y-6 
                prose-headings:font-heading prose-headings:font-black prose-headings:text-[#001B4F] prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-a:text-gold prose-a:underline hover:prose-a:text-[#001B4F]
                prose-strong:font-bold prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Right Column: Dynamic Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-8">
            {/* Advisory Intelligence CTA Box */}
            <div className={`p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,27,79,0.06)] space-y-6 ${activeSettings.ctaStyle.bgClass} ${activeSettings.ctaStyle.textColorClass}`}>
              <div className="space-y-3">
                <span className={`text-[10px] font-black uppercase tracking-widest ${activeSettings.ctaStyle.badgeColorClass}`}>
                  {activeSettings.ctaStyle.badgeLabel}
                </span>
                <h3 className="text-xl font-heading font-black leading-tight">
                  {ctaConfig.heading}
                </h3>
                <p className="text-xs opacity-75 leading-relaxed font-semibold">
                  {ctaConfig.description}
                </p>
              </div>
              <button
                onClick={handleOpenLeadModal}
                className={`w-full ${activeSettings.ctaStyle.buttonBgClass}`}
              >
                {ctaConfig.buttonLabel}
              </button>
            </div>

            {/* Related guides list in sidebar */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,27,79,0.01)] space-y-6">
              <h3 className="text-sm font-black text-[#001B4F] uppercase tracking-wide border-b border-slate-50 pb-4">
                Related Advisory Guides
              </h3>

              <div className="space-y-4">
                {related.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="h-16 w-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-xs relative">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="font-heading font-black text-[#001B4F] text-xs line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                        <Link
                          to="/knowledge-center/$articleSlug"
                          params={{ articleSlug: item.slug }}
                        >
                          {item.title}
                        </Link>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {new Date(item.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM FULL-WIDTH RELATED ROW ───────────────────────────────────── */}
        <div className="border-t border-slate-200/80 pt-16 mt-16 space-y-8">
          <h3 className="text-xl sm:text-2xl font-heading font-black text-[#001B4F] relative pb-2">
            More Advisory Insights
            <span className="absolute left-0 bottom-0 h-1 w-12 bg-gold rounded-full" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                  <h4 className="font-heading font-black text-[#001B4F] text-base group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                    <Link
                      to="/knowledge-center/$articleSlug"
                      params={{ articleSlug: item.slug }}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-3 border-t border-slate-50 mt-2">
                    <span>
                      {new Date(item.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <Link
                      to="/knowledge-center/$articleSlug"
                      params={{ articleSlug: item.slug }}
                      className="text-gold hover:underline flex items-center gap-0.5"
                    >
                      <span>Read</span>
                      <ArrowRight size={10} className="stroke-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ExitIntentModal />

      {/* LEAD CAPTURE FLOW MODAL */}
      {isLeadModalOpen && (
        <ShortlistModal 
          type={leadModalType} 
          onClose={() => setIsLeadModalOpen(false)} 
        />
      )}
    </main>
  );
}
