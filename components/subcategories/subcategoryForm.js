import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SubcategoryForm({
  onSave,
  open,
  setOpen,
  data,
  searchCategories,
}) {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: data,
  });
  const [categories, setCategories] = useState([]);

  const onSubmit = async (data) => {
    await onSave(data);
    setOpen(false);
    alert(JSON.stringify(data));
  };

  const getCategoriesAsync = async (value) => {
    let categories = await searchCategories(value);
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
          <h1 className="font-semibold">New Subcategory</h1>

          <FormControl>
            <TextField
              {...register("name")}
              id="standard-basic"
              label="Name"
              size="small"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <Autocomplete
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300 }}
              defaultValue={data.category}
              getOptionLabel={(opt) => opt.name}
              onChange={(e, value) => {
                setValue("category", value);
              }}
              onInputChange={(e, newValue) => {
                getCategoriesAsync(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Movie" />
              )}
            />
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
