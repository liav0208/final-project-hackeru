const router = require("express").Router();
const searchController = require("../controller/searchController");

// get results from search bar limited to 5 users and 5 lessons
router.get("/", searchController.searchBox);

// return the result of the query was searched in the search bar
router.get("/find/:query", searchController.findLessonsByAuery);

module.exports = router;
