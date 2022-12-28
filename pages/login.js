import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../Utils/firebaseApp";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <form
        className="flex flex-col space-y-4 items-center px-8 py-4 shadow-lg rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="my-4">FinZa</h1>

        <FormControl>
          <FormControl fullWidth>
            <TextField
              {...register("email")}
              id="standard-basic"
              type="email"
              label="username"
              size="small"
              variant="outlined"
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl fullWidth>
            <TextField
              {...register("password")}
              id="standard-basic"
              type="password"
              label="password"
              size="small"
              variant="outlined"
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            type="submit"
            className="bg-black w-40 capitalize my-4 max-w-sm rounded-2xl hover:bg-black"
          >
            Login
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
