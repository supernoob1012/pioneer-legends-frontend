import Image from "next/image";
import { FC } from "react";

interface ButtonProps {
  onClose: () => void;
  className?: string;
}

const CloseButton: FC<ButtonProps> = ({
  className = "absolute -right-5 top-[34px]",
  onClose,
}) => {
  return (
    <button className={`${className} group`} onClick={onClose}>
      <div className="h-10 w-10 absolute left-0 top-0 group-hover:hidden block group-active:hidden">
        <Image
          src="/img/button/close-n.png"
          className="relative"
          layout="fill"
          alt=""
        />
      </div>
      <div className="h-10 w-10 absolute left-0 top-0 hidden group-hover:block group-active:hidden">
        <Image
          src="/img/button/close-h.png"
          className="relative"
          layout="fill"
          alt=""
        />
      </div>
      <div className="h-10 w-10 absolute left-0 top-0 group-hover:hidden hidden group-active:block group-active:top-1 group-active:left-1">
        <Image
          src="/img/button/close-p.png"
          className="relative"
          layout="fill"
          alt=""
        />
      </div>
      <div className="h-[38px] w-[38px] absolute -right-11 top-1.5 block group-active:hidden">
        <Image
          src="/img/button/close-shadow.svg"
          className="relative"
          layout="fill"
          alt=""
        />
      </div>
    </button>
  );
};

export default CloseButton;
