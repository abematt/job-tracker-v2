import { createContext, useEffect, useReducer, ReactNode } from "react";

// export const AuthContext = createContext();

type User = {
  // Define the structure of a user here
  _id: string;
  email: string;
  password: string;
};

type State = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

export const AuthContext = createContext<{ user: User | null, loading: boolean, error: string | null, dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: false, error: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext State:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};