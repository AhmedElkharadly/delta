import "./categories.css";
import { Modal } from "react-bootstrap";
import {
  twiticon,
  homeic,
  exploreic,
  notificationic,
  messagesic,
  profileic,
  catIc,
  listic,
  moreic,
  tweetic,
} from "./svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAssetaByCatId } from "../redux/features/assets";
import { NavLink } from "react-router-dom";
import { deleteCategorie } from "../redux/features/categories";
import DeleteAlert from "./deleteConfirmation";

function Categories(props) {
  const [assetsNum, setAssetsNum] = useState(0);
  const assets = useSelector((state) => state.assets?.assets);
  const [userExist, setUserExist] = useState(false);
  const token = localStorage.getItem("token");
  const [showDelete, setShowDelete] = useState(false )
  const [editedCategory, setEditedCategory] = useState();

  const myUser = useSelector((state) => state.login?.user);
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
    console.log(props)
    console.log(editedCategory)
    setEditedCategory(props?.cat)
  }, [localStorage.length]);

  const handleDeletCategory = (id) => {
    dispach(deleteCategorie(editedCategory.id));
  };

  const handleEditCategory = (id) => {
    // dispac(id));
  };

  const handleShowDeleteConfrmation = (cat) => {
    setShowDelete(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setShowDelete(false);
  };

  return (
    <div
      className="cardContainer px-3 py-3"
      style={{
        backgroundColor: props.pBgColor,
        width: props.w,
        height: props.h,
      }}
    >
      {userExist && myUser[0].type == "Admin" && (
        <Modal.Header
          className="text-centerd-flex justify-content-end "
          closeButton
          onClick={() => {
            handleShowDeleteConfrmation(editedCategory);
          }}
        ></Modal.Header>
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
