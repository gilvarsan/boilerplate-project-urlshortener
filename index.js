require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { validateURL, redirectUrlShort } = require("./funciones.js");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
// Configuración del middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async function (req, res) {
  const respuesta = await validateURL(req.body.url);
  res.json(respuesta);
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const { short_url } = req.params;
  redirectUrlShort(res, short_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
