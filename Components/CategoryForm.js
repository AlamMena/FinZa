import { Button, Dialog,TextField } from "@mui/material";
import {useForm} from 'react-hook-form';


export default function CategoryFrom({onSave}) {
  const {handleSubmit,register} = useForm();
  const onSubmit =async (data)=>{
    const response = await onSave(data);
    alert(response)
  }
  return (
    <div className=" w-full h-full">
      <div className=" rounded-2xl">
        <Dialog open={true}>
            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col p-8 space-y-6 px-10">
            <TextField {...register('name')} id="standard-basic" label="Name" variant="standard" />
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
