import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

interface IMenu {
  openMenu: boolean;
  setOpenMenu: Dispatch<boolean>;
}

export const Menu = ({ openMenu, setOpenMenu }: IMenu) => {
  return (
    <div
      className={
        openMenu
          ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
          : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
      }>
      <AiOutlineClose
        onClick={() => setOpenMenu(false)}
        size={30}
        className="absolute right-4 top-4 cursor-pointer"
      />
      <h2 className="text-2xl p-4">
        Bonna<span className="font-bold">Care</span>
      </h2>
      <nav>
        <ul className="flex flex-col p-4 text-gray-800">
          <li className="text-xl py-4 flex cursor-pointer">
            <MdFavorite size={25} className="mr-4" /> Favorites
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <MdHelp size={25} className="mr-4" /> Help
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <FaUserFriends size={25} className="mr-4" /> Invite Friends
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <FiLogOut size={25} className="mr-4" /> Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};
