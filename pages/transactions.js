import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import CategoryCard from "../components/categories/categoryCard";
import TransactionList from "../components/transactions/transactionList";
import Transaction from "../components/transactions/transaction";
import TransactionForm from "../components/transactions/transactionForm";
import axios from "axios";
import ConfirmDialog from "../components/globals/confirmDialog";
import { toast } from "react-toastify";

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
    <div className="grid grid-cols-12 gap-x-14">
      <div className="col-span-12 md:col-span-8 ">
        <h1 className=" font-extrabold my-0">Overview</h1>
        <h3 className=" font-extrabold my-4">Accounts</h3>
        <div className="flex justify-between overflow-x-auto space-x-4 my-4">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
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
      </div>
      <div className=" col-span-12 md:col-span-4 flex flex-col ">
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
      </div>
    </div>
  );
}
