import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneEdit } from "react-icons/ai";
import { BiLogIn } from "react-icons/Bi";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-blue-500 shadow-lg fixed top-0 left-0 h-96 w-16 my-5 mx-2 rounded-2xl">
      <SidebarIcon icon={<AiOutlineHome />} linkedto="/" />
      <SidebarIcon icon={<CgProfile />} linkedto="/asonfoh" />
      <SidebarIcon icon={<AiTwotoneEdit />} linkedto="/" />
      <SidebarIcon icon={<BiLogIn />} linkedto="/" />
    </div>
  );
};

const SidebarIcon = ({ icon, linkedto }) => (
  <Link href={linkedto}>
    <a
      className="transition-all duration-300 ease-linear text-white relative flex items-center justify-center h-12 w-12 mt-4 mb-2 mx-auto shadow-lg bg-blue-700
  rounded-3xl hover:bg-blue-800 hover:rounded-xl"
    >
      {icon}
    </a>
  </Link>
);

export default Sidebar;
