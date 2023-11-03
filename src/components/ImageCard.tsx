import Image from "next/image";
import { useState } from "react";
import { CheckLineIcon } from "./SvgIcons";

const ImageCard = ({
  image,
  checkedImage,
  setCheckedImage,
}: {
  image: string;
  checkedImage: string;
  setCheckedImage: Function;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className="aspect-square relative max-h-[calc((100% - 16px)/3)] card-mask"
      onClick={() => {
        setIsClicked(!isClicked);
        setCheckedImage(image);
      }}
    >
      {/* <img src={image} alt="" className="relative z-10" /> */}
      <Image src={image} layout="fill" className="relative z-10" alt="" />
      <div className="bg-[#1E1915] absolute left-1.5 top-1.5 w-full h-full" />
      {checkedImage === image && (
        <div className="w-8 h-8 grid place-content-center absolute right-0 bottom-0 z-20 bg-[linear-gradient(180deg,#376F73_0%,#3C433C_100%)]">
          <CheckLineIcon />
        </div>
      )}
    </div>
  );
};

export default ImageCard;
