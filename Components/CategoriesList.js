import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
export default function CategoriesList() {
  const columns = [
    {
      field: "_id",
      headerName: "Id",
    },
    { field: "name", headerName: "Name" },
  ];

  const categories = useSelector((state) => state.category);

  return (
    <div className="w-full h-72">
      <DataGrid
        rows={categories.data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={categories.isLoading}
      />
    </div>
  );
}
