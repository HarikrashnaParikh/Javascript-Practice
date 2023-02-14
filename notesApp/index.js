const fs = require("fs");
const yargs = require("yargs");
const {
  getNotes,
  addNote,
  removeNote,
  listNote,
  readNote,
} = require("./utils.js");
// getNotes();

// fs.appendFileSync("notes.txt", "this File was appended");
// const command = process.argv[2];
yargs.command({
  command: "add",
  description: "Adding Note",
  builder: {
    title: {
      description: "Title of note",
      demandOption: true,
      type: "string",
    },
    body: {
      description: "Add body of note here",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    return addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  description: "Removing Note",
  builder: {
    title: {
      description: "Title of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    return removeNote(argv.title);
  },
});
yargs.command({
  command: "list",
  description: "listing Note",
  handler: () => {
    return listNote();
  },
});
yargs.command({
  command: "read",
  description: "Reading Note",
  builder: {
    title: {
      description: "Title of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    return readNote(argv.title);
  },
});
yargs.parse();
//console.log(yargs.argv);
// if (command === "add"){
//     console.log("Adding")
// }
