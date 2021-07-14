const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.signup = (req, res, next) => {
  console.log('signup start');
  console.log(req.body.password);
  //const user = JSON.parse(req.body.user)
  if(req.body.password){
    console.log('req.body.password true');
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log(hash);
      console.log('signup hash');
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user.save()
      .then(() => res.status(201).json({ message: 'User Created !' }))

        .catch(error => {res.status(400).json({ error }); console.log(error);});
    })
    .catch(error => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'User not Found !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Incorrect Password !' });
        }
        console.log("User Found !")
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  console.log("Je suis à userGetOne!");
  console.log(req.params.id);

  User.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(req.params.id)
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
      console.log(error);
    }
  );
};

exports.modifyUser = (req, res, next) => {
  const user = {
    email: req.body.email,
  };
  console.log("Je suis à modify user!");
  console.log(user);
  console.log("objectId=  "+mongoose.Types.ObjectId.createFromHexString(req.params.id));


  User.findOneAndUpdate({_id: mongoose.Types.ObjectId.createFromHexString(req.params.id)},user,{new: true ,upsert: true} ).then(
    (user) => {
      res.status(201).json({message:"User updated successfully!"});
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
      console.log(error);
    }
  );
};


exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};