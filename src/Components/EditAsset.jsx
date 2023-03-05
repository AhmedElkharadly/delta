import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsset, editAsset } from "../redux/features/assets";

function EditAsset(props) {
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

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInputs({ ...inputs, [name]: value });
  };

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
      props.handleClose();
      setInputs({
        name: "",
        lable: "",
        catId: "",
        components: "",
        id: "",
      });
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Edit Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
