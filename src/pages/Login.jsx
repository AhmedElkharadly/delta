import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { addUser } from "../redux/features/user";
import { backSVG } from "../Components/svg";
import "./login.css";
import {
  FacebookLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import swal from "sweetalert";

function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [emailExists, setEmailExsist] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const users = useSelector((state) => state.register?.users);
  const navigate = useNavigate();
  const dispach = useDispatch();

  
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInputs({ ...inputs, [name]: value });
  };
  
  useEffect(() => {
    showAlert &&
      swal({
        icon: "error",
        button: false,
        text: "email and password incorrect"
            
      });
    console.log(emailExists);
  }, [inputs, showAlert]);
  const checkEmail = () => {
    users?.forEach((user) => {
        if (user.email === inputs.email && user.password === inputs.password) {
          localStorage.setItem("token", user.token);
          dispach(addUser(user));
          console.log("true");
          navigate("/");
          setShowAlert(false)
          setInputs({ email: "", password: "" });
        } else return setShowAlert(true) 
      }
);
  };
  const handleError = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkEmail();
    handleError();
  };

  return (
    <>
      <div className="container">
        <div className="backgroundImg">{backSVG}</div>
        <form className="dropForm  d-flex align-items-center justify-content-center  p-5 ">
          <div className="w-50 d-flex flex-column align-items-center justify-content-center">
            <Modal.Header className="d-flex  align-items-center justify-content-center  ">
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card-body p-3">
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form3Example3cg">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="form3Example3cg"
                    className="form-control "
                    onChange={handleInputChange}
                    required
                    minLength="5"
                    maxLength="50"
                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form3Example4cg">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="form3Example4cg"
                    className="form-control "
                    onChange={handleInputChange}
                    required
                    minLength="8"
                    maxLength="50"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-block gradient-custom-4 text-body"
                onClick={handleSubmit}
              >
                Login
              </button>
            </Modal.Footer>
            <p className="text-center text-muted">
              Dont have an account?{" "}
              <Button
                onClick={props.goToSignup}
                className="bg-transparent border-0  p-0 fw-bold text-body"
              >
                <u className="text-decoration-none">Sign Up</u>
              </Button>
            </p>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <FacebookLoginButton
                className="w-auto"
                onClick={() => alert("Hello")}
              />
              <InstagramLoginButton
                className="w-auto"
                onClick={() => alert("Hello")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
