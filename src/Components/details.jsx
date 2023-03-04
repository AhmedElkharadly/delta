import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddAssetForm from "./AddAssetForm";
import { Button } from "react-bootstrap";
import { addIc, listic } from "./svg";
import SearchBar from "./search";
import "./details.css";
import UserInfo from "./UserInfo";
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";
import { deleteUser } from "../redux/features/user";

const RightPane = (props) => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [localS, setLocalS] = useState(false);

  const assetsState = useSelector((state) => state.assets?.assets);
  
  const navigate = useNavigate();
  const dispach = useDispatch()
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
    dispach(deleteUser())
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
  const goToAllAssets = () => {
    navigate("/categories/assets");
  };

  return (
    <div className="rightpane rp_header w-25 p-0  ml-3">
      <div className="rp_content border-bottom ">
        <div className="showMore"></div>
        <div className="catContainer">
          <li className="align-items-center d-flex flex-column justify-content-center  list-unstyled mb-1">
            <div
              to="/categories/assets"
              className="  d-inline-flex text-decoration-none align-items-center rounded fs-6 listic"
              data-bs-toggle="collapse"
              data-bs-target="#Assets-collapse"
              aria-expanded="false"
              aria-current="false"
            >
              {listic}
            </div>
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
              <div className="d-flex justify-content-center align-items-center flex-column">
              
              <Button
                className="d-flex justify-content-center align-items-center border-0 fs-6 text-decoration-none m-2 gradient-custom-4"
                onClick={goToAllAssets}
                >
                Assets Detailed
              </Button>
              
                </div>
            </div>
          </li>
        </div>
        <div className="d-flex justify-content-center py-4 allign-items-center bottom-0">
          {localS ? (
            <Button className="btn gradient-custom-4 border-0" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <div>
              <Button
                className="btn gradient-custom-4 border-0"
                onClick={handleShowRegisterForm}
              >
                SignUp
              </Button>{" "}
              <Button className="btn gradient-custom-4 border-0" onClick={handleShowLoginForm}>
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
