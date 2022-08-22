import { useEffect } from "react";
import SideBar from "../Components/SideBar";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import "../styles/globals.css";
import createCache from "@emotion/cache";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  const cache = createCache({
    key: "css",
    prepend: true,
  });

  // const theme = createTheme({
  //   components: {
  //     MuiPopover: {
  //       defaultProps: {
  //         container: rootElement,
  //       },
  //     },
  //     MuiPopper: {
  //       defaultProps: {
  //         container: rootElement,
  //       },
  //     },
  //   },
  // });

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <div className="flex w-full ">
          <SideBar />
          <div className="lg:ml-64 md:ml-64 px-8 md:px-10 py-8 w-full">
            <Component {...pageProps} />
          </div>
        </div>
      </StyledEngineProvider>
    </Provider>
  );
}

export default MyApp;
