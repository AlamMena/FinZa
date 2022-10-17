import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import {
  BsArrow90DegUp,
  BsArrowUp,
  BsArrowUpCircleFill,
  BsArrowUpRight,
  BsBank,
  BsFillArrowUpRightSquareFill,
  BsPen,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import ConfirmDialog from "../globals/confirmDialog";

export default function CategoriesList({ setFormOpen, setFormData, data }) {
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
    setFormOpen(true);
    setFormData(category);
  };

  const handleOnClickDelete = (category) => {
    setConfirmOpen(true);
    setItemToDelete(category);
  };

  const columns = [
    {
      field: "id",
      width: 50,
      headerName: "Id",
    },
    {
      fiels: "Image",
      width: 200,
      headerName: "Name",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <img
              className=" rounded-xl w-10 h-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQw_lYmrP6EnN8mHsBmJfrP4e6E9JW6An2A&usqp=CAU"
            />
            <span className="font-semibold">{cells.row.name}</span>
          </div>
        );
      },
    },

    {
      field: "amount",
      width: 120,
      headerName: "Total",
    },
    {
      field: "type",
      width: 120,
      headerName: "Type",
    },

    {
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => handleOnClickEdit(cells.row)}
              className="text-purple-600 cursor-pointer"
            >
              <BsPen />
            </a>
            <a
              onClick={() => handleOnClickDelete(cells.row)}
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

  const CategoryRow = () => {
    return (
      <TableRow>
        <TableCell>
          {" "}
          <div className="flex items-center space-x-4">
            <div className="bg-black p-2 rounded-full">
              <BsBank className="text-xs text-white" />
            </div>
            <span className="font-semibold text-xs">Grocery shop</span>
          </div>
        </TableCell>
        <TableCell>
          <span className="font-semibold text-xs opacity-40">Apr, 06 2022</span>
        </TableCell>
        <TableCell align="right">
          <span className="flex font-semibold text-xs text-green-500 space-x-2">
            <span>$5,000</span>
            <BsArrowUpCircleFill />
          </span>
        </TableCell>
        <TableCell>
          <div className="flex space-x-4">
            <a
              onClick={() => handleOnClickEdit(cells.row)}
              className="text-purple-600 cursor-pointer"
            >
              <BsPen />
            </a>
            <a
              onClick={() => handleOnClickDelete(cells.row)}
              className="text-red-500 cursor-pointer"
            >
              <BsTrash />
            </a>
          </div>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div className="w-full">
      <div className="w-full h-full border-gray-50 border-2 p-2 rounded-xl">
        <h1 className="font-semibold px-4 py-2">Categories</h1>
        {/* <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={false}
        /> */}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last Transaction Date</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data && data.map((item) => <CategoryRow />)}</TableBody>
        </Table>
      </div>
      <ConfirmDialog
        title="Are you sure?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        // onConfirm={handleConfirmForm}
      />
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
