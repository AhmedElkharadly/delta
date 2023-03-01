import "./style.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { addUser } from "../redux/features/register";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

function RegistrationForm(props) {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [emailExists, setEmailExsist] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setEmailExsist(false);
  }, [inputs.email]);

  const users = useSelector((state) => state.register?.users);
  const dispach = useDispatch();
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputs({ ...inputs, [name]: value });
  };
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const checkEmail = (users, inputs) => {
    users?.forEach((user) => {
      if (user.email === inputs.email) {
        setEmailExsist(true);
      }
    });
    if (emailExists) {
      alert("This Email is Exist Befour");
      console.log(inputs);
      console.log(emailExists);
    } else {
      dispach(addUser(inputs));
      setInputs({
        fullName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
      props.handleClose();
      props.goToLogin();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordRegex.test(inputs.password) &&
    inputs.password === inputs.passwordConfirmation &&
    emailRegex.test(inputs.email)
      ? checkEmail(users, inputs)
      : setDisplay(true);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Create An Account</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-1">
            <div
              className={
                display ? "alert alert-danger displayed" : "notDisplayed"
              }
            >
              {emailRegex.test(inputs.email) 
              ?"Please check your Email & your Password that should be identical to the confirmation Password" 
              :"Please Fill the requierd Fields"}
                          </div>
            <div className="card-body p-3 pb-0">
              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example1cg">
                  Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  id="form3Example1cg"
                  className="form-control "
                  onChange={handleInputChange}
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>

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

              <div className="form-outline mb-1">
                <label className="form-label" htmlFor="form3Example4cdg">
                  Repeat Password
                </label>
                <input
                  name="passwordConfirmation"
                  type="password"
                  id="form3Example4cdg"
                  className="form-control "
                  onChange={handleInputChange}
                  required
                  minLength="8"
                  maxLength="50"
                />
              </div>

              <div className="form-check d-flex justify-content-center">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3cg"
                />
                <label className="form-check-label" htmlFor="form2Example3g">
                  I agree all statements in{" "}
                  <Link to="#!" className="text-body">
                    <u>Terms of service</u>
                  </Link>
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn  btn-block gradient-custom-4 text-body"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </Modal.Footer>
          <p className="text-center text-muted ">
            Have already an account?{" "}
            <Button
              onClick={props.goToLogin}
              className="bg-transparent border-0  p-0 fw-bold text-body"
            >
              <u className="text-decoration-none">Login</u>
            </Button>
          </p>
        </form>
      </Modal>
    </>
  );
}
export default RegistrationForm;
