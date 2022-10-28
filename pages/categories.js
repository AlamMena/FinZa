import CategoriesList from "../components/categories/categoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryFrom from "../components/categories/categoryForm";
import { Button } from "@mui/material";
import ConfirmDialog from "../components/globals/confirmDialog";

export default function Categories() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // filters
  const [filter, setFilter] = useState("");

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // confirm form
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState();

  // errors states
  const [errors, setError] = useState();

  const getCategoriesAsync = async () => {
    try {
      const { data } = await axios.get(`/api/categories/get?filter=${filter}`);
      setCategories(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteCategory = async (data) => {
    try {
      setConfirmOpen(true);
      setCategoryToDelete({ ...data, isDeleted: true });
    } catch (error) {
      setError(error);
    }
  };

  const saveCategoryAsync = async (data) => {
    try {
      await axios.post("/api/categories/upsert", data);
      await getCategoriesAsync();
    } catch (error) {
      const { response } = error;
      setError(response.data);
      alert(JSON.stringify(response.data));
      return error;
    }
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };
  useEffect(() => {
    getCategoriesAsync();
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="font-semibold text-xl px-4 py-2">Categories</h1>
      </div>
      <CategoryFrom
        onSave={saveCategoryAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />
      <ConfirmDialog
        title="Do you want to delete this category?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          saveCategoryAsync(categoryToDelete);
          setConfirmOpen(false);
        }}
      />
      <CategoriesList
        data={categories}
        onClickCreate={handleOnClickCreate}
        onSearch={setFilter}
        onDelete={handleDeleteCategory}
        setFormOpen={setFormOpen}
        setFormData={setFormData}
      />
    </div>
  );
}
