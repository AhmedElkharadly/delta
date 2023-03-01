import "./style.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { addUser } from "../redux/features/register";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RegistrationForm = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [emailExists, setEmailExsist] = useState(false)

useEffect(()=>{
  setEmailExsist(false)
},[inputs.email])

  const users = useSelector((state) => state.register?.users);
  const dispach = useDispatch();
  const navigate = useNavigate();
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
      users?.forEach(user => {
        if (user.email === inputs.email) {
          setEmailExsist(true);
        }
      });
      if (emailExists) {
        alert("This Email is Exist Befour");
        console.log(inputs)
        console.log(emailExists)
      } else {
        dispach(addUser(inputs))
        navigate('/login')
      }
    }
    

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordRegex.test(inputs.password) &&
    inputs.password === inputs.passwordConfirmation &&
    emailRegex.test(inputs.email)
      ? (checkEmail(users, inputs))
      : alert(
          "Please check your Email & your Password that should be identical to the confirmation Password"
        );
  };

  return (
    <section
      className="p-4 bg-image h-100 d-flex justify-content-center align-items-center"
      // style={{
      //   backgroundImage:
      //     "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      // }}
    >
      <div
        className="mask d-flex align-items-center gradient-custom-3 w-75 justifiy-content-center"
        style={{ borderRadius: "30px", border: "none" }}
      >
        <div className="container w-75">
          <div className="row d-flex justify-content-center align-items-center ">
            <div
              className="card bg-transparent"
              style={{ borderRadius: "15px", border: "none" }}
            >
              <div className="card-body p-3">
                <h2 className="text-uppercase text-center mb-3">
                  Create an account
                </h2>

                <form>
                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example1cg">
                      Your Name
                    </label>
                    <input
                      name="fullName"
                      type="text"
                      id="form3Example1cg"
                      className="form-control form-control-lg"
                      onChange={handleInputChange}
                      required
                      minLength="2"
                      maxLength="50"
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      id="form3Example3cg"
                      className="form-control form-control-lg"
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
                      className="form-control form-control-lg"
                      onChange={handleInputChange}
                      required
                      minLength="8"
                      maxLength="50"
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="form3Example4cdg">
                      Repeat your password
                    </label>
                    <input
                      name="passwordConfirmation"
                      type="password"
                      id="form3Example4cdg"
                      className="form-control form-control-lg"
                      onChange={handleInputChange}
                      required
                      minLength="8"
                      maxLength="50"
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3cg"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="form2Example3g"
                    >
                      I agree all statements in{" "}
                      <Link to="#!" className="text-body">
                        <u>Terms of service</u>
                      </Link>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-2 mb-0">
                    Have already an account?{" "}
                    <Link to="/login" className="fw-bold text-body">
                      <u>Login here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegistrationForm;
