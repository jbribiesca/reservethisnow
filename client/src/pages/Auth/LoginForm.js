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
                                            <a href="#showcase" className="brandName brandName-a">Reserve This Now</a>
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
                                    <a href='/' id='openup' className="brandName brandName-a">Reserve This Now</a>
                                </nav>
                            </header>

                        </div>
                        <div className="section-main container">
                        <br className="lead hide-on-small"></br>
                            <h1 className="brandName">Reserve This Now</h1>
                            <h2 className="lead hide-on-small">Making appointments easy for you.</h2>
                            <p className="lead hide-on-small"><i class="far fa-calendar-alt fa-3x"></i></p>
                            <br className="lead hide-on-small"></br>
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
                                <h3><i class="fas fa-globe-americas"></i> Available <span className="hide-on-small">wherever you are</span> 24/7 </h3>
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
                                        <h2 className="sms-Text"><i class="fas fa-sms"></i> Send friendly text reminders!</h2>
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
                        
                    </div>
                
            )
        }
    }
}

export default LoginForm;
