import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import CategoryCard from "../components/categories/categoryCard";
import TransactionList from "../components/transactions/transactionList";
import Transaction from "../components/transactions/transaction";
import TransactionForm from "../components/transactions/transactionForm";
import axios from "axios";
import ConfirmDialog from "../components/globals/confirmDialog";
import { toast } from "react-toastify";
import TransactionCard from "../components/transactions/transactionCard";
import TransactionChart from "../components/transactions/transactionChart";

export default function Transactions() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // filters
  const [filter, setFilter] = useState("");

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  // confirm form
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState();

  // errors states
  const [errors, setError] = useState();
  const searchCategoriesAsync = async (value) => {
    try {
      const { data } = await axios.get(`/api/categories/get?filter=${value}`);
      return data;
    } catch (error) {
      setError(error);
    }
  };
  const getTransactionsAsync = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/transactions/get?filter=${filter}`
      );
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
    // alert(isLoading);
    const savePromise = new Promise((resolve) =>
      setTimeout(
        () => resolve(axios.post("/api/transactions/upsert", data)),
        1000
      )
    );
    await toast.promise(savePromise, {
      pending: "Loading",
      success: "Awsome!, action completed",
      error: "Oops!, something went wrong",
    });
    await getTransactionsAsync();
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
      <div className="flex lg:space-y-0 space-y-4 lg:space-x-4 justify-center flex-wrap  overflow-x-auto mb-8 md:px-8">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
      <div className={`hidden ${formOpen && "flex"}`}>
        <TransactionForm
          onSave={saveTransactionAsync}
          searchCategoryAsync={searchCategoriesAsync}
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
      <TransactionList
        isLoading={isLoading}
        data={transactions}
        onClickCreate={handleOnClickCreate}
        onSearch={setFilter}
        onDelete={handleDeleteTransaction}
        setFormOpen={setFormOpen}
        setFormData={setFormData}
      />
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
