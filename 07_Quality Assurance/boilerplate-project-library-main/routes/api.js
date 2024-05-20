/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require('../models').Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        const books = await Book.find({});

        if (!books) {
          res.json([]);
          return;
        }

        const formatData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length,
          };
        });

        res.json(formatData);
        return;
      } catch (error) {
        res.json([]);
      }
    })
    
    .post(async (req, res) => {
      let title = req.body.title;

      if (!title) {
        res.send("missing required field title");
        return;
      }

      const newBook = new Book({ title, comments: [] });

      try {
        const book = await newBook.save();
        res.json({ title: book.title, _id: book._id });
      } catch (error) {
        res.send("there was an error saving");
      }
    })
    
    .delete(async (req, res) => {
      try {
        const deleted = await Book.deleteMany();
        console.log("deleted :>> ", deleted);
        res.send("complete delete successful");
      } catch (error) {
        res.send("error");
      }
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      
      try {
        const book = await Book.findById(bookid);
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (error) {
        res.send("no book exists");
      }
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        res.send("missing required field comment");
        return;
      }

      try {
        let book = await Book.findById(bookid);
        book.comments.push(comment);
        book = await book.save();
        res.json({
          comments: book.comments,
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        });
      } catch (error) {
        res.send("no book exists");
      }
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      
      if (!bookid) {
        res.send("no book exists");
        return;
      }

      try {
        const deleted = await Book.findByIdAndDelete(bookid);
        console.log("deleted :>> ", deleted);
        if (!deleted) throw new Error("no book exists");
        res.send("delete successful");
      } catch (error) {
        res.send("no book exists");
      }
    });
  
};