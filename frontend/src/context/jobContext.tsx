import { createContext, useReducer } from "react";

export const JobContext = createContext(null);

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBS":
      return { jobs: action.payload };
    case "CREATE_JOB":
      return { jobs: [action.payload, ...state.jobs] };
    case "DELETE_JOB":
      return {
        jobs: state.jobs.filter((job) => job._id !== action.payload._id),
      };
    case "UPDATE_JOB":
      return {
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    default:
      return state;
  }
};

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, { jobs: null });

  return (
    <JobContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
