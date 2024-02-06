//@ts-nocheck

import "./App.css";
import Navbar from "./components/ui/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import HomePage from "./components/homePage";
import SignUpForm from "./components/users/signUp";
import LoginForm from "./components/users/login";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={!user? <SignUpForm /> : <Navigate to="/"/>} />
          <Route path="/login" element={!user? <LoginForm />: <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>

      {/* <div className="row-span-2 col-span-4 lg:col-span-2 lg:col-start-2 lg:row-span-1">
        <SignUpForm/>
        </div> */}
    </>
  );
}

export default App;
