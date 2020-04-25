const express = require('express');
// import database(s)
const users = require('./userDb.js');
const posts = require('../posts/postDb.js');

const router = express.Router();

// CREATE a user using info inside req.body
router.post('/', validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(501).json({
        error: "There was an error while creating user"
      })
    })

});

// CREATE a post partially using info inside req.body
router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  const obj = { ...req.body, user_id: req.params.id }
  console.log(obj)
  console.log(req.body)
  console.log(req.user)
  console.log(req.params.id)
  posts.insert(obj) 
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

// // get posts //

// router.get('/posts', (req, res) => {
//   posts.get()
//     .then(allPosts => {
//       res.status(200).json(allPosts)
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: "There was an error gettings users"
//       })
//     })
// })

// READ all users
router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(allUsers => {
      res.status(200).json(allUsers)
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting users."
      })
    })
});

// READ single user
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  (req.user) ? res.status(200).json(req.user) : res.status(404).json(`User not found`)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(p => {
      res.status(200).json(p)
    })
    .catch(err => {
      res.status(404).json({ 
        error: `Posts not found` 
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(user => {
      res.status(200).json({
        message: "The user has been deleted"
      })
    })
    .catch(err => {
      res.status(501).json({
        error: "The user was NOT deleted"
      })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(count => {
      if (count === 1) {
        // if I want to display the updated user I'd need to call users.getById w/ then/catch
        res.status(200).json({
          message: "The user was updated successfully"
        })
      } else {
        res.status(501).json({
          error: "The update was not implemented"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The update was not implemented"
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
    // .then(user => {
    //   if (user === 0) {
    //     res.status(400).json({
    //       message: "invalid user id"
    //     })
    //   } else if (user !== 0) {
    //     req.user = user // i think this needs to go in "else" and get ride of this "else if"
    //     console.log(req.user)
    //   } else {
    //     next()
    //   }
    // })
    // .catch(err => {
    //   res.status(500).json({
    //     error: "Error"
    //   })
    // })
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch(err => {
        res.status(500).json({err, message: "Error getting by ID"})
      })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) { // amended req.body.text
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next();
  }
}

module.exports = router;
