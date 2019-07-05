import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import styles from './auth.css'

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
				<Container>
          <Row>
            <Col size="md-3"></Col>
            <Col size="md-6">
              <Card title="Login to Reserve This Now">
                <form style={{marginTop: 10}}>
                  <label htmlFor="username">Username: </label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Link to="/signup">Register</Link>
                  <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
                </form>
              </Card>
            </Col>
            <Col size="md-3"></Col>
          </Row>
				</Container>
        <div>
    <div id="showcase">
        <div className="section-main container">
            <h1>Reserve This Now!</h1>
            <h2>Making appointments easy for you.</h2>
            <p className="lead hide-on-small">
                The app is a Cloud-Base Calendar that allows you to book appointments on your phone, tablet, or computer
                for your personal or business needs.
            </p>
        </div>
    </div>
    <section id="music" className="section">
        <div className="container">
            <h2 className="section-head">
                <i className="far fa-calendar-check"></i> Reserve This Now!</h2>
            <h3>Keep them coming back</h3>
            <p className="lead">"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia".</p>
            <a href="/" className="btn btn-primary mb">Start Your Trial Now</a>
            <p><img src="/images/google.jpg" style={{width:200}} alt=""></img><img src="/images/apple.jpg"
                    style={{width: 150}} alt=""></img></p>
        </div>
    </section>

    <section id="video" className="section bg-light">
        <div className="container">
            <h3>Create, host, share, track and monetize your content.</h3>
            <p className="lead">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis
                voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut
                rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
                earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur
                aut perferendis doloribus asperiores repellat."</p>
            <a href="/" className="btn btn-secondary">Features</a>
            <br></br>
            <br></br>
            <img src="/images/brand.jpg" alt=""></img>
            <br></br>
            <br></br>
        </div>
    </section>

    <section id="entertainment" className="section">
        <div className="container">
            <h3>A world of entertainment.
                Available wherever you are.</h3>
            <p className="lead">
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
        </div>
    </section>

    <section id="gift-cards" className="section bg-light">
        <div className="container">
            <div className="gift-cards">
                <div>
                    <img src="/images/booking.jpg" alt=""></img>
                </div>
                <div>
                    <h2>Reserve This Now!</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <p>'Content here, content here'?</p>
                    <hr>
                    </hr>
                    <a href="/" className="text-secondary">
                        <i className="fas fa-chevron-right"></i>
                        Get started
                    </a>
                </div>
            </div>
        </div>
    </section>
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
                <p>Subscribe to our newsletter to get our latest news.</p>
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
                <li>&copy; 2019 Copyright DemBoysCrew Inc.</li>
            </ul>
        </section>
    </footer>
</div>
        </div>
			)
		}
	}
}

export default LoginForm;
