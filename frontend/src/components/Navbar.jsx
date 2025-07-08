import React from "react";
import { href } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* <button className="text-[#24292F] bg-slate-200 rounded-full flex justify-center items-center cursor-pointer" onClick={href="https://github.com/MohammedAffaq/Password_Manager"}>
          <img className="w-10 p-1" src="github.svg" alt="Github"/>
          <span className="font-bold px-1">GitHub</span>
        </button> */}
        <a
          href="https://github.com/MohammedAffaq/Password_Manager"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#24292F] bg-slate-200 rounded-full flex justify-center items-center cursor-pointer"
        >
          <img className="w-10 p-1" src="github.svg" alt="Github" />
          <span className="font-bold px-1">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
