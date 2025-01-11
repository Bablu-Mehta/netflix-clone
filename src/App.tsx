import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SelectionScreen from "./components/SelectionScreen/SelectionScreen";
import HomePage from "./components/Home/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { loadFromStorage } from "../store/authSlice";

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/select"
          element={isAuthenticated ? <SelectionScreen /> : <Navigate to="/" />}
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
