const express = require("express");
const router = express.Router();
const controler = require("../controler/controler.books");

// Step 4: Set Up GET Route to Fetch All Books
router.get("/", controler.getAllBooks);

// Step 5: Set Up GET Route to Fetch a Book by ID
router.get("/:id", controler.getBookById);

// Step 6: Set Up POST Route to Add a New Book
router.post("/", controler.createBooks);

//  Step 7: Set Up DELETE Route to Remove a Book by ID
router.delete("/:id", controler.deleteBooks);

module.exports = router;
