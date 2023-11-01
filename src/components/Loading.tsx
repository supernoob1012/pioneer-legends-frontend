import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { EclipsSymbol } from "./SvgIcons";
import useSound from "use-sound";

const Loading = () => {
  const [mountingProgress, setMountingProgress] = useState(0);
  const { isNetSpeed } = useContext<UserContextProps>(UserContext);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Simulate a loading process that increments the mounting progress.
    const loadingInterval = setInterval(() => {
      setMountingProgress((prevProgress) => {
        if (prevProgress < 110) {
          return prevProgress + 10;
        } else {
          clearInterval(loadingInterval);
          return 110;
        }
      });
    }, 300);
    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  useEffect(() => {
    if (audio.current) {
      audio.current.load();
      audio.current.play();
    }
  }, [audio]);

  if (mountingProgress === 110 || !isNetSpeed) {
    return <></>;
  } else {
    return (
      <div className="fixed left-0 top-0 w-screen h-screen z-[9999] bg-[#00000066] backdrop-blur-[20px] flex items-center justify-center">
        <audio autoPlay src="/music/landing_bg_music.wav" ref={audio}></audio>
        <div className="">
          <div className="flex items-center flex-col justify-center">
            <div className="relative w-[213px] h-[43px] bg-[#1e191599] backdrop-blur-[2px]">
              <div className="absolute left-[-15px] top-0 w-[11px] h-[43px]">
                <Image src="/img/progress-bar.png" layout="fill" alt="" />
              </div>

              <div className="absolute w-[calc(100%-2px)] h-[5px] bottom-[1px] left-[1px] mix-blend-overlay">
                <Image src="/img/dots.png" layout="fill" alt="" />
              </div>
              <div
                className="absolute right-[-15px] top-0 w-[11px] h-[43px]"
                style={{
                  transform: "rotateY(180deg)",
                }}
              >
                <Image src="/img/progress-bar.png" layout="fill" alt="" />
              </div>
              <div className="absolute left-[1px] bottom-0 w-[calc(100%-2px)] h-[7px] overflow-hidden">
                <div
                  className="absolute left-0 bottom-0 w-full h-full opacity-60 blue-animate"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #00E0FF 0%, rgba(82, 58, 31, 0.40) 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #00E0FF 0%, rgba(82, 58, 31, 0.40) 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #00E0FF 0%, rgba(82, 58, 31, 0.40) 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #00E0FF 0%, rgba(82, 58, 31, 0.40) 50%) top right / 50% 50% no-repeat",
                    flexShrink: 0,
                  }}
                ></div>
              </div>
              <p className="font-extrabold italic text-[52px] text-white absolute left-1/2 -translate-x-1/2 -top-[38px]">
                {mountingProgress}
              </p>
              <div className="absolute left-0 w-[213px] h-20 overflow-hidden -bottom-[37px]">
                <EclipsSymbol className="eclips-animate" />
              </div>
            </div>
            <div className="w-[145px] h-4 relative mt-2">
              <Image src="/img/logo@name.svg" layout="fill" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Loading;
