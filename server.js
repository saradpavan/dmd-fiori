const cds = require("@sap/cds");
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4004;

function postgresCredentialsFromEnv() {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    return {
      host: url.hostname,
      port: Number(url.port || 5432),
      database: url.pathname.slice(1),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
    };
  }

  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
  };
}

cds.env.requires.db = {
  ...cds.env.requires.db,
  kind: "postgres",
  credentials: postgresCredentialsFromEnv()
};

app.use("/project1", express.static(path.join(__dirname, "app", "project1", "webapp")));
app.get("/favicon.ico", (_req, res) => res.status(204).end());
app.get("/sap/bc/lrep/flex/data/:appId", (_req, res) => res.json({ changes: [] }));
app.get("/sap/bc/lrep/flex/settings", (_req, res) =>
  res.json({
    isKeyUser: false,
    isAtoAvailable: false,
    isProductiveSystem: true
  })
);
app.get("/", (_req, res) => res.redirect("/project1/index.html"));

cds.serve("all").in(app).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
