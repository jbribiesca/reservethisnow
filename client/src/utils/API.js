import axios from "axios";

export default {
  // Gets all books
  getAppointments: function() {
    return axios.get("/api/appointments");
  },
  getAppointmentsDate: function(date) {
    return axios.get("/api/appointments/date/" + date);
  },
  // Gets the book with the given id
  getAppointment: function(id) {
    return axios.get("/api/appointments/" + id);
  },
  // Deletes the book with the given id
  deleteAppointment: function(id) {
    return axios.delete("/api/appointments/" + id);
  },
  // Saves a book to the database
  saveAppointment: function(appointmentsData) {
    return axios.post("/api/appointments", appointmentsData);
  },
  saveClientAppointment: function(appointmentsData) {
    console.log(appointmentsData)
    return axios.post("/api/appointments/client", appointmentsData);
  }
};
