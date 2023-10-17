import { FC, ReactNode } from "react";

interface ButtonProps {
  clidren?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ButtonSm: FC<ButtonProps> = ({ children, onClick, style, disabled }) => {
  return (
    <button
      className="h-[25px] relative w-full group outline-none disabled:opacity-[0.35] disabled:pointer-events-none"
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {/* normal begging */}
      <div className="absolute w-full h-full left-0 top-0 block group-hover:hidden">
        {/* eslint-disable-next-line */}
        <img
          src={`/img/button/sb-n-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1 h-[25px] absolute -left-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-n-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1 h-[25px] absolute -right-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-n-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
      </div>
      {/* normal end */}
      {/* hover begging */}
      <div className="absolute w-full h-full left-0 top-0 hidden group-hover:block group-active:hidden">
        {/* eslint-disable-next-line */}
        <img
          src={`/img/button/sb-h-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1 h-[25px] absolute -left-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-h-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1 h-[25px] absolute -right-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-h-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
      </div>
      {/* hover end */}
      {/* pressed begging */}
      <div className="absolute w-full h-full left-0 top-0 hidden group-active:block group-active:mt-0.5">
        {/* eslint-disable-next-line */}
        <img
          src={`/img/button/sb-p-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1 h-[25px] absolute -left-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-p-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1 h-[25px] absolute -right-1 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/sb-p-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
      </div>
      {/* pressed end */}
      <div className="font-medium text-[12px] text-[#fff] relative px-2 z-30 group-active:mt-0.5">
        {children}
      </div>
    </button>
  );
};

export default ButtonSm;
