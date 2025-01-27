// fs module used to do anything that is possible with files and folder
// file -> read, write, update, delete
// folder -> content check, rename, delete
const fs=require("fs");

/***********to write into a file************/
let whereToCreateTheFile="file.txt";
let content="Hello there, the Content added through nodejs";

//synchronous version
// console.log("```:adding content to the file");
// fs.writeFileSync(whereToCreateTheFile, content);
// console.log("```:added content to the file");

//asynchronous version
console.log("Before");

fs.writeFile(whereToCreateTheFile, content, function(err, data){
    if(err){
        console.log("something went wrong");
    }
    else{
        console.log("file is written successfully");
    }
})

console.log("After");

