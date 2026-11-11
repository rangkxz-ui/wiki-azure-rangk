# Diagramas con Mermaid

Las wikis de Azure DevOps renderizan diagramas Mermaid. Se escriben dentro de un bloque especial:

```text
::: mermaid
graph LR
  Cliente --> API --> BaseDeDatos
:::
```

Sirven para diagramas de flujo, secuencia y Gantt, y al ser texto quedan versionados con el resto de la wiki.
