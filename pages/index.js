import Card from "../components/dashboard/card";
import Transaction from "../components/transactions/transaction";
import TransactionChart from "../components/transactions/transactionChart";
import TransactionHistory from "../components/transactions/transactionHistory";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const CardGoal = () => {
    return (
      <div className="flex justify-between bg-white rounded-xl w-72 p-4 m-2">
        <div className="flex justify-between text-xs space-x-3 ">
          <span className="text-3xl">3</span>
          <div className="flex flex-col">
            <span className="font-semibold"> Goal title</span>
            <span className="text-xs">Values with a description</span>
          </div>
        </div>
        <Image
          height={40}
          width={40}
          src="https://cdn-icons-png.flaticon.com/512/5932/5932929.png"
        />
      </div>
    );
  };
  return (
    <div className=" grid grid-cols-12">
      {/* <--------- left side -------->*/}
      <div className="col-span-12 md:col-span-7 space-y-4">
        <div className="flex w-[640px] h-40 bg-[#2B418A] p-4 rounded-xl text-white">
          <div className="flex flex-col space-y-2">
            <span className="block font-bold">Hello user!</span>
            <span className="text-sm text-opacity-70 text-white">
              some default description of the with some lines of something
              random{" "}
            </span>
          </div>
          <video className="w-full" loop autoPlay>
            <source
              src="https://cdn.dribbble.com/users/285475/videos/16198/instagram.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-between w-full text-sm px-4 py-2">
          <span className="font-bold">Your last goals</span>
          <span className="text-black text-opacity-40">See all</span>
        </div>
        <div className="flex flex-wrap justify-evenly  w-full">
          <CardGoal />
          <CardGoal />
          <CardGoal />
          <CardGoal />
        </div>
      </div>
    </div>
  );
}
