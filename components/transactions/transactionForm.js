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
import { debounce } from "../../Utils/utils";

export default function TransactionForm({
  onSave,
  open,
  setOpen,
  data,
  searchCategoryAsync,
}) {
  const { handleSubmit, register, reset, setValue, control } = useForm({
    defaultValues: data,
  });
  const [categories, setCategories] = useState([]);

  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);
  };

  const getCategoriesAsync = async (value) => {
    let categories = await searchCategoryAsync(value);
    setCategories(
      categories.map((category) => {
        return { _id: category._id, name: category.name };
      })
    );
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    reset(data);
  }, [data]);

  const handleSearchCategories = debounce((e) =>
    getCategoriesAsync(e.target.value)
  );

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
                    control={<Switch defaultChecked color="secondary" />}
                    label="Payed"
                  />
                )}
              ></Controller>
            </FormControl>

            <FormControl fullWidth>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-2"
                    id="standard-basic"
                    label="Title"
                    size="small"
                    variant="outlined"
                    helperText="Provide a title for your transaction"
                  />
                )}
              ></Controller>
            </FormControl>

            <FormControl fullWidth>
              <Controller
                render={({ field: { ref, onChange, ...field } }) => (
                  <Autocomplete
                    options={categories}
                    disableClearable
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    defaultValue={
                      data ? data.category : { _id: "d", name: "value" }
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...field}
                        onChange={handleSearchCategories}
                        inputRef={ref}
                        helperText="Find the account for your transaction"
                        size="small"
                        label="Category"
                        variant="outlined"
                      />
                    )}
                  />
                )}
                name="category"
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
                  {...register("amount")}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      placeholderText="Select date"
                      onChange={(date) => onChange(date)}
                      selected={value}
                      value={value}
                      renderInput={(props) => (
                        <TextField size="small" {...props} />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
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
