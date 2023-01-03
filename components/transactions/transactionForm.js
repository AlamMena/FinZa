import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { debounce } from "../../utils/formatters";

export default function TransactionForm({
  onSave,
  open,
  setOpen,
  data,
  searchAccountsAsync,
  searchGoalsAsync,
}) {
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: data,
  });
  const [accounts, setAccounts] = useState([]);
  const [goals, setGoals] = useState([]);

  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);

    // alert(JSON.stringify(data));
  };

  const getAccountsAsync = async (value) => {
    let accounts = await searchAccountsAsync(value);
    setAccounts(
      accounts.map((account) => {
        return { _id: account._id, name: account.name };
      })
    );
  };

  const getGoalsAsync = async (value) => {
    let goals = await searchGoalsAsync(value);
    setGoals(
      goals.map((goal) => {
        return { _id: goal._id, title: goal.title };
      })
    );
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    reset(data);
  }, [data]);

  const handleSearchAccounts = debounce((e) =>
    getAccountsAsync(e.target.value)
  );

  const handleSearchGoals = debounce((e) => getGoalsAsync(e.target.value));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 15 },
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-2 py-4"
        >
          <DialogTitle>
            <h1 className="font-semibold">Transaction</h1>
          </DialogTitle>
          <DialogContent className="space-y-4">
            <FormControl>
              <Controller
                control={control}
                name="payed"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        onChange={onChange}
                        value={value ?? true}
                        defaultChecked
                        size="small"
                        color="secondary"
                      />
                    }
                    label="Payed"
                  />
                )}
              ></Controller>
            </FormControl>

            <FormControl fullWidth>
              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    error={error != undefined}
                    className="mt-2"
                    id="standard-basic"
                    label="Title"
                    size="small"
                    variant="outlined"
                    helperText={
                      error
                        ? "You must provide a title for this transaction"
                        : "Provide a title for your transaction"
                    }
                  />
                )}
              ></Controller>
            </FormControl>

            <FormControl fullWidth>
              <Controller
                rules={{ require: true }}
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    {...field}
                    options={accounts}
                    disableClearable
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={error != undefined}
                        onChange={handleSearchAccounts}
                        inputRef={ref}
                        helperText={
                          error
                            ? "You must select an account"
                            : "Find the account for your transaction"
                        }
                        size="small"
                        label="Account"
                        variant="outlined"
                      />
                    )}
                  />
                )}
                name="account"
                control={control}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                rules={{ require: true }}
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={goals}
                    disableClearable
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={error != undefined}
                        onChange={handleSearchGoals}
                        inputRef={ref}
                        helperText={
                          error
                            ? "You must select an account"
                            : "Find the account for your transaction"
                        }
                        size="small"
                        label="Goals"
                        variant="outlined"
                      />
                    )}
                  />
                )}
                name="goals"
                control={control}
              />
            </FormControl>

            <div className="flex space-x-2">
              <FormControl fullWidth>
                <InputLabel id="level-label">Transaction type</InputLabel>
                <Controller
                  name="sign"
                  id="level"
                  defaultValue={1}
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="level-label"
                      label="Transaction type"
                      size="small"
                      {...field}
                    >
                      <MenuItem value={-1}>Outcome</MenuItem>
                      <MenuItem value={1}>Income</MenuItem>
                    </Select>
                  )}
                />
                {/* <FormHelperText error={true}>
              {errors.level?.message}
            </FormHelperText> */}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  {...register("amount", { valueAsNumber: true })}
                  id="standard-basic"
                  type="number"
                  label="Amount"
                  size="small"
                  defaultValue={0}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            <FormControl fullWidth>
              <Controller
                control={control}
                name="date"
                defaultValue={new Date()}
                rules={{ required: true }}
                render={({
                  field: { onChange, value, ...field },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      onChange={(date) => {
                        onChange(date);
                      }}
                      value={value}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          error={error != undefined}
                          size="small"
                          helperText={
                            error
                              ? "You must provide a date for this transaction"
                              : "Provide a date to payed this transaction"
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                {...register("description")}
                id="standard-basic"
                label="Description"
                multiline
                minRows={5}
                variant="outlined"
                helperText="Describe your transaction with many details as you want"
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
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
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
