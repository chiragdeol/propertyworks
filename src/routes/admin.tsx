import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  loginAdmin, logoutAdmin, checkSession, resetAdminPassword,
  getProjects, saveProject, deleteProject, 
  getArticles, saveArticle, deleteArticle, 
  getGlobalSettings, saveGlobalSettings,
  getLeads, getMediaLibrary, uploadMedia
} from "@/lib/api";
import { useSettings } from "@/contexts/SettingsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast, Toaster } from "sonner";
import { 
  Lock, LayoutDashboard, Building, BookOpen, Settings, LogOut, 
  Plus, Edit, Trash2, CheckCircle2, AlertTriangle, ArrowRight, Eye, EyeOff, FileText,
  Image, FileSpreadsheet, Globe, Copy, Check, Upload, Calendar, Search, LayoutGrid
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminRouteComponent,
});

type Tab = "dashboard" | "projects" | "articles" | "media" | "leads" | "seo" | "settings" | "sections";

function AdminRouteComponent() {
  const navigate = useNavigate();
  const { reloadSettings } = useSettings();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authPassword, setAuthPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem("admin_active_tab");
    return (saved as Tab) || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  // Loading States
  const [projects, setProjects] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [globalSettings, setGlobalSettings] = useState<any>(null);

  // Form Editing States
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Authentication check
  useEffect(() => {
    checkSession().then((res) => {
      setIsAuthenticated(res.isAuthenticated);
    });
  }, []);

  // Fetch data on authentication
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const projs = await getProjects();
      const arts = await getArticles();
      const sets = await getGlobalSettings();
      setProjects(projs);
      setArticles(arts);
      setGlobalSettings(sets);
      
      try {
        await reloadSettings();
      } catch (err) {
        console.error("Failed to reload settings context:", err);
      }

      const leadsList = await getLeads();
      const mediaList = await getMediaLibrary();
      setLeads(leadsList);
      setMediaFiles(mediaList);
    } catch (e) {
      console.error("Failed to load server data:", e);
      toast.error("Failed to load server data");
    }
  };

  // Auth Password Reset & Visibility States
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetKeyOrOldPass, setResetKeyOrOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const [showAuthPass, setShowAuthPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdmin({ data: { password: authPassword } });
    if (res.success) {
      setIsAuthenticated(true);
      toast.success("Welcome back, Administrator!");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmNewPass) {
      toast.error("New passwords do not match!");
      return;
    }
    if (newPass.length < 4) {
      toast.error("New password must be at least 4 characters long.");
      return;
    }

    const res = await resetAdminPassword({
      data: {
        currentPassword: resetKeyOrOldPass,
        resetKey: resetKeyOrOldPass,
        newPassword: newPass,
      },
    });

    if (res.success) {
      toast.success(res.message || "Password reset successfully!");
      setIsResetMode(false);
      setAuthPassword(newPass);
      setResetKeyOrOldPass("");
      setNewPass("");
      setConfirmNewPass("");
    } else {
      toast.error(res.error || "Failed to reset password.");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  // Render Login Page
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col justify-between font-sans text-white relative overflow-hidden">
        <Header />
        <Toaster position="top-right" richColors />
        
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        </div>

        <div className="flex-grow flex items-center justify-center p-5 z-10 my-8">
          <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-heading font-black tracking-tight">
                {isResetMode ? "Reset Admin Password" : "Admin Authentication"}
              </h2>
              <p className="text-slate-400 text-xs font-semibold">
                {isResetMode
                  ? "Enter your current password or master reset key to update your password."
                  : "Access restricted to authorized PropertyWorks staff."}
              </p>
            </div>

            {!isResetMode ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                    Security Password
                  </label>
                  <div className="relative">
                    <input
                      type={showAuthPass ? "text" : "password"}
                      placeholder="Enter administrator password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full h-12 pl-4 pr-11 bg-slate-750 border border-slate-700 text-sm rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAuthPass(!showAuthPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors p-1 cursor-pointer"
                      title={showAuthPass ? "Hide password" : "Show password"}
                    >
                      {showAuthPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-gold hover:bg-gold/90 active:scale-98 text-slate-900 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(212,161,58,0.25)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Authorize Access</span>
                  <ArrowRight size={14} className="stroke-[3]" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-xs text-gold/80 hover:text-gold font-bold underline transition-colors cursor-pointer"
                  >
                    Forgot or Reset Password?
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                    Current Password or Security Reset Key
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      placeholder="Enter current password or reset key"
                      value={resetKeyOrOldPass}
                      onChange={(e) => setResetKeyOrOldPass(e.target.value)}
                      required
                      className="w-full h-11 pl-4 pr-11 bg-slate-750 border border-slate-700 text-sm rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors p-1 cursor-pointer"
                      title={showCurrentPass ? "Hide key" : "Show key"}
                    >
                      {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                      className="w-full h-11 pl-4 pr-11 bg-slate-750 border border-slate-700 text-sm rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors p-1 cursor-pointer"
                      title={showNewPass ? "Hide password" : "Show password"}
                    >
                      {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      required
                      className="w-full h-11 pl-4 pr-11 bg-slate-750 border border-slate-700 text-sm rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-semibold text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors p-1 cursor-pointer"
                      title={showConfirmPass ? "Hide password" : "Show password"}
                    >
                      {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-gold hover:bg-gold/90 active:scale-98 text-slate-900 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(212,161,58,0.25)] cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Update Password</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(false)}
                    className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Render Dashboard
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <Header />
      <Toaster position="top-right" richColors />

      <div className="flex-grow max-w-[1760px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-[#001B4F] border border-blue-900/40 rounded-3xl p-5 shadow-xl space-y-6 text-white">
            <div className="flex items-center gap-3 px-2 border-b border-white/10 pb-4">
              <div className="h-10 w-10 bg-gold text-[#001B4F] rounded-full flex items-center justify-center font-black text-sm shadow-[0_4px_15px_rgba(212,161,58,0.3)]">
                PW
              </div>
              <div>
                <h4 className="text-sm font-black text-white leading-none">Property<span className="text-gold">Works</span></h4>
                <span className="text-[10px] font-bold text-slate-350 mt-1 block">Admin Control</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5">
              {[
                { tab: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
                { tab: "projects", label: "Manage Projects", icon: <Building size={16} /> },
                { tab: "articles", label: "Knowledge Center", icon: <BookOpen size={16} /> },
                { tab: "media", label: "Media Library", icon: <Image size={16} /> },
                { tab: "sections", label: "Manage Sections", icon: <LayoutGrid size={16} /> },
                { tab: "leads", label: "Forms (Leads)", icon: <FileSpreadsheet size={16} /> },
                { tab: "seo", label: "SEO Settings", icon: <Globe size={16} /> },
                { tab: "settings", label: "Global Settings", icon: <Settings size={16} /> },
              ].map((item) => (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => { setActiveTab(item.tab as Tab); setIsCreatingNew(false); setEditingProject(null); setEditingArticle(null); }}
                  className={`w-full h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === item.tab 
                      ? "bg-[#001233] text-white border-l-4 border-gold shadow-[0_4px_12px_rgba(212,161,58,0.15)] font-black" 
                      : "text-slate-300 hover:bg-[#001233]/40 hover:text-white"
                  }`}
                >
                  <span className={activeTab === item.tab ? "text-gold" : "text-slate-300"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="border-t border-white/10 my-4" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-wider transition-all text-rose-300 hover:bg-rose-500/10 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* MAIN WORKSPACE CONTENT */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* 1. DASHBOARD VIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-black text-slate-800 uppercase tracking-wide">Overview Summary</h2>
                  <span className="text-xs font-bold text-slate-400 bg-white border border-slate-100 px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Server Active
                  </span>
                </div>
                
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-default">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Projects</span>
                      <h3 className="text-3xl font-heading font-black text-slate-800 group-hover:text-gold transition-colors">{projects.length}</h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                      <Building size={20} />
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-default">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Articles Hub</span>
                      <h3 className="text-3xl font-heading font-black text-slate-800 group-hover:text-gold transition-colors">{articles.length}</h3>
                    </div>
                    <div className="h-12 w-12 bg-amber-50 text-[#D4A13A] rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                      <BookOpen size={20} />
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-default">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Enquiries</span>
                      <h3 className="text-3xl font-heading font-black text-slate-800 group-hover:text-gold transition-colors">{leads.length}</h3>
                    </div>
                    <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                      <FileSpreadsheet size={20} />
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group cursor-default">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Media Assets</span>
                      <h3 className="text-3xl font-heading font-black text-slate-800 group-hover:text-gold transition-colors">{mediaFiles.length}</h3>
                    </div>
                    <div className="h-12 w-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110">
                      <Image size={20} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Recent Leads Panel */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Recent Advisory Submissions</h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab("leads")}
                        className="text-xs font-extrabold text-gold hover:underline uppercase tracking-wider cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    {leads.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              <th className="pb-3 pl-2">Customer</th>
                              <th className="pb-3">Contact</th>
                              <th className="pb-3">Type</th>
                              <th className="pb-3">Enquired Project</th>
                              <th className="pb-3 pr-2 text-right">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads.slice(0, 5).map((lead) => (
                              <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 text-xs font-semibold text-slate-600 transition-colors">
                                <td className="py-3 pl-2 font-bold text-slate-800">{lead.name}</td>
                                <td className="py-3">{lead.phone}</td>
                                <td className="py-3">
                                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                                    lead.interest === "Commercial"
                                      ? "bg-purple-50 text-purple-600 border border-purple-100"
                                      : "bg-blue-50 text-blue-600 border border-blue-100"
                                  }`}>
                                    {lead.interest}
                                  </span>
                                </td>
                                <td className="py-3 truncate max-w-[150px]">{lead.projectName}</td>
                                <td className="py-3 pr-2 text-right text-slate-400">
                                  {new Date(lead.timestamp).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-10 space-y-2">
                        <div className="h-10 w-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                          <FileSpreadsheet size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">No submissions yet</h4>
                        <p className="text-slate-400 text-[11px]">Enquiry lead forms submitted on your project CTAs will display here.</p>
                      </div>
                    )}
                  </div>

                  {/* Quick stats and instructions */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide border-b border-slate-50 pb-4">Advisory Health</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <span className="text-xs text-slate-400 font-bold">Residential Projects</span>
                        <span className="text-xs text-slate-800 font-extrabold">{projects.filter(p => p.type === "Residential").length} listings</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <span className="text-xs text-slate-400 font-bold">Commercial Projects</span>
                        <span className="text-xs text-slate-800 font-extrabold">{projects.filter(p => p.type === "Commercial").length} listings</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <span className="text-xs text-slate-400 font-bold">Active Articles</span>
                        <span className="text-xs text-slate-800 font-extrabold">{articles.filter(a => a.status === "Published").length} live</span>
                      </div>
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-xs text-slate-400 font-bold">WhatsApp Destination</span>
                        <span className="text-xs text-slate-800 font-extrabold">+{globalSettings?.whatsappNumber || "Not Set"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROJECTS MANAGEMENT */}
            {activeTab === "projects" && (
              <ProjectsTab 
                projects={projects} 
                loadData={loadData}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                isCreatingNew={isCreatingNew}
                setIsCreatingNew={setIsCreatingNew}
              />
            )}

            {/* 3. ARTICLES MANAGEMENT */}
            {activeTab === "articles" && (
              <ArticlesTab 
                articles={articles} 
                loadData={loadData}
                editingArticle={editingArticle}
                setEditingArticle={setEditingArticle}
                isCreatingNew={isCreatingNew}
                setIsCreatingNew={setIsCreatingNew}
              />
            )}

            {/* 4. GLOBAL SETTINGS */}
            {activeTab === "settings" && globalSettings && (
              <SettingsTab 
                settings={globalSettings} 
                loadData={loadData}
              />
            )}

            {/* 5. MEDIA LIBRARY */}
            {activeTab === "media" && (
              <MediaLibraryTab 
                mediaFiles={mediaFiles} 
                loadData={loadData}
              />
            )}

            {/* 6. FORMS (LEADS) */}
            {activeTab === "leads" && (
              <LeadsTab 
                leads={leads} 
                loadData={loadData}
              />
            )}

            {/* 7. SEO SETTINGS */}
            {activeTab === "seo" && globalSettings && (
              <SeoTab 
                settings={globalSettings} 
                loadData={loadData}
              />
            )}

            {/* 8. MANAGE SECTIONS */}
            {activeTab === "sections" && globalSettings && (
              <SectionsTab 
                settings={globalSettings} 
                loadData={loadData}
              />
            )}

          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS TAB & FORMS
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectsTabProps {
  projects: any[];
  loadData: () => void;
  editingProject: any | null;
  setEditingProject: (proj: any | null) => void;
  isCreatingNew: boolean;
  setIsCreatingNew: (val: boolean) => void;
}

function ProjectsTab({ projects, loadData, editingProject, setEditingProject, isCreatingNew, setIsCreatingNew }: ProjectsTabProps) {
  
  const handleEdit = (project: any) => {
    setEditingProject({
      ...project,
      // Ensure arrays are mutable strings or kept formatted
      media: {
        ...project.media,
        galleryImages: project.media.galleryImages.join(", "),
        floorPlans: project.media.floorPlans.join(", "),
      },
      description: {
        ...project.description,
        amenities: project.description.amenities.join(", "),
        highlights: project.description.highlights.join(", "),
        connectivity: project.description.connectivity.join(", "),
        locationAdvantages: project.description.locationAdvantages.join(", "),
      }
    });
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    setEditingProject({
      id: "",
      name: "",
      developer: "",
      type: "Residential",
      status: "Active",
      location: { city: "", locality: "", address: "", mapsLink: "" },
      pricing: { startingPrice: "", maxPrice: "" },
      configurations: [{ name: "", carpetArea: "", startingPrice: "" }],
      media: { heroImage: "", galleryImages: "", floorPlans: "", masterPlan: "", brochurePdf: "" },
      description: { overview: "", amenities: "", highlights: "", connectivity: "", locationAdvantages: "", lifestyle: "" },
      faqs: [{ question: "", answer: "" }]
    });
    setIsCreatingNew(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this project?")) {
      const res = await deleteProject({ data: { id } });
      if (res.success) {
        toast.success("Project deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete project");
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.id || !editingProject.name) {
      toast.error("ID/Slug and Name are required");
      return;
    }

    // Process inputs back into arrays
    const formattedProject = {
      ...editingProject,
      media: {
        ...editingProject.media,
        galleryImages: editingProject.media.galleryImages ? editingProject.media.galleryImages.split(",").map((s: string) => s.trim()) : [],
        floorPlans: editingProject.media.floorPlans ? editingProject.media.floorPlans.split(",").map((s: string) => s.trim()) : [],
      },
      description: {
        ...editingProject.description,
        amenities: editingProject.description.amenities ? editingProject.description.amenities.split(",").map((s: string) => s.trim()) : [],
        highlights: editingProject.description.highlights ? editingProject.description.highlights.split(",").map((s: string) => s.trim()) : [],
        connectivity: editingProject.description.connectivity ? editingProject.description.connectivity.split(",").map((s: string) => s.trim()) : [],
        locationAdvantages: editingProject.description.locationAdvantages ? editingProject.description.locationAdvantages.split(",").map((s: string) => s.trim()) : [],
      }
    };

    try {
      const res = await saveProject({ data: { project: formattedProject } });
      if (res.success) {
        toast.success(isCreatingNew ? "Project created successfully!" : "Project updated successfully!");
        setEditingProject(null);
        setIsCreatingNew(false);
        loadData();
      } else {
        toast.error("Failed to save project");
      }
    } catch (err: any) {
      toast.error("Failed validation error check inputs");
    }
  };

  const updateNested = (parent: string, field: string, value: any) => {
    setEditingProject((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const addConfigRow = () => {
    setEditingProject((prev: any) => ({
      ...prev,
      configurations: [...prev.configurations, { name: "", carpetArea: "", startingPrice: "" }]
    }));
  };

  const removeConfigRow = (index: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      configurations: prev.configurations.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateConfigRow = (index: number, field: string, value: string) => {
    setEditingProject((prev: any) => {
      const rows = [...prev.configurations];
      rows[index][field] = value;
      return { ...prev, configurations: rows };
    });
  };

  const addFaqRow = () => {
    setEditingProject((prev: any) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  const removeFaqRow = (index: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      faqs: prev.faqs.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateFaqRow = (index: number, field: string, value: string) => {
    setEditingProject((prev: any) => {
      const rows = [...prev.faqs];
      rows[index][field] = value;
      return { ...prev, faqs: rows };
    });
  };

  if (editingProject) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">
            {isCreatingNew ? "Add New Project Listing" : `Edit Project: ${editingProject.name}`}
          </h3>
          <button 
            onClick={() => setEditingProject(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Cancel & Go Back
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Row 1: Basic details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400">ID / URL Slug *</label>
              <input
                type="text"
                placeholder="prestige-sanctuary"
                value={editingProject.id}
                disabled={!isCreatingNew}
                onChange={(e) => setEditingProject({...editingProject, id: e.target.value.toLowerCase().replace(/\s+/g, "-")})}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400">Project Name *</label>
              <input
                type="text"
                placeholder="Prestige Sanctuary"
                value={editingProject.name}
                onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400">Developer *</label>
              <input
                type="text"
                placeholder="Prestige Group"
                value={editingProject.developer}
                onChange={(e) => setEditingProject({...editingProject, developer: e.target.value})}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Property Type</label>
                <select
                  value={editingProject.type}
                  onChange={(e) => setEditingProject({...editingProject, type: e.target.value})}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white cursor-pointer font-semibold"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Availability Status</label>
                <select
                  value={editingProject.status}
                  onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white cursor-pointer font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Limited Availability">Limited Availability</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Location Information */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Location Specifications</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">City *</label>
                <input
                  type="text"
                  placeholder="Thane"
                  value={editingProject.location.city}
                  onChange={(e) => updateNested("location", "city", e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Locality *</label>
                <input
                  type="text"
                  placeholder="Thane West"
                  value={editingProject.location.locality}
                  onChange={(e) => updateNested("location", "locality", e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[9px] font-black uppercase text-slate-400">Detailed Address *</label>
                <input
                  type="text"
                  placeholder="Street name, Sector, Landmark..."
                  value={editingProject.location.address}
                  onChange={(e) => updateNested("location", "address", e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[9px] font-black uppercase text-slate-400">Google Maps Link</label>
                <input
                  type="text"
                  placeholder="https://maps.google.com/..."
                  value={editingProject.location.mapsLink}
                  onChange={(e) => updateNested("location", "mapsLink", e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Pricing & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Pricing Ranges</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Starting Price *</label>
                  <input
                    type="text"
                    placeholder="₹1.45 Cr"
                    value={editingProject.pricing.startingPrice}
                    onChange={(e) => updateNested("pricing", "startingPrice", e.target.value)}
                    className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Max Price (Gated)</label>
                  <input
                    type="text"
                    placeholder="₹5.50 Cr"
                    value={editingProject.pricing.maxPrice}
                    onChange={(e) => updateNested("pricing", "maxPrice", e.target.value)}
                    className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Media Upload Urls</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Hero Image URL *</label>
                  <input
                    type="text"
                    placeholder="/images/hero.jpg"
                    value={editingProject.media.heroImage}
                    onChange={(e) => updateNested("media", "heroImage", e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Master Plan URL (Gated)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editingProject.media.masterPlan}
                    onChange={(e) => updateNested("media", "masterPlan", e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400">Brochure PDF Link (Gated)</label>
                  <input
                    type="text"
                    placeholder="#"
                    value={editingProject.media.brochurePdf}
                    onChange={(e) => updateNested("media", "brochurePdf", e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg outline-none focus:border-gold font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Tables Row */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Apartment / Space Configurations</h4>
              <button
                type="button"
                onClick={addConfigRow}
                className="h-8 px-3 bg-gold text-slate-900 font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Add Config Row
              </button>
            </div>

            {editingProject.configurations.map((row: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 bg-white border border-slate-200/50 p-3 rounded-xl">
                <input
                  type="text"
                  placeholder="e.g. 2 BHK Premium"
                  value={row.name}
                  onChange={(e) => updateConfigRow(idx, "name", e.target.value)}
                  className="w-full sm:flex-1 h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg outline-none focus:bg-white font-semibold"
                />
                <input
                  type="text"
                  placeholder="e.g. 1,200 sq.ft."
                  value={row.carpetArea}
                  onChange={(e) => updateConfigRow(idx, "carpetArea", e.target.value)}
                  className="w-full sm:w-40 h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg outline-none focus:bg-white font-semibold"
                />
                <input
                  type="text"
                  placeholder="e.g. ₹1.85 Cr"
                  value={row.startingPrice}
                  onChange={(e) => updateConfigRow(idx, "startingPrice", e.target.value)}
                  className="w-full sm:w-40 h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg outline-none focus:bg-white font-semibold"
                />
                <button
                  type="button"
                  onClick={() => removeConfigRow(idx)}
                  className="text-rose-500 hover:text-rose-700 cursor-pointer p-1"
                  disabled={editingProject.configurations.length === 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Gallery and Floorplans list arrays */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Asset Library (Comma Separated URLs)</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Gallery Images (Comma separated list)</label>
                <textarea
                  placeholder="/images/gallery1.jpg, /images/gallery2.jpg"
                  rows={2}
                  value={editingProject.media.galleryImages}
                  onChange={(e) => updateNested("media", "galleryImages", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Floor Plans (Comma separated list)</label>
                <textarea
                  placeholder="https://floorplan1.jpg, https://floorplan2.jpg"
                  rows={2}
                  value={editingProject.media.floorPlans}
                  onChange={(e) => updateNested("media", "floorPlans", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Description and rich texts */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Detailed Descriptions & Text Blocks</h4>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Overview / Introduction *</label>
                <textarea
                  placeholder="Project overview text..."
                  rows={4}
                  value={editingProject.description.overview}
                  onChange={(e) => updateNested("description", "overview", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Amenities (Comma separated)</label>
                  <textarea
                    placeholder="Infinity Pool, High-tech Gym, Clubhouse"
                    rows={2}
                    value={editingProject.description.amenities}
                    onChange={(e) => updateNested("description", "amenities", e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Highlights (Comma separated)</label>
                  <textarea
                    placeholder="Near highway, Gated data included, Low density"
                    rows={2}
                    value={editingProject.description.highlights}
                    onChange={(e) => updateNested("description", "highlights", e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Connectivity (Comma separated)</label>
                  <textarea
                    placeholder="20 mins to Airport, 5 mins from station"
                    rows={2}
                    value={editingProject.description.connectivity}
                    onChange={(e) => updateNested("description", "connectivity", e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400">Location Advantages (Comma separated)</label>
                  <textarea
                    placeholder="Surrounded by schools, Close to IT Hubs"
                    rows={2}
                    value={editingProject.description.locationAdvantages}
                    onChange={(e) => updateNested("description", "locationAdvantages", e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Lifestyle Description</label>
                <textarea
                  placeholder="Vastu-friendly, premium luxury deck, etc..."
                  rows={3}
                  value={editingProject.description.lifestyle}
                  onChange={(e) => updateNested("description", "lifestyle", e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>
            </div>
          </div>

          {/* FAQs section */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Project FAQs</h4>
              <button
                type="button"
                onClick={addFaqRow}
                className="h-8 px-3 bg-gold text-slate-900 font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Add FAQ Row
              </button>
            </div>

            {editingProject.faqs.map((row: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200/50 p-4 rounded-xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => removeFaqRow(idx)}
                  className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 cursor-pointer"
                  disabled={editingProject.faqs.length === 1}
                >
                  <Trash2 size={16} />
                </button>
                <div className="space-y-2 pr-6">
                  <input
                    type="text"
                    placeholder="Question?"
                    value={row.question}
                    onChange={(e) => updateFaqRow(idx, "question", e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg outline-none focus:bg-white font-bold text-slate-800"
                  />
                  <textarea
                    placeholder="Answer response..."
                    rows={2}
                    value={row.answer}
                    onChange={(e) => updateFaqRow(idx, "answer", e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-lg outline-none focus:bg-white font-semibold text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="h-12 px-8 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Save Project Listing
            </button>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="h-12 px-6 border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Projects Directory ({projects.length})</h3>
        <button 
          onClick={handleCreateNew}
          className="h-10 px-4 bg-gold text-[#001B4F] hover:shadow-md text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer btn-glowing-gold"
        >
          <Plus size={14} className="stroke-[3]" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-black uppercase tracking-wider">
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Developer</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Pricing</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-slate-800">{proj.name}</td>
                <td className="py-3.5 px-4">{proj.developer}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide ${
                    proj.type === "Commercial" ? "bg-slate-900 text-white" : "bg-gold/20 text-gold"
                  }`}>
                    {proj.type}
                  </span>
                </td>
                <td className="py-3.5 px-4">{proj.location.locality}, {proj.location.city}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{proj.pricing.startingPrice}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2.5">
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: proj.id }}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View public page"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => handleEdit(proj)}
                      className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE CENTER (ARTICLES) TAB & FORMS
// ─────────────────────────────────────────────────────────────────────────────
interface ArticlesTabProps {
  articles: any[];
  loadData: () => void;
  editingArticle: any | null;
  setEditingArticle: (art: any | null) => void;
  isCreatingNew: boolean;
  setIsCreatingNew: (val: boolean) => void;
}

function ArticlesTab({ articles, loadData, editingArticle, setEditingArticle, isCreatingNew, setIsCreatingNew }: ArticlesTabProps) {
  
  const handleEdit = (article: any) => {
    setEditingArticle({ ...article });
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    setEditingArticle({
      id: "art-" + Date.now(),
      slug: "",
      title: "",
      content: "",
      categories: ["Market Insights"],
      featuredImage: "",
      seoTitle: "",
      metaDescription: "",
      publishDate: new Date().toISOString(),
      readingTime: 3,
      status: "Draft",
    });
    setIsCreatingNew(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this article?")) {
      const res = await deleteArticle({ data: { id } });
      if (res.success) {
        toast.success("Article deleted successfully");
        loadData();
      } else {
        toast.error("Failed to delete article");
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle.slug || !editingArticle.title || !editingArticle.content) {
      toast.error("Title, URL slug, and content are required");
      return;
    }

    try {
      const res = await saveArticle({ data: { article: editingArticle } });
      if (res.success) {
        toast.success(isCreatingNew ? "Article published successfully!" : "Article saved successfully!");
        setEditingArticle(null);
        setIsCreatingNew(false);
        loadData();
      } else {
        toast.error("Failed to save article");
      }
    } catch (err) {
      toast.error("Validation error: check all article fields");
    }
  };

  // Simple rich text insert helper
  const insertTag = (tag: string, placeholder = "") => {
    const textarea = document.getElementById("content-editor-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end) || placeholder;

    let replacement = "";
    if (tag === "h2") replacement = `<h2>${selection}</h2>\n`;
    else if (tag === "h3") replacement = `<h3>${selection}</h3>\n`;
    else if (tag === "p") replacement = `<p>${selection}</p>\n`;
    else if (tag === "bold") replacement = `<strong>${selection}</strong>`;
    else if (tag === "ul") replacement = `<ul>\n  <li>${selection}</li>\n</ul>\n`;
    else if (tag === "a") replacement = `<a href="#">${selection}</a>`;
    else if (tag === "table") {
      replacement = `<table>\n  <thead>\n    <tr><th>Header 1</th><th>Header 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Value 1</td><td>Value 2</td></tr>\n  </tbody>\n</table>\n`;
    }

    const value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setEditingArticle({ ...editingArticle, content: value });

    // Refocus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 50);
  };

  const handleCategoryToggle = (cat: string) => {
    let cats = [...editingArticle.categories];
    if (cats.includes(cat)) {
      cats = cats.filter(c => c !== cat);
    } else {
      cats.push(cat);
    }
    // Ensure at least one category
    if (cats.length === 0) cats.push("Market Insights");
    setEditingArticle({ ...editingArticle, categories: cats });
  };

  if (editingArticle) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">
            {isCreatingNew ? "Create Knowledge Article" : `Edit Article: ${editingArticle.title}`}
          </h3>
          <button 
            onClick={() => setEditingArticle(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Cancel & Go Back
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black uppercase text-slate-400">Article Title *</label>
              <input
                type="text"
                placeholder="Raymond Ten X vs Lodha Amara: Which is better?"
                value={editingArticle.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                  setEditingArticle({ 
                    ...editingArticle, 
                    title,
                    slug: isCreatingNew ? slug : editingArticle.slug,
                    seoTitle: isCreatingNew ? title : editingArticle.seoTitle
                  });
                }}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400">URL Slug *</label>
              <input
                type="text"
                placeholder="raymond-ten-x-vs-lodha-amara"
                value={editingArticle.slug}
                onChange={(e) => setEditingArticle({...editingArticle, slug: e.target.value.toLowerCase().replace(/\s+/g, "-")})}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400">Featured Image URL *</label>
              <input
                type="text"
                placeholder="/images/residential-image.webp"
                value={editingArticle.featuredImage}
                onChange={(e) => setEditingArticle({...editingArticle, featuredImage: e.target.value})}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
              />
            </div>
          </div>

          {/* Multi-select category row */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 block">Select Category (One or multiple) *</label>
            <div className="flex flex-wrap gap-2">
              {["Market Insights", "Project Comparisons", "Location Guides", "Buyer Education", "Commercial Intelligence"].map(cat => {
                const isSelected = editingArticle.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`h-9 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                      isSelected
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* HTML editor field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400">Article Content *</label>
              
              {/* Rich text helpers */}
              <div className="flex flex-wrap gap-1">
                {[
                  { label: "Heading 2", action: "h2", tip: "Header H2" },
                  { label: "Heading 3", action: "h3", tip: "Header H3" },
                  { label: "Paragraph", action: "p", tip: "Text Block" },
                  { label: "Bold", action: "bold", tip: "Bold Text" },
                  { label: "Bullet List", action: "ul", tip: "Bulleted list" },
                  { label: "Link", action: "a", tip: "Anchor tag link" },
                  { label: "Table", action: "table", tip: "Comparison table" },
                ].map(tool => (
                  <button
                    key={tool.action}
                    type="button"
                    onClick={() => insertTag(tool.action, tool.tip)}
                    className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-[10px] font-extrabold uppercase rounded-md hover:bg-slate-200 cursor-pointer text-slate-600"
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              id="content-editor-textarea"
              placeholder="Write body content in HTML formatting here..."
              rows={12}
              value={editingArticle.content}
              onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
              className="w-full p-4 bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl outline-none focus:bg-white focus:border-gold font-mono leading-relaxed"
            />
          </div>

          {/* SEO Block */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">SEO Optimization Metadata</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">SEO Meta Title *</label>
                <input
                  type="text"
                  placeholder="Lodha Amara vs Raymond Ten X: A Thane Township Battle"
                  value={editingArticle.seoTitle}
                  onChange={(e) => setEditingArticle({...editingArticle, seoTitle: e.target.value})}
                  className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Status Controls</label>
                <select
                  value={editingArticle.status}
                  onChange={(e) => setEditingArticle({...editingArticle, status: e.target.value as any})}
                  className="w-full h-10 px-3 bg-white border border-slate-200 text-sm rounded-xl outline-none cursor-pointer font-semibold"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[9px] font-black uppercase text-slate-400">SEO Meta Description *</label>
                <textarea
                  placeholder="This comparison report helps buyers choose between Lodha Amara and Raymond Ten X Habitat in Thane..."
                  rows={2}
                  value={editingArticle.metaDescription}
                  onChange={(e) => setEditingArticle({...editingArticle, metaDescription: e.target.value})}
                  className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Form action buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="h-12 px-8 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Save Article
            </button>
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="h-12 px-6 border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Knowledge Articles ({articles.length})</h3>
        <button 
          onClick={handleCreateNew}
          className="h-10 px-4 bg-gold text-[#001B4F] hover:shadow-md text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer btn-glowing-gold"
        >
          <Plus size={14} className="stroke-[3]" />
          <span>Write Article</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-black uppercase tracking-wider">
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Categories</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-black text-slate-800 max-w-sm truncate">{art.title}</td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {art.categories.map((c: string) => (
                      <span key={c} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-wider">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  {new Date(art.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide ${
                    art.status === "Published" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}>
                    {art.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2.5">
                    {art.status === "Published" && (
                      <Link
                        to="/knowledge-center/$articleSlug"
                        params={{ articleSlug: art.slug }}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View published page"
                      >
                        <Eye size={16} />
                      </Link>
                    )}
                    <button
                      onClick={() => handleEdit(art)}
                      className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit article"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SETTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
interface SettingsTabProps {
  settings: any;
  loadData: () => void;
}

function SettingsTab({ settings, loadData }: SettingsTabProps) {
  const [formData, setFormData] = useState<any>({ ...settings });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await saveGlobalSettings({ data: { settings: formData } });
    if (res.success) {
      toast.success("Global configurations updated successfully!");
      loadData();
    } else {
      toast.error("Failed to update configurations");
    }
  };

  const updateNested = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Global Platform Settings</h3>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        
        {/* Row 1: Contact Details & consent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">WhatsApp Destination Number *</label>
            <input
              type="text"
              placeholder="e.g. 919820544278"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">QR Code Server Endpoint *</label>
            <input
              type="text"
              placeholder="https://api.qrserver.com/..."
              value={formData.qrCodeBaseUrl}
              onChange={(e) => setFormData({...formData, qrCodeBaseUrl: e.target.value})}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">Contact Phone (Footer Display) *</label>
            <input
              type="text"
              placeholder="e.g. +91 8433826365"
              value={formData.contactPhone || ""}
              onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">Contact Email (Footer Display) *</label>
            <input
              type="email"
              placeholder="e.g. info@propertyworks.in"
              value={formData.contactEmail || ""}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">MahaRERA Registration Number</label>
            <input
              type="text"
              placeholder="e.g. P51700077890"
              value={formData.mahaReraNumber || ""}
              onChange={(e) => setFormData({...formData, mahaReraNumber: e.target.value})}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-400">Mandatory Lead Consent Wording *</label>
            <textarea
              placeholder="Enter legal consent wording for shortlist requests..."
              rows={3}
              value={formData.consentText}
              onChange={(e) => setFormData({...formData, consentText: e.target.value})}
              className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
            />
          </div>
        </div>

        {/* Residential CTA section */}
        <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Residential Lead CTA Content</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Headline *</label>
              <input
                type="text"
                placeholder="Not Sure if This is the Right Property for Your Needs?"
                value={formData.residential.heading}
                onChange={(e) => updateNested("residential", "heading", e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Description Text *</label>
              <textarea
                placeholder="Advisory description text here..."
                rows={3}
                value={formData.residential.description}
                onChange={(e) => updateNested("residential", "description", e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold leading-relaxed"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Button Text *</label>
              <input
                type="text"
                placeholder="Get My FREE Residential Intelligence Report"
                value={formData.residential.buttonLabel}
                onChange={(e) => updateNested("residential", "buttonLabel", e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Commercial CTA section */}
        <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Commercial Lead CTA Content</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Headline *</label>
              <input
                type="text"
                placeholder="Is This the Right Commercial Opportunity?"
                value={formData.commercial.heading}
                onChange={(e) => updateNested("commercial", "heading", e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Description Text *</label>
              <textarea
                placeholder="Advisory description text here..."
                rows={3}
                value={formData.commercial.description}
                onChange={(e) => updateNested("commercial", "description", e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold leading-relaxed"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Button Text *</label>
              <input
                type="text"
                placeholder="Get My FREE Commercial Intelligence Report"
                value={formData.commercial.buttonLabel}
                onChange={(e) => updateNested("commercial", "buttonLabel", e.target.value)}
                className="w-full h-10 px-4 bg-white border border-slate-200 text-sm rounded-xl outline-none focus:border-gold font-semibold"
              />
            </div>
          </div>
        </div>

        {/* CTA Design Layout Controls */}
        <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">CTA Layout & Positioning</h4>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="placement1"
                checked={formData.ctaStyle.showPlacement1}
                onChange={(e) => updateNested("ctaStyle", "showPlacement1", e.target.checked)}
                className="h-4.5 w-4.5 rounded text-gold border-slate-350 focus:ring-gold/30 cursor-pointer accent-gold"
              />
              <label htmlFor="placement1" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                Show Placement 1 (After Overview)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="placement2"
                checked={formData.ctaStyle.showPlacement2}
                onChange={(e) => updateNested("ctaStyle", "showPlacement2", e.target.checked)}
                className="h-4.5 w-4.5 rounded text-gold border-slate-350 focus:ring-gold/30 cursor-pointer accent-gold"
              />
              <label htmlFor="placement2" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                Show Placement 2 (Before FAQ / Footer)
              </label>
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[9px] font-black uppercase text-slate-400">CTA Style Button Icon</label>
              <select
                value={formData.ctaStyle.iconType}
                onChange={(e) => updateNested("ctaStyle", "iconType", e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 text-sm rounded-xl outline-none cursor-pointer font-semibold"
              >
                <option value="arrow">Right Arrow icon</option>
                <option value="check">Checkmark icon</option>
                <option value="download">Download icon</option>
                <option value="none">No icon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="h-12 px-8 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Save Configuration Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA LIBRARY TAB
// ─────────────────────────────────────────────────────────────────────────────
interface MediaLibraryTabProps {
  mediaFiles: any[];
  loadData: () => void;
}

function MediaLibraryTab({ mediaFiles, loadData }: MediaLibraryTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await uploadMedia({
          data: {
            file: base64Data,
            filename: file.name
          }
        });
        if (res.success) {
          toast.success("File uploaded successfully!");
          loadData();
        } else {
          toast.error("Failed to upload file");
        }
      } catch (err: any) {
        toast.error("Upload error: " + err.message);
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyLink = (url: string, filename: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedFile(filename);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedFile(null), 2000);
    });
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-4 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Media Library</h3>
          <p className="text-slate-400 text-xs font-semibold mt-1">Upload and manage image assets for your projects and articles.</p>
        </div>
        
        <label className="h-10 px-5 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-xs transition-all active:scale-97 select-none">
          {isUploading ? (
            <>
              <div className="animate-spin h-3.5 w-3.5 border-2 border-slate-900 border-t-transparent rounded-full" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={14} className="stroke-[3]" />
              <span>Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {mediaFiles.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {mediaFiles.map((file) => {
            const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.filename);
            return (
              <div key={file.filename} className="group border border-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="aspect-video w-full bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                  {isImage ? (
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FileText className="text-slate-400 h-10 w-10" />
                  )}
                </div>

                <div className="p-3.5 space-y-2.5">
                  <div className="space-y-0.5">
                    <h4 className="text-slate-800 text-xs font-bold truncate" title={file.filename}>
                      {file.filename}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      {formatBytes(file.size)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyLink(file.url, file.filename)}
                    className={`w-full h-8 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      copiedFile === file.filename
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {copiedFile === file.filename ? (
                      <>
                        <Check size={11} className="stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50/30 border border-dashed border-slate-200 rounded-2xl space-y-3">
          <div className="h-14 w-14 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100">
            <Image size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No media assets found</h4>
            <p className="text-slate-400 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
              Upload images to use them inside your project configurations, galleries, or Knowledge Center articles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMS (LEADS) TAB
// ─────────────────────────────────────────────────────────────────────────────
interface LeadsTabProps {
  leads: any[];
  loadData: () => void;
}

function LeadsTab({ leads, loadData }: LeadsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No lead submissions available to export");
      return;
    }

    const headers = ["Lead ID", "Customer Name", "Phone Number", "Property Interest", "Max Budget", "Locality Preference", "Enquired Project", "Submission Date"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.phone,
      l.interest,
      l.budget || "N/A",
      l.location || "N/A",
      l.projectName || "General site",
      new Date(l.timestamp).toLocaleString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propertyworks_leads_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV report downloaded!");
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.projectName && lead.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.location && lead.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "All" || lead.interest === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-4 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Form Submissions (Leads)</h3>
          <p className="text-slate-400 text-xs font-semibold mt-1">Review enquiries submitted from dynamic project templates and knowledge articles.</p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="h-10 px-5 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-97 select-none"
        >
          <FileSpreadsheet size={14} className="text-emerald-600" />
          <span>Export CSV Report</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 border border-slate-100 p-4 rounded-2xl">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search leads name, contact, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 text-xs rounded-xl outline-none focus:border-gold font-semibold"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <label className="text-[10px] font-black uppercase text-slate-400 mr-1 whitespace-nowrap">Filter Type:</label>
          {["All", "Residential", "Commercial"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`h-8 px-3.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                filterType === type
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-500 border border-slate-200/60"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredLeads.length > 0 ? (
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact Number</th>
                <th className="py-3 px-4">Interest Type</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Locality Preference</th>
                <th className="py-3 px-4">Source Page</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 text-xs font-semibold text-slate-600 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(lead.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{lead.name}</td>
                  <td className="py-3.5 px-4">{lead.phone}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase ${
                      lead.interest === "Commercial"
                        ? "bg-purple-50 text-purple-600 border border-purple-100"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      {lead.interest}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{lead.budget || "N/A"}</td>
                  <td className="py-3.5 px-4">{lead.location || "N/A"}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-500 truncate max-w-[160px]">{lead.projectName || "General site"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50/30 border border-slate-100 rounded-2xl space-y-2">
          <div className="h-12 w-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search size={20} />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No matching leads found</h4>
          <p className="text-slate-400 text-xs font-semibold">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO SETTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
interface SeoTabProps {
  settings: any;
  loadData: () => void;
}

function SeoTab({ settings, loadData }: SeoTabProps) {
  const [formData, setFormData] = useState<any>({
    canonicalUrl: settings.seo?.canonicalUrl || "https://www.propertyworks.in",
    titleSuffix: settings.seo?.titleSuffix || " | PropertyWorks",
    defaultMetaDescription: settings.seo?.defaultMetaDescription || "",
    robotsTxt: settings.seo?.robotsTxt || "User-agent: *\nAllow: /"
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings = {
      ...settings,
      seo: formData
    };

    const res = await saveGlobalSettings({ data: { settings: updatedSettings } });
    if (res.success) {
      toast.success("SEO and robots configurations updated!");
      loadData();
    } else {
      toast.error("Failed to update SEO configurations");
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">SEO & Indexing Configurations</h3>
        <p className="text-slate-400 text-xs font-semibold mt-1">Configure global search engine optimization parameters and indexing rules.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">Default Canonical URL *</label>
            <input
              type="text"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400">Global Title Suffix *</label>
            <input
              type="text"
              value={formData.titleSuffix}
              onChange={(e) => setFormData({ ...formData, titleSuffix: e.target.value })}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-400">Global Fallback Meta Description</label>
            <textarea
              rows={3}
              value={formData.defaultMetaDescription}
              onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase text-slate-400">Robots.txt Content (Dynamic Indexing Rules)</label>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 border border-slate-100 px-2.5 py-0.5 rounded-md">Live Endpoint</span>
            </div>
            <textarea
              rows={6}
              value={formData.robotsTxt}
              onChange={(e) => setFormData({ ...formData, robotsTxt: e.target.value })}
              className="w-full p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl outline-none focus:ring-2 focus:ring-gold/30 leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="h-12 px-8 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}

interface SectionsTabProps {
  settings: any;
  loadData: () => void;
}

function SectionsTab({ settings, loadData }: SectionsTabProps) {
  const [formData, setFormData] = useState<any>({ ...settings });
  const [selectedSection, setSelectedSection] = useState<string>("hero");

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await saveGlobalSettings({ data: { settings: formData } });
    if (res.success) {
      toast.success("Page sections updated successfully!");
      loadData();
    } else {
      toast.error("Failed to update configurations");
    }
  };

  const updateSectionField = (field: string, value: string) => {
    setFormData((prev: any) => {
      const sections = prev.sections ? { ...prev.sections } : {};
      const section = sections[selectedSection] ? { ...sections[selectedSection] } : {};
      section[field] = value;
      sections[selectedSection] = section;
      return {
        ...prev,
        sections
      };
    });
  };

  const defaultSections: Record<string, Record<string, string>> = {
    hero: {
      heading: "Stop Evaluating\nReal Estate [gold]Blindly.[/gold]",
      paragraph1: "Most buyers spend months visiting projects, comparing brochures, and listening to conflicting opinions.",
      paragraph2: "PropertyWorks helps professionals, businesses, investors, and families evaluate residential and commercial opportunities through structured comparison, guided coordination, and real estate intelligence.",
      imageUrl: "/images/hero-image.jpg"
    },
    noise: {
      heading: "The Real Estate Market\nIs Filled With [gold]Noise,\nPressure & Confusion.[/gold]",
      description: "Most buyers do not lack options. They lack structured guidance, comparison clarity, project intelligence, and coordinated support.",
      imageUrl: "/images/noise-image.webp"
    },
    clarity: {
      headingLeft: "FROM [gold]CONFUSION[/gold]\nTO CLARITY",
      headingRight: "FROM CLARITY\nTO [gold]CONFIDENCE[/gold]",
      subtitleLeft: "Unclear comparisons. Missed opportunities. Emotional decisions.",
      subtitleRight: "Right Projects Aligned to Your Priorities. Clear Comparison & Insights. Coordinated Site Visits. Confident & Informed Decision.",
      centerTitle: "The Right Guidance\n[gold]Changes Everything[/gold]",
      centerSubtitle: "Your Partner in Better Decisions",
      imageLeftUrl: "/images/clarity-confused.webp",
      imageRightUrl: "/images/clarity-confident.webp"
    },
    siteVisits: {
      heading: "Guided Site Visits.\n[gold]Informed Impressions.[/gold]",
      description: "We coordinate and guide site visits that go beyond a walkthrough. See what matters. Ask the right questions. Get real clarity.",
      imageUrl: "/images/Guidedsite_img.webp"
    },
    services: {
      heading: "Our [gold]Services[/gold]",
      subheading: "Real Estate Intelligence & Advisory Services",
      paragraph1: "At PropertyWorks, our services are designed to simplify the traditionally fragmented and confusing real estate evaluation journey through structured guidance, project intelligence, comparative analysis, and practical advisory support.",
      paragraph2: "Whether you are exploring a residential opportunity for your family or evaluating a commercial property for business or investment purposes, our objective is to help you make more informed and strategically aligned decisions with greater clarity and confidence.",
      imageUrl: "/images/Our Services bg.webp"
    },
    about: {
      heading: "About Property[gold]Works[/gold]",
      subheading: "Real Estate Intelligence & Advisory Services",
      description: "We simplify the real estate evaluation journey through intelligence, structure, transparency and human guidance.",
      quote: "Helping You Evaluate Real Estate with Greater [gold]Clarity, Structure & Confidence.[/gold]",
      imageUrl: "/images/About Property Works bg.webp"
    },
    whyChoose: {
      heading: "Why [gold]PropertyWorks?[/gold]",
      description: "We represent you, not the developer. Our process is structured to give you unbiased market clarity and maximum transaction comfort.",
      imageUrl: "/images/whyChoose-main.jpeg"
    },
    developerNetwork: {
      heading: "Active [gold]Developer Network[/gold]",
      description: "We leverage our relationships across top developers to get you absolute transaction comfort and pre-negotiated priority pricing."
    },
    independentEvaluation: {
      heading: "Independent\nEvaluation Across\n[gold]Multiple Developers[/gold]",
      description: "We evaluate opportunities across the market objectively. We do not push developer inventory. Our only focus is helping you find the right property that matches your criteria and interests."
    },
    technologyAdvisory: {
      heading: "Technology &\n[gold]Advisory[/gold]",
      description: "We combine proprietary digital evaluation tools with deep market advisory to give you structured real estate intelligence.",
      imageUrl: "/images/Technologyassisted_img.webp"
    },
    yourJourney: {
      heading: "Your Journey With [gold]PropertyWorks[/gold]",
      description: "A structured, transparent roadmap from initial exploration to secure handover.",
      imageUrl: "/images/Yourjourney_img_1.webp"
    },
    testimonials: {
      heading: "Client [gold]Success Stories[/gold]",
      description: "Read how professional families and businesses have moved from confusion to confidence.",
      paragraph: "At PropertyWorks, every evaluation is guided by clarity, structure, and your best interests. Here's what clients have shared about their journey with us.",
      imageUrl: "/images/prop-upper-img.webp"
    },
    faq: {
      heading: "[gold]Frequently Asked[/gold] Questions",
      description: "Common inquiries about our structured evaluation process, broker-free model, and report builder."
    },
    contact: {
      heading: "Connect with Our\n[gold]Advisory Team[/gold]",
      subheading: "Real Estate Intelligence & Advisory Services",
      description: "We’re here to help you make confident, well-informed real estate decisions. Get in touch with our team.",
      imageUrl: "/images/contact_desk.webp"
    },
    residential: {
      heading: "Residential\nReal Estate [gold]Intelligence[/gold]",
      description: "We help families evaluate more than just properties. We help you choose a lifestyle that fits your values, plans, and future.",
      imageUrl: "/images/residential-image.webp"
    },
    commercial: {
      heading: "Commercial\nReal Estate\n[gold]Intelligence[/gold]",
      description: "We help businesses and investors make smarter commercial real estate decisions aligned with their growth and returns.",
      imageUrl: "/images/commercial-image.webp"
    }
  };

  const getFieldValue = (field: string) => {
    const val = formData.sections?.[selectedSection]?.[field];
    if (val === undefined || val === null) {
      return (defaultSections[selectedSection] as any)?.[field] || "";
    }
    return val;
  };

  const getArrayValue = (field: string, fallback: any[] = []): any[] => {
    const val = formData.sections?.[selectedSection]?.[field];
    if (Array.isArray(val)) return val;
    const def = (defaultSections[selectedSection] as any)?.[field];
    if (Array.isArray(def)) return def;
    return fallback;
  };

  const updateArrayValue = (field: string, newArray: any[]) => {
    setFormData((prev: any) => {
      const sections = prev.sections ? { ...prev.sections } : {};
      const section = sections[selectedSection] ? { ...sections[selectedSection] } : {};
      section[field] = newArray;
      sections[selectedSection] = section;
      return {
        ...prev,
        sections
      };
    });
  };

  const handleArrayItemChange = (field: string, index: number, key: string, value: any) => {
    const current = [...getArrayValue(field)];
    if (typeof current[index] === "object" && current[index] !== null) {
      current[index] = { ...current[index], [key]: value };
    } else {
      current[index] = value;
    }
    updateArrayValue(field, current);
  };

  const handleAddArrayItem = (field: string, template: any) => {
    const current = [...getArrayValue(field)];
    current.push(template);
    updateArrayValue(field, current);
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    const current = [...getArrayValue(field)];
    current.splice(index, 1);
    updateArrayValue(field, current);
  };

  const sectionsList = [
    { id: "hero", label: "Hero Section" },
    { id: "noise", label: "Noise Section" },
    { id: "clarity", label: "Clarity Section" },
    { id: "residential", label: "Residential Section" },
    { id: "commercial", label: "Commercial Section" },
    { id: "siteVisits", label: "Guided Site Visits" },
    { id: "services", label: "Our Services" },
    { id: "about", label: "About PropertyWorks" },
    { id: "whyChoose", label: "Why PropertyWorks?" },
    { id: "developerNetwork", label: "Active Developer Network" },
    { id: "independentEvaluation", label: "Independent Evaluation" },
    { id: "technologyAdvisory", label: "Technology & Advisory" },
    { id: "yourJourney", label: "Your Journey" },
    { id: "testimonials", label: "Client Success Stories" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">Manage Page Sections</h3>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[11px] font-semibold text-slate-600 space-y-2 leading-relaxed">
        <p className="text-slate-800 font-bold text-xs">Formatting Help:</p>
        <p>1. You can wrap words in <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-mono">[gold]your text[/gold]</code> to style them gold in headers, subheadings, and descriptions.</p>
        <p>2. To add a line break in heading titles, simply press Enter (it will be saved as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">\n</code> and rendered as a line break).</p>
        <p>3. If you want to use files uploaded in the <span className="text-slate-900 font-bold">Media Library</span>, go to the Media tab, upload, copy the URL, and paste it in the Image URL fields below.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase text-slate-400">Select Section to Edit</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-bold cursor-pointer"
        >
          {sectionsList.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RENDER FORM FIELDS DYNAMICALLY */}
          {selectedSection === "hero" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Paragraph 1 *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("paragraph1")}
                  onChange={(e) => updateSectionField("paragraph1", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Paragraph 2 *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("paragraph2")}
                  onChange={(e) => updateSectionField("paragraph2", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
            </>
          )}

          {selectedSection === "noise" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Bottom Blue Strip Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("stripText")}
                  onChange={(e) => updateSectionField("stripText", e.target.value)}
                  placeholder="Without the right guidance and structure, the entire process becomes [gold]emotionally exhausting.[/gold]"
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Noise & Solution Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("items", { title: "Problem Title", body: "Problem description...", solTitle: "Solution Title", solBody: "Solution description..." })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Card
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("items").map((it: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Card #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("items", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove card"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-rose-500">Problem Title</label>
                          <input
                            type="text"
                            value={it.title || ""}
                            onChange={(e) => handleArrayItemChange("items", idx, "title", e.target.value)}
                            className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-emerald-600">Solution Title</label>
                          <input
                            type="text"
                            value={it.solTitle || ""}
                            onChange={(e) => handleArrayItemChange("items", idx, "solTitle", e.target.value)}
                            className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-slate-400">Problem Body</label>
                          <textarea
                            rows={2}
                            value={it.body || ""}
                            onChange={(e) => handleArrayItemChange("items", idx, "body", e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-slate-400">Solution Body</label>
                          <textarea
                            rows={2}
                            value={it.solBody || ""}
                            onChange={(e) => handleArrayItemChange("items", idx, "solBody", e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "residential" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
            </>
          )}

          {selectedSection === "commercial" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
            </>
          )}

          {selectedSection === "clarity" && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Left Panel Heading (Confusion) *</label>
                <input
                  type="text"
                  value={getFieldValue("headingLeft")}
                  onChange={(e) => updateSectionField("headingLeft", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Panel Heading (Confidence) *</label>
                <input
                  type="text"
                  value={getFieldValue("headingRight")}
                  onChange={(e) => updateSectionField("headingRight", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Left Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageLeftUrl")}
                  onChange={(e) => updateSectionField("imageLeftUrl", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageRightUrl")}
                  onChange={(e) => updateSectionField("imageRightUrl", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Left Callout Box Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("subtitleLeft")}
                  onChange={(e) => updateSectionField("subtitleLeft", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Callout Box Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("subtitleRight")}
                  onChange={(e) => updateSectionField("subtitleRight", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Center Dial Title *</label>
                <input
                  type="text"
                  value={getFieldValue("centerTitle")}
                  onChange={(e) => updateSectionField("centerTitle", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Center Dial Subtitle *</label>
                <input
                  type="text"
                  value={getFieldValue("centerSubtitle")}
                  onChange={(e) => updateSectionField("centerSubtitle", e.target.value)}
                  className="w-full h-10 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-rose-500 tracking-wider">Confusion Points (Left)</h4>
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem("leftPoints", "New confusion point")}
                      className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-rose-100 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                  {getArrayValue("leftPoints").map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pt || ""}
                        onChange={(e) => handleArrayItemChange("leftPoints", idx, "", e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("leftPoints", idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-emerald-600 tracking-wider">Confidence Points (Right)</h4>
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem("rightPoints", "New confidence point")}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                  {getArrayValue("rightPoints").map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pt || ""}
                        onChange={(e) => handleArrayItemChange("rightPoints", idx, "", e.target.value)}
                        className="w-full h-slate-50 bg-slate-50 border border-slate-200 text-xs rounded-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("rightPoints", idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "siteVisits" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Perspective Strip Heading *</label>
                <input
                  type="text"
                  value={getFieldValue("stripHeading")}
                  onChange={(e) => updateSectionField("stripHeading", e.target.value)}
                  placeholder="Our Perspective"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Bottom Statement Strip Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("stripText")}
                  onChange={(e) => updateSectionField("stripText", e.target.value)}
                  placeholder="We don't just show you properties. We help you choose [gold]the right one.[/gold]"
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Site Visit Features / Highlights</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("features", "New feature highlight")}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {getArrayValue("features").map((ft: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ft || ""}
                        onChange={(e) => handleArrayItemChange("features", idx, "", e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 border border-slate-200 text-xs rounded-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("features", idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "services" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <input
                  type="text"
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Subheading *</label>
                <input
                  type="text"
                  value={getFieldValue("subheading")}
                  onChange={(e) => updateSectionField("subheading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Paragraph 1 *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("paragraph1")}
                  onChange={(e) => updateSectionField("paragraph1", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Paragraph 2 *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("paragraph2")}
                  onChange={(e) => updateSectionField("paragraph2", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Service Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("items", { title: "New Service", description: "Service details...", bullets: "Feature 1 | Feature 2 | Feature 3" })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Service Card
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("items").map((it: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Service #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("items", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Service Title"
                          value={it.title || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <textarea
                          rows={2}
                          placeholder="Service Description"
                          value={it.description || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "description", e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Bullets (separated by | )"
                          value={it.bullets || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "bullets", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "about" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <input
                  type="text"
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Subheading *</label>
                <input
                  type="text"
                  value={getFieldValue("subheading")}
                  onChange={(e) => updateSectionField("subheading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Quote Card Content *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("quote")}
                  onChange={(e) => updateSectionField("quote", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Stat Counter Badges</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("stats", { title: "Metric Title", value: "100+", subtitle: "Metric description" })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Stat
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("stats").map((st: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Stat #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("stats", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove stat"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Stat Value (e.g. 150+)"
                          value={st.value || ""}
                          onChange={(e) => handleArrayItemChange("stats", idx, "value", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Stat Label / Title"
                          value={st.title || ""}
                          onChange={(e) => handleArrayItemChange("stats", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle"
                          value={st.subtitle || ""}
                          onChange={(e) => handleArrayItemChange("stats", idx, "subtitle", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "whyChoose" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Why Choose Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("items", { title: "New Item", desc: "Item description..." })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Card
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("items").map((it: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Card #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("items", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove card"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={it.title || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Card Description"
                          value={it.desc || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "desc", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "developerNetwork" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
            </>
          )}

          {selectedSection === "independentEvaluation" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Evaluation Pillars / Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("pillars", { title: "Pillar Title", desc: "Pillar details..." })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Pillar
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("pillars").map((pil: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Pillar #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("pillars", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove pillar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Pillar Title"
                          value={pil.title || ""}
                          onChange={(e) => handleArrayItemChange("pillars", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Pillar Description"
                          value={pil.desc || ""}
                          onChange={(e) => handleArrayItemChange("pillars", idx, "desc", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "technologyAdvisory" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Right Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Badge Title *</label>
                <input
                  type="text"
                  value={getFieldValue("stripTitle")}
                  onChange={(e) => updateSectionField("stripTitle", e.target.value)}
                  placeholder="Powerful Technology."
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Badge Subtitle *</label>
                <input
                  type="text"
                  value={getFieldValue("stripSubtitle")}
                  onChange={(e) => updateSectionField("stripSubtitle", e.target.value)}
                  placeholder="Trusted People."
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Bottom Gold Strip Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("stripText")}
                  onChange={(e) => updateSectionField("stripText", e.target.value)}
                  placeholder="Smart Technology. Real Expertise. [gold]Better Decisions.[/gold]"
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Tech Feature Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("features", { title: "Feature Title", desc: "Feature details..." })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Feature Card
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("features").map((ft: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Feature #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("features", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove feature"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={ft.title || ""}
                          onChange={(e) => handleArrayItemChange("features", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Feature Description"
                          value={ft.desc || ""}
                          onChange={(e) => handleArrayItemChange("features", idx, "desc", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "yourJourney" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Background Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Bottom Pill Heading (What You Gain) *</label>
                <input
                  type="text"
                  value={getFieldValue("stripHeading")}
                  onChange={(e) => updateSectionField("stripHeading", e.target.value)}
                  placeholder="What You Gain at Every Step"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Journey Roadmap Steps</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("steps", { stepNumber: `0${getArrayValue("steps").length + 1}`, title: "New Step", desc: "Step details..." })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("steps").map((st: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Step #{st.stepNumber || idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("steps", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove step"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Step No. (e.g. 01)"
                          value={st.stepNumber || ""}
                          onChange={(e) => handleArrayItemChange("steps", idx, "stepNumber", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Step Title"
                          value={st.title || ""}
                          onChange={(e) => handleArrayItemChange("steps", idx, "title", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold md:col-span-2"
                        />
                        <textarea
                          rows={2}
                          placeholder="Step Description"
                          value={st.desc || ""}
                          onChange={(e) => handleArrayItemChange("steps", idx, "desc", e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 text-xs rounded-lg font-semibold md:col-span-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "testimonials" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <input
                  type="text"
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Subheading / Description *</label>
                <input
                  type="text"
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Paragraph (Desktop Only) *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("paragraph")}
                  onChange={(e) => updateSectionField("paragraph", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Featured Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Callout Quote Box Text *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("stripQuote")}
                  onChange={(e) => updateSectionField("stripQuote", e.target.value)}
                  placeholder="Guided by [gold]Intelligence.[/gold] Evaluated with [gold]Clarity.[/gold] Decided with [gold]Confidence.[/gold]"
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Client Reviews / Testimonials</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("items", { name: "Client Name", role: "Designation, Location", quote: "Client feedback quote...", rating: 5 })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Review
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("items").map((it: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-xl space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Review #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("items", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                          title="Remove review"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={it.name || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "name", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Client Role / Location"
                          value={it.role || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "role", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <textarea
                          rows={2}
                          placeholder="Review Quote"
                          value={it.quote || ""}
                          onChange={(e) => handleArrayItemChange("items", idx, "quote", e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 text-xs rounded-lg font-semibold md:col-span-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedSection === "faq" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <input
                  type="text"
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
            </>
          )}

          {selectedSection === "contact" && (
            <>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Heading Title *</label>
                <textarea
                  rows={2}
                  value={getFieldValue("heading")}
                  onChange={(e) => updateSectionField("heading", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Subheading *</label>
                <input
                  type="text"
                  value={getFieldValue("subheading")}
                  onChange={(e) => updateSectionField("subheading", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description Text *</label>
                <textarea
                  rows={3}
                  value={getFieldValue("description")}
                  onChange={(e) => updateSectionField("description", e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:bg-white focus:border-gold font-semibold leading-relaxed"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Image URL *</label>
                <input
                  type="text"
                  value={getFieldValue("imageUrl")}
                  onChange={(e) => updateSectionField("imageUrl", e.target.value)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Social Strip Heading *</label>
                <input
                  type="text"
                  value={getFieldValue("stripHeading")}
                  onChange={(e) => updateSectionField("stripHeading", e.target.value)}
                  placeholder="Follow Us On"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400">Social Strip Subtitle *</label>
                <input
                  type="text"
                  value={getFieldValue("stripDescription")}
                  onChange={(e) => updateSectionField("stripDescription", e.target.value)}
                  placeholder="Stay connected for real estate insights & expert perspectives."
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-sm rounded-xl outline-none focus:bg-white focus:border-gold font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Contact Detail Cards</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("contactItems", { label: "Label", value: "Value" })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Detail
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("contactItems").map((ci: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Detail #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("contactItems", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Label (e.g. Phone, Email)"
                          value={ci.label || ""}
                          onChange={(e) => handleArrayItemChange("contactItems", idx, "label", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={ci.value || ""}
                          onChange={(e) => handleArrayItemChange("contactItems", idx, "value", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Social Links</h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("socialLinks", { name: "Platform", handle: "@handle", url: "https://" })}
                    className="px-3 py-1.5 bg-gold text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-gold/90 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Social Link
                  </button>
                </div>
                <div className="space-y-3">
                  {getArrayValue("socialLinks").map((sl: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl space-y-2 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold uppercase tracking-wider">Social #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("socialLinks", idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Platform (e.g. Instagram)"
                          value={sl.name || ""}
                          onChange={(e) => handleArrayItemChange("socialLinks", idx, "name", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Handle (e.g. @propertyworks)"
                          value={sl.handle || ""}
                          onChange={(e) => handleArrayItemChange("socialLinks", idx, "handle", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="URL"
                          value={sl.url || ""}
                          onChange={(e) => handleArrayItemChange("socialLinks", idx, "url", e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-200 text-xs rounded-lg font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="h-12 px-8 bg-gold hover:bg-gold/90 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Save Section Changes
          </button>
        </div>
      </form>
    </div>
  );
}
