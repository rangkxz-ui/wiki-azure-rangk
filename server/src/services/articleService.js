const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "../../content");

const ARTICLES = [
  { slug: "introduccion", section: "Primeros pasos", title: "Qué es una wiki de Azure DevOps", summary: "Visión general de las wikis y para qué sirven." },
  { slug: "project-wiki", section: "Tipos de wiki", title: "Project Wiki", summary: "La wiki del proyecto, respaldada por un repositorio Git oculto." },
  { slug: "code-wiki", section: "Tipos de wiki", title: "Code Wiki", summary: "Publica Markdown que ya vive en tus repositorios." },
  { slug: "markdown-basico", section: "Escribir páginas", title: "Markdown básico", summary: "Sintaxis esencial para dar formato." },
  { slug: "orden-de-paginas", section: "Escribir páginas", title: "Orden de páginas con .order", summary: "Cómo controlar el orden del árbol de páginas." },
  { slug: "diagramas-mermaid", section: "Escribir páginas", title: "Diagramas con Mermaid", summary: "Diagramas dentro de la página, sin imágenes." },
  { slug: "buenas-practicas", section: "Primeros pasos", title: "Buenas prácticas", summary: "Cómo mantener una wiki útil con el tiempo." },
];

const readContent = (slug) => fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function list(query) {
  if (!query) return ARTICLES;
  const q = normalize(query.trim());
  return ARTICLES.filter((a) =>
    normalize(`${a.title} ${a.summary} ${readContent(a.slug)}`).includes(q)
  );
}

function get(slug) {
  const meta = ARTICLES.find((a) => a.slug === slug);
  return meta ? { ...meta, content: readContent(slug) } : null;
}

module.exports = { list, get };
