import { Suspense, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./Settings";
import useMeasure from "react-use-measure";
import { useSelector } from "react-redux";
import './styles.css'
import { exploreic, homeic, listic } from "../Components/svg";

export default function Home() {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const myUser = useSelector((state)=> state?.login?.user)
  const assets = useSelector((state)=> state?.assets?.assets)
  const categories = useSelector((state)=> state?.Categories?.categories)

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="d-flex  pt-4 justify-content-center align-items-center flex-column customRes ">
      <MotionConfig transition={transition}>
        <motion.button
          className="animatedButton"
          ref={ref}
          initial={false}
          animate={isHover ? "hover" : "rest"}
          whileTap="press"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.3 },
            press: { scale: 1.2 },
          }}
          onHoverStart={() => {
            resetMousePosition();
            setIsHover(true);
          }}
          onHoverEnd={() => {
            resetMousePosition();
            setIsHover(false);
          }}
          onTapStart={() => setIsPress(true)}
          onTap={() => setIsPress(false)}
          onTapCancel={() => setIsPress(false)}
          onPointerMove={(e) => {
            mouseX.set(e.clientX - bounds.x - bounds.width / 2);
            mouseY.set(e.clientY - bounds.y - bounds.height / 2);
          }}
          // onClick={() => {navigate('login')}}
        >
          <motion.div
            className="shapes"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
          >
            <div className="pink blush" />
            <div className="blue blush" />
            <div className="container">
              <Suspense fallback={null}>
                <Shapes
                  isHover={isHover}
                  isPress={isPress}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              </Suspense>
            </div>
          </motion.div>
          <motion.label
            variants={{ hover: { scale: 0.85 }, press: { scale: 1.01 } }}
            className="labela"
          >
            {(myUser !== null && myUser !== undefined) ? ("Welcom " + myUser[0].fullName): "Welcome to Delta DashBoard"}
          </motion.label>
        </motion.button>
      </MotionConfig>
      <div className="container mt-2 mb-3">
        <div className="row d-flex justify-content-evenly">
          <div className="col-md-3 p-2 mb-2 mb-2 cardContainer">
            <div className="card p-3 h-100 mb-1">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <div className="icon">
                    {listic}
                    <i className="bx bxl-mailchimp"></i>{" "}
                  </div>
                  <div className="ms-2 c-details">
                    <h6 className="mb-0">Updated</h6> <span>1 days ago</span>
                  </div>
                </div>
                <div className="badge">
                  {" "}
                  <span>Assets</span>{" "}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="heading">
                  Assets
                  <br />
                  Every Thing U Think
                </h3>
                <div className="mt-5">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: assets.length +"0px" }}
                      aria-valuenow="5"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="mt-3">
                    {" "}
                    <span className="text1">
                      {assets.length} Assets <span className="text2"> drived under {categories.length} Categories</span>
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3  mx-1 mb-2  p-2 cardContainer">
            <div className="card p-3 h-100 mb-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <div className="icon">
                    {exploreic}
                    <i className="bx bxl-dribbble"></i>{" "}
                  </div>
                  <div className="ms-2 c-details">
                    <h6 className="mb-0">Updated</h6> <span>4 days ago</span>
                  </div>
                </div>
                <div className="badge">
                  {" "}
                  <span>Categories</span>{" "}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="heading">
                Categories
                  <br />
                  Varites & Freshness
                </h3>
                <div className="mt-5">
                  <div className="progress">
                        <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: categories.length + "0px" }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ></div>
                  </div>
                  <div className="mt-3">
                    {" "}
                    <span className="text1">
                      {categories.length} Categories <span className="text2">With lots of Departments</span>
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2 mb-2 cardContainer">
            <div className="card p-3 h-100 mb-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <div className="icon">
                    {homeic}
                    <i className="bx bxl-reddit"></i>{" "}
                  </div>
                  <div className="ms-2 c-details">
                    <h6 className="mb-0">Updated</h6> <span>2 days ago</span>
                  </div>
                </div>
                <div className="badge">
                  {" "}
                  <span>Buildings</span>{" "}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="heading">
                  Buildings <br />
                  Come Take a Look 
                </h3>
                <div className="mt-5">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="mt-3">
                    {" "}
                    <span className="text1">
                      7 Buildings <span className="text2">With 200 Room</span>
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
