import { useEffect, useState } from "react";
import {
  BsBank,
  BsCurrencyDollar,
  BsGraphDown,
  BsGraphUp,
} from "react-icons/bs";

export default function ({ type }) {
  const [cardState, setCardState] = useState({});

  useEffect(() => {
    if (type === "Earnings") {
      setCardState({
        bgColor: "bg-green-100",
        title: "Earnings",
      });
    }

    if (type === "Savings") {
      setCardState({
        bgColor: "bg-purple-100",
        title: "Savings",
      });
    }

    if (type === "Lost") {
      setCardState({
        bgColor: "bg-red-100",
        title: "Lost",
      });
    }
  }, [type]);
  return (
    <div
      className={`flex flex-col ${cardState.bgColor}
       rounded-3xl px-6 py-4`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="bg-black p-4 rounded-full w-12">
            {type === "Earnings" ? (
              <BsGraphUp className="text-sm text-white" />
            ) : type === "Savings" ? (
              <BsCurrencyDollar className="text-sm text-white" />
            ) : (
              <BsGraphDown className="text-sm text-white" />
            )}
          </div>
          <span className="text-xl font-semibold">{cardState.title}</span>
        </div>

        <span className="text-xl font-semibold">$20,000.21</span>
        <span className="text-xs font-semibold">
          <span className="opacity-50">21%</span>
          <span className="opacity-30"> This week </span>
        </span>
      </div>
    </div>
  );
}
