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
import { deleteCategorie, editCategorie } from "../redux/features/categories";

function Categories(props) {
  const [assetsNum, setAssetsNum] = useState(0)
  const assets = useSelector((state) => state.assets?.assets);
  const [userExist, setUserExist] = useState(false)
  const token = localStorage.getItem("token") 
  
  // console.log(assetsNum)

  const myUser = useSelector((state)=> state.login?.user)
  console.log(myUser)
  const dispach = useDispatch()
  const assetsFilter = () => {
    setAssetsNum(
      assets.filter((asset) => {
        return props.id == asset.catId
      })?.length
    )
  }
  
  useEffect(() => {
    assetsFilter()
    token ? setUserExist(true) : setUserExist(false)
  }, [localStorage.length, props.id]);  

  const handleDeletCategory = (id) => {
    dispach(deleteCategorie(id))
  }
  
  const handleEditCategory = (id) => {
    dispach(editCategorie(id))
  }


  return (
    <div
      className="cardContainer px-3 py-3"
      style={{
        backgroundColor: props.pBgColor,
        width: props.w,
        height: props.h,
      }}
    >
     { userExist && myUser[0].type == "Admin" && 
    <Modal.Header className="text-centerd-flex justify-content-end " closeButton onClick={()=>{handleDeletCategory(props.id)}}></Modal.Header>}
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
      <span>{assetsNum} {assetsNum == 1? ' Asset' : ' Assets'}</span>
      <NavLink to={'/categories/assets/'+ props.id} className='showMore fs-6 '>ShowMore</NavLink>
      </div>
    </div>
  );
}

export default Categories;
