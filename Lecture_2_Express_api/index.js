const express = require("express");
const fs = require("fs");
const app = express();
exports.app = app;

console.log("Before");
const content = fs.readFileSync("posts.json", "utf-8");
const jsonPosts = JSON.parse(content);

//req->request & res->response
function getAllPostsHandler(req, res) {
    try {
        console.log("Received get Request");
        res.status(200).json(jsonPosts);
    }
    catch (err) {
        res.status(200).json({
            message: "Internal server error"
        })
    }
}
exports.getAllPostsHandler = getAllPostsHandler;

function getPostById(req, res) {
    try {
        const postid = req.params.postId;
        console.log("postId", postid);
        const postsArr = jsonPosts.posts
        for (let i = 0; i < postsArr.length; i++) {
            if (postsArr[i].id == postid) {
                return res.status(200).json({
                    post: postsArr[i]
                })
            }
        }
        res.status(404).json({
            post: "post not found"
        })
    }
    catch (err) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
exports.getPostById = getPostById;

function createPost(req, res) {
    try {
        console.log("req.body", req.body);
        const postsArr = jsonPosts.posts;
        postsArr.push(req.body);
        res.status(201).json({
            message: "post created"
        })
    }
    catch (err) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
exports.createPost = createPost;

function updatePost(req, res) {
    try {
        console.log("req.body", req.body);
        const postsArr = jsonPosts.posts;
        postsArr.push(req.body);
        res.status(201).json({
            message: "pushed successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
exports.updatePost = updatePost;

function deletePost(req, res) {
    try {
        const postid = req.params.postId;
        console.log("postId", postid);
        const postsArr = jsonPosts.posts
        for (let i = 0; i < postsArr.length; i++) {
            if (postsArr[i].id == postid) {
                return res.status(200).json({
                    post: postsArr.splice(i, 1)
                })
            }
        }
        res.status(404).json({
            post: "post not found"
        })
    }
    catch (err) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
exports.deletePost = deletePost;

app.use(express.json());
//post a request
app.post("/posts", createPost);
//getAll request
app.get("/posts", getAllPostsHandler);
//get a post
app.get("/posts/:postId", getPostById);
//update a post. Isme banda id btayega vaise but hum body se id lenge islay syntax me id nhi le rehe.
app.patch("/posts", updatePost)
//delete a post
app.delete("/posts/:postId", deletePost)

//server start
app.listen(3000, function () {
    console.log("server is running at port 3000");
})
console.log("After");





