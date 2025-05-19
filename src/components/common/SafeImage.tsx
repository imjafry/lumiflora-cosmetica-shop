import React, { ImgHTMLAttributes, useState } from "react";
import NoImage from "@/assets/images/no-image.png";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc || NoImage}
      alt={alt}
      onError={() => setImgSrc(NoImage)}
      loading="lazy"
    />
  );
};

export default SafeImage;
