import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Time, Date, FormBtn } from "../../components/Form";
import AppointmentPicker from "../../components/AppointmentPicker";
import moment from "moment";
import axios from "axios";

class Appointments extends Component {
  // state = {
  //   appointments: [],
  //   timestaken:["12:00", "13:00"],
  //   title: "",
  //   client: "",
  //   phone: "",
  //   date: "",
  //   time: "",
  // };

  constructor() {
    super();
    this.state={
      appointments: [],
    // timestaken:["12:00", "13:00"],
    title: "",
    client: "",
    phone: "",
    date: "",
    time: "",
    };
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this)
  }
 

  componentWillMount() {
    this.loadAppointments();
    this.loadDateTimes();

  }

  onDateSelect(){
    let date = this.state.date
    
    axios.get("/api/appointments/date/" + date)
    .then(res =>
      {console.log(res)
        this.setState({ timestaken: res.data.appointments.map(item=>item.time), time: "" })
    console.log(this.state.timestaken)},
    )
    .catch(err => console.log(err));
  }

  loadAppointments = () => {
    API.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data.appointments, title: "", client: "", phone: "", date: "", time: "" })
      )
      .catch(err => console.log(err));

  };

  loadDateTimes = () => {
    API.getAppointments()
      .then(res =>
      
        {
          this.setState({ timestaken: res.data.appointments.map(item=>item.time), time: "" })
      // console.log(this.state.timestaken)
    },
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

  onTimeSelect(event) {
    console.log('change.appo.picker', event.time);
    this.setState({ time: `${event.time.h}:00` });
    // Or do something different with your time object
    
}

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
        .then(res => {
          this.setState({timestaken:[]})
          this.loadDateTimes()
          this.loadAppointments()
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Schedule <i class="far fa-clock"></i></h1>
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
                onBlur={this.onDateSelect}
                name="date"
              />
              {/* <Time
                value={this.state.time}
                onChange={this.handleInputChange}
                name="time"
              /> */}
              <FormBtn
                disabled={!(this.state.title && this.state.client)}
                onClick={this.handleFormSubmit}
              >
              <span class="fas fa-calendar-check"></span>
              </FormBtn>
              {this.state.timestaken ? <AppointmentPicker 
                timestaken={this.state.timestaken}
                onTimeSelect={this.onTimeSelect}
              />:null}
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Appointments <i class="fas fa-list-alt"></i></h1>
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
                <h3 className="upcoming-appointments">Upcoming Appointments</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Appointments;
