import Image from "next/image";

// Define the types for the component props
interface IconProps {
  name?: string; // Alias for the icon name
  icon?: string; // The name of the icon
  color?: "black" | "white" | "accent" | string; // You can extend this with more color options if needed
}

const Icon: React.FC<IconProps> = ({ name, icon, color = "black" }) => {
  const iconName = name || icon; // Use `name` if provided, fallback to `icon`

  return (
    <Image
      src={`/icons/${iconName}--${color}.svg`}
      alt={`${iconName} icon`}
      width={24}
      height={24}
    />
  );
};

export default Icon;
