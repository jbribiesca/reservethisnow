import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
        .then(res => window.location.href = "/thankyou")
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
          <Jumbotron>
              <h1>Schedule an Appointment</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Appointment (required)"
              />
              <Input
                value={this.state.client}
                onChange={this.handleInputChange}
                name="client"
                placeholder="Client (required)"
              />
              <TextArea
                value={this.state.starttime}
                onChange={this.handleInputChange}
                name="starttime"
              />
              <TextArea
                value={this.state.endtime}
                onChange={this.handleInputChange}
                name="endtime"
              />
              <FormBtn
                disabled={!(this.state.client && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Appointment
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Hours of Operation for Jerry</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
