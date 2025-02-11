const express=require("express");
const app=express();

//server -> run on a post
app.listen(3000, function(){
    console.log(`server is listening to port 3000`);
})