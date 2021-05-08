const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Device = require('../models/Device');
const mongoose = require('mongoose');

exports.create = (req, res, next) => {
    console.log('create device start');
    console.log(req.dNumber);
    console.log(req.dId);

    const device = new Device({
       ...req.body
    });

    device.save()
        .then(() => res.status(201).json({ message: 'Device saved !', success : Boolean = true }))
        .catch(error => {
            res.status(400).json({ error, success : Boolean = false });
            console.log(error);
        }
    );

  };

exports.getAllDevices = (req, res, next) => {
    console.log("Je suis à devices get all!");

    Device.find().then(
      (devices) => {
        res.status(200).json(devices);
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

  exports.modifyDevice = (req, res, next) => {
    const device = {
      ...req.body
    };
    console.log("Je suis à modify device!");
    console.log(device);
    console.log("objectId=  "+mongoose.Types.ObjectId.createFromHexString(req.params.id));

    Device.findOneAndUpdate({_id: mongoose.Types.ObjectId.createFromHexString(req.params.id)},device,{new: true ,upsert: true} ).then(
      () => {
        res.status(201).json({message:"Device updated successfully!"});
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

  exports.deleteDevice = (req, res, next) => {
    const device = {
      ...req.body
    };
    console.log("Ich bin im device loschen!");
    console.log(device);
    console.log("objectId=  "+mongoose.Types.ObjectId.createFromHexString(req.params.id));

    Device.deleteOne({_id: mongoose.Types.ObjectId.createFromHexString(req.params.id)}, (err, obj) =>{

      if (err) throw err;
      res.status(201).json({message:"Device deleted successfully!", success = true});

    } );
    // .then(
    //   () => {
    //     res.status(201).json({message:"Device deleted successfully!"});
    //   }
    // ).catch(
    //   (error) => {
    //     res.status(400).json({
    //       error: error
    //     });
    //     console.log(error);
    //   }
    // );
  };