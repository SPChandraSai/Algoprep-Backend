const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

/********************db connection*********************/
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nfmi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err));



/**********************user module*********************/

//user create -> Jio cinemas -> set of rules below which they should follow to obtain the desird thing.
const schemaRules = {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password should be atleast of 6 length"],
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6,
        //custom validation
        validate: [function () {
            return this.password == this.confirmPassword;
        }, "password should be equal to confirm password"]
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

/**************************hooks in mongodb**************************/
//this will not let confirmPassword to store itself in the db
userSchema.pre("save", function (next) {
    console.log("pre save was called");
    this.confirmPassword = undefined;
    next();
})
userSchema.post("save", function () {
    console.log("post save was called");
    this.__v = undefined;
    this.password = undefined;
})
//final touch point -> means whatever changes u make will go through schemaRules.
const UserModel = mongoose.model("User", userSchema);

/**
 * create -> UseModel.create(object);
 * getAll -> Usermodel.find(); 
 * //if we didnt pass anything in the find func then it will return all the available data.
 * getById -> Usermodel.findById
 * deleteById -> usermodel.deleteById
 * 
 */
/**************handler functions*************/
const createUser = async function (req, res) {
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
}

const getAllUser = async (req, res) => {
    try {
        const user = await UserModel.find();
        //if user is present -> send the resp
        if (user.length != 0) {
            res.status(200).json({
                message: user
            })
            //if it's not there then send user not found
        }
        else {
            res.status(404).json({
                message: "did not get any user"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        //if user is present -> send the resp
        if (user) {
            res.status(200).json({
                message: user
            })
            //if it's not there then send user not found
        }
        else {
            res.status(404).json({
                message: "did not get the user"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (user === null) {
            res.status(404).json({
                status: "success",
                message: "user does not exist",
            })
        }
        else {
            res.status(200).json({
                status: "success",
                message: "user is deleted",
                user: user
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

/**************routes**************/
app.use(express.json());

app.post("/user", createUser);

app.get("/user", getAllUser);

app.get("/user/:id", getUser);

app.delete("/user/:id", deleteUser);

/******************auth methods and routes***************/
app.post("/login", loginHandler);
app.post("/signup", signupHandler);
app.use(protectedRoute);
app.get("/profile", profileHandler);

app.listen(3000, function () {
    console.log("server started on port 3000")
})
