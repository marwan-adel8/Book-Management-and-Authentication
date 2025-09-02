const router = require("express").Router();
const bookController = require("../controllers/books.controller.js");
const authentication = require("../middlewares/auth");

router.post("/api/books", authentication, bookController.addOneBook); // private add new booh
router.get("/api/books", authentication, bookController.getAllbooks); //private get all books
router.delete("/api/books/:id", authentication, bookController.deleteOneBook); //private delete one book
router.put("/api/books/:id", authentication, bookController.editOneBook); //private update one book

module.exports = router; // Export the router
