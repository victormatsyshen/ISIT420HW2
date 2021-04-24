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


/* GET all IDs */
router.get('/IDs', function(req, res) {
  // find {  takes values, but leaving it blank gets all}
  IDs.find({}, (err, AllIDs) => {
    if (err) {
      console.log(err);
      console.log("Error getting all IDs");
      res.status(500).send(err);
    }
    res.status(200).json(AllIDs);
  });
});


/* post a new ToDo and push to Mongo */
router.post('/NewCD', function(req, res) {

    let oneNewCD = new IDs(req.body);  // call constuctor in IDs code that makes a new mongo ToDo object
    console.log(req.body);
    oneNewCD.save((err, music) => {
      if (err) {
        console.log("Error pushing to Mongo");
        res.status(500).send(err);
      }
      else {
      console.log(music);
      res.status(201).json(music);
      }
    });
});


router.delete('/DeleteToDo/:id', function (req, res) {
  IDs.deleteOne({ _id: req.params.id }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "ToDo successfully deleted" });
  });
});

// just add the time and date here like completed = true, time = current time
router.put('/UpdateToDo/:id', function (req, res) {
  IDs.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, detail: req.body.detail, priority: req.body.priority,   completed: req.body.completed },
   { new: true },
    (err, todo) => {
      if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(todo);
    })
  });


/* GET one IDs */
router.get('/FindToDo/:id', function(req, res) {
  console.log(req.params.id );
  IDs.find({ _id: req.params.id }, (err, oneToDo) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneToDo);
  });
});

module.exports = router;
