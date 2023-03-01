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

const RightPane = (props) => {
  const [show, setShow] = useState(false);
  const [assets, setAssets] = useState([]);
  const [localS, setLocalS] = useState(false);

  const assetsState = useSelector((state) => state.assets?.assets);
  const navigate = useNavigate();

  useEffect(() => {
    setAssets(assetsState);
    localStorage.key("token") !== null ? setLocalS(true) : setLocalS(false);
    // console.log(localS)
  }, [assets, localStorage.length]);

  const handleClose = () => {
    setShow(false);
    navigate("/categories/assets");
  };
  const handleShow = () => setShow(true);

  const signOut = () => {
    localStorage.removeItem("token");
    setLocalS(false)
  };
  const goLogin = () => {
    navigate("/login");
  };
  const goSignUp = () => {
    navigate("/signup");
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
            onClick={handleShow}
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
            <Button className="btn btn-danger" onClick={signOut}>Sign Out</Button>
            ) : (
              <div><Button className="btn btn-success" onClick={goSignUp}>SignUp</Button> <Button className="btn btn-success" onClick={goLogin}>Login</Button></div> 
          )}
        </div>
      </div>
      <AddAssetForm
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default RightPane;
