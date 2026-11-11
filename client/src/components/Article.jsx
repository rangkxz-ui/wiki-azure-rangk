import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Article({ state, onRetry }) {
  if (state.status === "loading") return <p className="note">Cargando página…</p>;
  if (state.status === "error")
    return (
      <div className="note">
        <p>{state.error}</p>
        <button onClick={onRetry}>Reintentar</button>
      </div>
    );
  return (
    <article>
      <p className="crumb">{state.data.section}</p>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{state.data.content}</ReactMarkdown>
      </div>
    </article>
  );
}
