import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryCard from "../components/accounts/accountCard";
import TransactionList from "../components/transactions/transactionList";
import Transaction from "../components/transactions/transaction";
import TransactionForm from "../components/transactions/transactionForm";
import api from "../auth/api";
import ConfirmDialog from "../components/globals/confirmDialog";
import { toast } from "react-toastify";
import TransactionCard from "../components/transactions/transactionCard";
import TransactionChart from "../components/transactions/transactionChart";

export default function Transactions() {
  // balance states
  const [balance, setBalance] = useState({
    total: { value: 0, transactions: [] },
    income: { value: 0, transactions: [] },
    outcome: { value: 0, transactions: [] },
  });
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // filters
  const [filter, setFilter] = useState("");

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // confirm form
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState();

  // errors states
  const [errors, setError] = useState();
  const searchAccountsAsync = async (value) => {
    try {
      const { data } = await api.get(`/accounts/get?filter=${value}`);
      return data;
    } catch (error) {
      setError(error);
    }
  };
  const searchGoalsAsync = async (value) => {
    try {
      const { data } = await api.get(`/goals/get?filter=${value}`);
      return data;
    } catch (error) {
      setError(error);
    }
  };

  const getTransactionsAsync = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/transactions/get?filter=${filter}`);
      await getBalance();
      setTransactions(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Opps, something went wrong");
      setError(error);
    }
  };

  const handleDeleteTransaction = async (data) => {
    try {
      setConfirmOpen(true);
      setTransactionToDelete({ ...data, isDeleted: true });
    } catch (error) {
      setError(error);
    }
  };

  const saveTransactionAsync = async (data) => {
    const savePromise = new Promise((resolve) =>
      setTimeout(() => resolve(api.post("/transactions/upsert", data)), 1000)
    );
    await toast.promise(savePromise, {
      pending: "Loading",
      success: "Success!",
      error: "Oops!, something went wrong",
    });
    await getTransactionsAsync();
  };

  const getBalance = async () => {
    const { data } = await api.post("/transactions/getBalance");
    console.log(data);
    setBalance(data);
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };
  useEffect(() => {
    setIsLoading(true);
    getTransactionsAsync();
    setIsLoading(false);
  }, [filter]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-10 w-full justify-between">
        <h1 className="font-semibold text-xl py-2 tracking-widest">
          Transactions
        </h1>
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleOnClickCreate()}
          className="bg-purple-600 capitalize max-w-sm rounded-2xl hover:bg-black"
        >
          New transaction
        </Button>
      </div>
      <div className="flex lg:space-y-0 space-y-4 lg:space-x-4 justify-evenly flex-wrap  overflow-x-auto mb-8 ">
        <TransactionCard
          title="Total"
          value={balance.total.value}
          transactions={balance.total.transactions}
          diference={balance.total.monthDifference}
          background={"bg-purple-50"}
        />
        <TransactionCard
          title="Iconme"
          value={balance.income.value}
          transactions={balance.income.transactions}
          diference={balance.income.monthDifference}
          background={"bg-green-50"}
        />
        <TransactionCard
          title="outcome"
          value={balance.outcome.value}
          transactions={balance.outcome.transactions}
          diference={balance.outcome.monthDifference}
          background={"bg-red-50"}
        />
      </div>
      <div className={`hidden ${formOpen && "flex"}`}>
        <TransactionForm
          onSave={saveTransactionAsync}
          searchAccountsAsync={searchAccountsAsync}
          searchGoalsAsync={searchGoalsAsync}
          open={formOpen}
          data={formData}
          setOpen={setFormOpen}
        />
      </div>
      <ConfirmDialog
        title="Do you want to delete this transaction?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          saveTransactionAsync(transactionToDelete);
          setConfirmOpen(false);
        }}
      />
      <div className="bg-white rounded-xl p-4">
        <TransactionList
          isLoading={isLoading}
          data={transactions}
          onClickCreate={handleOnClickCreate}
          onSearch={setFilter}
          onDelete={handleDeleteTransaction}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
        />
      </div>

      {/* <div className=" col-span-12 md:col-span-4 flex flex-col ">
        <h1 className=" font-extrabold">Transafers</h1>
        <div className="flex justify-between my-4">
          <h3 className="font-extrabold">Scheduled</h3>
          <h3 className="font-extrabold text-xs">View all {">"} </h3>
        </div>
        <div className="flex flex-col space-y-2 my-4">
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </div>
      </div> */}
    </div>
  );
}
