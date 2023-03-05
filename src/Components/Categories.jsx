import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategorie } from "../redux/features/categories";
import DeleteAlert from "./deleteConfirmation";
import { catIc } from "./svg";
import "./categories.css";

function Categories(props) {
  const [assetsNum, setAssetsNum] = useState(0);
  const [userExist, setUserExist] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editedCategory, setEditedCategory] = useState();

  const assets = useSelector((state) => state.assets?.assets);
  const myUser = useSelector((state) => state.login?.user);

  const token = localStorage.getItem("token");
  const dispach = useDispatch();

  const assetsFilter = () => {
    setAssetsNum(
      assets.filter((asset) => {
        return props.id == asset.catId;
      })?.length
    );
  };

  useEffect(() => {
    assetsFilter();
    token ? setUserExist(true) : setUserExist(false);
    console.log(props);
    console.log(editedCategory);
    setEditedCategory(props?.cat);
  }, [localStorage.length]);

  const handleDeletCategory = (id) =>
    dispach(deleteCategorie(editedCategory.id));
  const handleShowDeleteConfrmation = (cat) => setShowDelete(true);
  const handleCloseDeleteConfirmation = () => setShowDelete(false);

  return (
    <div
      className="container cardContainer  px-3 py-3"
      style={{
        backgroundColor: props.pBgColor,
        width: props.w,
        height: props.h,
      }}
    >
      {userExist && myUser[0].type == "Admin" && (
        <div className="w-100 d-flex justify-content-end">
          <button
            type="button"
            onClick={() => {
              handleShowDeleteConfrmation(editedCategory);
            }}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h3
        className="pCat"
        style={{
          color: props.color,
        }}
      >
        {catIc}
        {props.name}
      </h3>
      <div className="d-flex justify-content-between">
        <span>
          {assetsNum} {assetsNum == 1 ? " Asset" : " Assets"}
        </span>
        <NavLink
          to={"/categories/assets/" + props.id}
          className="showMore fs-6 "
        >
          ShowMore
        </NavLink>
      </div>
      <DeleteAlert
        show={showDelete}
        handleClose={handleCloseDeleteConfirmation}
        handleShow={handleShowDeleteConfrmation}
        element={editedCategory}
        delete={handleDeletCategory}
      />
    </div>
  );
}

export default Categories;
