const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("short"));
app.use(express.urlencoded({ extended: false }));

let notes = [];

app.get("/", (req, res) => {
  return res.json({ ok: true, message: "Hello World!" });
});

app.get("/notes", (req, res) => {
  return res.json({ ok: true, data: notes });
});

app.post("/notes", (req, res) => {
  const { title, body } = req.body;

  notes.push({ title, body });

  return res.json({ ok: true });
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  notes = notes.map((note, idx) => ({
    ...note,
    title: idx == id ? title : note.title,
    body: idx == id ? body : note.body,
  }));

  return res.json({ ok: true });
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((_, idx) => idx != id);
  return res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
