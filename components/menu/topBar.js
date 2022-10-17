import { useState } from "react";
import {
  BsBell,
  BsFillMoonFill,
  BsFillSunFill,
  BsSearch,
} from "react-icons/bs";
import { FaHandPeace } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";

export default function TopBar() {
  const [mode, setMode] = useState("light");

  function toggleDarkMode() {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setMode("dark");
      localStorage.setItem("theme", "dark");
    } else if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setMode("light");
      localStorage.setItem("theme", "light");
    } else {
      if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("light");
        setMode("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        setMode("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  }
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2 items-center">
        <h1 className="font-bold text-3xl">Hello, Jhon</h1>
        <FaHandPeace className=" text-yellow-400 text-lg" />
      </div>
      <div className="flex items-center right-0">
        <div className="relative flex items-center">
          <BsSearch className="md:absolute mx-4 ml-3 text-neutral-500" />
          <input
            className="hidden md:block py-2 px-10 bg-neutral-100 rounded-2xl"
            placeholder="search ..."
          />
        </div>
        <BsBell className="mx-2 text-neutral-500" />
        <FcBusinessman className="text-3xl mx-2" />
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            onClick={() => {
              toggleDarkMode();
            }}
            type="checkbox"
            value=""
            id="default-toggle"
            className="sr-only peer"
          />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {mode !== "light" ? (
              <BsFillSunFill className="text-yellow-500" />
            ) : (
              <BsFillMoonFill className="text-slate-800" />
            )}
          </span>
        </label>
      </div>
    </div>
  );
}
