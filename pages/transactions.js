import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import {
  BsBank,
  BsPlug,
  BsPlus,
  BsPlusSquareFill,
  BsSearch,
} from "react-icons/bs";
import TransactionHistory from "../components/transactions/transactionHistory";
export default function Transactions() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const SearchInput = () => {
    return (
      <div className="flex justify-end">
        <TextField
          id="standard-basic"
          size="small"
          // sx={{
          //   "& fieldset": { border: "none" },
          // }}
          placeholder="search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="mr-4">
                <BsSearch />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  };
  return (
    <div className="grid grid-cols-12 gap-x-8">
      <div className="col-span-12 md:col-span-7 space-y-4 p-4 flex flex-col">
        <h1>Transactions</h1>
        {/* <Tabs value={value} onChange={handleChange}>
          <Tab {...a11yProps(0)}>
            <span> Balance</span>
          </Tab>
          <Tab label="Profit" {...a11yProps(1)} />
          <Tab label="Loss" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel> */}
        {/* <TabPanel value={value} index={1}>
          Item two
        </TabPanel> */}
        <div className="flex items-center justify-end space-x-2">
          <SearchInput />
          <BsPlusSquareFill className=" text-4xl" />
        </div>
        <span className="text-sm opacity-40 font-semibold">20 sep 2022</span>
        <TransactionHistory />
        <TransactionHistory />
        <span className="text-sm my-8 opacity-40 font-semibold">
          20 sep 2022
        </span>
        <TransactionHistory />
        <TransactionHistory />
        <TransactionHistory />
        <TransactionHistory />
        <span className="text-sm opacity-40 font-semibold">20 sep 2022</span>
        <TransactionHistory />
      </div>
      <div className="col-span-12 md:col-span-5 border-l-2">
        <div className="flex justify-center">
          <div className="bg-black p-4 rounded-full">
            <BsBank className="text-4xl text-white " />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <span className="font-semibold">Amazon category</span>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <span className="font-semibold">$2,912.00</span>
          <span className="text-sm opacity-30 font-semibold">
            14 aug 2022 at 5:45 PM
          </span>
        </div>
      </div>
    </div>
  );
}
