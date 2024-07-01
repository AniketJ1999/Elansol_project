import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaCalendar, FaEnvelope } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { name, dob, email, password } = data.errors;
          if (name) generateError(name);
          else if (dob) generateError(dob);
          else if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>CREATE ACCOUNT</h2>
        </div>
        <div className="login-avatar">
          <PiUserCircleFill className="img" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <FaCalendar className="input-icon" />
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button type="submit" className="login-button">
            Register
          </button>
          <span className="options">
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
