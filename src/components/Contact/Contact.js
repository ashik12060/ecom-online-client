import React, { useRef, useState } from "react";
import "./Contact.css";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailJSResponseStatus from "@emailjs/browser";
import contactLotti from "./contact-lottie.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Shared/Footer/Footer";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [texts, setTexts] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setTexts("");

    EmailJSResponseStatus.sendForm(
      "service_ui4nfe8",
      "template_q7rezbb",
      form.current,
      "Uw2lyiqAmMpKZxSD8"
    ).then(
      (result) => {
        toast.success("Email Send Successfully");
        console.log(result.text);
        console.log("message sent");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div className="">
      

      <div className="background-contact">
        <div className="text-contact">
          <h1 className="text-white fw-bold">
            <span className=" contact-us">CONTACT US</span>
          </h1>

          <p className="text-white fs-5">
            <Link to="/home" className="text-white">
              HOME
            </Link>{" "}
            / CONTACT
          </p>
        </div>
      </div>

      <div className="container my-5  overflow-hidden ">
        <div className="text-center d-flex justify-content-center">
          <Lottie className="lottiContact" animationData={contactLotti} />
        </div>
        <h1 className="text-center mt-5">Get In Touch With Us</h1>
        <p className="text-center">
          Anything On Your Mind. We'll Be Glad To Assist you!
        </p>
        {/* contact form */}
        <div
          id="contactForm"
          className="d-flex flex-lg-row flex-md-row flex-sm-column flex-column gap-5"
        >
          <div className="ps-5 contact-info  w-lg-50 w-md-50 w-sm-100 w-100">
            <h2 className=" mt-4 "><span className="contact-border">Our Contact</span></h2>
            <div className="d-flex mt-5 mb-2">
              <div>
                <a href="mailto:business@chaitirangina.com">
                  <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />
                </a>
              </div>
              <div className="text-start ps-4 me-1">
                <h5>Email</h5>
                <p>
                  <a
                    className="text-black"
                    href="mailto:business@chaitirangina.com"
                  >
                    business@chaitirangina.com
                  </a>{" "}
                </p>
              </div>
            </div>

            <div className="d-flex  mb-2">
              <div>
                <a href="#">
                  <FontAwesomeIcon className="contact-icon" icon={faPhone} />
                </a>
              </div>
              <div className="text-start ps-4 ">
                <h5>Phone</h5>
                <p>+01521584662</p>
              </div>
            </div>
            {/* location */}
            <div className="d-flex  mb-2">
              <div>
                <a href="#">
                  <FontAwesomeIcon
                    className="contact-icon"
                    icon={faMapLocationDot}
                  />
                </a>
              </div>
              <div className="text-start ps-4 ">
                <h5>Location</h5>
                <address>
                  Kalabagan, Dhaka-1205, Bangladesh
                </address>
              </div>
            </div>
          </div>

          <div className="w-lg-50 w-md-100 w-sm-100 w-100">
            <form
              className="mb-3 container overflow-hidden"
              ref={form}
              onSubmit={sendEmail}
            >
              <input
                type="text"
                className="w-100 mt-3 form-input"
                placeholder="Your Name"
                name="user_name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />
              <br />
              <input
                type="email"
                className="w-100 mt-3 form-input"
                placeholder="Your Email Address"
                name="user_email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />
              <br />
              <input
                type="tel"
                className="input-size mt-3 form-input"
                placeholder="Your Phone Number"
                name="user_phone"
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />
              <input
                type="tel"
                className=" mt-3 input-size form-input"
                placeholder="Your Subject"
                name="user_subject"
                onChange={(event) => setSubject(event.target.value)}
                value={subject}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />

              <textarea
                className="mt-3 form-input"
                rows="5"
                cols="50"
                name="message"
                placeholder="Enter message"
                onChange={(event) => setTexts(event.target.value)}
                value={texts}
                style={{
                  backgroundColor: "white",
                  fontSize: "20px",
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "500px",
                }}
                required
              ></textarea>

              <br />
              <input type="submit" value="Send" className=" contact-btn" />
             
            </form>
          </div>
        </div>
      </div>

      

      <Footer />
    </div>
  );
};

export default Contact;
