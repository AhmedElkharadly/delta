// In This Section I just want to know how to get the Asset That i want to Edit from all the Assets
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategorie } from "../redux/features/categories";
import { deleteAsset, editAsset } from "../redux/features/assets";

function EditAsset(props) {
  const [display, sitDisplay] = useState(false);
  const [inputs, setInputs] = useState({
    name: props.asset?.name,
    lable: props.asset?.lable,
    catId: props.asset?.catId,
    components: props.asset?.components,
    id: props.asset?.id,
  });

  const assets = useSelector((state) => state.assets?.assets);
  const catigories = useSelector((state) => state.Categories?.categories);
  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    setInputs({
      name: props.asset?.name,
      lable: props.asset?.lable,
      catId: props.asset?.catId,
      components: props.asset?.components,
      id: props.asset?.id,
      location: props.asset?.location,
    });
  }, [props]);

  const discard = () => {
    setInputs({ name: "", lable: "", catId: "", components: "", location: "" });
    props.handleClose();
    return;
  };

  const handleSubmit = () => {
    if (
      inputs.name == "" &&
      inputs.components == "" &&
      inputs.lable == "" &&
      inputs.catId == "" &&
      inputs.location == ""
    )
      return props.handleClose();
    else {
      dispach(editAsset(inputs));
      // navigate("/categories/assets");
      props.handleClose();
      setInputs({
        name: "",
        lable: "",
        catId: "",
        components: "",
        id: "",
      });
    }
    // console.log(assets)
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Edit Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                display ? "alert alert-danger displayed" : "notDisplayed"
              }
            >
              {/* {assetExist
                ? "This Category is Already Exist "
                : "Please Fill the Title of your Category"} */}
            </div>
            <div className="mb-3">
              <label htmlFor="catname" className="form-label">
                Title
              </label>
              <input
                name="name"
                required
                type="text"
                className="form-control"
                id="catname"
                value={inputs.name}
                onChange={handleInputChange}
                placeholder={props?.asset?.name}
                // onBlur={handleExistError}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="catname" className="form-label">
                Quantity
              </label>
              <input
                required
                name="lable"
                type="text"
                className="form-control"
                id="catname"
                placeholder={props?.asset?.lable}
                value={inputs.lable}
                // onBlur={handleExistError}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="catname" className="form-label">
                Components
              </label>
              <input
                required
                name="components"
                type="text"
                className="form-control"
                id="catname"
                placeholder={props.asset?.components}
                value={inputs.components}
                // onBlur={handleExistError}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="assetCategory" className="form-label">
                Category
              </label>
              <input
                name="catId"
                required
                type="text"
                list="datalistOptions"
                className="form-control"
                id="assetCategory"
                placeholder={props?.asset?.catId}
                // value={inputs.catId}
                // onBlur={handleExistError}
                onChange={handleInputChange}
              />
              <datalist
                id="datalistOptions"
                name="catId"
                onChange={handleInputChange}
              >
                {catigories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </datalist>
              <div className="mb-3">
                <label htmlFor="assetLocation" className="form-label">
                  Location
                </label>
                <input
                  required
                  name="location"
                  type="text"
                  className="form-control"
                  id="assetLocation"
                  placeholder={props.asset?.location}
                  value={inputs.location}
                  // onBlur={handleExistError}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onMouseUp={props.handleClose}
              onClick={discard}
            >
              Discard
            </Button>
            <Button
              className="text-white"
              variant="dark"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditAsset;
