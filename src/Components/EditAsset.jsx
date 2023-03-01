// In This Section I just want to know how to get the Asset That i want to Edit from all the Assets
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategorie } from "../redux/features/categories";

function EditAsset(props) {
  const [display, sitDisplay] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    lable: "",
    catId: "",
    components: "",
  });
  const [assetExist, setassetExist] = useState(false);

  const assets = useSelector((state) => state.assets?.assets);
  //   const asset = assets.filter((everyasset) => everyasset.id === props.assetid)
  console.log(props.asset);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    console.log(props.assetid);
  }, [inputs]);

  const discard = () => {
    setInputs({ ...inputs, name: "" });
    navigate("/categories/assets");
    return;
  };
  //   const handleExistError = () => {
  //     catState?.map((cat) => {
  //       if (inputs.name === cat.name) {
  //         return setassetExist(true), sitDisplay(true);
  //       }
  //       if (inputs.name == "") sitDisplay(true);
  //     });
  //   };

  const handleSubmit = () => {
    // handleExistError();
    // if (assetExist !== true && display == false && inputs.name != "")
    //   return (
    //     dispach(addCategorie(inputs)), props.handleClose(), setInputs.name("")
    //   );
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
                placeholder={props.asset?.name}
                value={inputs.title}
                // onBlur={handleExistError}
                onChange={handleInputChange}
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
                placeholder={props.asset?.lable}
                value={inputs.lable}
                // onBlur={handleExistError}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="catname" className="form-label">
                Category
              </label>
              <input
                name="catId"
                required
                type="text"
                className="form-control"
                id="catname"
                placeholder={props.asset?.catId}
                value={inputs.catId}
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
