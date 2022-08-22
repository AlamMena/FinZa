import { Button, Dialog, TextField } from "@mui/material";

export default function CategoryFrom() {
  return (
    <div className=" w-full h-full">
      <div className=" rounded-2xl">
        <Dialog open={true}>
          <div className="flex flex-col p-8 space-y-6 px-10">
            <TextField id="standard-basic" label="Name" variant="standard" />
            <Button
              variant="contained"
              className="bg-black rounded-2xl hover:bg-black"
            >
              Save
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
