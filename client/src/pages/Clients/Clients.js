import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import Auth from "../../utils/AUTH";
import { Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Axios from "axios";


class Appointments extends Component {
  state = {
    users: [],
    firstName: "",
    lastName: "",
    username: "",
    _id: "",
    appointments: [],
    title: "",
    client: "",
    phone: "",
    starttime: "",
    endtime: ""
  };

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
        starttime: this.state.starttime,
        endtime: this.state.endtime,
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
                            disabled={!(this.state.title && this.state.client)}
                            onClick={this.handleFormSubmit}
                          >
                            Submit Appointment
                          </FormBtn>
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
