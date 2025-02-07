import Lottie from "lottie-react";
import animationData from "./wordmark.json"; // Adjust the path as needed

const Wordmark = () => {
 return (
  <div style={{ width: 620, height: 75 }}>
   <Lottie animationData={animationData} loop={false} />
  </div>
 );
};

export default Wordmark;
