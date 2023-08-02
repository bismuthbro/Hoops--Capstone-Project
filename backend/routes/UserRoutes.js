let express = require('express')
let router = express.Router()
let controller = require('../controllers/UserController.js')
let multer = require('multer')
const path = require('path')
const uniqueIdentifier = require('uuid')
// may need ../ for userimages
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'userimages')
    },
    filename: (req,file,callback)=>{
        const extname = path.extname(file.originalname)
        const allowedExtensions = ['.jpeg','.jpg','.png']
        if (allowedExtensions.includes(extname)){
            const fileName = uniqueIdentifier.v4()
            callback(null,fileName + extname)
        } else {
            callback('invalid file format')
        }
    }
})
// code for storage of user images using multer
const upload = multer({storage})

router.get('/user/:_id', (req,res)=>{
    controller.getUser(req,res)
})
// retrieve a user's details by route
router.get('/users/:usernames', (req,res)=>{
    controller.getUsers(req,res)
})
// retrieve multiple users data
router.post('/newuser', upload.single('avatar'),(req,res)=>{
    controller.newUser(req,res)
})
// creating a new user and uploading img
router.post('/login', (req,res)=>{
    controller.login(req,res)
})
// creating a new user route
router.put('/updateuser', (req,res)=>{
    controller.updateUser(req,res)
})
// update user route for updating number of MVPs
module.exports = router
// routes are defined here and exported to be used in server.js
// each route calls a function from the controller which has been imported