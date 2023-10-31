import { FC, ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  clidren?: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  style,
  disabled,
}) => {
  return (
    <button
      className="h-10 relative min-w-[128px] group outline-none disabled:opacity-[0.35] disabled:pointer-events-none cursor-pointer"
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {/* normal begging */}
      <div className="absolute w-full h-full left-0 top-0 block group-hover:hidden">
        {/* eslint-disable-next-line */}
        <img
          src={`/img/button/${variant === "secondary" ? "s" : "p"}-n-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1.5 h-10 absolute -left-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-n-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1.5 h-10 absolute -right-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-n-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-2 h-4 absolute -left-1.5 top-3">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div
          className="w-2 h-4 absolute -right-1.5 top-3 z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
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
          src={`/img/button/${variant === "secondary" ? "s" : "p"}-h-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1.5 h-10 absolute -left-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-h-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1.5 h-10 absolute -right-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-h-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-2 h-4 absolute -left-1.5 top-3">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div
          className="w-2 h-4 absolute -right-1.5 top-3 z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
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
          src={`/img/button/${variant === "secondary" ? "s" : "p"}-p-m.png`}
          className="absolute w-full h-full left-0 top-0 z-10"
          alt=""
        />
        <div className="w-1.5 h-10 absolute -left-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-p-l.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-1.5 h-10 absolute -right-1.5 top-0">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-p-r.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div className="w-2 h-4 absolute -left-1.5 top-3">
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
        <div
          className="w-2 h-4 absolute -right-1.5 top-3 z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* eslint-disable-next-line */}
          <img
            src={`/img/button/${variant === "secondary" ? "s" : "p"}-pice.png`}
            className="absolute w-full h-full left-0 top-0 z-10"
            alt=""
          />
        </div>
      </div>
      {/* pressed end */}
      <div className="absolute left-0 top-0 w-full h-full group-active:hidden">
        {/* eslint-disable-next-line */}
        <img
          src="/img/button/shadow-r.svg"
          className="absolute -right-2.5 top-0"
          alt=""
        />
        <div className="w-full h-1 bg-[#1E1915] absolute left-1 -bottom-1" />
        <div
          className="w-1 h-1 overflow-hidden absolute left-0 -bottom-1 "
          style={{
            transform: "rotateX(-180deg)",
          }}
        >
          <div className="w-1.5 h-1.5 bg-[#1E1915] rotate-45 ml-0.5" />
        </div>
      </div>
      <div className="font-semibold text-[16px] text-[#fff] relative px-2 z-30 group-active:mt-0.5 whitespace-nowrap">
        {children}
      </div>
    </button>
  );
};

export default Button;
