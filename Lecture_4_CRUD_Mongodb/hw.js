const mongoose = require("mongoose");

const MovieSchema={
    title:{
        type:String,
        required:[true, "name is required"],
    },
    desctiption:{
        type:String,
        required:[true, "description is required"],
    },
    releaseYear:{
        type:Number,
        required:[true, "release year si required"],
    },
    genre:{
        type:String,
        required:[true, "genre is required"],
        enum:["Drama", "Comedy", "Action", "Thriller", "Horror", "ROmance", "Sci-Fi", "Animation", "Documentry", "Other"],
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    cast:{
        type:String
    },
    director:{
        type:String
    },
    thumbnail:{
        type:String
    },
    trailerLink:{
        type:String
    },
    isPremium:{
        type:Boolean,
        default:false
    }
}

const movieSchema=new mongoose.Schema(MovieSchema);
const userSchema=mongoose.model("movie", movieSchema);
