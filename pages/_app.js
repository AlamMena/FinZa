import SideBar from "../Components/SideBar";
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex w-full ">
      <SideBar />
      <div className="lg:ml-64 md:ml-64 px-8 md:px-10 py-8 w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
