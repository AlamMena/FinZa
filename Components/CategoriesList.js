import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../Store/categorySlice";
import ConfirmDialog from "./ConfirmDialog";
export default function CategoriesList({ setFormOpen, setFormData }) {
  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const dispatch = useDispatch();
  const columns = [
    {
      field: "id",
      width: 180,
      headerName: "Id",
    },
    {
      field: "name",
      width: 200,
      headerName: "Name",
      renderCell: (cells) => {
        return <a>{cells.row.name}</a>;
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
  ];

  const categories = useSelector((state) => state.category);

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

      <DataGrid
        rows={categories.data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={false}
      />
      <ConfirmDialog
        title="are u sure?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          dispatch(deleteCategory(itemToDelete));
        }}
      />
    </div>
  );
}
