# Wiki Azure

Wiki sobre las wikis de Azure DevOps (Project Wiki, Code Wiki, Markdown, `.order`, Mermaid).
Frontend en **React + Vite**, backend en **Node.js + Express**.

## Estructura

```
api/            Punto de entrada serverless para Vercel
server/src/     API Express (app, rutas, servicios, middleware)
server/content/ Páginas de la wiki en Markdown
server/tests/   Pruebas de la API
client/src/     App React (componentes, estilos, cliente API)
```

## Instalación

```bash
npm install
npm --prefix client install
cp .env.example .env      # en Windows: copy .env.example .env
```

## Ejecución

```bash
npm run dev     # API en :4000 y web en http://localhost:5173
npm test        # pruebas de la API
npm run build   # build de producción en client/dist
```

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servidor |
| GET | `/api/articles?q=texto` | Lista o busca páginas |
| GET | `/api/articles/:slug` | Devuelve una página |

Los errores responden `{ "error": "mensaje" }` con el código HTTP correspondiente (400, 404, 500).

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New > Project**, importa el repo. `vercel.json` ya define el build y las rutas.
3. Opcional: define `CORS_ORIGIN` con la URL final en *Environment Variables*.

## Agregar páginas

Crea `server/content/mi-pagina.md` y añade su entrada en el arreglo `ARTICLES` de `server/src/services/articleService.js`.
