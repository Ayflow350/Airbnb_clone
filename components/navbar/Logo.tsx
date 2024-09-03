"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "@/images/airbnb.png";

const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src={image}
      />
    </div>
  );
};

export default Logo;
