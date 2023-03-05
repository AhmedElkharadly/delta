import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { addAsset } from "../redux/features/assets";

const AddAssetForm = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    lable: 0,
    catId: 0,
    components: "",
    location: "",
  });
  const [display, setDisplay] = useState(false);

  const categories = useSelector((state) => state.Categories?.categories);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setDisplay(false);
  }, [inputs]);

  const handleInputsChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAddAssets = () => {
    if (
      inputs.name !== "" &&
      inputs.catId !== "" &&
      inputs.components !== "" &&
      inputs.location !== ""
    ) {
      dispach(addAsset(inputs));
      props.handleClose();
      setInputs({
        name: "",
        lable: "",
        catId: "",
        components: "",
        location: "",
      });
      navigate("/categories/assets");
    } else {
      setDisplay(true);
    }
  };

  return (
    <>
      <Modal show={props.show} className="pt-0 mt-0" onHide={props.handleClose}>
        <form className="dropForm pt-0 mt-0">
          <Modal.Header closeButton>
            <Modal.Title>Add Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                display ? "alert alert-danger  displayed" : "visually-hidden"
              }
            >
              Please Fill The Required Fields
            </div>
            <div className="mb-3">
              <label
                htmlFor="assetName"
                className="form-label d-flex m-0 p-0 "
                style={{ marginLeft: "0px" }}
              >
                Name <p className="text-danger m-0 p-0"> *</p>
              </label>
              <input
                required={true}
                data-error="Please accept our policy."
                name="name"
                type="email"
                className="form-control"
                id="assetName"
                placeholder="Asset Name..."
                onChange={handleInputsChange}
                aria-autocomplete="false"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="assetQuantity"
                className="form-label d-flex m-0 p-0"
              >
                Quantity
              </label>
              <input
                name="lable"
                type="email"
                className="form-control"
                id="assetQuantity"
                placeholder="Quantity ..."
                onChange={handleInputsChange}
                aria-autocomplete="false"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="assetComponents"
                className="form-label d-flex m-0 p-0"
              >
                Components <p className="text-danger m-0 p-0"> *</p>
              </label>
              <input
                name="components"
                type="text"
                className="form-control"
                id="assetComponents"
                placeholder="Comonents..."
                onChange={handleInputsChange}
                aria-autocomplete="false"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="assetCategory"
                className="form-label d-flex m-0 p-0"
              >
                Category <p className="text-danger m-0 p-0"> *</p>
              </label>
              <input
                name="catId"
                id="assetCategory"
                list="datalistOptions"
                className="form-control"
                placeholder="Pick a Category..."
                onChange={handleInputsChange}
              />
              <datalist
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
              </datalist>
            </div>
            <div className="mb-3">
              <label
                htmlFor="assetlocation"
                className="form-label d-flex m-0 p-0"
              >
                Location <p className="text-danger m-0 p-0"> *</p>
              </label>
              <input
                name="location"
                type="text"
                className="form-control"
                id="assetlocation"
                placeholder="Location..."
                onChange={handleInputsChange}
                aria-autocomplete="false"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn gradient-custom-4 border-0"
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
