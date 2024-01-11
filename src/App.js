import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import HomePage from "./components/HomePage";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
