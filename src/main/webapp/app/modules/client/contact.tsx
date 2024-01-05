import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
          <p>Get In Touch</p>
          <h2>For Any Query</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.2s">
                <i className="fa fa-map-marker-alt"></i>
                <div className="contact-text">
                  <h2>Location</h2>
                  <p>123 Street, New York, USA</p>
                </div>
              </div>
              <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.4s">
                <i className="fa fa-phone-alt"></i>
                <div className="contact-text">
                  <h2>Phone</h2>
                  <p>+012 345 67890</p>
                </div>
              </div>
              <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.6s">
                <i className="far fa-envelope"></i>
                <div className="contact-text">
                  <h2>Email</h2>
                  <p>info@example.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
            <div className="contact-form">
              <div id="success"></div>
              <div className="control-group">
                <input type="text" className="form-control" id="name" placeholder="Your Name" data-validation-required-message="Please enter your name" />
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group">
                <input type="email" className="form-control" id="email" placeholder="Your Email" data-validation-required-message="Please enter your email" />
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group">
                <input type="text" className="form-control" id="subject" placeholder="Subject" data-validation-required-message="Please enter a subject" />
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group">
                <textarea className="form-control" id="message" placeholder="Message" data-validation-required-message="Please enter your message"></textarea>
                <p className="help-block text-danger"></p>
              </div>
              <div>
                <button className="btn" id="sendMessageButton">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
