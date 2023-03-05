import React from "react";
import Button from "./button";
import { editIc, deleteIc } from "./svg";
import "./assets.css";

const Assets = (props) => {
  return (
    <div className="assetCard" style={{}}>
      <h3 className="">{props.name}</h3>
      <div className="">
        <span>
          <b>Quantity : </b>
          {props.AssetQuantity}
        </span>
        <span>
          <b>Accessed Department : </b>
          {props.AssetDepartment}
          <input type="checkbox" />
        </span>
        <span>
          <b>Components : </b>
          {props.AssetComponents?.map((data) => {})}
          <input type="checkbox" />
        </span>
        <div className="buttons">
          <Button name="" icon={editIc} bgColor="white  " w="30%" />
          <Button name="" icon={deleteIc} bgColor="white" w="30%" />
        </div>
      </div>
    </div>
  );
};

export default Assets;
