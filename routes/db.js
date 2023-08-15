const db = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

db.get("/api/notes", (_req, res) =>
  fs.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf8",
    function (err, data) {
      let parsedData = JSON.parse(data);
      err
        ? res.status(500).json("Error with retrieving notes")
        : res.status(200).json(parsedData);
    }
  )
);

db.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const isSuccess = title && text;

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  const response = {
    status: "success",
    body: newNote,
  };

  fs.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf8",
    function (err, data) {
      let parsedData = JSON.parse(data);
      if (err) {
        res.status(500).json("Error with reading note");
      }
      try {
        parsedData.push(newNote);
        const updateData = JSON.stringify(parsedData, null, 2);

        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          updateData,
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  );
  isSuccess
    ? res.json(response)
    : res.status(500).json("Error in creating note");
});

db.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf8",
    function (err, data) {
      let parsedData = JSON.parse(data);
      if (err) {
        res.status(500).json("Error with reading note");
      }
      try {
        const deleteData = parsedData.filter((json) => json.id !== noteId);
        const updateData = JSON.stringify(deleteData, null, 2);

        deleteData > updateData
          ? res.json(`The note with the id:${noteId} was deleted!`)
          : res.status(500).json("Error in deleting note");
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          updateData,
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  );
});

module.exports = db;
