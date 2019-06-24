import axios from "axios";

export default {
  // Gets all Appointments
  getAppointments: function() {
    return axios.get("/api/appointments");
  },
  // Gets the Appointment with the given id
  getAppointment: function(id) {
    return axios.get("/api/appointments/" + id);
  },
  // Deletes the Appointment with the given id
  deleteAppointment: function(id) {
    return axios.delete("/api/appointments/" + id);
  },
  // Saves a Appointment to the database
  saveAppointment: function(appointmentData) {
    return axios.post("/api/appointments", appointmentData);
  }
};
