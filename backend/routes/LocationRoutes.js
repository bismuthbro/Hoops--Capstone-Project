let express = require('express')
let router = express.Router()
let controller = require('../controllers/LocationController.js')

router.get('/', (req,res)=>{
    controller.getLocation(req,res)
})
// get locations by body data
router.get('/specificlocation/:_id', (req,res)=>{
    controller.getSpecificLocation(req,res)
})
// get specific location by location id passed as path parameter
router.post('/newlocation', (req,res)=>{
    controller.newLocation(req,res)
})
// creating a new location route

module.exports = router
// routes are defined here and exported to be used in server.js
// each route calls a function from the controller which has been imported