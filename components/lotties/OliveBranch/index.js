import Lottie from "lottie-react";
import animationData from "/public/animations/olive-branch-square.json"; // Adjust the path as needed

const OliveBranch = () => {
 return (
  <div style={{ width: 300, height: 300 }}>
   {" "}
   {/* Adjust size as needed */}
   <Lottie animationData={animationData} loop={false} />
  </div>
 );
};

export default OliveBranch;
