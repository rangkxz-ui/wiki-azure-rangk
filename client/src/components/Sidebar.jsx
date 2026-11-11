export default function Sidebar({ articles, query, onQuery, current, status, onRetry }) {
  const sections = [...new Set(articles.map((a) => a.section))];
  return (
    <nav className="sidebar" aria-label="Páginas de la wiki">
      <a className="brand" href="#">Wiki Azure</a>
      <input
        type="search"
        placeholder="Buscar en la wiki"
        aria-label="Buscar en la wiki"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
      {status === "error" && (
        <p className="note">No se pudo cargar el índice. <button onClick={onRetry}>Reintentar</button></p>
      )}
      {status === "ready" && articles.length === 0 && (
        <p className="note">Sin resultados para “{query}”. Prueba con otra palabra.</p>
      )}
      {sections.map((s) => (
        <div key={s} className="group">
          <h2>{s}</h2>
          <ul>
            {articles.filter((a) => a.section === s).map((a) => (
              <li key={a.slug}>
                <a href={`#${a.slug}`} aria-current={a.slug === current ? "page" : undefined}>{a.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
