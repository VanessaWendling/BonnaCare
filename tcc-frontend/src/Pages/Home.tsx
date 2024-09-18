import React, { useState } from "react";
import AdHome from "../assets/ad.png";
import { Header } from "../Components/Header";
import { CardDogs, ICardDogs } from "../Components/CardDogs";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Profile } from "../Components/ProfileBox";
import { Service } from "../Components/Service";
import { FaUserDoctor, FaRegSquarePlus } from "react-icons/fa6";
import { FaHospitalAlt } from "react-icons/fa";

export const Home = () => {

  return (
    <div className="bg-amber-50 h-screen w-screen self-center overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-10 min-h-screen">
        <div className="items-center col-span-2 flex-row px-4">
          <Profile
            name={"Vanessa"}
            address={"Petrópolis - RJ"}
            email={"vanessa@mail.com"}
            phone={"98888-7777"}
            profileType={"TUTOR"}
          />
        </div>
        <div className="flex col-span-8 flex-col">
          <div className="flex flex-row items-center">
            <h2 className="text-lg p-4 font-semibold">My Pets</h2>
            <FaRegSquarePlus size={20} className="text-pink-900"/>
          </div>
          <div>
            <CardDogs name="Bonnie" id={1} age={8} breed="RETRIEVER" />
          </div>
          <h2 className="text-lg p-4 font-semibold">Search Service </h2>
          <div className="flex gap-2 flex-wrap">
            <Service
              Icon={FaUserDoctor}
              name="Veterinários"
              description="Encontre profissionais especialistas perto de você."
            />
            <Service
              Icon={FaHospitalAlt}
              name="Clinicas"
              description="Encontre clinicas perto de você."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
