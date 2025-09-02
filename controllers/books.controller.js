const bookModel = require("../models/books.model.js");



exports.getAllbooks = async function (req, res) {
    try {
        const books = await bookModel.find();
        res.json({message:"Done", data: books});
    }catch (err) {
      res.status(400).send({
      message: err,
    });
 }
};

exports.addOneBook = async function (req, res) {
    try {
        const createBook = await bookModel.create(req.body);
        res.json({message:"Book Createde", data: createBook});

    }catch (err) {
      res.status(400).send({
      message: err,
    });
 }
};

exports.deleteOneBook = async function (req, res) {
    try {
        if(req.user.role === "Admin"){
             await bookModel.findByIdAndDelete(req.params.id);
        res.json({message:"Book Deleted" ,data: []});

        }else{
            res.status(403).send({
      message:"you don't have permission to delete this book" ,
    });
        }
       
    }catch (err) {
      res.status(400).send({
      message: err,
    });
 }
};





exports.editOneBook = async function (req, res) {
    try {
        if (req.user.role === "Admin") {
            const updatedBook = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            
            if (!updatedBook) {
                return res.status(404).json({ message: "Book not found", data: [] });
            }

            res.json({ message: "Book Updated", data: updatedBook });

        } else {
            res.status(403).send({
                message: "You don't have permission to update this book",
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
};