import CategoriesList from "../components/categories/categoriesList";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryFrom from "../components/categories/categoryForm";
import { Button, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import ConfirmDialog from "../components/globals/confirmDialog";
import { Box } from "@mui/system";

export default function Categories() {
  // category list states
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // tab states
  const [tabValue, setTabValue] = useState(0);

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
      // alert(JSON.stringify(data));
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    getCategoriesAsync();
  }, [filter]);

  return (
    <div>
      <div className="flex items-center mb-10 w-full justify-between">
        <h1 className="font-semibold text-xl py-2 tracking-widest">Accounts</h1>

        <Button
          variant="contained"
          type="submit"
          onClick={() => handleOnClickCreate()}
          className="bg-purple-600 capitalize max-w-sm rounded-2xl hover:bg-black"
        >
          New account
        </Button>
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

// import CategoriesList from "../components/categories/categoriesList";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import CategoryFrom from "../components/categories/categoryForm";
// import { Button, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
// import ConfirmDialog from "../components/globals/confirmDialog";
// import { Box } from "@mui/system";

// export default function Categories() {
//   // category list states
//   const [isLoading, setIsLoading] = useState(true);
//   const [categories, setCategories] = useState([]);

//   // tab states
//   const [tabValue, setTabValue] = useState(0);

//   // filters
//   const [filter, setFilter] = useState("");

//   // form states
//   const [formOpen, setFormOpen] = useState(false);
//   const [formData, setFormData] = useState({});

//   // confirm form
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState();

//   // errors states
//   const [errors, setError] = useState();

//   const getCategoriesAsync = async () => {
//     try {
//       const { data } = await axios.get(`/api/categories/get?filter=${filter}`);
//       setCategories(data);
//       // alert(JSON.stringify(data));
//     } catch (error) {
//       setError(error);
//     }
//   };

//   const handleDeleteCategory = async (data) => {
//     try {
//       setConfirmOpen(true);
//       setCategoryToDelete({ ...data, isDeleted: true });
//     } catch (error) {
//       setError(error);
//     }
//   };

//   const saveCategoryAsync = async (data) => {
//     try {
//       await axios.post("/api/categories/upsert", data);
//       await getCategoriesAsync();
//     } catch (error) {
//       const { response } = error;
//       setError(response.data);
//       alert(JSON.stringify(response.data));
//       return error;
//     }
//   };

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleOnClickCreate = () => {
//     setFormOpen(true);
//     setFormData({});
//   };

//   function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box sx={{ p: 1 }}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }

//   useEffect(() => {
//     getCategoriesAsync();
//   }, [filter]);

//   return (
//     <div>
//       <div className="flex items-center mb-10 w-full justify-between">
//         <h1 className="font-semibold text-xl py-2 tracking-widest">Accounts</h1>

//         <Button
//           variant="contained"
//           type="submit"
//           onClick={() => handleOnClickCreate()}
//           className="bg-purple-600 capitalize max-w-sm rounded-2xl hover:bg-black"
//         >
//           New Category
//         </Button>
//       </div>
//       <div className="flex justify-between md:w-full md:space-x-8 mb-8 flex-wrap-reverse">
//         <div className="flex flex-col space-y-4">
//           <span className="text-black text-opacity-40 text-sm font-semibold">
//             Total activities
//           </span>
//           <span className="text-3xl font-semibold">1,700</span>
//         </div>
//         <div className="flex flex-col space-y-4">
//           <span className="text-black text-opacity-40 text-sm font-semibold">
//             Completed
//           </span>
//           <span className="text-3xl font-semibold">
//             23<span className="text-green-400 text-xs mx-2">3 new</span>
//           </span>
//         </div>
//         <div className="flex flex-col space-y-4">
//           <span className="text-black text-opacity-40 text-sm font-semibold">
//             Pending
//           </span>
//           <span className="text-3xl font-semibold">
//             43<span className="text-red-400 text-xs mx-2">5 new</span>
//           </span>
//         </div>
//         <div className="flex flex-col w-full md:w-max md:mb-8 mb-8 space-y-2  ">
//           <div className="flex justify-between">
//             <span className="text-xs text-black text-opacity-40">
//               Completion percentage
//             </span>
//             <span className="text-xl font-semibold">70%</span>
//           </div>

//           <LinearProgress
//             variant="determinate"
//             className="w-full md:w-96 rounded-lg"
//             color="primary"
//             value={50}
//           />
//         </div>
//       </div>

//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
//           <Tab className=" capitalize" label="All" {...a11yProps(0)} />
//           <Tab className=" capitalize" label="Pending" {...a11yProps(1)} />
//           <Tab className=" capitalize" label="Completed" {...a11yProps(2)} />
//         </Tabs>
//       </Box>

//       <TabPanel value={tabValue} index={0}></TabPanel>
//       <TabPanel value={tabValue} index={1}></TabPanel>
//       <TabPanel value={tabValue} index={2}></TabPanel>

//       <CategoryFrom
//         onSave={saveCategoryAsync}
//         open={formOpen}
//         data={formData}
//         setOpen={setFormOpen}
//       />
//       <ConfirmDialog
//         title="Do you want to delete this category?"
//         open={confirmOpen}
//         onCancel={() => setConfirmOpen(false)}
//         onConfirm={() => {
//           saveCategoryAsync(categoryToDelete);
//           setConfirmOpen(false);
//         }}
//       />
//       <CategoriesList
//         data={categories}
//         onClickCreate={handleOnClickCreate}
//         onSearch={setFilter}
//         onDelete={handleDeleteCategory}
//         setFormOpen={setFormOpen}
//         setFormData={setFormData}
//       />
//     </div>
//   );
// }
