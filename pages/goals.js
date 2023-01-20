import GoalsList from "../components/goals/goalsList";
import { useEffect, useState } from "react";
import api from "../auth/api";
import GoalsForm from "../components/goals/goalsForm";
import { Button, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import ConfirmDialog from "../components/globals/confirmDialog";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import CardContainer from "../components/globals/cardContainer";

export default function Goals() {
  // goals states
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [goalsStatus, setGoalsStatus] = useState({
    completed: 0,
    pending: 0,
    all: 0,
    statusPercentage: "100",
  });

  // tab states
  const [tabValue, setTabValue] = useState(0);

  // filters
  const [filter, setFilter] = useState({ value: "", status: "all" });

  // form states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // confirm form
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState();

  // errors states
  const [errors, setError] = useState();

  const getGoalsAsync = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(
        `/goals/get?filter=${filter.value}&status=${filter.status}`
      );
      setGoals(data);
      await getGoalsStatusAsync();
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const getGoalsStatusAsync = async () => {
    try {
      const { data } = await api.get(`/goals/status`);
      setGoalsStatus(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteGoal = async (data) => {
    try {
      setConfirmOpen(true);
      setGoalToDelete({ ...data, isDeleted: true });
    } catch (error) {
      setError(error);
    }
  };

  const saveGoalAsync = async (data) => {
    try {
      await toast.promise(api.post("/goals/upsert", data), {
        success: "Goal saved!",
        pending: "loading...",
        error: "Oops, something went wrong",
      });
      await getGoalsAsync();
    } catch (error) {
      const { response } = error;
      setError(response.data);
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
    setFilter({
      value: filter.value,
      status: newValue === 0 ? "all" : newValue === 1 ? "pending" : "completed",
    });
  };

  const handleOnClickCreate = () => {
    setFormOpen(true);
    setFormData({});
  };

  useEffect(() => {
    getGoalsAsync();
  }, [filter]);

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

  return (
    <div>
      <div className="flex items-center mb-10 w-full justify-between ">
        <Button
          variant="contained"
          type="submit"
          onClick={() => handleOnClickCreate()}
          className="bg-purple-600 capitalize max-w-sm rounded-2xl hover:bg-black"
        >
          New goal
        </Button>
      </div>
      <CardContainer>
        <div className="flex justify-between md:w-full md:space-x-8 mb-8 flex-wrap-reverse p-4">
          <div className="flex flex-col space-y-4">
            <span className="text-black text-opacity-40 text-sm font-semibold">
              Total goals
            </span>
            <span className="text-3xl font-semibold">{goalsStatus.all}</span>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-black text-opacity-40 text-sm font-semibold">
              Completed
            </span>
            <span className="text-3xl font-semibold">
              {goalsStatus.completed}
              <span className="text-green-400 text-xs mx-2">3 new</span>
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-black text-opacity-40 text-sm font-semibold">
              Pending
            </span>
            <span className="text-3xl font-semibold">
              {goalsStatus.pending}
              <span className="text-red-400 text-xs mx-2">5 new</span>
            </span>
          </div>
          <div className="flex flex-col w-full md:w-max md:mb-8 mb-8 space-y-2  ">
            <div className="flex justify-between">
              <span className="text-xs text-black text-opacity-40">
                Completion percentage
              </span>
              <span className="text-xl font-semibold">
                {goalsStatus.statusPercentage}%
              </span>
            </div>

            <LinearProgress
              variant="determinate"
              className="w-full md:w-96 rounded-lg"
              color="primary"
              value={goalsStatus.statusPercentage}
            />
          </div>
        </div>
      </CardContainer>

      <GoalsForm
        onSave={saveGoalAsync}
        open={formOpen}
        data={formData}
        setOpen={setFormOpen}
      />
      <ConfirmDialog
        title="Do you want to delete this category?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          saveGoalAsync(goalToDelete);
          setConfirmOpen(false);
        }}
      />

      <CardContainer>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
            <Tab className=" capitalize" label="All" {...a11yProps(0)} />
            <Tab className=" capitalize" label="Pending" {...a11yProps(1)} />
            <Tab className=" capitalize" label="Completed" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}></TabPanel>
        <TabPanel value={tabValue} index={1}></TabPanel>
        <TabPanel value={tabValue} index={2}></TabPanel>
        <GoalsList
          data={goals}
          onClickCreate={handleOnClickCreate}
          onSearch={setFilter}
          isLoading={isLoading}
          onDelete={handleDeleteGoal}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
        />
      </CardContainer>
    </div>
  );
}
