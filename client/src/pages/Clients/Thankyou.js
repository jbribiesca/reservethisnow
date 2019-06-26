import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import moment from "moment";

class Books extends Component {
    state = {
        appointments: [],
        title: "",
        client: "",
        member: "",
        starttime: "",
        endtime: "",
        user: "",
      };
    
      componentDidMount() {
        this.loadAppointments();
      }
    
      loadAppointments = () => {
        API.getAppointments()
          .then(res =>
            this.setState({ appointments: res.data, title: "", client: "", member: "", starttime: "", endtime: "", user: "" })
          )
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
        starttime: this.state.starttime,
        endtime: this.state.endtime,
        user: "5d13a888c79ecf5cb81044e6"
      })
        .then(res => console.log("Hello"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <div>
          <Jumbotron>
              <h1>Thank you!</h1>
            </Jumbotron>
            {this.state.appointments.length ? (
              <List>
                {this.state.appointments.map(appointments => (
                  <ListItem key={appointments._id}>
                    <Link to={"/appointments/" + appointments._id}>
                      <strong>
                      {appointments.title} by {appointments.client} at {moment(appointments.starttime).format("MMMM Do YYYY, h:mm a").toString()}  - {moment(appointments.endtime).format("MMMM Do YYYY, h:mm a").toString()}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteAppointment(appointments._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </div>
      </Container>
    );
  }
}

export default Books;
