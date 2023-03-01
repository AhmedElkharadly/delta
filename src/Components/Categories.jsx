import "./categories.css";
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

function Categories(props) {
  const [assetsNum, setAssetsNum] = useState(0)
  const assets = useSelector((state) => state.assets?.assets);
  // console.log(assetsNum)

  const assetsFilter = () => {
    setAssetsNum(
      assets.filter((asset) => {
        return props.id == asset.catId
      })?.length
    )
  }
  
  useEffect(() => {
    assetsFilter()
  }, [props.id]);
  return (
    <div
      className="cardContainer px-3 py-3"
      style={{
        backgroundColor: props.pBgColor,
        width: props.w,
        height: props.h,
      }}
    >
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
