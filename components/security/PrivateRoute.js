import { onAuthStateChanged } from "@firebase/auth";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../../pages/login";
import { auth } from "../../Utils/firebaseApp";
import Loading from "../globals/Loading";

export default function PrivateRouter({ children }) {
  // Router
  const { pathname } = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, function (userCredential) {
      if (userCredential) {
        setUser(userCredential);
      }
      setIsLoading(false);
    });
  }, [user]);

  if (user) {
    if (pathname === "/login") {
      return <Login />;
    }
    return children;
  } else if (!user && !isLoading) {
    return <Login />;
  }
  return <Loading />;
}
