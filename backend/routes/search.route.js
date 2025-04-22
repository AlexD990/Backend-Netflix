import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchMovie,
	searchPerson,
	searchTv,
	getSavedMovies,
	saveMovie,
	removeSavedMovie
} from "../controllers/search.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

router.get("/saved", getSavedMovies);
router.post("/save", saveMovie);

router.delete("/saved-movies/:id", protectRoute, removeSavedMovie);

export default router;
