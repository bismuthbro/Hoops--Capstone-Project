const locationModel = require('../models/locationmodel.js')

exports.getLocation = (req,res)=>{
    locationModel.find()
    .then((response)=>{res.json(response);
})
    .catch((error)=>{res.json({error})})
}
// find location by id and send to frontend
exports.getSpecificLocation = (req,res)=>{
    locationModel.findOne({_id:req.params._id})
    .then((response)=>{res.json(response);
})
    .catch((error)=>{res.json({error})})
}
// fetch details for a location by id passed as path parameter
exports.newLocation = (req,res)=>{
    const addLocation = new locationModel(req.body)
    addLocation.save()
    .then(()=>res.send('successfully created location'))
    .catch((error)=>{res.json({error})})
}
// adds details for a new location, in future I should include functionality here to prevent duplicate locations