import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error)
      setLoading(false);
      setError(json.error);
    } else {
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { error, loading, signup };
};
