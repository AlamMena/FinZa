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
import { useState } from "react";
import {
  BsArrow90DegUp,
  BsArrowDown,
  BsArrowUp,
  BsArrowUpCircleFill,
  BsArrowUpRight,
  BsBank,
  BsFillArrowUpRightSquareFill,
  BsPen,
  BsPlus,
  BsPlusSquareFill,
  BsSearch,
  BsSortDown,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import { debounce, formatCurrency } from "../../Utils/utils";

export default function CategoriesList({
  setFormOpen,
  setFormData,
  onSearch,
  data,
  onDelete,
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

  const handleOnClickEdit = (category) => {
    setFormData(category);
    setFormOpen(true);
  };

  const handleOnClickDelete = (category) => {
    setConfirmOpen(true);
    setItemToDelete(category);
  };

  const columns = [
    {
      field: "_id",
      width: 100,
      headerName: "Id",
    },
    {
      fiels: "Image",
      flex: 1,
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

  // const handleConfirmForm = async () => {
  //   try {
  //     setConfirmOpen(true);

  //     setAlertParams({
  //       severity: "success",
  //       title: "category deleted successfully",
  //     });

  //     setAlert(true);
  //   } catch (error) {
  //     setAlertParams({
  //       severity: "error",
  //       title: "Oops!, something went wrong, try later",
  //     });
  //     setAlert(true);
  //   }
  // };

  // const CategoryRow = () => {
  //   return (
  //     <TableRow className=" bg-neutral-100 rounded-2xl my-2">
  //       <TableCell className=" rounded-l-3xl">
  //         {" "}
  //         <div className="flex items-center space-x-4">
  //           <div className="bg-black p-2 rounded-full">
  //             <BsBank className="text-xs text-white" />
  //           </div>
  //           <span className="font-semibold text-xs">Grocery shop</span>
  //         </div>
  //       </TableCell>
  //       <TableCell>
  //         <span className="font-semibold text-xs opacity-40">Apr, 06 2022</span>
  //       </TableCell>
  //       <TableCell align="right">
  //         <span className="flex font-semibold text-xs text-green-500 space-x-2">
  //           <span>$5,000</span>
  //           <BsArrowUpCircleFill />
  //         </span>
  //       </TableCell>
  //       <TableCell className=" rounded-r-3xl border-spacing-8">
  //         <div className="flex space-x-4">
  //           <a
  //             onClick={() => handleOnClickEdit(cells.row)}
  //             className="text-purple-600 cursor-pointer"
  //           >
  //             <BsPen />
  //           </a>
  //           <a
  //             onClick={() => handleOnClickDelete(cells.row)}
  //             className="text-red-500 cursor-pointer"
  //           >
  //             <BsTrash />
  //           </a>
  //         </div>
  //       </TableCell>
  //     </TableRow>
  //   );
  // };
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
        </Table> */}
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
