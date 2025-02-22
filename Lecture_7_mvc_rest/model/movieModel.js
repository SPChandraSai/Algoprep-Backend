const mongoose = require("mongoose");

/*************************movie Module***********************/
const schemaRules = {
    title: { type: String, required: [true, "title isrequired"] },
    description: { type: String, required: [true, "description is required"] },
    releaseYear: { type: Number, required: [true, "release year is required"] },
    genre: {
        type: String,
        required: [true,"genre is required"],
        enum: ['Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Romance', 'Sci-Fi', 'Animation', 'Documentary', 'Other']
    },
    rating: { type: Number, min: [1,"rating can't be less than 1"], max: [5,"rating can't be more than 5"] },
    cast: [String],
    director: String,
    trailerLink: String,
    isPremium: { type: Boolean, default: false }
}

const movieSchema = new mongoose.Schema(schemaRules);

//final touch point -> means whatever changes u make will go through schemaRules.
const MovieModel = mongoose.model("Movie", movieSchema);
//default expost
module.exports = MovieModel;