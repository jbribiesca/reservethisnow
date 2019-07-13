import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import Auth from "../../utils/AUTH";
import { Container } from "../../components/Grid";
import { Input, Date, Time, FormBtn } from "../../components/Form";
import Axios from "axios";
import AppointmentPicker from "../../components/AppointmentPicker";


class Appointments extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      firstName: "",
      lastName: "",
      username: "",
      _id: "",
      appointments: [],
      title: "",
      client: "",
      phone: "",
      date: "",
      time: "",
      timestaken: ""
    };
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this)
  }



  componentDidMount() {

      const user = this.props.match.params.id
      this.findUser(user);

  }

  findUser = (user) => {
    console.log(user)
    Axios.get("/auth/finduser/" + user)
      .then(res =>
       {

          this.setState({ users: res.data, firstName: "", lastName: "", username: "", _id: ""})
         }
      )
      .catch(err => console.log(err));
  };

  onDateSelect(){
    console.log("im here")
    const user = this.state.users._id
    let date = this.state.date
    Axios.get("/api/appointments/date/" + date + "/" + user )
    .then(res =>
      {
        this.setState({ timestaken: res.data.appointments.map(item=>item.time), time: "" });
        console.log(this.state.timestaken)
      },
    )
    .catch(err => console.log(err));
  }

  onTimeSelect(event) {
    console.log('change.appo.picker', event.time);
    this.setState({ time: `${event.time.h}:00` });
    // Or do something different with your time object
    
}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.client) {
      API.saveClientAppointment({
        title: this.state.title,
        client: this.state.client,
        phone: "1" + this.state.phone,
        date: this.state.date,
        time: this.state.time,
        id: this.state.users._id
      })
        .then()
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>

          <div>
            {this.state.users && this.state.users.firstName &&(
                          <div>
                          <Jumbotron>
                          <h1>Schedule an appointment!</h1>
                          <h2>For {this.state.users.firstName} {this.state.users.lastName}</h2>
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
                        </div>
            )} {!this.state.users && (
              <div>
                <h1>No user found at this link! Please double check the URL or check with the business owner who sent you the link.</h1>
                </div>
            )}

          </div>

      </Container>
    );
  }
}

export default Appointments;
