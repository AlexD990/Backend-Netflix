import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchMovie,
	searchPerson,
	searchTv,
	getSavedMovies,
	saveMovie
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

router.get("/saved", getSavedMovies);
router.post("/:id/save", saveMovie);

export default router;
