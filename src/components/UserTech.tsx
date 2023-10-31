import Image from "next/image";

export const UserTech = ({
  setIsTech,
}: {
  setIsTech: (data: boolean) => void;
}) => {
  return (
    <div className="absolute bottom-10">
      <div className="w-[199px] h-[118px] bg-[linear-gradient(180deg,rgba(15,9,2,0.7)_0%,rgba(38,33,30,0.7)_102.54%)] [clip-path:polygon(7px_0px,100%_0,100%_100%,0_100%,0_7px)] backdrop-blur-[4.5px] flex flex-col gap-4 items-center pt-5">
        <div className="hand_anim">
          <Image src="/img/hand.svg" width={60} height={52} alt="Mouse hand" />
        </div>
        <h1 className="font-medium text-[12px] leading-[18px] text-center text-white">
          Drag map to see more
        </h1>
      </div>
      <div
        className="absolute -top-2 -right-2 flex items-center justify-center bg-[linear-gradient(180deg,rgba(15,9,2,0.7)_0%,rgba(38,33,30,0.7)_100%)] backdrop-blur-[4.5px] w-8 h-8 cursor-pointer group"
        onClick={() => setIsTech(false)}
      >
        <Image
          src="/img/white-close.svg"
          width={24}
          height={24}
          alt="Close button"
          className="opacity-40 group-hover:opacity-100 duration-300"
        />
      </div>
    </div>
  );
};
