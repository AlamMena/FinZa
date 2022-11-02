import { onAuthStateChanged } from "@firebase/auth";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../../pages/login";
import { auth } from "../../Utils/firebaseApp";

export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const route = useRouter();
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (!isLoading && !user) {
    return <Login />;
  }
  if (route.pathname == "login" && user) {
    route.push("transactions");
  }
  if (!isLoading && user) return <>{children};</>;
}
