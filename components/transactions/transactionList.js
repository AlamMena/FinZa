import {
  ArrowCircleUp,
  DeleteOutline,
  EditOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { InputAdornment, Popover, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import {
  debounce,
  formatCurrency,
  formatDate,
  formatDateWithHour,
} from "../../utils/formatters";

export default function TransactionList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
  onClickCreate,
  isLoading,
}) {
  const colors = ["bg-blue-50", "bg-green-50", "bg-red-50", "bg-orange-50"];
  const random = Math.floor(Math.random() * colors.length);

  const [anchorEl, setAnchorEl] = useState(null);
  const popOverIsOpen = Boolean(anchorEl);

  // const [selectedItem, setSelectedItem] = useState();

  const handleOnClickEdit = (data) => {
    setFormData(data);
    setFormOpen(true);
  };

  const handleClickPopOver = (e, value) => {
    setAnchorEl(e.currentTarget);
    setSelectedItem(value);
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
            <div className="bg-black p-3 rounded-full">
              <ArrowCircleUp className="text-sm text-white" />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-black text-opacity-40">
                {cells.row.title}{" "}
              </span>
              <span className="font-semibold">{cells.row.account.name} </span>
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
        return <span>{formatDateWithHour(cells.row.date)}</span>;
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
            {cells.row.sign === 1 ? "Income" : "Outcome"}
          </div>
        );
      },
    },
    {
      field: "amount",
      minWidth: 150,
      headerName: "Amount",
      renderCell: (cells) => {
        return <span>{formatCurrency(cells.row.amount)}</span>;
      },
    },
    {
      flex: 1,
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-2 justify-end mx-2">
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
    <div className="w-full h-96">
      <div className="flex md:justify-between items-center">
        {/* <Popover
          id="actions"
          open={popOverIsOpen}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="flex flex-col p-4 space-y-4">
            <a
              className="text-purple-600 cursor-pointer flex space-x-2 items-center"
              onClick={() => {
                handleOnClickEdit();
                setAnchorEl(null);
              }}
            >
              <BsPen className="text-sm" />{" "}
              <span className="text-sm">Edit</span>
            </a>
            <a
              onClick={() => {
                onDelete(selectedItem);
                setAnchorEl(null);
              }}
              className="text-red-500 cursor-pointer flex space-x-2 items-center"
            >
              <BsTrash className="text-sm" />
              <span className="text-sm">Delete</span>
            </a>
          </div>
        </Popover> */}
        <div className="flex items-center md:w-56 w-full">
          <TextField
            id="standard-basic"
            size="small"
            placeholder="search..."
            className="w-full"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="mr-4">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          {/* <BsPlusSquareFill
            onClick={onClickCreate}
            className=" text-3xl text-black"
          /> */}
        </div>
      </div>
      <DataGrid
        className="rounded-xl datagrid-whitout-border"
        disableSelectionOnClick
        disableColumnFilter
        rows={data}
        rowHeight={65}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        loading={isLoading}
        getRowId={(row) => row._id}
        // components={{ Toolbar: SearchInput }}
      />
    </div>
  );
}
