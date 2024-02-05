import { createContext, useReducer, ReactNode } from "react";


type Job = {
  _id: string;
  companyName: string;
  position: string;
  status: "applied" | "rejected" | "callback" | "oa" | "offer";
  appliedDate: string;
};

type State = {
  jobs: Job[] | null;
};

type Action =
  | { type: "SET_JOBS"; payload: Job[] }
  | { type: "CREATE_JOB"; payload: Job }
  | { type: "DELETE_JOB"; payload: { _id: string } }
  | { type: "UPDATE_JOB"; payload: Job };

export const jobsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_JOBS":
      return { jobs: action.payload };
    case "CREATE_JOB":
      return { jobs: state.jobs ? [action.payload, ...state.jobs] : [action.payload] };
    case "DELETE_JOB":
      return {
        jobs: state.jobs ? state.jobs.filter((job) => job._id !== action.payload._id) : null,
      };
    case "UPDATE_JOB":
      return {
        jobs: state.jobs ? state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ) : null,
      };
    default:
      return state;
  }
};

type JobContextProviderProps = {
  children: ReactNode;
};

export type JobContextType = State & {
  dispatch: React.Dispatch<Action>;
};

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobContextProvider = ({ children }: JobContextProviderProps) => {
  const [state, dispatch] = useReducer(jobsReducer, { jobs: null });

  return (
    <JobContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
