import Image from "next/image";

// Define the types for the component props
interface IconProps {
 icon?: string; // The name of the icon
 color?: "black" | "white" | "accent" | string; // You can extend this with more color options if needed
}

const Icon: React.FC<IconProps> = ({ icon, color = "black" }) => {
 return (
  <Image
   src={`/icons/${icon}--${color}.svg`}
   alt={`${icon} icon`}
   width={24}
   height={24}
  />
 );
};

export default Icon;
