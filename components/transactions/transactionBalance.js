import {
  BsApple,
  BsBank,
  BsCurrencyExchange,
  BsPiggyBank,
} from "react-icons/bs";

export default function TransactionBalanace({ amount, name, type }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-blue-50 p-3 rounded-full">
        <BsCurrencyExchange className=" text-md text-black" />
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-xl font-bold">$ 92,000.12</span>
        <span className="text-xs text-black text-opacity-40 font-bold">
          Total balance in usd
        </span>
      </div>
    </div>
  );
}
