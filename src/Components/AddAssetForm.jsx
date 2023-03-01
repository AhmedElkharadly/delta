import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { addAsset } from "../redux/features/assets";
import { useDispatch, useSelector } from "react-redux";
import "./addAssetForm.css";
import { useNavigate } from "react-router-dom";

const AddAssetForm = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    lable: 0,
    catId: 0,
    components: "",
  });

  const categories = useSelector((state) => state.Categories?.categories);
  console.log("categories", categories);

  const [display, setDisplay] = useState(false);
  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleInputsChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleAddAssets = () => {
    dispach(addAsset(inputs));
    props.handleClose();
    setInputs({ name: "", lable: "", catId: "", components: "" });
    navigate("/categories/assets");
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Add Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                display ? "alert alert-danger displayed" : "notDisplayed"
              }
            >
              <div className="mb-3">
                <label
                  htmlFor="assetName"
                  className="form-label"
                  style={{ marginLeft: "0px" }}
                >
                  Asset Name
                </label>
                <input
                  name="name"
                  type="email"
                  required
                  className="form-control"
                  id="assetName"
                  placeholder="The Asset Name is..."
                  onChange={handleInputsChange}
                  aria-autocomplete="false"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="assetQuantity" className="form-label">
                  Asset Quantity
                </label>
                <input
                  name="lable"
                  type="email"
                  className="form-control"
                  id="assetQuantity"
                  placeholder="The Quantity is ..."
                  onChange={handleInputsChange}
                  aria-autocomplete="false"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="assetComponents" className="form-label">
                  Asset Components
                </label>
                <input
                  name="components"
                  type="text"
                  className="form-control"
                  id="assetComponents"
                  placeholder="The Comonents are..."
                  onChange={handleInputsChange}
                  aria-autocomplete="false"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="assetCategory" className="form-label">
                  Category
                </label>
                {/* <input
                  name="catId"
                  id="assetCategory"
                  list="datalistOptions"
                  className="form-control"
                  placeholder="Pick a Category..."
                  onChange={handleInputsChange}
                /> */}
                <select
                  id="datalistOptions"
                  name="catId"
                  onChange={handleInputsChange}
                >
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="text-white"
              onClick={handleAddAssets}
            >
              Add Asset
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddAssetForm;
