import { InputAdornment, Popover, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import {
  BsArrowUp,
  BsBank,
  BsPen,
  BsPlusSquareFill,
  BsSearch,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";

export default function TransactionList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
  onClickCreate,
}) {
  const colors = ["bg-blue-50", "bg-green-50", "bg-red-50", "bg-orange-50"];
  const random = Math.floor(Math.random() * colors.length);

  const [anchorEl, setAnchorEl] = useState(null);
  const popOverIsOpen = Boolean(anchorEl);

  const [selectedItem, setSelectedItem] = useState();

  const handleOnClickEdit = () => {
    setFormData(selectedItem);
    setFormOpen(true);
  };

  const handleClickPopOver = (e, value) => {
    setAnchorEl(e.currentTarget);
    setSelectedItem(value);
  };

  // const data = [
  //   {
  //     _id: 1,
  //     name: "Default",
  //     date: "Aug 10 2022",
  //     status: "pending",
  //     amount: "200,12.10",
  //   },
  //   {
  //     _id: 1,
  //     name: "Default",
  //     date: "Aug 10 2022",
  //     status: "pending",
  //     amount: "200,12.10",
  //   },
  //   {
  //     _id: 1,
  //     name: "Default",
  //     date: "Aug 10 2022",
  //     status: "pending",
  //     amount: "200,12.10",
  //   },
  //   {
  //     _id: 1,
  //     name: "Default",
  //     date: "Aug 10 2022",
  //     status: "pending",
  //     amount: "200,12.10",
  //   },
  // ];
  const columns = [
    {
      field: "_id",
      headerName: "",
      hide: true,
    },
    {
      field: "title",
      minWidth: 220,
      flex: 1,
      headerName: "Transaction",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <div className="bg-black p-3 rounded-full">
              <BsArrowUp className="text-sm text-white" />
            </div>
            <span className="font-semibold">{cells.row.title} </span>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (cells) => {
        return (
          <div
            className={`px-4 py-2 ${colors[random]} rounded-full text-xs font-bold`}
          >
            {cells.row.status}
          </div>
        );
      },
    },
    {
      field: "amount",
      minWidth: 150,
      align: "end",
      headerName: "Amount",
    },
    {
      field: "data",
      headerName: "",
      width: 50,
      renderCell: (cells) => {
        return (
          <>
            <BsThreeDotsVertical
              id="actions"
              className="text-sm cursor-pointer"
              onClick={(event) => handleClickPopOver(event, cells.row)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="w-full h-96">
      <div className="flex md:justify-between items-center p-4">
        <h3 className=" font-extrabold">Transactions</h3>
        <Popover
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
        </Popover>
        <div className="flex items-center">
          <TextField
            id="standard-basic"
            size="small"
            placeholder="search..."
            className="mx-4 "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="mr-4">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
          <BsPlusSquareFill
            onClick={onClickCreate}
            className=" text-3xl text-black"
          />
        </div>
      </div>
      <DataGrid
        className="rounded-xl datagrid-whitout-border"
        disableSelectionOnClick
        disableColumnFilter
        rows={data}
        rowHeight={65}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={false}
        getRowId={(row) => row._id}
        // components={{ Toolbar: SearchInput }}
      />
    </div>
  );
}
