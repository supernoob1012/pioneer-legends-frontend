import { FC } from "react";

interface Props {
  className?: string;
  textSize: number;
}

const TempImage: FC<Props> = ({ className, textSize }) => {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        placeContent: "center",
        pointerEvents: "none",
      }}
    >
      <h1 className="text-[#ededed] max-sm:hidden" style={{ fontSize: textSize }}>
        Place holder
      </h1>
    </div>
  );
};

export default TempImage;
