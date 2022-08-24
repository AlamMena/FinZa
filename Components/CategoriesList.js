import { Alert, Button, Snackbar } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../Store/categorySlice";
import ConfirmDialog from "./ConfirmDialog";

export default function CategoriesList({ setFormOpen, setFormData }) {
  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  // alert states
  const [alert, setAlert] = useState(false);
  const [alertParams, setAlertParams] = useState({
    severity: "success",
    title: "",
  });
  const columns = [
    {
      fiels: "Image",
      width: "auto",
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
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                setFormOpen(true);
                setFormData(cells.row);
              }}
              className="text-purple-600 cursor-pointer"
            >
              Edit
            </a>
            <a
              onClick={() => {
                setConfirmOpen(true);
                setItemToDelete(cells.row);
              }}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </a>
          </div>
        );
      },
    },
    {
      field: "id",
      width: 180,
      headerName: "Id",
    },
  ];

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);

  const handleConfirmForm = () => {
    setConfirmOpen(false);
    try {
      dispatch(deleteCategory(itemToDelete));
      setAlertParams({
        severity: "success",
        title: "category deleted successfully",
      });
      setAlert(true);
    } catch (error) {
      setAlertParams({
        severity: "error",
        title: "Oops!, something went wrong, try later",
      });
      setAlert(true);
    }
  };

  return (
    <div className="w-full h-96">
      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={() => {
            setFormOpen(true);
            setFormData({});
          }}
          className="bg-black rounded-2xl hover:bg-black my-4"
        >
          New
        </Button>
      </div>

      <div className="w-full h-full shadow-lg px-4 py-2 rounded-xl">
        <DataGrid
          GridLinesVisibility="None"
          rows={categories.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={false}
          className="white"
          // sx={{
          //   boxShadow: 2,
          //   borderRadius: 4,
          //   borderCollapse: "none",
          //   padding: "20px",
          //   "& .MuiDataGrid-cell:hover": {
          //     color: "primary.main",
          //   },
          // }}
        />
      </div>
      <ConfirmDialog
        title="Are you sure?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmForm}
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
