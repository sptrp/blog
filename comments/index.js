const express = require('express');
const { randomBytes } =  require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const commentsPostById = {

};

app.get('/posts:/id/comments', (req, res) => {
    res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsPostById[req.params.id] || [];

    comments.push({ id: commentId, content });

    res.status(201).send(posts[id]);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
