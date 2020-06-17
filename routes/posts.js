//get schema model and class post from posts.js
let Post = require('../models/posts').Post;
//package uniqid to give each post an uniqId
let uniqid = require('uniqid')
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    let posts = await Post.find();
    res.send(posts);
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let posts = await Post.findOne({ id: id });
    res.send(posts);
})
router.put('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.updateOne({ id: id }, req.body);
    res.send('updated');
})
router.post('/', authMiddleware, async (req, res) => {
    let reqBody = req.body;
    let imgPath;
    if (reqBody.ImageUrl) {
        imgPath = reqBody.ImageUrl
    }
    else {
        imgPath = req.file.path.substring(req.file.path.indexOf('\\'), req.file.path.length);
    }
    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })

    await newPost.save();
    res.send('Created');
})
router.delete('/:id', authMiddleware, async (req, res) => {
    let id = req.params.id;
    await Post.deleteOne({ id: id });
    res.send('Deleted');
})
module.exports = router;