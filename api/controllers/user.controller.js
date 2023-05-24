const UserModel = require('../models/user.model'); 
const ObjectID = require('mongoose').Types.ObjectId; 
 
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
    // console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send('ID Unknown: ' + req.params.id);
    }
  
    try {
      const docs = await UserModel.findById(req.params.id).select('-password');
      res.send(docs);
    } catch (err) {
      console.log('ID Unknown: ' + err);
    }
  }; 


  module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send('ID Unknown: ' + req.params.id);
    }
  
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { pseudo: req.body.pseudo } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      return res.send(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

module.exports.deleteUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID Unknown: ' + req.params.id);
      }
    try{
        await UserModel.deleteOne({_id: req.params.id }).exec();
        res.status(200).json({message:"Succefully deleted. "});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err})
    };
}
