import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {}, []);

  const users = useSelector((state) => state.register?.users);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    users?.map((user) => {
      if (inputs.email === user.email && inputs.password === user.password) {
        localStorage.setItem("token", user.token);
        navigate("/categories");
      }
    });
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
                <h2 className="text-uppercase text-center mb-3">Login</h2>

                <form>
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

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>

                  <p className="text-center text-muted mt-2 mb-0">
                    Dont have an account?{" "}
                    <Link to="/signup" className="fw-bold text-body">
                      <u>Sign Up</u>
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

export default Login;
