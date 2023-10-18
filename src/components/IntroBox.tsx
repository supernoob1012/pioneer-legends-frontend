import Image from "next/image";
import { FC } from "react";
interface BoxProps {
  image: string;
  title: string;
  description: string;
}

const IntroBox: FC<BoxProps> = ({ image, title, description }) => {
  return (
    <div className="backdrop-blur-[10px]">
      <div className="w-full lg:w-[974px] h-[288px] lg:h-[360px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <div className="absolute -right-1 -bottom-3">
          <Image
            src={"/img/Deco_rightbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -bottom-3">
          <Image
            src={"/img/Deco_leftbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -top-1">
          <Image src={"/img/Deco_lefttop.png"} width={80} height={60} alt="" />
        </div>
        <div className="absolute -right-1 -top-1">
          <Image src={"/img/Deco_righttop.png"} width={80} height={60} alt="" />
        </div>

        <div className="items-center h-full hidden lg:flex">
          <div className="h-full w-[360px] bg-[#54504C]"></div>
          <div className="h-full w-[calc(100%-360px)] text-[#fff] px-[60px] flex flex-col justify-center">
            <h5 className="text-[24px]">{title}</h5>
            <p className="text-[20px] mt-4">{description}</p>
          </div>
        </div>
      </div>
      <h2 className="text-[24px] mt-[30px] font-normal text-center leading-[1.5] text-center">
        {title}
      </h2>
      <p className="mt-4 text-[16px] lg:text-[20px] font-medium leading-[1.5] text-center lg:text-left text-center">
        {description}
      </p>
    </div>
  );
};

export default IntroBox;
