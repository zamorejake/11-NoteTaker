const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

db.get('/api/notes', (_req, res) =>
  fs.readFile(path.join(__dirname, '../db/db.json'),'utf8', function(err, data){
      let parsedData = JSON.parse(data);
      err ? res.status(500).json("Error with retrieving notes") : res.status(200).json(parsedData);
})
);

module.exports = db;
