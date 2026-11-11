const router = require("express").Router();
const service = require("../services/articleService");
const HttpError = require("../utils/HttpError");

router.get("/", (req, res) => {
  const { q } = req.query;
  if (q !== undefined && (typeof q !== "string" || q.length > 100)) {
    throw new HttpError(400, "El parámetro 'q' debe ser texto de hasta 100 caracteres");
  }
  res.json(service.list(q));
});

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  if (!/^[a-z0-9-]+$/.test(slug)) throw new HttpError(400, "Slug inválido");
  const article = service.get(slug);
  if (!article) throw new HttpError(404, `No existe el artículo '${slug}'`);
  res.json(article);
});

module.exports = router;
