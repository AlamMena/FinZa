import Card from "../components/dashboard/card";
import Transaction from "../components/transactions/transaction";
import TransactionChart from "../components/transactions/transactionChart";
import TransactionHistory from "../components/transactions/transactionHistory";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* header */}

      <div className="grid grid-cols-12 space-y-8 mt-6 lg:gap-x-8 lg:space-x-12 w-full">
        <div className="col-span-12 md:col-span-12 lg:col-span-8">
          <div className="flex justify-between items-center mt-8 mb-2">
            <h2 className="font-bold text-lg">My Cards</h2>
            <span className="text-neutral-400 text-sm font-sm font-semibold">
              Add New
            </span>
          </div>
          {/* body */}
          <div className="grid grid-cols-12 lg:gap-x-8 place-content-center">
            <div className="col-span-12 md:col-span-4 mt-4 ">
              <Card type="Earnings" />
            </div>
            <div className="col-span-12  md:col-span-4 mt-4">
              <Card type="Savings" />
            </div>
            <div className="col-span-12  md:col-span-4 mt-4">
              <Card type="Lost" />
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

        {/* <div className="col-span-12 lg:col-span-5">
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
        </div> */}
      </div>
    </div>
  );
}
