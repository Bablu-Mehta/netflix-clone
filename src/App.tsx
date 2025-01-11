import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { loadFromStorage } from "../store/authSlice";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import SelectionScreen from "./components/SelectionScreen/SelectionScreen";
import SeriesDetailsPage from "./components/SeriesDetailsPage/SeriesDetailsPage";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />

        {/* Movie Details Route */}
        <Route
          path="/movie/:id"
          element={isAuthenticated ? <MovieDetailsPage /> : <Navigate to="/" />}
        />

        {/* Series Details Route */}
        <Route
          path="/series/:id"
          element={
            isAuthenticated ? <SeriesDetailsPage /> : <Navigate to="/" />
          }
        />

        {/* Profile Selection Route */}
        <Route
          path="/select"
          element={isAuthenticated ? <SelectionScreen /> : <Navigate to="/" />}
        />

        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
