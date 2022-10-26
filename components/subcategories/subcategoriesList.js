import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { BsBank, BsPen, BsSearch, BsTrash } from "react-icons/bs";
import { debounce, formatCurrency } from "../../Utils/utils";

export default function SubcategoriesList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
}) {
  // alert states
  const [alert, setAlert] = useState(false);

  const [alertParams, setAlertParams] = useState({
    severity: "success",
    title: "",
  });

  const handleOnClickEdit = (subcategory) => {
    setFormData(subcategory);
    setFormOpen(true);
  };

  const columns = [
    {
      field: "_id",
      headerName: "Id",
      width: 200,
    },
    {
      fiels: "Image",
      minWidth: 200,
      headerName: "Name",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <div className="bg-black p-3 rounded-full">
              <BsBank className="text-sm text-white" />
            </div>
            <span className="font-semibold">{cells.row.name} </span>
          </div>
        );
      },
    },
    {
      field: "lastTransactionDate",
      headerName: "Last Transaction Date",
      minWidth: 200,
      renderCell: (cells) => {
        return <span>Aug 20 2022 </span>;
      },
    },
    {
      field: "profit",
      headerName: "Profit",
      renderCell: (cells) => {
        return (
          <span className="text-green-400">
            {formatCurrency(cells.row.profit)}{" "}
          </span>
        );
      },
    },
    {
      field: "loss",
      headerName: "Loss",
      renderCell: (cells) => {
        return (
          <span className="text-red-400">
            {formatCurrency(cells.row.loss)}{" "}
          </span>
        );
      },
    },
    {
      field: "balance",
      headerName: "Balance",
      renderCell: (cells) => {
        return formatCurrency(cells.row.profit);
      },
    },
    {
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 justify-end mx-2">
            <a
              onClick={() => handleOnClickEdit(cells.row)}
              className="text-purple-600 cursor-pointer"
            >
              <BsPen />
            </a>
            <a
              onClick={() => onDelete(cells.row)}
              className="text-red-500 cursor-pointer"
            >
              <BsTrash />
            </a>
          </div>
        );
      },
    },
  ];

  const handleSearch = debounce((e) => onSearch(e.target.value));
  return (
    <div className="w-full">
      <div className="w-full h-96  border-gray-100 rounded-xl">
        <div className="flex justify-end p-4">
          <TextField
            id="standard-basic"
            size="small"
            placeholder="search..."
            className="mx-4 "
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="mr-4">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <DataGrid
          className="rounded-xl"
          disableSelectionOnClick
          disableColumnFilter
          rows={data}
          rowHeight={60}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={false}
          getRowId={(row) => row._id}
          // components={{ Toolbar: SearchInput }}
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
