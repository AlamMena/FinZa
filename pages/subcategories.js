import SubcategoriesList from "../components/subcategories/subcategoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import SubcategoryFrom from "../components/subcategories/subcategoryForm";
import { Button } from "@mui/material";
import ConfirmDialog from "../components/globals/confirmDialog";

export default function Categories() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  // filters
  const [filter, setFilter] = useState("");

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // confirm form
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState();

  // errors states
  const [errors, setError] = useState();

  const searchCategoriesAsync = async (value) => {
    try {
      const { data } = await axios.get(`/api/categories/get?filter=${value}`);
      return data;
    } catch (error) {
      setError(error);
    }
  };
  const getSubcategoriesAsync = async () => {
    try {
      const { data } = await axios.get(
        `/api/subcategories/get?filter=${filter}`
      );
      setSubcategories(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteSubcategory = async (data) => {
    try {
      setConfirmOpen(true);
      setSubcategoryToDelete({ ...data, isDeleted: true });
    } catch (error) {
      setError(error);
    }
  };

  const saveSubcategoryAsync = async (data) => {
    try {
      await axios.post("/api/subcategories/upsert", data);
      await getSubcategoriesAsync();
    } catch (error) {
      const { response } = error;
      setError(response.data);
      return error;
    }
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };

  useEffect(() => {
    getSubcategoriesAsync();
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="font-semibold text-xl px-4 py-2">Subcategories</h1>
        <Button
          variant="contained"
          onClick={handleOnClickCreate}
          className="bg-black capitalize rounded-2xl hover:bg-black"
        >
          New Subcategory
        </Button>
      </div>
      <SubcategoryFrom
        onSave={saveSubcategoryAsync}
        searchCategories={searchCategoriesAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />
      <ConfirmDialog
        title="Do you want to delete this subCategory?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          saveSubcategoryAsync(subcategoryToDelete);
          setConfirmOpen(false);
        }}
      />
      <SubcategoriesList
        data={subcategories}
        onSearch={setFilter}
        onDelete={handleDeleteSubcategory}
        setFormOpen={setFormOpen}
        setFormData={setFormData}
      />
    </div>
  );
}
