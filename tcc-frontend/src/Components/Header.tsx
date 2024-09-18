import { TbHealthRecognition } from "react-icons/tb";
import { HiOutlineMenu } from "react-icons/hi";
import React, { useState } from "react";
import { Menu } from "./Menu";
import { FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

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
    <>
      <div className="bg-amber-900 flex flex-row items-center justify-between px-4">
        {/* <HiOutlineMenu
          size={36}
          className="text-pink-100 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        /> */}
        <div className="bg-transparent w-[36px] h-[36px]" />
        <div className="p-4 flex flex-row gap-2 items-center cursor-pointer">
          <TbHealthRecognition size={36} className="text-pink-100" />
          <h1 className="text-pink-100 font-bold text-xl">BonnaCare</h1>
        </div>
        <div className="p-4 flex flex-row gap-2 items-center cursor-pointer">
          <FiLogOut size={24} className="text-pink-100"  onClick={() => handleLogout()} />
        </div>
      </div>
      {/* Overlay */}
      {openMenu ? (
        <div className="bg-black/80 fixed w-full h-screen top-0 left-0" />
      ) : (
        ""
      )}
      {/* Menu */}
      {openMenu ? <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} /> : ""}
    </>
  );
};
