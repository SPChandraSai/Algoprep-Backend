const mongoose = require("mongoose");

/*************************user Module***********************/
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
//default expost
module.exports = UserModel;