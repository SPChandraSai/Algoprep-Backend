const express = require("express");
const app = express();
const cookieParser=require("cookie-parser");

app.use(cookieParser());
app.get("/", function (req, res) {
    console.log("Get request received");
    //res -> cookie
    res.cookie("prevpage", "home", {
        maxAge: 1000 * 60 * 60 * 24, //storing for 24 hrs
    })
    //res is sent
    console.log(req.cookies),
    res.status(200).json({
        message: "received request on home page"
    })
})

app.get("/product", function (req, res){
    let messageStr="";
    if(req.cookies && req.cookies.prevpage){
        messageStr=`You visited ${req.cookies.prevpage} page before.`
    }
    else{
        messageStr="No previous page found."
    }
    res.status(200).json({
        message:messageStr
    })
})

app.get("/clearCookies", function(req, res){
    // clearing the cookie -> name of the cookie, path where it was created
    res.clearCookie('prevpage', {path:"/"});
    res.status(200).json({
        message:"i have cleared your cookie"
    })
})

//server -> run on a post
app.listen(3000, function () {
    console.log(`server is listening to port 3000`);
})