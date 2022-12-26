import { Button, Dialog, FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CategoryFrom({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({ defaultValues: data });

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
          className="md:w-96  flex flex-col p-8 space-y-4 px-10"
        >
          <h1 className="font-semibold"> Category</h1>

          <FormControl>
            <TextField
              {...register("name")}
              id="standard-basic"
              label="name"
              size="small"
              helperText="write a name for your account"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <TextField
              {...register("description")}
              id="standard-basic"
              label="description"
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
