import { BsArrow90DegRight, BsArrowUpRight } from "react-icons/bs";
import TransactionChart from "./transactionChart";

export default function TransactionCard() {
  return (
    <div className="md:w-80 w-full h-44 border-2 rounded-xl border-opacity-40 ">
      <div className=" justify-between flex p-4 items-center">
        <div className="flex flex-col space-y-2">
          <span className="text-black text-opacity-40 text-sm">
            Total members
          </span>
          <span className="font-bold text-3xl">3,992</span>
        </div>
        <div>
          <div className=" flex space-x-2 items-center text-green-600 bg-green-50 font-bold border-green-600 border-2 px-4 py-2 rounded-3xl text-xs ">
            <BsArrowUpRight />
            <span>15%</span>
          </div>
        </div>
      </div>
      <div className=" flex w-full justify-center">
        <TransactionChart />
      </div>
    </div>
  );
}
