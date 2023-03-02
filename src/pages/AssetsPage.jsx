import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editIc, deleteIc, smallAddIc } from "../Components/svg";
import { deleteAsset, getAssetaByCatId } from "../redux/features/assets";
import EditAsset from "../Components/EditAsset";
import Button from "../Components/button";

function AssetsPage() {
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [theUser, setTheUser] = useState();
  const [assets, setAssets] = useState([]);
  const [catAssets, setCatAssets] = useState([]);
  const [deletedAsset, setDeletedAsset] = useState([]);
  const [editAsset, setEditAsset] = useState(null);

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
      ? setTitle(cats?.filter((cat) => cat.id == params.id)[0]?.name)
      : setTitle("All Assets");
  }, [title, params.id, deletedAsset, assets, myUser, assetsState]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (asset) => {
    setEditAsset(asset);
    setShow(true);
  };

  const deleteAssetById = (id) => {
    dispach(deleteAsset(id));
    setDeletedAsset(deleteAsset(id));
  };

  return (
    <div className="-sm p-4">
      <h1>{title}</h1>
      <table className="align-baseline table table-hover table-responsive table-striped text-center w-100">
        <thead>
          <tr>
            {/* <th scope="col">ID</th> */}
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Compnents</th>
            <th scope="col">Category</th>
            {token !== null && myUser[0].type == "Admin" && (
              <th scope="col">Oprations</th>
            )}
          </tr>
        </thead>
        <tbody>
          {title == "All Assets"
            ? assets?.map((asset) => {
                return (
                  <tr key={asset.id}>
                    {/* <td>{asset.id}</td> */}
                    <td scope="row">{asset.name}</td>
                    <td>
                      {parseInt(asset.lable) < 1 || asset.lable === " " ? (
                        <Button
                          HBC={()=>{handleShow(asset)}}
                          name=""
                          icon={smallAddIc}
                        />
                      ) : (
                        asset.lable
                      )}
                    </td>
                    <td>{asset?.components?.toString()}</td>
                    <td>
                      {cats.map((cat) => {
                        return cat.id == asset.catId && cat.name;
                      })}
                    </td>
                    {token !== null && myUser[0].type == "Admin" && (
                      <td className="d-flex justify-content-center">
                        <Button
                          cname=""
                          icon={editIc}
                          bgColor="  "
                          w=""
                          HBC={() => handleShow(asset)}
                        />
                        <Button
                          HBC={() => {
                            deleteAssetById(asset.id);
                          }}
                          icon={deleteIc}
                          bgColor="tranceparent"
                        />
                      </td>
                    )}
                  </tr>
                );
              })
            : catAssets?.map((catasset) => {
                return (
                  <tr key={catasset.id}>
                    <td scope="row">{catasset.name}</td>
                    <td>
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
                    </td>
                    <td>{catasset.components.toString()}</td>
                    <td>
                      {cats.map((cat) => {
                        return cat.id == catasset.catId && cat.name;
                      })}
                    </td>
                    {token !== null && myUser[0].type == "Admin" && (
                      <td className="d-flex justify-content-center">
                        <Button HBC={()=>handleShow(catasset)} icon={editIc} />
                        <Button
                          HBC={() => {
                            deleteAssetById(catasset.id);
                          }}
                          icon={deleteIc}
                        ></Button>
                      </td>
                    )}
                  </tr>
                );
              })}
        </tbody>
      </table>
      <EditAsset
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        asset={editAsset}
      />
    </div>
  );
}

export default AssetsPage;
