import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/features/user";
import RegistrationForm from "../pages/Register";
import UserInfo from "./UserInfo";
import "./navbar.css";

function NavBar(props) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [localS, setLocalS] = useState(false);
const navigate = useNavigate()
  const catState = useSelector((state) => state.Categories?.categories);

  const user = useSelector((state) => state?.login?.user);

  const dispach = useDispatch();

  useEffect(() => {
    localStorage.key("token") !== null ? setLocalS(true) : setLocalS(false);
  }, [localStorage.length]);

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };
  const handleShowRegisterForm = () => setShowRegisterForm(true);

  const signOut = () => {
    dispach(deleteUser());
    localStorage.removeItem("token");
    setLocalS(false);
  };
  const goToLogin = () => {
    navigate("/login");
    setShowRegisterForm(false);
  };
  const goToSignup = () => {
    setShowRegisterForm(true);
  };

  return (
    <div className="responsiveNavBar">
      <nav className="navbar h-auto fixed-top navbar-expand-lg navbar-dark customnav ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            DELTA
          </Link>
          <UserInfo />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="d-flex justify-content-center mb-2 mb-lg-0 me-auto navbar-nav w-100">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories/assets">
                  Assets
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {catState.map((cat, index) => {
                    if (index <= 3)
                      return (
                        <li key={cat.id}>
                          <Link
                            to={"/categories/assets/" + cat.id}
                            className="dropdown-item"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      );
                  })}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      Show All Categories
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown parentt">
                <Link
                  className="nav-link dropdown-toggle disabled"
                  to="/categories"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Buildings
                </Link>
                <span className="childd">I am disabled for while</span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {catState.map((cat, index) => {
                    if (index <= 3)
                      return (
                        <li key={cat.id}>
                          <Link
                            to={"/categories/assets/" + cat.id}
                            className="dropdown-item"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      );
                  })}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item disabled" to="/categories">
                      Show All Buildings
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                {user[0] == undefined ? (
                  <div className="nav-link" tabIndex="-1" aria-disabled="true">
                    <div
                      className="nav-link"
                      onClick={goToLogin}
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Login
                    </div>
                    <div
                      className="nav-link"
                      onClick={handleShowRegisterForm}
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      SignUp
                    </div>
                  </div>
                ) : (
                  <div
                    className="nav-link"
                    onClick={signOut}
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    SignOut
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <RegistrationForm
        goToLogin={goToLogin}
        show={showRegisterForm}
        handleClose={handleCloseRegisterForm}
        handleShow={handleShowRegisterForm}
      />
    </div>
  );
}

export default NavBar;
