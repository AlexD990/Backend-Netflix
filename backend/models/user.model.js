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

	id: {
		type: Number,
	},

	title: {
		type: String,

	},

	posterPath: {
		type: String,
	},
	savedMovies: {
		type: Array,
		default: [],
	},
});

export const User = mongoose.model("User", userSchema);
