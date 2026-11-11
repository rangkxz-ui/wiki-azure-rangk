import { useCallback, useEffect, useState } from "react";
import { getArticle, listArticles } from "./api";
import Sidebar from "./components/Sidebar.jsx";
import Article from "./components/Article.jsx";

const DEFAULT = "introduccion";
const slugFromHash = () => window.location.hash.slice(1) || DEFAULT;

export default function App() {
  const [slug, setSlug] = useState(slugFromHash);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState({ status: "loading", data: [] });
  const [article, setArticle] = useState({ status: "loading" });

  useEffect(() => {
    const onHash = () => setSlug(slugFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const loadIndex = useCallback(() => {
    const t = setTimeout(() => {
      listArticles(query)
        .then((data) => setIndex({ status: "ready", data }))
        .catch(() => setIndex({ status: "error", data: [] }));
    }, 250);
    return () => clearTimeout(t);
  }, [query]);
  useEffect(loadIndex, [loadIndex]);

  const loadArticle = useCallback(() => {
    setArticle({ status: "loading" });
    getArticle(slug)
      .then((data) => setArticle({ status: "ready", data }))
      .catch((e) => setArticle({ status: "error", error: e.message }));
  }, [slug]);
  useEffect(loadArticle, [loadArticle]);

  return (
    <div className="layout">
      <Sidebar
        articles={index.data}
        query={query}
        onQuery={setQuery}
        current={slug}
        status={index.status}
        onRetry={() => setQuery((q) => q + "")}
      />
      <main>
        <Article state={article} onRetry={loadArticle} />
      </main>
    </div>
  );
}
