import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editIc, deleteIc, smallAddIc, addIc } from "../Components/svg";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { deleteAsset, getAssetaByCatId } from "../redux/features/assets";
import DeleteAlert from "../Components/deleteConfirmation";
import AddAssetForm from "../Components/AddAssetForm";
import EditAsset from "../Components/EditAsset";
import Button from "../Components/button";
import "./style.css";

function AssetsPage() {
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [theUser, setTheUser] = useState();
  const [assets, setAssets] = useState([]);
  const [catAssets, setCatAssets] = useState([]);
  const [deletedAsset, setDeletedAsset] = useState([]);
  const [editAsset, setEditAsset] = useState(null);
  const [showAssetForm, setShowAssetForm] = useState(false);

  const catAssetsState = useSelector((state) => state.assets?.getAssets);
  const catState = useSelector((state) => state.Categories?.categories);
  const assetsState = useSelector((state) => state.assets?.assets);

  const myUser = useSelector((state) => state.login?.user);
  const token = localStorage.getItem("token");

  const dispach = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispach(getAssetaByCatId(params.id));
    setAssets(assetsState);
    setCats(catState);
    setCatAssets(catAssetsState);
    setTheUser(myUser[0]);
    params.id
      ? setTitle(cats?.filter((cat) => cat.id === params.id)[0]?.name)
      : setTitle("All Assets");
  }, [title, params.id, deletedAsset, assets, myUser, assetsState]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (asset) => {
    setEditAsset(asset);
    setShow(true);
  };

  const handleShowDeleteConfrmation = (asset) => {
    setEditAsset(asset);
    setShowDelete(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    dispach(deleteAsset(editAsset.id));
    handleCloseDeleteConfirmation();
  };

  const handleCloseAssetForm = () => {
    setShowAssetForm(false);
  };
  const handleShowAssetForm = () => setShowAssetForm(true);

  return (
    <div className="-sm p-4 customRes">
      <div className="d-flex justify-content-between">
        <h1>{title}</h1>
        {token !== null && myUser[0].type == "Admin" && (
          <Button
            className="d-flex justify-content-center align-items-center fs-6 border-0 text-decoration-none m-2 gradient-custom-4 "
            HBC={handleShowAssetForm}
            h="100%"
            icon={addIc}
          />
        )}
      </div>
      <Table className="align-baseline table table-hover table-responsive table-striped text-center w-100">
        <Thead className="bg-dark text-white">
          <Tr className="gredientbg">
            {/* <th scope="col">ID</th> */}
            <Th scope="col">Name</Th>
            <Th scope="col">Quantity</Th>
            <Th scope="col">Compnents</Th>
            <Th scope="col">Category</Th>
            <Th scope="col">Location</Th>
            {token !== null && myUser[0].type == "Admin" && (
              <Th scope="col">Oprations</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {title == "All Assets"
            ? assets?.map((asset) => {
                return (
                  <Tr key={asset.id}>
                    {/* <td>{asset.id}</td> */}
                    <Td scope="row">{asset.name}</Td>
                    <Td>
                      {(parseInt(asset.lable) <= 1 || asset.lable === "") &&
                      token !== null &&
                      myUser[0].type == "Admin" ? (
                        <div className="d-flex justify-content-end align-items-center">
                          {asset.lable}
                          <Button
                            HBC={() => {
                              handleShow(asset);
                            }}
                            p="0"
                            ml="4px"
                            icon={smallAddIc}
                          />
                        </div>
                      ) : (
                        asset.lable
                      )}
                    </Td>
                    <Td>{asset?.components?.toString()}</Td>
                    <Td>
                      {cats.map((cat) => {
                        return cat.id == asset.catId && cat.name;
                      })}
                    </Td>
                    <Td className="locationtd">
                      {asset?.location?.toString()}
                    </Td>
                    {token !== null && myUser[0].type == "Admin" && (
                      <Td className="">
                        <Button
                          cname=""
                          icon={editIc}
                          bgColor="  "
                          w=""
                          HBC={() => handleShow(asset)}
                        />
                        <Button
                          HBC={() => {
                            handleShowDeleteConfrmation(asset);
                          }}
                          icon={deleteIc}
                          bgColor="tranceparent"
                        />
                      </Td>
                    )}
                  </Tr>
                );
              })
            : catAssets?.map((catasset) => {
                return (
                  <Tr key={catasset.id}>
                    <Td scope="row">{catasset.name}</Td>
                    <Td>
                      {parseInt(catasset.lable) < 1 ||
                      catasset.lable === " " ? (
                        <Button
                          HBC={() => handleShow(catasset)}
                          name=""
                          icon={smallAddIc}
                        />
                      ) : (
                        catasset.lable
                      )}
                    </Td>
                    <Td>{catasset.components.toString()}</Td>
                    <Td>
                      {cats.map((cat) => {
                        return cat.id == catasset.catId && cat.name;
                      })}
                    </Td>
                    <Td>{catasset?.location?.toString()}</Td>
                    {token !== null && myUser[0].type == "Admin" && (
                      <Td className="">
                        <Button
                          HBC={() => handleShow(catasset)}
                          icon={editIc}
                        />
                        <Button
                          HBC={() => {
                            handleShowDeleteConfrmation(catasset);
                          }}
                          icon={deleteIc}
                        ></Button>
                      </Td>
                    )}
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
      <EditAsset
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        asset={editAsset}
      />
      <AddAssetForm
        show={showAssetForm}
        handleClose={handleCloseAssetForm}
        handleShow={handleShowAssetForm}
      />
      <DeleteAlert
        show={showDelete}
        handleClose={handleCloseDeleteConfirmation}
        handleShow={handleShowDeleteConfrmation}
        element={editAsset}
        delete={handleDelete}
      />
    </div>
  );
}

export default AssetsPage;
