import CategoriesList from "../Components/CategoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "../Store/categorySlice";
import CategoryFrom from "../Components/CategoryForm";
import ConfirmDialog from "../Components/ConfirmDialog";

export default function Categories() {
  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // errors states
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const getCategoriesAsync = async () => {
    try {
      // const { data } = await axios.get("/api/categories/getAll");
      // dispatch(setCategories(data));
    } catch (error) {
      setError(error);
    }
  };

  const upsertCategoriesAsync = async (data) => {
    try {
      // const response = await axios.post("/api/categories/upsert", data);
      if (data.id) {
        dispatch(updateCategory(data));
      } else {
        const category = { id: Math.floor(Math.random() * 1000), ...data };
        dispatch(addCategory(category));
      }
      // return response;
    } catch (error) {
      setError(error);
      return error;
    }
  };
  useEffect(() => {
    getCategoriesAsync();
  }, []);

  return (
    <div>
      <CategoryFrom
        onSave={upsertCategoriesAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />
      <CategoriesList setFormOpen={setFormOpen} setFormData={setFormData} />
    </div>

    // <div className=" grid grid-cols-12  lg:gap-x-20">
    //   <div className="col-span-12">
    //     <h1 className="main_header_page my-4">Categories</h1>
    //   </div>
    //   <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-5">
    //     <CategoryCard name="Food" description="category of food" />
    //     <CategoryCard name="Food" description="category of food" />
    //     <CategoryCard name="Food" description="category of food" />
    //     <CategoryCard name="Food" description="category of food" />
    //   </div>
    //   <div className="col-span-12 md:col-span-6 lg:my-0 my-8">
    //     <div className="flex space-x-6">
    //       <h2 className="main_header text-purple-400">History</h2>
    //       <h2 className="main_header text-neutral-400">Upcoming</h2>
    //     </div>
    //     <hr className=" w-full h-2 my-4" />
    //     <h1 className="font-semibold my-6 text-neutral-400">13 Sep, 2020</h1>
    //     <TransactionHistory />

    //     <h1 className="font-semibold my-6 text-neutral-400">13 Sep, 2020</h1>
    //     <div className="space-y-8">

    //       <TransactionHistory />
    //       <TransactionHistory />
    //       <TransactionHistory />
    //       <TransactionHistory />
    //     </div>
    //   </div>
    // </div>
  );
}
