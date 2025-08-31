import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./BuyContact.css";
// import Header from './Shared/Header/Header';
import { toast } from "react-toastify";
import Header from "./Shared/Header/Header";
import { CartProvider } from "../hooks";

const BuyContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [texts, setTexts] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPhone("");
    setProduct("");
    setTexts("");

    emailjs
      .sendForm(
        "service_5dfudlk",
        "template_1auqkvs",
        form.current,
        "s2JMah9F8HqJXd99w"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          toast.success("Sent Successfully!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="container my-5  overflow-hidden">
        <h1 className="text-center my-5 ">
          <span className=" contact-font">Buy Now</span>
        </h1>

        <h1 className="text-center mt-5">Get In Touch With Us</h1>
        <p className="text-center">
          Anything On Your Mind. We'll Be Glad To Assist you!
        </p>

        <div
          id="contactForm"
          className="d-flex flex-lg-row flex-md-column flex-sm-column flex-column gap-5"
        >
          {/* <div className="w-100">
            <img className="contact-img" src={contactImg} alt="contact Img" />
          </div> */}
          <div className="w-100">
            <form className="mb-3" ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                className="w-100 mt-3 border"
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
                className="w-100 mt-3 border"
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
                className="form-width mt-3 border"
                placeholder="Your Phone Number"
                name="user_phone"
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />
              <input
                type="tel"
                className=" mt-3 form-width border"
                placeholder="product name"
                name="product_name"
                onChange={(event) => setProduct(event.target.value)}
                value={product}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              />

              <textarea
                className="mt-3 w-100"
                rows="5"
                cols="35"
                name="message"
                placeholder="Enter message"
                onChange={(event) => setTexts(event.target.value)}
                value={texts}
                style={{ backgroundColor: "white", fontSize: "20px" }}
                required
              ></textarea>
              <br />
              <input type="submit" value="Send" className="contact-btn" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyContact;
