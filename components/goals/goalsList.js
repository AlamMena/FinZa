import {
  DeleteOutline,
  EditOutlined,
  Filter1Outlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

import { debounce, formatCurrency, formatDate } from "../../utils/formatters";

export default function GoalsList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
  isLoading,
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
      field: "title",
      flex: 1,
      minWidth: 180,
      headerName: "Title",
      renderCell: (cells) => {
        return (
          <div className="flex flex-col">
            <span className="font-semibold">{cells.row.title} </span>
            <span className="text-black text-opacity-40 text-xs"></span>
          </div>
        );
      },
    },

    {
      field: "initialDate",
      headerName: "Initial date",
      minWidth: 120,
      flex: 1,
      renderCell: (cells) => {
        return <span>{formatDate(cells.row.initialDate)}</span>;
      },
    },
    {
      field: "finalDate",
      headerName: "Final date",
      minWidth: 120,
      flex: 1,
      renderCell: (cells) => {
        return <span>{formatDate(cells.row.finalDate)}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      renderCell: (cells) => {
        return (
          <div
            className={`px-4 py-2 ${
              cells.row.isCompleted ? "bg-green-100 " : "bg-red-100"
            } rounded-full text-xs font-bold`}
          >
            {cells.row.isCompleted ? "Complete" : "Pending"}
          </div>
        );
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
      minWidth: 100,
      headerName: "Balance",
      renderCell: (cells) => {
        return formatCurrency(cells.row.balance);
      },
    },
    {
      flex: 1,
      field: "amount",
      minWidth: 100,
      headerName: "Goal amount",
      renderCell: (cells) => {
        return formatCurrency(cells.row.amount);
      },
    },

    {
      flex: 1,
      field: "Actions",
      minWidth: 100,
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

  const handleSearch = debounce((e) =>
    onSearch({ value: e.target.value, status: "" })
  );
  return (
    <div className="w-full">
      <div className="w-full h-full border-gray-100 rounded-xl">
        <div className="flex justify-between ">
          <div>
            <TextField
              size="small"
              placeholder="search..."
              onChange={handleSearch}
              inputProps={{
                startadornment: (
                  <InputAdornment position="start" className="mr-4">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
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
          loading={isLoading}
          getRowId={(row) => row._id}
        />
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
