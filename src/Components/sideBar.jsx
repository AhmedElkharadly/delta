import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  twiticon,
  homeic,
  exploreic,
  notificationic,
  messagesic,
  profileic,
  bookmarkic,
  listic,
  moreic,
  tweetic,
} from "./svg";
import "./sideBar.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const LeftPane = (props) => {
  const [cats, setCats] = useState([]);
  const [builds, setBuilds] = useState([]);
  const assets = useSelector((state) => state.assets?.assets);

  const catState = useSelector((state) => state.Categories?.categories);
  const buildState = useSelector((state) => state.Categories?.categories);
  useEffect(() => {
    setCats(catState);
    setBuilds(buildState);
  }, [catState, buildState]);
  return (
    <div className="leftpane">
      <div className="containerx px-3">
        <header className="text-center">DELTA</header>
        <nav className="d-flex flex-column justify-content-between align-items-center hieght-vh" >
          <div>
          <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
            <NavLink
              className="btn d-inline-flex align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#components-collapses"
              aria-expanded="false"
              aria-current="false"
            >
              {listic}
              <span className="fs-5 text-white">Assets</span>{" "}
            </NavLink>
            <div className="collapse" id="components-collapses">
              <ul className="list-unstyled small">
                {assets.map((asset, index) => {
                  if (index <= 3)
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
                <NavLink to="/categories/assets" className="text-decoration-none border-bottom small text-white ">
                  Show more..!
                </NavLink>
              </ul>
            </div>
          </li>
          <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
            <NavLink
              className="btn d-inline-flex align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#components-collapse"
              aria-expanded="false"
              aria-current="false"
            >
              {exploreic}
              <span className="fs-5 text-white">Categories</span>{" "}
            </NavLink>
            <div className="collapse" id="components-collapse">
              <ul className="list-unstyled small">
                {cats.map((cat, index) => {
                  if (index <= 3)
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
                <NavLink to="/categories" className="text-decoration-none border-bottom small text-white ">
                  Show more..!
                </NavLink>
              </ul>
            </div>
          </li>
          <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
            <NavLink
              className="btn d-inline-flex align-items-center rounded "
              data-bs-toggle="collapse"
              data-bs-target="#buildings-collapse"
              aria-expanded="false"
              aria-current="false"
            >
              {homeic}
              <span className="fs-5 text-white">Buildings</span>{" "}
            </NavLink>
            <div className="collapse" id="buildings-collapse">
              <ul className="list-unstyled fw-normal pb-1 small">
                {builds.map((build, index) => {
                  if (index <= 3)
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
          </li>
          </div>
      <UserInfo />
        </nav>
      </div>

    </div>
  );
};

export default LeftPane;
