import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [emailExists, setEmailExsist] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [display, setDisplay] = useState(false);
  const users = useSelector((state) => state.register?.users);
  const navigate = useNavigate();

  useEffect(() => {
    // checkEmail(users, inputs);
  }, [display, successfulLogin, emailExists]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInputs({ ...inputs, [name]: value });
  };

  const checkEmail = () => {
    users?.forEach((user) => {
      if (user.email === inputs.email) {
        setEmailExsist(true);
        if (user.email === inputs.email && user.password === inputs.password) {
          localStorage.setItem("token", user.token);
          console.log("true");
          //setSuccessfulLogin(true);
          props.handleClose();
          navigate("/categories/assets");
          setInputs({ email: "", password: "" });
        } else if (
          user.email !== inputs.email &&
          user.password !== inputs.password
        ) {
          return (
            setSuccessfulLogin(false), setEmailExsist(false), setDisplay(true)
          );
        }
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkEmail();
    console.log();
    if (!successfulLogin) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                display ? "alert alert-danger displayed" : "notDisplayed"
              }
            >
              {emailExists && !successfulLogin
                ? "Password Incorrect"
                : emailExists && successfulLogin
                ? setDisplay(false)
                : "Please Enter Valid Email and Password"}
            </div>
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
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-block gradient-custom-4 text-body"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
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
        </form>
      </Modal>
    </>
  );
}

export default Login;
