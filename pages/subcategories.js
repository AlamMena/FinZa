import SubcategoryList from "../components/subcategories/subcategoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import SubcategoryForm from "../components/subcategories/subcategoryForm";
import { Button } from "@mui/material";

export default function Categories() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [subcatgories, setSubcategories] = useState([]);

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // errors states
  const [error, setError] = useState();

  const getSubcategoriesAsync = async () => {
    try {
      // const { data } = await axios.get("/api/categories/getAll");
      // setCategories(data);
      // dispatch(setCategories(data));
    } catch (error) {
      setError(error);
    }
  };

  const deleteSubcategoriesAsync = async (id) => {
    try {
      // const { data } = await axios.get("/api/categories/getAll");
      // setCategories(data);
      // dispatch(setCategories(data));
      setSubcategories(
        subcatgories.filter((category) => category.id !== itemToDelte)
      );
    } catch (error) {
      setError(error);
    }
  };

  const saveSubcategoryAsync = async (data) => {
    try {
      // alert("response");
      // const response = await axios.post("/api/categories/upsert", data);
      // alert(response);

      setSubcategories([
        ...subcatgories,
        { ...data, id: 1, balance: 100, profit: 200, loss: 100 },
      ]);
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
    getSubcategoriesAsync();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="font-semibold text-xl px-4 py-2">Subcategories</h1>
        <Button
          variant="contained"
          onClick={handleOnClickCreate}
          className="bg-black capitalize rounded-2xl hover:bg-black"
        >
          New category
        </Button>
      </div>
      <SubcategoryForm
        onSave={saveSubcategoryAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />

      <SubcategoryList
        data={subcatgories}
        setFormOpen={setFormOpen}
        setFormData={setFormData}
      />
    </div>
  );
}
