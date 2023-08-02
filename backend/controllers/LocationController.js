const locationModel = require('../models/locationmodel.js')

exports.getLocation = (req,res)=>{
    locationModel.find()
    .then((response)=>{res.json(response);
})
    .catch((error)=>{res.json({error})})
}
exports.getSpecificLocation = (req,res)=>{
    locationModel.findOne({_id:req.params._id})
    .then((response)=>{res.json(response);
})
    .catch((error)=>{res.json({error})})
}
// fetch details for a location
exports.newLocation = (req,res)=>{
    const addLocation = new locationModel(req.body)
    addLocation.save()
    .then(()=>res.send('successfully created location'))
    .catch((error)=>{res.json({error})})
}
// adds details for a new location, I should try to include functionality here to prevent duplicate locations