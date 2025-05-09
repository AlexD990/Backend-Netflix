import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
	const { query } = req.params;
	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchMovie(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchTv(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;

	id = parseInt(id);

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSavedMovies(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.savedMovies });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function saveMovie(req, res) {
	const { id, title, posterPath } = req.body; // Get the movie details from the request body

	try {
		// Check if all required fields are present
		if (!id || !title || !posterPath) {
			return res.status(400).json({ success: false, message: "id, title and poster are required" });
		}

		// Check if the movie is already saved
		const user = await User.findById(req.user._id);
		const isMovieAlreadySaved = user.savedMovies.some((movie) => movie.id === id);

		if (isMovieAlreadySaved) {
			return res.status(400).json({ success: false, message: "Movie is already saved" });
		}

		// Add the movie to the savedMovies array
		user.savedMovies.push({ id, title, posterPath });
		await user.save();

		res.status(200).json({ success: true, message: "Movie saved successfully", savedMovies: user.savedMovies });
	} catch (error) {
		console.log("Error in saveMovie controller:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeSavedMovie(req, res) {
	const { id } = req.params; // Get the movie ID from the request parameters

	try {
		// Remove the movie from the savedMovies array
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				savedMovies: { id: parseInt(id) },
			},
		});

		res.status(200).json({ success: true, message: "Movie removed from saved movies" });
	} catch (error) {
		console.log("Error in removeSavedMovie controller:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}