const userController = require("../controllers/users.controller"); // Import the user controller
const router = require("express").Router();


router.post("/api/users/register", userController.register); //call the controller
router.post("/api/users/login", userController.login); //call the controller

module.exports = router; // Export the router