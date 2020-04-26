// code away!
const server = require('./server.js');

// this will read all the environment variables
// in '.env'
// require("dotenv").config()

// the above method could be problematic because
// the .env has been added to gitignore and so will
// not be pushed to github, therefore alternative is 
// ammend package.json:
// "scripts": { "watch": "nodemon -r dotenv/config index.js"}

// import router from './users/userRouter.js'
const userRouter = require('./users/userRouter.js')

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})