const express=require("express");
// const { app, createPost, getAllPostsHandler, getPostById, updatePost, deletePost } = require("../Lecture_2_Express_api");
const app=express();

// -> /posts, post -> createPost
function beforeFn(req, res, next){
    console.log("Before fn called");
    console.log("req.body", req.body);
    next();
}

function AfterFn(req, res){
    console.log("After fn called");
    console.log("req.body", req.body);
    res.status(200).json({
        message:"response send ",
        body: req.body
    })
}

app.post("/posts", beforeFn);
app.use(express.json());
app.post("/posts", AfterFn);

// app.post("/", function(req, res){
//     console.log("Hello");
//     res.status(200).json({
//         message: "/route"
//     })
// })

//post a request
//getAll request
// app.get("/posts", getAllPostsHandler);
//get a post
// app.get("/posts/:postId", getPostById);
//update a post. Isme banda id btayega vaise but hum body se id lenge islay syntax me id nhi le rehe.
// app.patch("/posts", updatePost)
//delete a post
// app.delete("/posts/:postId", deletePost)

app.listen(3000, function(){
    console.log("Server running at port 3000");
})