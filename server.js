const cds = require("@sap/cds");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4004;

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
