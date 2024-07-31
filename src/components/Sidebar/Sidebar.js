import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "./AppBar";
import DrawerComponent from "./Drawer";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard"); // Initialize with default title

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title={title}
      />
      <DrawerComponent
        open={open}
        handleDrawerClose={handleDrawerClose}
        setTitle={setTitle}
      />
    </Box>
  );
};

export default Sidebar;
