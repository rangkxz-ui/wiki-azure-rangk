const test = require("node:test");
const assert = require("node:assert");
const app = require("../src/app");

let server, base;
test.before(() => new Promise((r) => {
  server = app.listen(0, () => { base = `http://localhost:${server.address().port}`; r(); });
}));
test.after(() => server.close());

test("lista artículos", async () => {
  const data = await (await fetch(`${base}/api/articles`)).json();
  assert.ok(data.length >= 5);
});
test("busca sin distinguir tildes", async () => {
  const data = await (await fetch(`${base}/api/articles?q=jerarquia`)).json();
  assert.ok(Array.isArray(data));
});
test("devuelve un artículo", async () => {
  const res = await fetch(`${base}/api/articles/code-wiki`);
  assert.strictEqual(res.status, 200);
  assert.ok((await res.json()).content.length > 0);
});
test("404 si no existe", async () => {
  assert.strictEqual((await fetch(`${base}/api/articles/nada`)).status, 404);
});
test("400 si el slug es inválido", async () => {
  assert.strictEqual((await fetch(`${base}/api/articles/MAL_slug`)).status, 400);
});
