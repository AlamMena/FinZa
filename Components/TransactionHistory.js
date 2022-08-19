import { BsArrowUpRightCircle } from "react-icons/bs";
export default function TransactionHistory({ amount, title, date }) {
  return (
    <div className="flex justify-between items-center space-x-4 w-full ">
      <div className="flex space-x-4 items-center">
        <BsArrowUpRightCircle className="text-3xl" />
        <div className="flex flex-col">
          <span className="font-semibold text-md">Grocery shop</span>
          <span className="font-semibold text-xs text-neutral-400">
            {date ? date : "Apr, 06 2022 at 5:45 PM"}
          </span>
        </div>
      </div>
      <div className="flex space-x-2  items-center">
        <div className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-md ">
        <span className=" w-2 h-2 bg-red-600 rounded-full animate-pulse"> </span>
        </div>
      <span className="text-xs font-semibold text-neutral-400">Expense</span>
      </div>
      <span className="font-semibold text-sm">
      {amount ? amount : "$9000"}</span>
    </div>
  );
}
