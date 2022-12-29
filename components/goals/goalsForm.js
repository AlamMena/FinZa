import {
  Button,
  Dialog,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AccountForm({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);
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
          className="flex flex-col p-8 space-y-4 px-6"
        >
          <h1 className="font-semibold">Goals</h1>

          <FormControl>
            <TextField
              {...register("title")}
              id="standard-basic"
              label="Title"
              size="small"
              helperText="write a title for your goal"
              variant="outlined"
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
          <div className="flex space-x-2">
            <FormControl fullWidth>
              <Controller
                control={control}
                name="initialDate"
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
                          label="Initial date"
                          helperText={
                            error
                              ? "You must provide a date for this goal"
                              : "Provide a inital date to start your goal"
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="finalDate"
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
                          label="Final date"
                          helperText={
                            error
                              ? "You must provide a date for this goal"
                              : "Provide a final date for your goal"
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
          </div>

          <FormControl fullWidth>
            <TextField
              {...register("description")}
              id="standard-basic"
              label="Description"
              multiline
              minRows={5}
              helperText="describe your account"
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
