const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nfmi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err));



/**************************************************/

//user create -> Jio cinemas -> set of rules below which they should follow to obtain the desird thing.
const schemaRules = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6,
        //custom validation
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        //these are the only possible values for the role
        enum: ["user", "admin", "feed curator", "moderator"],
        default: "user"
    }
}

const userSchema = new mongoose.Schema(schemaRules);

//final touch point -> means whatever changes u make will go through schemaRules.
const UserModel = mongoose.model("user", userSchema);

/**
 * create -> UseModel.create(object);
 * 
 */
app.use(express.json());

app.post("/user", async function (req, res) {
    try {
        const userObject = req.body;
        const user = await UserModel.create(userObject);
        // send back the created user with status 201 (created)
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error",
            error: err,
        })
    }
})

app.listen(3000, function () {
    console.log("server started on port 3000")
})






