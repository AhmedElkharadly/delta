import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategorie } from "../redux/features/categories";

function AddCat(props) {
  const [display, sitDisplay] = useState(false);
  const [inputs, setInputs] = useState({ name: "" });
  const [catExist, setCatExist] = useState(false);

  const catState = useSelector((state) => state.Categories?.categories);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    sitDisplay(false);
    setCatExist(false);
  }, [inputs.name]);

  const handleTitleChange = (e) => {
    setInputs({
      ...inputs,
      name: e.target.value,
    });
    sitDisplay(false);
  };

  const discard = () => {
    setInputs({ ...inputs, name: "" });
    navigate("/categories");
    return;
  };
  const handleExistError = () => {
    catState?.map((cat) => {
      if (inputs.name === cat.name) {
        return setCatExist(true), sitDisplay(true);
      }
      if (inputs.name == "") sitDisplay(true);
    });
  };

  const handleSubmit = () => {
    handleExistError();
    if (catExist !== true && display == false && inputs.name != "")
      return dispach(addCategorie(inputs)),  props.handleClose(),setInputs.name("");
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <form className="dropForm">
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                display ? "alert alert-danger displayed" : "notDisplayed"
              }
            >
              {catExist
                ? "This Category is Already Exist "
                : "Please Fill the Title of your Category"}
            </div>
            <div className="mb-3">
              <label htmlFor="catname" className="form-label">
                Title
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="catname"
                placeholder="Title"
                value={inputs.title}
                onBlur={handleExistError}
                onChange={handleTitleChange}
              />
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
              Add Category
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddCat;
