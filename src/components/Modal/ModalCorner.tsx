import Image from "next/image";

const ModalEdges = () => {
  return (
    <>
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
    </>
  );
};

export default ModalEdges;
