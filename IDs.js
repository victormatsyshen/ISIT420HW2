// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const IDSchema = new Schema({
  StoreID: {
    type: Number,
    required: true
  },
  SalesPersonOID: {
    type: Number,
    required: true
  },
  CdID: {
    type: Number,
    required: true
  },
  PricePaid: {
    type: Number,
    required: true
  },
  HourPurch: {
    type: Number,
    required: false
  },
  DayPurch: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("IDs", IDSchema);

// our schema needs storeID SalesPersonID CdID PricePaid HourPurch DayPurch
// i can add defaults if needed