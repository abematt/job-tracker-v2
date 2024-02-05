import { useAuthContext } from "./useAuthContext";
import { useJobsContext } from "./useJobsContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: jobsDispatch } = useJobsContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    jobsDispatch({ type: "SET_JOBS" , payload: null});
  };
  return { logout };
};
