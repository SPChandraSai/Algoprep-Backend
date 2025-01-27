// fs module used to do anything that is possible with files and folder
// file -> read, write, update, delete
// folder -> content check, rename, delete
const fs=require("fs");

/***********to write into a file************/
let fileName="file.txt";
let content="Hello there, the Content added through nodejs";

//synchronous version
// console.log("```:adding content to the file");
// fs.writeFileSync(fileName, content);
// console.log("```:added content to the file");

//asynchronous version
// console.log("Before");

// fs.writeFile(fileName, content, function(err, data){
//     if(err){
//         console.log("something went wrong");
//     }
//     else{
//         console.log("file is written successfully");
//     }
// })

// console.log("After");

//read file
// const contentofFile=fs.readFileSync(fileName);
// console.log("content: "+contentofFile);

//update file
// fs.appendFileSync(fileName, "Appending my data");

/*****************folders****************/
// console.log("Creating folder");
// fs.mkdirSync("lecture-1");
// console.log("created folder");


//deletion of folder
// console.log("removing lecture-1");
// fs.rmdirSync("lecture-1");
// console.log("removed lecture-1");

