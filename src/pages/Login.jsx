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
import RegistrationForm from "./Register";
import { Suspense } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./Settings";
import useMeasure from "react-use-measure";
function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [emailExists, setEmailExsist] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const users = useSelector((state) => state.register?.users);
  const navigate = useNavigate();
  const dispach = useDispatch();
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const myUser = useSelector((state) => state?.login?.user);
  const assets = useSelector((state) => state?.assets?.assets);
  const categories = useSelector((state) => state?.Categories?.categories);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
        text: "email and password incorrect",
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
        setShowAlert(false);
        setInputs({ email: "", password: "" });
      } else return setShowAlert(true);
    });
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

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };
  const handleCloseRegisterForm = () => setShowRegisterForm(false);

  return (
    <div className="containerAll d-flex flex-row-reverse justify-content-evenly align-items-center flex-wrap">
      <MotionConfig className="animationPart" transition={transition}>
        <motion.button
          className="animatedButton"
          ref={ref}
          initial={false}
          animate={isHover ? "hover" : "rest"}
          whileTap="press"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.2 },
          }}
          onHoverStart={() => {
            resetMousePosition();
            setIsHover(true);
          }}
          onHoverEnd={() => {
            resetMousePosition();
            setIsHover(false);
          }}
          onTapStart={() => setIsPress(true)}
          onTap={() => setIsPress(false)}
          onTapCancel={() => setIsPress(false)}
          onPointerMove={(e) => {
            mouseX.set(e.clientX - bounds.x - bounds.width / 2);
            mouseY.set(e.clientY - bounds.y - bounds.height / 2);
          }}
          onClick={() => {setShowRegisterForm(true)}}
        >
          <motion.div
            className="shapes"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            >
            <div className="pink blush" />
            <div className="blue blush" />
            <div className="container">
              <Suspense fallback={null}>
                <Shapes
                  isHover={isHover}
                  isPress={isPress}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  />
              </Suspense>
            </div>
          </motion.div>
          <motion.label
            variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
            className="labela fs-5"
            >
            Hello There..! Do you want to Join us <black>Register Now</black>
          </motion.label>
        </motion.button>
      </MotionConfig>
            {/* {backSVG} */}
      <form className="dropForm  d-flex align-items-center justify-content-center  p-m-5 ">
        <div className="w-75 d-flex flex-column align-items-center justify-content-center loginContainer">
          <Modal.Header className="d-flex w-100 align-items-center justify-content-center  ">
            <Modal.Title className="fs-1">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="w-100">
            <div className="card-body p-3">
              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example3cg">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="form3Example3cg"
                  className="form-control w-100"
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
                  className="form-control w-100"
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
              onClick={handleShowRegisterForm}
              className="bg-transparent border-0  p-0 fw-bold text-body"
            >
              <u className="text-decoration-none">Sign Up</u>
            </Button>
          </p>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <FacebookLoginButton
              className="w-auto"
              onClick={() => swal( {text: "Soon I Will Be Able To Login With FaceBook" , icon: "warning", button: false})}
            />
            <InstagramLoginButton
              className="w-auto"
              onClick={() => swal( {text: "Soon I Will Be Able To Login With Instgram" , icon: "warning",button: false})}
            />
          </div>
        </div>
      </form>
      <RegistrationForm
        goToLogin={handleCloseRegisterForm}
        show={showRegisterForm}
        handleClose={handleCloseRegisterForm}
        handleShow={handleShowRegisterForm}
      />
    </div>
  );
}

export default Login;
