import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import Auth from "../../utils/AUTH";
import { Container } from "../../components/Grid";
import { Input, Date, Time, FormBtn } from "../../components/Form";
import Axios from "axios";
import AppointmentPicker from "../../components/AppointmentPicker";
import Modal from 'react-modal';
import moment from 'moment'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
      timestaken: "",
      modalIsOpen: false
    };
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this)

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false, title: "", client: "", phone: "", date: "", time: ""});
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
        .then(res => {
          this.setState({modalIsOpen: true})
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>

          <div>
            <p style={{color: 'white', textAlign: 'center'}}>Are you the business owner? Login <a href="/">here</a></p>
            {this.state.users && this.state.users.firstName &&(
                          <div>
                          <Jumbotron>
                          <h1>Schedule an appointment!</h1>
                          <h2>With {this.state.users.firstName} {this.state.users.lastName}</h2>
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
                <h1 style={{color: 'white', textAlign: 'center'}}>No user found at this link! Please double check the URL or check with the business owner who sent you the link.</h1><br/><br/>
                </div>
            )}
            {this.state.users ? <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Appointment Confirmation"
              >
      
                <h2 ref={subtitle => this.subtitle = subtitle}>Your Appointment has been confirmed!</h2>

                <div>Your appointment with {this.state.users.firstName} {this.state.users.lastName} on {moment(this.state.date).add(1, 'days').format("MMMM Do YYYY").toString()} at {moment(this.state.time, "HH:mm a").format("h:mm a")} has been confirmed.
                <br></br>You will receive a text message as a reminder.</div>


                <button onClick={this.closeModal}>Close</button>
                
              
          </Modal>:null}
          </div>

      </Container>
    );
  }
}

export default Appointments;
