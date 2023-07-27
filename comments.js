//Create web server with express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');

//Read comments.json file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Get all comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            res.json(comments);
        }
    });
});

//Create a new comment
app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const newComment = {
                id: Date.now(),
                body: req.body.body,
                postId: req.body.postId
            };
            comments.push(newComment);
            fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(newComment);
                }
            });
        }
    });
});

//Update a comment
app.put('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const comment = comments.find((comment) => comment.id === id);
            if (comment) {
                comment.body = req.body.body;
                fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(comment);
                    }
                });
            } else {
                res.status(404).json({ message: `Comment with id ${id} not found` });
            }
        }
    });
});

//Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    fs.readFile(commentsPath, 'utf8', (err
