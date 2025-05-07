const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authMiddleware} = require('../middleware/authMiddleWare');


router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser,authMiddleware);
router.post('/logout', UserController.logoutUser);
router.put('/update',authMiddleware,UserController.updateUser);
router.delete("/delete/:id", authMiddleware, UserController.deleteUser);
router.get('/getAll', authMiddleware, UserController.getAllUser);
router.get('/getUserByRole', authMiddleware, UserController.getUserByRole);
router.get('/me', authMiddleware, UserController.getDetailUser);
router.post("/refresh-token", UserController.refreshToken);
router.get("/search", UserController.searchUsers);
module.exports = router;