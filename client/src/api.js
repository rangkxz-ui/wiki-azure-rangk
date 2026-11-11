const BASE = import.meta.env.VITE_API_URL || "";

async function request(path) {
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`);
  } catch {
    throw new Error("No se pudo conectar con el servidor. Revisa tu conexión.");
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Error ${res.status}`);
  return body;
}

export const listArticles = (q = "") => request(`/articles${q ? `?q=${encodeURIComponent(q)}` : ""}`);
export const getArticle = (slug) => request(`/articles/${slug}`);
