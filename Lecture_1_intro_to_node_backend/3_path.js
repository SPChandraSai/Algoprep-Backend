const path=require("path");
const fs=require("fs");
/*************global variables************/

// console.log("path of current folder: ", __dirname);
// console.log("path of current file: ", __filename);
// console.log("Processes", process);

//global is similar to window object of a browser
console.log("global", global);

console.log("`````````````````````````````````")
// const directoryPath=path.dirname(__filename);
// console.log("directoryName: ", directoryPath);

// const fileExt=path.extname(__filename);
// console.log("File Ext: ", fileExt);

const pathtoMyfile=path.join(__dirname, "../", "../", "CSS", "css.notes.md");
console.log("pathtoMyFile: ",pathtoMyfile);
fs.writeFileSync(pathtoMyfile, "#CSS notes");



