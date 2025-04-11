import express from "express";
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
	getRecommendationMovies,
	getPopularMovie,
	saveMovie,
	getSavedMovies
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/popular", getPopularMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/recommendations", getRecommendationMovies);
router.get("/:category", getMoviesByCategory);
router.post("/save", saveMovie);
router.get("/saved", getSavedMovies);

export default router;
