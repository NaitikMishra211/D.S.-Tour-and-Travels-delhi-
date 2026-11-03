import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

async function startServer() {
  const app = express();
  app.disable("x-powered-by");

  const distPath = path.resolve(__dirname, "dist");
  const indexHtmlPath = path.join(distPath, "index.html");

  if (fs.existsSync(indexHtmlPath)) {
    // Production mode: serve compiled static assets from dist/
    app.use(express.static(distPath, { index: false }));

    app.get("*", (_req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    // Fallback if started before `npm run build`: mount Vite middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
