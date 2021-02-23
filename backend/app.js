const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://max:zxcvbnm02@sandbox.kwp59.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(()=>{
    console.log('Connected to Database!');
  })
  .catch(()=>{
    console.log('Connection Failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS, PUT');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post Added Successfully!',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((docs)=>{
      res.status(200).json({
        message: 'Posts fetched sucessfully!',
        posts: docs
      });
    })
    .catch((err)=>{
      res.status(400).json(err);
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then((result)=>{
    console.log(result);
    res.status(200).json({message: 'Post Deleted!'});
  })
  .catch((err)=>{
    res.status(400).json(err);
  });
});

module.exports = app;
