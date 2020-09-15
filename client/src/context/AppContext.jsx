import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // global state that can be used in any component in our application
  const [currentUser, setCurrentUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [formData, setFormData] = useState({});
  const [reloadEntries, setReloadEntries] = useState(true);
  const [currentReflection, setCurrentReflection] = useState(null);
  const user = sessionStorage.getItem('user');

  const updateDailyTask = (goalId, taskUpdate) => {
    //   axios
    //     .patch(`/api/goals/${goalId}`, taskUpdate, {
    //       withCredentials: true
    //     })
    //     .then((resp) => {
    //       setReloadTasks(true);
    //     })
    //     .catch((error) => console.log(error.toString()));
  };

  useEffect(() => {
    //incase the user refreshes & context is cleared
    if (user && !currentUser) {
      axios
        .get('/api/users/me', { withCredentials: true })
        .then((res) => setCurrentUser(res.data))
        .catch((error) => console.log(error));
    }
  }, [currentUser, user]);

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        currentUser,
        setCurrentUser,
        goals,
        setGoals,
        currentMilestone,
        setCurrentMilestone,
        currentGoal,
        setCurrentGoal,
        reloadEntries,
        setReloadEntries,
        updateDailyTask,
        currentReflection,
        setCurrentReflection
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
