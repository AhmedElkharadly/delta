import React from "react";
import Button from "../Components/button";
import {  useSelector } from "react-redux";
import { addIc } from "../Components/svg";
import { useState, useEffect } from "react";
import Categories from "../Components/Categories";
import { useNavigate } from "react-router-dom";
import AddCat from "../Components/AddCat";
import { motion } from "framer-motion";

const CategoriesPage = () => {
  const [show, setShow] = useState(false);
  const [cats, setCats] = useState([]);

  const [userExist, setUserExist] = useState(false);
  const token = localStorage.getItem("token");
  const users = useSelector((state) => state.register?.users);
  const myUser = users?.filter((user) => user.token === token);
  const catState = useSelector((state) => state.Categories?.categories);
  const navigate = useNavigate();

  useEffect(() => {
    setCats(catState);
    token ? setUserExist(true) : setUserExist(false);
  }, [catState, localStorage.length]);

  const handleClose = () => {
    setShow(false);
    navigate("/categories");
  };

  const handleShow = () => setShow(true);

  return (
    <div className="container mt-3 pb-5 customRes">
      <div className="row row-cols-md-3 g-2">
        {cats.map((cat) => {
          return (
            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{layout: {type: "spring", duration: 2 }}}
              key={cat.id}
            >
              <Categories cat={cat} name={cat.name} id={cat.id} />
            </motion.div>
          );
        })}
        {userExist && myUser[0].type === "Admin" && (
          <Button
            name=""
            icon={addIc}
            bgColor="white"
            color="#0A2647"
            border="1px solid #0A2647"
            HBC={handleShow}
          />
        )}
        <AddCat show={show} handleClose={handleClose} handleShow={handleShow} />
      </div>
    </div>
  );
};

export default CategoriesPage;
