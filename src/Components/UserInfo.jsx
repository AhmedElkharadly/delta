//How to handle the Page When there is no user
import React, { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { notificationic } from "./svg";

function UserInfo() {
  const [theUser, setTheUser] = useState();
  const myUser = useSelector((state)=> state.login?.user)
  const getUser = localStorage?.getItem("token");
  useEffect(() => {
    setTheUser(myUser[0]);
  }, [localStorage.length]);

  // console.log(myUser);

  return (
    <div className="p-3 text-center border-bottom">
      <h6>
        {notificationic}
        {localStorage.key('token') == null ? "Delta Dashboard" : "Hello, " + myUser[0].fullName +".." } 
      </h6>
    </div>
  );
}

export default UserInfo;
