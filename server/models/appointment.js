const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  phone: {type: String},
  date: { type: Date},
  time: { type: String}
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
