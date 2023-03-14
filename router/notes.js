//imports the router
const notes = require('express').Router();
// imports the ID generator
const { v4: uuidv4 } = require('uuid');
// imports FS functions
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new note insertion
notes.post('/', (req, res) => {

  const { note_id, title, text } = req.body;
  // generates a new note with a custom id
  if (req.body) {
    const newNote = {
      note_id: uuidv4(),
      title,
      text,
    };
    // appends a new note to the DB
    readAndAppend(newNote, './db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});
//exports notes
module.exports = notes;
