import React, { FC } from "react";

interface ItemProps {
  title: string;
  media: string;
  description: string;
  className?: string;
}
const IntroItem: FC<ItemProps> = ({ media, title, description }) => {
  return (
    <div className="flex gap-5 max-[550px]:flex-col max-[550px]:items-center">
      <div className="w-[280px] grid place-content-center">
        {/* eslint-disable-next-line */}
        {media !== "" && <img src={media} alt="" />}
      </div>
      <div className="w-[calc(100%-320px)] flex flex-col justify-center max-[550px]:w-[70%]">
        <h2 className="text-[24px]">{title}</h2>
        <p className="text-[20px] mt-4">{description}</p>
      </div>
    </div>
  );
};

export default IntroItem;
