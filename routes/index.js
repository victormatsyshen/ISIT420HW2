var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const IDs = require("../IDs");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo  DB that the collection
const dbURI =
 "mongodb+srv://ServerUser:userpassword@victorcluster.vdagp.mongodb.net/ToDo?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// reconnection attepmts
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

// connection string confirming DB connection
mongoose.connect(dbURI, options).then(
  () => {
    console.log("");
    console.log("Database connection established!");
    console.log("");
  },
  err => {
    console.log("");
    console.log("Error connecting Database instance due to: ", err);
    console.log("");
  }
);


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});


/* post new Music data and push to Mongo */
router.post('/NewMusic', function(req, res) {

    let oneNewMusic = new IDs(req.body);  // call constuctor in IDs code that makes a new mongo ToDo object
    console.log(req.body);
    oneNewMusic.save((err, music) => {
      if (err) {
        console.log("Error pushing to Mongo");
        res.status(500).send(err);
      }
      else {
        console.log("New Music Data: ");
      console.log(music);
      res.status(201).json(music);
      }
    });
});

module.exports = router;
