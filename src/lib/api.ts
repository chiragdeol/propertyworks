// Frontend Client APIs - Communicates with Express Node.js Backend strictly live
const API_BASE = import.meta.env.VITE_API_URL || "";

// Helper for generic fetch requests with JSON parsing and error handling
async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Required for cookie-based admin session
    ...options,
  };

  const response = await fetch(`${API_BASE}${url}`, defaultOptions);
  
  // Verify content type is JSON, not HTML (which static host returns on missing routes)
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Invalid response content type: Received HTML/text instead of JSON for ${url}`);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// AUTHENTICATION APIs
export async function loginAdmin({ data }: { data: { password: string } }) {
  try {
    return await fetchAPI<{ success: boolean; error?: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to connect to authentication server" };
  }
}

export async function logoutAdmin() {
  return fetchAPI<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}

export async function checkSession() {
  try {
    return await fetchAPI<{ isAuthenticated: boolean }>("/api/auth/check");
  } catch {
    return { isAuthenticated: false };
  }
}

export async function resetAdminPassword({ data }: { data: { currentPassword?: string; newPassword: string; resetKey?: string } }) {
  try {
    return await fetchAPI<{ success: boolean; message?: string; error?: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reset password" };
  }
}

// PROJECTS CRUD APIs
export async function getProjects() {
  return fetchAPI<any[]>("/api/projects");
}

export async function getProjectById({ data }: { data: { id: string } }) {
  return fetchAPI<any>(`/api/projects/${data.id}`);
}

export async function saveProject({ data }: { data: { project: any } }) {
  return fetchAPI<{ success: boolean; project: any }>("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteProject({ data }: { data: { id: string } }) {
  return fetchAPI<{ success: boolean }>(`/api/projects/${data.id}`, {
    method: "DELETE",
  });
}

// ARTICLES (BLOG) CRUD APIs
export async function getArticles() {
  return fetchAPI<any[]>("/api/articles");
}

export async function getArticleBySlug({ data }: { data: { slug: string } }) {
  return fetchAPI<any>(`/api/articles/${data.slug}`);
}

export async function saveArticle({ data }: { data: { article: any } }) {
  return fetchAPI<{ success: boolean; article: any }>("/api/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteArticle({ data }: { data: { id: string } }) {
  return fetchAPI<{ success: boolean }>(`/api/articles/${data.id}`, {
    method: "DELETE",
  });
}

// GLOBAL CTA SETTINGS APIs
export async function getGlobalSettings() {
  return fetchAPI<any>("/api/settings");
}

export async function saveGlobalSettings({ data }: { data: { settings: any } }) {
  return fetchAPI<{ success: boolean; settings: any }>("/api/settings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// LEADS APIs
export async function getLeads() {
  return fetchAPI<any[]>("/api/leads");
}

export async function submitLead({ data }: { data: { lead: any } }) {
  return fetchAPI<{ success: boolean; lead: any }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// MEDIA APIs
export async function getMediaLibrary() {
  return fetchAPI<any[]>("/api/media");
}

export async function uploadMedia({ data }: { data: { file: string; filename: string } }) {
  return fetchAPI<{ success: boolean; media: any }>("/api/media/upload", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
