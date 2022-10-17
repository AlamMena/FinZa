import CategoriesList from "../components/categories/categoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryFrom from "../components/categories/categoryForm";
import { Button } from "@mui/material";

export default function Categories() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // errors states
  const [error, setError] = useState();

  const getCategoriesAsync = async () => {
    try {
      // const { data } = await axios.get("/api/categories/getAll");
      // setCategories(data);
      // dispatch(setCategories(data));
    } catch (error) {
      setError(error);
    }
  };

  const deleteCategoryAsync = async (id) => {
    try {
      // const { data } = await axios.get("/api/categories/getAll");
      // setCategories(data);
      // dispatch(setCategories(data));
      setCategories(
        categories.filter((category) => category.id !== itemToDelte)
      );
    } catch (error) {
      setError(error);
    }
  };

  const saveCategoryAsync = async (data) => {
    try {
      // alert("response");
      // const response = await axios.post("/api/categories/upsert", data);
      // alert(response);

      setCategories([...categories, { ...data, id: 1 }]);
    } catch (error) {
      setError(error);
      alert(error);
      return error;
    }
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };
  useEffect(() => {
    getCategoriesAsync();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={handleOnClickCreate}
          className="bg-black capitalize rounded-2xl hover:bg-black my-4"
        >
          New category
        </Button>
      </div>
      <CategoryFrom
        onSave={saveCategoryAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />
      <CategoriesList
        data={categories}
        setFormOpen={setFormOpen}
        setFormData={setFormData}
      />
    </div>
  );
}
