const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/create", CategoryController.createCategory);
router.get("/all", CategoryController.getCategories);

module.exports = router;
