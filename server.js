const express = require('express');

const userRouter = require('./users/userRouter.js')

const server = express();

server.use(express.json());
// this makes 'logger' global
server.use(logger);
server.use('/api/users/', userRouter);

// this pre-provided code sits above middleware which 
// will end our request before we get to custom
// middleware so have commented it out
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  console.log(`URL: ${req.url}`);
  console.log(`Time: ${Date.now()}`);
  next();
}

module.exports = server;
