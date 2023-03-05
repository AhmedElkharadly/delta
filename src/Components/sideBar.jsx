import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { homeic, exploreic, profileic, listic } from "./svg";
import "./sideBar.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import { deleteUser } from "../redux/features/user";
import { Button } from "react-bootstrap";

const LeftPane = (props) => {
  const [cats, setCats] = useState([]);
  const [builds, setBuilds] = useState([]);
  const assets = useSelector((state) => state.assets?.assets);
  const [localS, setLocalS] = useState(false);
  const dispach = useDispatch();
  const catState = useSelector((state) => state.Categories?.categories);
  const navigate = useNavigate();
  const buildState = useSelector((state) => state.Categories?.categories);
  useEffect(() => {
    setCats(catState);
    setBuilds(buildState);
  }, [catState, buildState]);

  const signOut = () => {
    dispach(deleteUser());
    localStorage.removeItem("token");
    navigate("/login");
    setLocalS(false);
  };
  return (
    <div className="leftpane">
      <div className="containerx px-3">
        <header className="text-center">DELTA</header>
        <nav className="d-flex flex-column justify-content-between align-items-center hieght-vh">
          <div>
            <li className="d-flex align-items-center  flex-column justify-content-center list-unstyled mb-1">
              <NavLink className="btn d-inline-flex align-items-center " to="/">
                {profileic}
                <span className="fs-5 text-white">Home</span>{" "}
              </NavLink>
            </li>
            <li className="d-flex align-items-center  flex-column justify-content-center list-unstyled mb-1">
              <NavLink
                className="btn d-inline-flex align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#assets-collapse"
                aria-expanded="false"
                aria-current="false"
              >
                {listic}
                <span className="fs-5 text-white">Assets</span>{" "}
              </NavLink>
              <div className="collapse" id="assets-collapse">
                <ul className="list-unstyled small">
                  {assets.map((asset, index) => {
                    if (index <= 2)
                      return (
                        <li key={asset.id}>
                          <Link
                            to={"/categories/assets/" + asset.id}
                            className="text-decoration-none text-white d-inline-flex align-items-center rounded"
                          >
                            {asset.name}
                          </Link>
                        </li>
                      );
                  })}
                  <NavLink
                    to="/categories/assets"
                    className="text-decoration-none border-bottom small text-white "
                  >
                    Show more..!
                  </NavLink>
                </ul>
              </div>
            </li>
            <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
              <NavLink
                className="btn d-inline-flex align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#categories-collapse"
                aria-expanded="false"
                aria-current="false"
              >
                {exploreic}
                <span className="fs-5 text-white">Categories</span>{" "}
              </NavLink>
              <div className="collapse" id="categories-collapse">
                <ul className="list-unstyled small">
                  {cats.map((cat, index) => {
                    if (index <= 2)
                      return (
                        <li key={cat.id}>
                          <Link
                            to={"/categories/assets/" + cat.id}
                            className="text-decoration-none text-white d-inline-flex align-items-center rounded"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      );
                  })}
                  <NavLink
                    to="/categories"
                    className="text-decoration-none border-bottom small text-white "
                  >
                    Show more..!
                  </NavLink>
                </ul>
              </div>
            </li>
            <li className="align-items-center parent  d-flex flex-column justify-content-center list-unstyled mb-1">
              <NavLink
                // aria-details="Disabled"
                className="btn d-inline-flex align-items-center rounded disabled "
                data-bs-toggle="collapse"
                data-bs-target="#buildings-collapse"
                aria-expanded="false"
                aria-current="false"
              >
                {homeic}
                <span className="fs-5 text-white">Buildings</span>{" "}
              </NavLink>
              <div className="collapse " id="buildings-collapse">
                <ul className="list-unstyled fw-normal pb-1 small">
                  {builds.map((build, index) => {
                    if (index <= 2)
                      return (
                        <li key={build.id}>
                          <Link
                            // to={}
                            className="text-decoration-none text-white d-inline-flex align-items-center rounded  "
                          >
                            {build.name}
                          </Link>
                        </li>
                      );
                  })}
                  <NavLink className="showMore fs-6 text-white ">
                    ShowMore...
                  </NavLink>
                </ul>
              </div>
              <span className="child">I am disabled for while</span>
            </li>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <UserInfo />
            {localStorage.key("token") == null ? (
              " "
            ) : (
              <Button className="btn border-0 p-1 bg-dark" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default LeftPane;
