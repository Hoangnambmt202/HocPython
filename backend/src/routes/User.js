const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authMiddleware} = require('../middleware/authMiddleWare');


router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update',authMiddleware,UserController.updateUser);
router.delete("/delete/:id", authMiddleware, UserController.deleteUser);
router.get('/getAll', authMiddleware, UserController.getAllUser);
router.get('/me', authMiddleware, UserController.getDetailUser);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;