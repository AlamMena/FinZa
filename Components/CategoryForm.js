import { Button, Dialog, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../Store/categorySlice";

export default function CategoryFrom({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({ defaultValues: data });
  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className=" w-full h-full">
      <div className=" rounded-2xl">
        <Dialog open={open} onClose={handleClose}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <TextField
              {...register("name")}
              id="standard-basic"
              label="Name"
              variant="standard"
            />
            <Button
              variant="contained"
              type="submit"
              className="bg-black rounded-2xl hover:bg-black"
            >
              Save
            </Button>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
