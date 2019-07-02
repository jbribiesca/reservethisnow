import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Time, Date, FormBtn } from "../../components/Form";
import moment from "moment";

class Appointments extends Component {
  state = {
    appointments: [],
    title: "",
    client: "",
    phone: "",
    date: "",
    time: ""
  };

  componentDidMount() {
    this.loadAppointments();
  }

  loadAppointments = () => {
    API.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data.appointments, title: "", client: "", phone: "", date: "", time: "" })
      )
      .catch(err => console.log(err));
  };

  deleteAppointment = id => {
    API.deleteAppointment(id)
      .then(res => this.loadAppointments())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.client) {
      API.saveAppointment({
        title: this.state.title,
        client: this.state.client,
        phone: "1" + this.state.phone,
        date: this.state.date,
        time: this.state.time
      })
        .then(res => this.loadAppointments())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Schedule an appointment!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Appointment Title (required)"
              />
              <Input
                value={this.state.client}
                onChange={this.handleInputChange}
                name="client"
                placeholder="Client Name (required)"
              />
              <Input
                value={this.state.phone}
                onChange={this.handleInputChange}
                name="phone"
                placeholder="Phone (required)"
              />
              <Date
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
              />
              <Time
                value={this.state.time}
                onChange={this.handleInputChange}
                name="time"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.client)}
                onClick={this.handleFormSubmit}
              >
                Submit Appointment
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Appointments on my list</h1>
            </Jumbotron>
            {this.state.appointments.length ? (
              <List>
                {this.state.appointments.map(appointment => (
                  <ListItem key={appointment._id}>
                    <Link to={"/appointments/" + appointment._id}>
                      <strong>
                        {appointment.title} by {appointment.client} at {moment(appointment.date).format("MMMM Do YYYY").toString()}  - {moment(appointment.time).format("h:mm a").toString()}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteAppointment(appointment._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Appointments;
