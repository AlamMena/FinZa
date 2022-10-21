import {
  BsArrowLeftRight,
  BsArrowUpRightCircle,
  BsDot,
  BsShop,
  BsTranslate,
} from "react-icons/bs";
export default function TransactionHistory({ amount, title, date }) {
  return (
    <div className="flex justify-between items-center space-x-4 w-full ">
      <div className="flex space-x-4 items-center">
        <div className="rounded-full">
          <BsArrowLeftRight className="text-xl " />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-semibold text-md">Grocery shop</span>
          <span className="font-semibold text-xs opacity-40">
            {date ? date : "10 mar 2022"}
          </span>
        </div>
      </div>

      {/* <div className="flex space-x-2  items-center">
        <div className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-md ">
          <span className=" w-2 h-2 bg-red-600 rounded-full animate-pulse">
            {" "}
          </span>
        </div>
        <span className="text-xs font-semibold opacity-40">Expense</span>
      </div> */}
      <div className="flex items-center space-x-2">
        <div className="bg-green-100 rounded-md">
          <BsDot className="animate-pulse text-green-300" />
        </div>
        <span className="text-sm opacity-80 ">Income</span>
      </div>

      <span className="font-semibold text-sm">
        {amount ? amount : "+ $9,970.oo"}
      </span>
    </div>
  );
}
