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

const LeftPane = (props) => {
  const [cats, setCats] = useState([]);
  const [builds, setBuilds] = useState([]);

  const catState = useSelector((state) => state.Categories?.categories);
  const buildState = useSelector((state) => state.Categories?.categories);
  useEffect(() => {
    setCats(catState);
    setBuilds(buildState);
  }, [catState, buildState]);
  return (
    <div className="leftpane">
      <div className="containerx px-3">
        <header>Dashboard</header>
        <nav>
          <li className="align-items-center d-flex flex-column justify-content-center list-unstyled mb-1">
            <NavLink
              className="btn d-inline-flex align-items-center rounded "
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
                <NavLink to="/categories" className="showMore small text-white ">
                  ShowMore...
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
        </nav>
      </div>
    </div>
  );
};

export default LeftPane;
