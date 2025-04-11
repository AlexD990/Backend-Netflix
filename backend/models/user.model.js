import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "",
	},
	searchHistory: {
		type: Array,
		default: [],
	},
	savedMovies: {
		type: [String], // Array of movie IDs as strings
		default: [],
	},
});

export const User = mongoose.model("User", userSchema);
