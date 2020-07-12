const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostById = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostById[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostById[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostById[req.params.id] = comments;

    res.status(201).send(comments);

    console.log('Posted Comment')
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
