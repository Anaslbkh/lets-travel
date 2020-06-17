let express = require('express');
let app = express();
let mongoose = require('mongoose');
let postRouter = require('./routes/posts');
//package MULTER fro working width binary data such as pictures in that case
let multer = require('multer');
let cookieParser = require('cookie-parser');
//import CALLBACK_REQUEST CLASS FROM CALLBACK-REQUESTS.JS FILE
let CallbackRequestRouter = require('./routes/callback-requests');
//import emails CLASS emails.JS FILE
let emailsRouter = require('./routes/emails');
let userRouter = require('./routes/users');
const { use } = require('./routes/posts');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');

//to handel json data
app.use(express.json());

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true });

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({ storage: imageStorage }).single('imageFile'));


app.use(cookieParser());
app.use(express.static('public'));
app.use('/callback-requests', CallbackRequestRouter);
app.use('/posts', postRouter);
app.use('/emails', emailsRouter);
app.use('/users', userRouter);


app.get('/admin', (req, res) => {
    let token = req.cookies['auth-token'];
    if (token && auth.checkToken(token)) {
        res.render('admin');
    } else {
        res.redirect('/login');
    }
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/sight', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({ id: id });
    res.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.listen(3000, () => {
    console.log('listening 300')
})