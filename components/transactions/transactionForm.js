import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TransactionForm({
  onSave,
  open,
  setOpen,
  data,
  searchTransactions,
}) {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: data,
  });
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(dayjs(new Date()));
  const [transactionType, setTransactionType] = useState(data ? data.sign : 1);

  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);
  };

  const getTransactionsAsync = async (value) => {
    let transactions = await searchTransactions(value);
    setTransactions(
      transactions.map((transaction) => {
        return { _id: transaction._id, name: transaction.name };
      })
    );
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className=" w-full h-full">
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 15 },
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-96  flex flex-col p-8 space-y-4 px-10"
        >
          <h1 className="font-semibold">New Transaction</h1>

          <FormControl>
            <TextField
              {...register("title")}
              id="standard-basic"
              label="Name"
              size="small"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              {...register("amount")}
              id="standard-basic"
              type="number"
              label="Amount"
              size="small"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              label="Type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <MenuItem value={-1}>Outcome</MenuItem>
              <MenuItem value={1}>Income</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(props) => <TextField size="small" {...props} />}
                label="DateTimePicker"
                onChange={(value) => {
                  setValue("date", value);
                  setDate(value);
                }}
                value={data ? data.date : date}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <TextField
              {...register("description")}
              id="standard-basic"
              label="description"
              multiline
              minRows={5}
              variant="outlined"
            />
          </FormControl>

          <div className="w-full flex justify-end space-x-2 ">
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              className="bg-black capitalize max-w-sm rounded-2xl hover:bg-black"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="bg-purple-600 capitalize max-w-sm rounded-2xl hover:bg-black"
            >
              Save
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
