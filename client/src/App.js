import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null,
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			// console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      // console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout}/>
            <div className="main-view">
              <Switch>
                <Route exact path="/" component={() => <Appointments user={this.state.user}/>} />
                <Route exact path="/appointments" component={() => <Appointments user={this.state.user}/>} />
                <Route exact path="/appointments/:id" component={Detail} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
		)}
        { !this.state.loggedIn && (
          <div className="auth-wrapper">
			  <Switch>
            <Route exact path="/" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/appointments" component={() => <LoginForm user={this.login}/>} />
            <Route exact path="/signup" component={SignupForm} />
			      <Route path="/:id" component={Clients} />
			</Switch>
          </div>
	   )}
	   
	                           {/* Footer Section */}
						  <footer>
                            <section className="ft-main">
                                <div className="ft-main-item" className="lead hide-on-small test">
                                    <h2 className="ft-title">About</h2>
                                    <ul>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                        <li><a href="#">Pricing</a></li>
                                        <li><a href="#">Customers</a></li>
                                        <li><a href="#">Careers</a></li>
                                    </ul>
                                </div>
                                <div className="ft-main-item" className="lead hide-on-small test">
                                    <h2 className="ft-title">Resources</h2>
                                    <ul>
                                        <li><a href="#">Docs</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">eBooks</a></li>
                                        <li><a href="#">Webinars</a></li>
                                    </ul>
                                </div>
                                <div className="ft-main-item" className="lead hide-on-small test">
                                    <h2 className="ft-title">Contact</h2>
                                    <ul>
                                        <li><a href="#">Help</a></li>
                                        <li><a href="#">Sales</a></li>
                                        <li><a href="#">Advertise</a></li>
                                    </ul>
                                </div>
                                <div className="ft-main-item">
                                    <h2 className="ft-title">Stay Updated</h2>
                                    <p>Subscribe to our newsletter to get our latest updates.</p>
                                    <form>
                                        <input type="email" name="email" placeholder="Enter email address"></input>
                                        <input type="submit" value="Subscribe"></input>
                                    </form>
                                </div>
                            </section>

                            <section className="ft-social">
                                <ul className="ft-social-list">
                                    {/* Enter barber website in href "#" inside globe */}
                                    <li><a href="https://jt227b.github.io/Barbershop/" target="_blank"><i className="fas fa-globe"></i></a></li> 
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="https://github.com/jbribiesca/testingproject3.git"><i className="fab fa-github"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </section>

                            <section className="ft-legal">
                                <ul className="ft-legal-list">
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li>&copy; 2019 Copyright Reserve This Now Inc.</li>
                                </ul>
                            </section>
                        </footer>
			</div>
		)
	}
}

export default App;
