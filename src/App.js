import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import LogIn from "./components/login";
import Analytics from "./components/Analytics";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      <div style={{ display: "flex" }}>
        {!isLoginPage && <Sidebar />}
        <main style={{ flexGrow: 1, paddingTop: "4rem" }}>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/" element={<LogIn />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
