//Install express server
const express = require('express');
const path = require('path');

const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

var flatfile = require('flat-file-db');
var db = flatfile('./tmp/mydatabase.db');

app.use(cors());

// ToDo: make proper database
var data = [
  {
    id: 0,
    title: 'asd',
    poster: 'asd',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    likes: 100,
    text: 'Lorem anim cillum ut qui labore anim in culpa ullamco ad eu anim ullamco laboris.',
  },

  {
    id: 1,
    title: 'qwe',
    poster: 'qwe',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    likes: 12,
    text: 'Voluptate irure minim quis deserunt. Anim laboris ea consequat est id commodo laborum.',
  },
]

db.put(0, { data })

var comments = [
  {
    id: 0,
    comments: ['Aliqua Lorem id enim non sint cillum nisi et aliqua ipsum anim ad eiusmod et.', 'Nisi officia laborum aute cillum eiusmod magna et quis reprehenderit aliqua magna voluptate deserunt.'],
  },
  {
    id: 1,
    comments: ['Velit est eu labore cillum est officia consequat fugiat fugiat magna do fugiat.', 'Cillum fugiat adipisicing voluptate duis aute ut do do sit.'],
  }
]

db.put(1, { comments })

var users = [
  {
    username: 'Jaska',
    password: 'Jaska',
    token: '',
  }
]

db.put(2, { users })

/**
 * Gets the current posts from datababe
 */
app.get('/posts', function (req, res) {
  res.send(db.get(0))
})

/**
 * Gets comments pased on id
 */
app.get('/posts/:id([0-9]+)', function (req, res) {
  const com = db.get(1)
  res.send(com.comments[req.params.id])
})

/**
 * Gets profile passed on username
 */
app.get('/profile/:username(*)', function (req, res) {
  let profile = null;
  for (let item of db.get(2).users) {
    if (item.username === req.params.username) {
      profile = item
    }
  }
  res.send(profile)
})

/**
 * Gets the lenght of the data array
 */
app.get('/posts/last', function (req, res) {
  const tmp = db.get(0).data
  let len = 0;
  for (let item of tmp) {
    len++
  }
  var msg = {
    lenght: len
  }
  res.send(msg)
})

/**
 * Sends the new post to database and respoces with the given body
 */
app.post('/posts', function (req, res) {

  const all = db.get(0)
  all.data.push(req.body)
  const data = all.data
  db.put(0, { data })

  const cmt = db.get(1)
  cmt.comments.push({
    id: req.body.id,
    comments: []
  })
  const comments = cmt.comments
  db.put(1, { comments })

  res.send(req.body)
})

/**
 * Adds new comment to a post pased on id
 */
app.post('/posts/:id([0-9]+)', function (req, res) {
  const tmp = db.get(1)
  const newCmt = []
  for (let item of tmp.comments) {
    if (item.id === req.body.id) {
      item.comments.push(req.body.text)
    }
    newCmt.push(item)
  }

  const comments = newCmt
  db.put(1, { comments })

  res.send(req.body)
})

/**
 * Login validation
 */
app.post('/login', function (req, res) {
  const list = db.get(2)
  let result = null
  let newUsers = []
  for (let item of list.users) {
    if (item.username === req.body.username && item.password === req.body.password) {
      const token = jwt.sign({ username: item.username }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
      item.token = token
      result = token;
    }
    newUsers.push(item)
  }

  const users = newUsers
  db.put(2, { users })

  res.status(200).json({
    token: result
  })
})

/**
 * Relogin validation
 */
app.post('/relogin', function (req, res) {
  const list = db.get(2)
  let result = null
  for (let item of list.users) {
    if (item.token === req.body.token) {
      result = item.token
    }
  }

  res.status(200).json({
    token: result
  })
})

/**
 * Registeration validation
 */
app.post('/register', function (req, res) {
  const tmp = {
    username: req.body.username,
    password: req.body.password,
    token: jwt.sign({ username: req.body.username }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
  }

  let list = db.get(2)
  list.users.push(tmp)

  const users = list.users
  db.put(2, { users })

  res.status(200).json({
    token: tmp.token
  })
})

/**
 * Changes password
 */
app.post('/profile/:username(*)', function (req, res) {
  let profile = null;
  for (let item of users) {
    if (item.username === req.params.username) {
      item.password = req.body.password
      profile = item
    }
  }
  res.send(profile)
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ImageSite-Frontend'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/ImageSite-Frontend/' }
  );
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);