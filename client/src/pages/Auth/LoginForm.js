import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, SplashBtn } from '../../components/Form';
import styles from './auth.css';


class LoginForm extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
        this.setState({
            redirectTo: '/'
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (

                    <div>
                        <div id="showcase">
                            {/* Navbar */}
                            <header>
                                <nav class='cf'>
                                    <ul class='cf'>
                                        <li class="hide-on-small">
                                            <a href="#showcase" className="brandName brandName-a">Reserve This Now!</a>
                                        </li>
                                        
                                        {/*<li>
                                            <a href='/signup'>Register</a>
                                        </li>
                                        <li>
                                            <a href='/'>Login: </a>
                                        </li>*/}

                                        <div className="float-right">

                                         <li className="adjustForm">
                                        <Input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            
                                            value={this.state.username}
                                            onChange={this.handleChange}/>
                                        </li>
                                        
                                            
                                        {/* <li>
                                             <label htmlFor="password">Password: </label>
                                        </li>*/}
                                         <li className="adjustForm">
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}/>
                                            </li>
                                            
                                        <li>
                                        <SplashBtn onClick={this.handleSubmit}>Login</SplashBtn>
                                        </li>

                                        <li>
                                        <Link to="/signup">Register</Link>
                                        </li>
                                        </div>
                                        {/* <li>
                                    <a href='#video'>Features</a>
                                </li>
                                <li>
                                    <a href='#gift-cards'>Stream</a>
                                </li> */}
                                    </ul>
                                    <a href='/' id='openup'>Reserve</a>
                                </nav>
                            </header>

                        </div>
                        <div className="section-main container">
                            <h1 className="brandName">Reserve This Now</h1>
                            <h2 className="lead hide-on-small">Making appointments easy for you.</h2>
                        </div>
                        {/* Start Trial Section */}
                        <section id="music" className="section">
                            <div className="container">
                                <h2 className="section-head">
                                    <i className="far fa-calendar-check"></i> Keep them coming back...</h2>
                                <p className="lead hide-on-small test">
                                    This Cloud-Base Calendar app allows you to book appointments on your phone, tablet, or computer
                                    for your personal or business needs.</p>
                                <a href="/signup" className="btn btn-primary mb">Start Your Trial Now</a>
                            </div>
                        </section>
                        {/* Android iOS Section */}
                        <section id="video" className="section bg-light">
                            <div className="container">
                                <br></br>
                                <h3><i class="fas fa-cart-arrow-down"></i> Now available on Android and iOS</h3>
                                <p className="lead">Download the app for free on iTunes App Store or Google Play App Store.</p>
                                <p><img src="/images/google.png" className='google' style={{ width: 160 }} alt=""></img><img src="/images/apple.png" className='apple'
                                    style={{ width: 150 }} alt=""></img></p>
                                <br></br>
                                <img src="/images/brand.jpg" alt=""></img>
                                <br></br>
                                <br></br>
                            </div>
                        </section>
                        {/* Worldwide Section */}
                        <section id="entertainment" className="section">
                            <div className="subsection container">
                                <h3><i class="fas fa-globe-americas"></i> Available wherever you are 24/7 </h3>
                                <p className="lead hide-on-small">Your personal, digital receptionist. Allow customers
                                 to book appointments anytime, day or night.</p>
                            </div>
                        </section>
                        {/* Text Message Section */}
                        <section id="gift-cards" className="section bg-light">
                            <div className="container">
                                <div className="gift-cards">
                                    <div>
                                        <img src="/images/booking.jpg" alt=""></img>
                                    </div>
                                    <div>
                                        <h2><i class="fas fa-sms"></i> Send friendly text reminders!</h2>
                                        <p>Forget calling your customers to remind them about appointments.
                                            Now you can reduce no-shows with text reminders of upcoming appointments
                                            and notify them of changes automatically via email or text.</p>
                                        <p>Built to make appointments easy for everyone.</p>
                                        <hr>
                                        </hr>
                                        <a href="/signup" className="text-secondary">
                                            <i className="fas fa-chevron-right"></i>Get started</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Footer Section */}
                        <footer>
                            <section className="ft-main">
                                <div className="ft-main-item">
                                    <h2 className="ft-title">About</h2>
                                    <ul>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                        <li><a href="#">Pricing</a></li>
                                        <li><a href="#">Customers</a></li>
                                        <li><a href="#">Careers</a></li>
                                    </ul>
                                </div>
                                <div className="ft-main-item">
                                    <h2 className="ft-title">Resources</h2>
                                    <ul>
                                        <li><a href="#">Docs</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">eBooks</a></li>
                                        <li><a href="#">Webinars</a></li>
                                    </ul>
                                </div>
                                <div className="ft-main-item">
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
                                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fab fa-github"></i></a></li>
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
}

export default LoginForm;
