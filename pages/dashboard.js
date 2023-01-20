import { useEffect, useState } from "react";
import Image from "next/image";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDatePicker,
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import {
  Badge,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CardContainer from "../components/globals/CardContainer";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency, formatDateWithHour } from "../utils/formatters";
import {
  Api,
  BrunchDiningOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import api from "../auth/api";
import { Router, useRouter } from "next/router";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [value, setValue] = useState(new Date());
  const [highlightDay, setHighlightDay] = useState(["1", "14", "20", "31"]);
  const router = useRouter();

  const getTransactionsAsync = async () => {
    let filter = "";
    const { data } = await api.get(
      `/transactions/get?filter=${filter}&limit=4`
    );
    setTransactions(data);
  };
  const getGoalsAsync = async () => {
    const { data } = await api.get("/goals/get?filter={null}");
    setGoals(data);
  };
  const columns = [
    {
      field: "_id",
      headerName: "",
      hide: true,
    },
    {
      field: "title",
      minWidth: 250,
      flex: 1,
      headerName: "Transaction",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <div className="flex flex-col space-y-1">
              <span className="text-black text-opacity-40">
                {cells.row.title}{" "}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 190,
      flex: 1,
      renderCell: (cells) => {
        return <span>{formatDateWithHour(cells.row?.date)}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (cells) => {
        return (
          <div
            className={`px-4 py-2 ${
              cells.row.sign === 1 ? "bg-green-50 " : "bg-red-100"
            } rounded-full text-xs font-bold`}
          >
            {cells.row?.sign === 1 ? "Income" : "Outcome"}
          </div>
        );
      },
    },
    {
      field: "amount",
      minWidth: 150,
      headerName: "Amount",
      renderCell: (cells) => {
        return <span>{formatCurrency(cells.row?.amount)}</span>;
      },
    },
  ];
  const CardGoal = () => {
    return (
      <div className="flex justify-between bg-white shadow-sm rounded-xl w-full xl:w-[22rem] m-2 p-4 hover:cursor-pointer ">
        <div className="flex justify-between text-xs space-x-3 ">
          <span className="text-3xl">3</span>
          <div className="flex flex-col">
            <span className="font-semibold"> Goal title</span>
            <span className="text-xs">Values with a description</span>
          </div>
        </div>
        <Image
          height={40}
          width={40}
          src="https://cdn-icons-png.flaticon.com/512/5932/5932929.png"
        />
      </div>
    );
  };

  useEffect(() => {
    getTransactionsAsync();
    getGoalsAsync();
  }, []);
  return (
    <div className=" grid grid-cols-12 gap-x-4">
      {/* <--------- left side -------->*/}
      <div className="col-span-12 xl:col-span-8 space-y-4">
        <div className="px-10 max-w-3xl mx-8 md:mx-0 space-x-4 bg-purple-100 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
          <div className="flex flex-col ">
            <span className="font-semibold text-2xl tracking-wider">
              Welcome back Alam
            </span>
            <p className="text-xs mt-4">
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there is not anything
            </p>
            <div className="flex w-full justify-center md:justify-start my-4">
              <Button
                variant="contained"
                type="submit"
                className="bg-purple-700 normal-case max-w-sm rounded-xl hover:bg-black px-8"
              >
                Go now
              </Button>
            </div>
          </div>
          <div className="flex">
            <img
              alt="welcome image"
              className="md:w-72 h-full w-64"
              src="/welcome.svg"
            />
          </div>
        </div>
        <div className="flex justify-between w-full text-sm px-4 py-2">
          <span className="font-bold">Your last goals</span>
          <span
            className="text-black text-opacity-40 cursor-pointer"
            onClick={() => router.push("/goals")}
          >
            See all
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly w-full">
          <CardGoal />
          <CardGoal />
          <CardGoal />
          <CardGoal />
        </div>
        <CardContainer>
          <div className="px-4 flex flex-wrap justify-between space-x-2">
            <span className="font-bold text-lg">Last Transactions</span>
            <Button
              variant="contained"
              type="submit"
              onClick={() => router.push("/transactions")}
              className="bg-purple-700 normal-case max-w-sm rounded-xl hover:bg-black px-8"
            >
              See all
            </Button>
          </div>
          <TableContainer>
            <Table
              className=" max-h-56 w-full overflow-x-auto"
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell className="text-black text-opacity-30 font-bold">
                    Transaction
                  </TableCell>

                  <TableCell className="text-black text-opacity-30 font-bold">
                    Date
                  </TableCell>

                  <TableCell className="text-black text-opacity-30 font-bold">
                    Amount
                  </TableCell>
                  <TableCell className="text-black text-opacity-30 font-bold">
                    Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => {
                  return (
                    <TableRow className=" h-1" key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-2 w-40">
                          <div className=" bg-blue-100 py-1 px-2 rounded-xl">
                            <Image
                              height={15}
                              width={15}
                              src="https://cdn-icons-png.flaticon.com/512/2662/2662503.png"
                            />
                          </div>
                          <span>{transaction.title}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {formatDateWithHour(transaction.date)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 animate-pulse ${
                              Math.floor(Math.random() * 2) === 1
                                ? "bg-green-600"
                                : "bg-red-600"
                            } rounded-full  flex justify-center text-xs font-bold`}
                          ></div>
                          <span>
                            {Math.floor(Math.random() * 2)
                              ? "Income"
                              : "Outcome"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContainer>
      </div>
      {/* <------ right side --------> */}
      <div className="col-span-12 xl:col-span-4">
        <CardContainer className="lg:my-0 lg:p-1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              openTo="day"
              displayStaticWrapperAs="desktop"
              renderInput={(params) => <TextField {...params} size="medium" />}
              renderDay={(day, _value, DayComponentProps) => {
                const todayString = `${day.toString()[5]}${day.toString()[6]}`;
                const isSelected = highlightDay.find((d) => d === todayString);
                return (
                  <div className="flex flex-col items-center">
                    <PickersDay
                      {...DayComponentProps}
                      className="flex flex-col"
                    >
                      {todayString}
                      {isSelected && (
                        <div className="flex space-x-1">
                          <span className="w-1 bg-blue-300 rounded-full h-1"></span>
                          <span className="w-1 bg-red-300 rounded-full h-1"></span>
                          <span className="w-1 bg-purple-300 rounded-full h-1"></span>
                        </div>
                      )}
                    </PickersDay>
                  </div>
                );
              }}
              value={value}
              // shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </CardContainer>

        <CardContainer>
          <div className="flex flex-col px-2 py-2 w-full space-y-6 ">
            <div className="flex items-center justify-between">
              <h1>Last Tasks</h1>
              <Button
                variant="contained"
                type="submit"
                className="bg-purple-700 normal-case max-w-sm rounded-xl hover:bg-black px-8"
              >
                See all
              </Button>
            </div>
            {transactions.map((transaction, index) => {
              return (
                <div className="flex flex-col bg-white  w-full" key={index}>
                  <div className="flex items-center justify-between ">
                    <div className="flex space-x-2 ">
                      <div className=" bg-green-100 py-2 px-2 rounded-xl">
                        <Image
                          height={15}
                          width={15}
                          src="https://cdn-icons-png.flaticon.com/512/738/738096.png"
                        />
                      </div>

                      <div className="flex flex-col ">
                        <span className="text-sm">{transaction.title}</span>
                        <span className="text-xs text-black text-opacity-30">
                          {transaction.account.name}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-sm">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContainer>
      </div>
    </div>
  );
}
