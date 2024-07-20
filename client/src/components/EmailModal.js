import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../utils/apiURL";

const EmailModal = () => {
  const [email, setEmail] = useState("");
  const [InvalidMail, setInValidMail] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message]);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //Subscribe
  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      setInValidMail(true);
      setMessage(false);
    } else {
      setInValidMail(false);
      axios
        .post(`${apiURL}/subscribe?email=${email}`)
        .then((res) => {
          setMessage(true);
          setMessageContent(res.data.message);
          console.log(res.data.emailToken); // emailToken
        })
        .catch((err) => {
          setMessage(true);
          setMessageContent(err.response.data.message);
        });
    }
  };

  //unsubscribe
  const handleUnsubscribe = () => {
    if (!validateEmail(email)) {
      setInValidMail(true);
      setMessage(false);
    } else {
      setInValidMail(false);
      axios
        .post(`${apiURL}/unsubscribe?email=${email}`)
        .then((res) => {
          setMessage(true);
          setMessageContent(res.data.message);
        })
        .catch((err) => {
          setMessage(true);
          setMessageContent(err.response.data.message);
        });
    }
  };

  return (
    <div className="emailModal w-75">
      <div className="emailModal_content w-100">
        <h3 style={{ fontSize: "1rem" }}>Your Email:</h3>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          value={email}
          placeholder="Enter your email"
          className="w-100"
        />
        {InvalidMail && (
          <p style={{ color: "red" }}>Invalid email, please try again!</p>
        )}
      </div>
      <div className="emailModal_button">
        <button className="btn btn-success" onClick={handleSubscribe}>
          Subscribe
        </button>
        <button className="btn btn-danger" onClick={handleUnsubscribe}>
          Unsubscribe
        </button>
      </div>
      {message && (
        <p style={{ color: "black", fontWeight: "500", marginBottom: "0px" }}>
          {messageContent}
        </p>
      )}
    </div>
  );
};

export default EmailModal;
