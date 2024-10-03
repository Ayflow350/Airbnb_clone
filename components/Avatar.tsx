"use client";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="avatar"
      src={src || ""}
    />

    // <IoPersonCircleOutline className="rounded-full text-3xl" />
  );
};

export default Avatar;
