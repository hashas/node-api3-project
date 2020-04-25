// code away!
const server = require('./server.js');

// import router from './users/userRouter.js'
const userRouter = require('./users/userRouter.js')

const port = 3000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})