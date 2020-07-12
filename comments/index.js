const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostById = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostById[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostById[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostById[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);

    console.log('Posted Comment')
});

app.post('/events', (req, res) => {
    console.log('received event', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
