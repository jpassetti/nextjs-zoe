import Lottie from "lottie-react";
import animationData from "/public/animations/wordmark.json"; // Adjust the path as needed

const Wordmark = ({ play }) => {
 return (
  <div style={{ width: 620, height: 75 }}>
   {play && <Lottie animationData={animationData} loop={false} />}
  </div>
 );
};

export default Wordmark;
