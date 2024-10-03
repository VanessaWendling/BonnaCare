import { Dispatch, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdHelp } from "react-icons/md";
import { RiHeartAdd2Line } from "react-icons/ri";
import { LuCopyCheck } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
interface IMenu {
  openMenu: boolean;
  setOpenMenu: Dispatch<boolean>;
}

export const Menu = ({ openMenu, setOpenMenu }: IMenu) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setOpenMenu(false);
  };

  const handleAddDogs = () => {
    navigate("/AddDogs");
    setOpenMenu(false);
  };

  return (
    <div
      className={
        openMenu
          ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
          : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
      }
    >
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
          <li
            onClick={() => handleAddDogs()}
            className="text-xl py-4 flex cursor-pointer"
          >
            <RiHeartAdd2Line size={25} className="mr-4" /> Add dogs
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <FaUserFriends size={25} className="mr-4" /> Invite friends
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <LuCopyCheck size={25} className="mr-4" /> Share my profile
          </li>
          <li className="text-xl py-4 flex cursor-pointer">
            <MdHelp size={25} className="mr-4" /> Help
          </li>
          <li
            onClick={() => handleLogout()}
            className="text-xl py-4 flex cursor-pointer"
          >
            <FiLogOut size={25} className="mr-4" />
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};
