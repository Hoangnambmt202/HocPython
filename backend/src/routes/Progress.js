const express = require('express');
const router = express.Router();
const ProgressController = require('../controllers/ProgressController');


router.post("/save", ProgressController.saveProgress);

module.exports = router;