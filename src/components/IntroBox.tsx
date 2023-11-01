import Image from "next/image";
import { FC } from "react";
interface BoxProps {
  image: string;
  title: string;
  description: string;
}

const IntroBox: FC<BoxProps> = ({ image, title, description }) => {
  return (
    <div className="flex justify-center max-lg:flex-col max-lg:items-center max-lg:gap-4">
      <div className="flex flex-col gap-6 lg:hidden">
        <h5 className="font-medium text-4xl text-[#FFD15F] text-center">
          {title}
        </h5>
        <p className="font-medium text-xl text-white whitespace-break-spaces text-center">
          {description}
        </p>
      </div>
      <div className="max-w-[calc(100vw-32px)] w-[316px] lg:w-[974px] h-[316px] lg:h-[360px] bg-[linear-gradient(180deg,#1F1B18_0%,#393028_100%)] rounded-2xl relative p-2">
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
          <Image
            src={image}
            width={344}
            height={344}
            alt=""
            className="object-contain"
          />
          <div className="h-full w-[calc(100%-360px)] text-[#fff] px-[60px] flex flex-col justify-center">
            <h5 className="font-medium text-4xl text-white">{title}</h5>
            <p className="font-medium text-xl mt-9 text-[#E1E4CD] whitespace-break-spaces ">
              {description}
            </p>
          </div>
        </div>
        <div className="items-center h-full flex lg:hidden">
          <Image
            src={image}
            width={344}
            height={344}
            alt=""
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroBox;
