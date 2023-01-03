import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../../pages/login";
import { auth as fbAuth } from "../../auth/firebaseApp";
import Loading from "../globals/Loading";
import api from "../../auth/api";

export default function PrivateRouter({ children }) {
  // Router
  const { pathname } = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(fbAuth, function (userCredential) {
      if (userCredential) {
        setUser(userCredential);
        console.log(userCredential);
        api.defaults.headers.common["token"] = userCredential.accessToken;
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
