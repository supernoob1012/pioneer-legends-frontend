import React from "react";
import SocialLink from "./SocialLink";
import { useRouter } from "next/router";

const Footer = () => {
  const { pathname } = useRouter();
  return (
    <div
      className={`h-20 flex space-x-4 absolutes px-10 mt-32 ${
        pathname !== "/" ? "hidden" : ""
      }`}
    >
      <SocialLink className="absolute max-sm:left-4" />
    </div>
  );
};

export default Footer;
