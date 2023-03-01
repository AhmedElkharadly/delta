import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddAssetForm from "./AddAssetForm";
import { Button } from "react-bootstrap";
import { addIc, listic } from "./svg";
import SearchBar from "./search";
import "./details.css";
import UserInfo from "./UserInfo";
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";

const RightPane = (props) => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [localS, setLocalS] = useState(false);

  const assetsState = useSelector((state) => state.assets?.assets);
  const navigate = useNavigate();

  useEffect(() => {
    setAssets(assetsState);
    localStorage.key("token") !== null ? setLocalS(true) : setLocalS(false);
  }, [assets, localStorage.length]);

  const handleCloseAssetForm = () => {
    setShowAssetForm(false);
    navigate("/categories/assets");
  };
  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
    // navigate("/categories/assets");
  };
  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
    // navigate("/categories/assets");
  };

  const handleShowAssetForm = () => setShowAssetForm(true);
  const handleShowRegisterForm = () => setShowRegisterForm(true);
  const handleShowLoginForm = () => setShowLoginForm(true);

  const signOut = () => {
    localStorage.removeItem("token");
    setLocalS(false);
  };
  const goToLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  const goToSignup = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  return (
    <div className="rp_header w-25">
      <div className="rp_content">
        <UserInfo />
        <div className="showMore">
          <NavLink to="/categories/assets" className="fs-6 listic">
            {listic}
          </NavLink>
          <Button
            className="d-flex justify-content-center align-items-center fs-6 text-decoration-none m-2"
            onClick={handleShowAssetForm}
          >
            {addIc}
            New Asset
          </Button>
        </div>
        <div className="catContainer">
          <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
            <NavLink
              to="/categories/assets"
              className="  d-inline-flex text-decoration-none align-items-center rounded "
              data-bs-toggle="collapse"
              data-bs-target="#Assets-collapse"
              aria-expanded="false"
              aria-current="false"
            >
              <span className="fs-5  ">Show Our Assets</span>
            </NavLink>
            <div
              className="collapse d-flex-col align-items-center "
              id="Assets-collapse"
            >
              <ul className="">
                {assets.map((asset, index) => {
                  // if (index <= 3)
                  return (
                    <li key={asset.id}>
                      <Link className="text-decoration-none text-dark ">
                        {asset.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </div>
        <div className="d-flex justify-content-center py-4">
          {localS ? (
            <Button className="btn btn-danger" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <div>
              <Button
                className="btn btn-success"
                onClick={handleShowRegisterForm}
              >
                SignUp
              </Button>{" "}
              <Button className="btn btn-success" onClick={handleShowLoginForm}>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
      <AddAssetForm
        show={showAssetForm}
        handleClose={handleCloseAssetForm}
        handleShow={handleShowAssetForm}
      />
      <RegistrationForm
        goToLogin={goToLogin}
        show={showRegisterForm}
        handleClose={handleCloseRegisterForm}
        handleShow={handleShowRegisterForm}
      />
      <Login
        goToSignup={goToSignup}
        show={showLoginForm}
        handleClose={handleCloseLoginForm}
        handleShow={handleShowLoginForm}
      />
    </div>
  );
};

export default RightPane;
