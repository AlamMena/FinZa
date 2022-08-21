import { FaHandPeace } from "react-icons/fa";
import {
  BsSearch,
  BsBell,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import Card from "../Components/Card";
import Transaction from "../Components/Transaction";
import TransactionChart from "../Components/TransactionChart";
import TransactionHistory from "../Components/TransactionHistory";
import { useState } from "react";

export default function Home() {
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
      console.log(mode);
    }
  }

  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="flex justify-between w-full">
        <div className="flex space-x-2 items-center">
          <h1 className="font-bold text-3xl bg-green">Hello, Jhon</h1>
          <FaHandPeace className=" text-yellow-400 text-lg" />
        </div>
        <div className="flex items-center">
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

      <div className="grid grid-cols-12 space-y-8 mt-6 lg:gap-x-8 lg:space-x-12 w-full">
        <div className="col-span-12 md:col-span-12 lg:col-span-7">
          <div className="flex justify-between items-center mt-8 mb-2">
            <h2 className="font-bold text-lg">My Cards</h2>
            <span className="text-neutral-400 text-sm font-sm font-semibold">
              Add New
            </span>
          </div>
          {/* body */}
          <div className="grid grid-cols-12 lg:gap-x-8 place-content-center">
            <div className="col-span-12 md:col-span-6 mt-4 ">
              <Card />
            </div>
            <div className="col-span-12  md:col-span-6 mt-4">
              <Card active />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h2 className="font-bold text-lg mt-8 mb-4">Transactions</h2>
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <span className="bg-purple-300 py-2 px-4 rounded-full">
                Expenses
              </span>
              <span>Incomes</span>
            </div>
            <div className="space-x-4 ">
              <span>D</span>
              <span>W</span>
              <span>M</span>
              <span className="border-2 py-2 px-4 rounded-full">All</span>
            </div>
          </div>
          <div className="pt-4">
            <TransactionChart />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-bold text-lg">History</h2>
            <TransactionHistory />
            <TransactionHistory />
            <TransactionHistory />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
