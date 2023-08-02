const bcrypt = require('bcrypt')
const userModel = require('../models/usermodel.js')

exports.getUsers = (req,res)=>{
    userModel.find({username:{$in:JSON.parse(req.params.usernames)}})
    .then((users)=>{
        res.json(users)
    })
    .catch((error)=>{
        console.error(error)
        res.json({error})
    })
}
// finds users by username and sends their details to frontend for image and MVP display in playertooltip

exports.getUser = (req,res)=>{
    userModel.findOne({_id:req.params._id})
    .then((response)=>{res.json(response);
    console.log(response)
})
    .catch((error)=>{res.json({error})})
}
// fetch details for a user by id passed as path parameter
exports.newUser = (req,res)=>{
    const {password} = req.body
    const hashedPassword = bcrypt.hashSync(password,12)
    const newUser = {...req.body,password:hashedPassword,imagepath: req.file.filename}
    const addUser = new userModel(newUser)
    addUser.save()
    .then((user)=>res.json(user))
    .catch((error)=>{res.json({error})})
}
// adds details for a new user and hashes bassword
exports.login = (req,res)=>{
    const {username,password} = req.body
    userModel.findOne({username:username})
    .then((user)=>{
        if(user === null){return res.status(404).json({message:'user not found'})}
        const passwordCorrect = bcrypt.compareSync(password, user.password)
        if(passwordCorrect){res.json(user)} else {res.status(400).json({message:'incorrect password'})}
    })
}
// checks if user entered password is correct when logging in by comparing hashed request password to password hash in DB
exports.updateUser = (req,res)=>{
    userModel.findOneAndUpdate({id:req.body.id},req.body.update)
    .then(()=>res.send('successfully updated'))
    .catch((error)=>{res.json({error})})
}
// changes a user's details based on it's ID, the user can change as many or as little fields as they like
// use the update user function to update the number of MVPs a user has