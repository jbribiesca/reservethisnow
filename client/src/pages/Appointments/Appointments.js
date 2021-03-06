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
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
} from 'react-share';


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

  constructor(props) {
    super(props);
    this.state={
      appointments: [],
    // timestaken:["12:00", "13:00"],
    title: "",
    client: "",
    phone: "",
    date: "",
    time: "",
    timestaken: "",
    username: "",
    shareURL: "http://www.reservethisnow.com/" + props.user.username
    };
    this.onTimeSelect = this.onTimeSelect.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this)


  }

  
  componentWillMount() {
    this.loadAppointments();
  }

 
  

  onDateSelect(){
    let date = this.state.date
    axios.get("/api/appointments/date/" + date)
    .then(res =>
      {
        this.setState({ timestaken: res.data.appointments.map(item=>item.time), time: "" });
        console.log(this.state.timestaken)
      },
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
                        {appointment.title} by {appointment.client} at {moment(appointment.date).add(1, 'days').format("MMMM Do YYYY").toString()}  - {moment(appointment.time, "HH:mm a").format("h:mm a")}
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
        <h4 style={{textAlign: 'center'}}>Share your website</h4>
        <div style={{
          display: 'flex', justifyContent: 'center'
        }}>
          <FacebookShareButton
            url={this.state.shareURL}
            quote="Schedule an appointment!"
            className="button"
          >
            <FacebookIcon
              size={32}
              round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={this.state.shareURL}
            quote="Schedule an appointment!"
            className="button"
          >
            <TwitterIcon
              size={32}
              round={true} />
          </TwitterShareButton>

        </div>
        <br/>
      </Container>
    );
  }
}

export default Appointments;
