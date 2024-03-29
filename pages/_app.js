import { useEffect, useState } from "react";
import SideBar from "../components/menu/sideBar";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import createCache from "@emotion/cache";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "../components/security/PrivateRoute";
import TopBar from "../components/menu/topBar";

function MyApp({ Component, pageProps }) {
  const cache = createCache({
    key: "css",
    prepend: true,
  });

  const customTheme = createTheme({
    typography: {
      fontFamily: ["Varela round", "sans-serif"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        light: "#9333EA",
        main: "#9333EA",
        dark: "#9333EA",
        contrastText: "#fff",
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            border: "8px solid black",
            width: 80,
            height: 80,
            borderRadius: 18,
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
        rel="stylesheet"
      />
      <ThemeProvider theme={customTheme}>
        <StyledEngineProvider injectFirst>
          <PrivateRoute>
            <div className="flex w-full  ">
              <SideBar />
              <div className="relative lg:ml-72 md:ml-72 px-8 md:p-0 md:pr-6 w-full mb-10">
                <TopBar />
                <Component {...pageProps} />
                <ToastContainer
                  toastStyle={{ fontFamily: "Varela round, sans-serif" }}
                />
              </div>
            </div>
          </PrivateRoute>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
