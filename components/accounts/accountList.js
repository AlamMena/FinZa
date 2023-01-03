import {
  DeleteOutline,
  EditOutlined,
  Filter1Outlined,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  InputAdornment,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

import { debounce, formatCurrency, formatDate } from "../../Utils/formatters";

export default function AccountList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
  onClickCreate,
}) {
  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  // alert states
  const [alert, setAlert] = useState(false);

  const [alertParams, setAlertParams] = useState({
    severity: "success",
    title: "",
  });

  const handleOnClickEdit = (account) => {
    setFormData(account);
    setFormOpen(true);
  };

  const handleOnClickDelete = (account) => {
    setConfirmOpen(true);
    setItemToDelete(account);
  };

  const columns = [
    {
      field: "_id",
      minWidth: 100,
      flex: 1,
      headerName: "Id",
      hide: true,
    },
    {
      field: "Name",
      flex: 1,
      minWidth: 300,
      headerName: "Name",
      renderCell: (cells) => {
        return (
          <div className="flex flex-col">
            {/* <div className="bg-black p-3 rounded-full">
              <BsBank className="text-sm text-white" />
            </div> */}
            <span className="font-semibold">{cells.row.name} </span>
            <span className="text-black text-opacity-40 text-xs">
              {/* {cells.row.category.name}{" "} */}
            </span>
          </div>
        );
      },
    },
    {
      field: "lastTransactionDate",
      flex: 1,
      headerName: "Last Transaction Date",
      minWidth: 200,
      renderCell: (cells) => {
        return <span>{formatDate(cells.row.lastTransactionDate)} </span>;
      },
    },
    {
      field: "income",
      flex: 1,
      headerName: "Income",
      renderCell: (cells) => {
        return (
          <span className="text-green-400">
            {formatCurrency(cells.row.income)}{" "}
          </span>
        );
      },
    },
    {
      flex: 1,
      field: "outcome",
      headerName: "Outcome",
      renderCell: (cells) => {
        return (
          <span className="text-red-400">
            {formatCurrency(cells.row.outcome)}{" "}
          </span>
        );
      },
    },
    {
      flex: 1,
      field: "balance",
      headerName: "Balance",
      renderCell: (cells) => {
        return formatCurrency(cells.row.balance);
      },
    },
    {
      flex: 1,
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 justify-end mx-2">
            <a
              onClick={() => handleOnClickEdit(cells.row)}
              className="text-purple-600 cursor-pointer"
            >
              <EditOutlined />
            </a>
            <a
              onClick={() => onDelete(cells.row)}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline />
            </a>
          </div>
        );
      },
    },
  ];

  const handleSearch = debounce((e) => onSearch(e.target.value));
  return (
    <div className="w-full">
      <div className="w-full h-full border-gray-100 rounded-xl">
        <div className="flex justify-between ">
          <div>
            <TextField
              size="small"
              placeholder="search..."
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="mr-4">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              size="small"
              placeholder="Filter"
              className="max-w-xs"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="mr-2">
                    <Filter1Outlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} size="small" className="sm:flex" />
              )}
            />
          </LocalizationProvider> */}
        </div>
        <DataGrid
          className="rounded-xl"
          disableSelectionOnClick
          disableColumnFilter
          autoHeight
          rows={data}
          rowHeight={40}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10]}
          loading={false}
          getRowId={(row) => row._id}
          // components={{ Toolbar: SearchInput }}
        />
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell className=" font-semibold">Name</TableCell>
              <TableCell className=" font-semibold">
                Last Transaction Date
              </TableCell>
              <TableCell className=" font-semibold">Balance</TableCell>
              <TableCell className=" font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <CategoryRow className="bg-blue-100 border-2 border-black" />
              ))}
          </TableBody>
        </Table> */}{" "}
      </div>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={() => setAlert(false)}
      >
        <Alert severity={alertParams.severity}>{alertParams.title}</Alert>
      </Snackbar>
    </div>
  );
}
