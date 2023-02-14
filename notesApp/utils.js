const fs = require("fs");
const { title } = require("process");
// const chalk = require("chalk");

const getNotes = () => {
  console.log("Your notes....");
};
const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNote = notes.filter((note) => title === note.title);
  const duplicateNote = notes.find((note) => title === note.title);
  // console.log(!duplicateNote);
  if (duplicateNote === undefined) {
    notes.push({ title, body });
    saveNotes(notes);
  } else {
    console.log("Duplicate Title");
  }
  // console.log(notes);
};
const loadNotes = () => {
  try {
    const data = fs.readFileSync("notes.json");
    const dataJSON = data.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.log("in catch");
    return [];
  }
};
const saveNotes = (arr) => {
  const dataJSON = JSON.stringify(arr);
  fs.writeFileSync("notes.json", dataJSON);
};
const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNote = notes.filter((note) => title !== note.title);

  // console.log(!filteredNote);
  if (filteredNote.length < notes.length) {
    saveNotes(filteredNote);
  } else {
    console.log("Note not found");
  }
};
const listNote = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("No notes present");
  } else {
    notes.forEach((note) => {
      console.log(note.title);
    });
  }
};
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log("Title :", note.title);
    console.log("Body :", note.body);
  } else {
    console.log("note not found");
  }
};
module.exports = { getNotes, addNote, removeNote, listNote, readNote };
