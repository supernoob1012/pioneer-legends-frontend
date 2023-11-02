import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  className?: string;
  isDark?: boolean;
}
const SocialLink: FC<Props> = ({ className, isDark }) => {
  return (
    <div className={`flex gap-4 ${className ? className : ""}`}>
      <Link href="#" passHref>
        <div className="flex space-x-2 items-center ">
          <Image
            src={"/icons/twitter.svg"}
            width={34}
            height={34}
            className={isDark ? "brightness-0" : ""}
            alt="twitter logo"
          />
          <p className="text-[14px] underline">Twitter</p>
        </div>
      </Link>
      <Link href="#" passHref>
        <div className="flex space-x-2 items-center ">
          <Image
            src={"/icons/discord.svg"}
            width={34}
            height={34}
            className={isDark ? "brightness-0" : ""}
            alt="discord logo"
          />
          <p className="text-[14px] underline">Discord</p>
        </div>
      </Link>
    </div>
  );
};

export default SocialLink;
