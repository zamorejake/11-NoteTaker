const express = require("express");
const db = require("./routes/db.js");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();
app.use(express.json());
app.use(db);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (_req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
