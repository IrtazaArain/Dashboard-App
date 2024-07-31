import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import LogIn from "./components/login";
import Analytics from "./components/Analytics";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
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
