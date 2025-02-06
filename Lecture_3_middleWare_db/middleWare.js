const express = require("express");
// const { app, createPost, getAllPostsHandler, getPostById, updatePost, deletePost } = require("../Lecture_2_Express_api");
const app = express();

// -> /posts, post -> createPost
function beforeFn(req, res, next) {
    console.log("Before fn called");
    // console.log("req.body", req.body);
    const length = Object.keys(req.body).length;
    if (length > 0 && req.body.name && req.body.userId) {
        const fullNameArr = req.body.name.split(" ");
        req.body.firstName = fullNameArr[0];
        req.body.lastName = fullNameArr[1];
        next();
    }
    else {
        res.status(400).json({
            message: "bad request"
        })
    }
}

function AfterFn(req, res) {
    console.log("After fn called");
    console.log("req.body", req.body);
    res.status(200).json({
        message: "response send ",
        body: req.body
    })
}

app.post(express.json());
app.patch(express.json());
app.post("/posts", beforeFn);
app.post("/posts", AfterFn);

app.use(function (req, res) {
    res.status(404).json({
        message: "404 page not found"
    })
})

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

app.listen(3000, function () {
    console.log("Server running at port 3000");
})