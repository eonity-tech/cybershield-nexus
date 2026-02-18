import "./Skeleton.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rectangular";
  className?: string;
}

const Skeleton = ({ width, height, variant = "text", className = "" }: SkeletonProps) => {
  const style = {
    width,
    height,
  };

  return (
    <span 
      className={`nexus-skeleton ${variant} ${className}`} 
      style={style} 
    />
  );
};

export default Skeleton;