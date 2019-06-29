const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  starttime: { type: Date},
  endtime: { type: Date}
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
