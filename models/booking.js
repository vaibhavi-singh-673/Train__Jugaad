const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    train_number: String,
    train_name: String,
    from_std: String,
    to_sta: String,
    from_station_name: String,
    to_station_name: String,
    train_date: String,
    class_type: String,
    duration : String,
    fare : Number,
    total : Number,
    owner:{
        type : Schema.Types.ObjectId,
        ref : "User"
      }
});


module.exports = mongoose.model("Booking", bookingSchema);