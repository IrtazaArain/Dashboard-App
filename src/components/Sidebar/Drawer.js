import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

const drawerWidth = 240;

// Drawer styles when opened
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Drawer styles when closed
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Drawer = ({ open, handleDrawerClose, setTitle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleItemClick = (path, itemTitle) => {
    if (path === "/") {
      handleLogout();
    } else {
      navigate(path);
      setTitle(itemTitle);
      handleDrawerClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  const primaryItems = [
    { text: "Dashboard", icon: <DashboardRoundedIcon />, path: "/dashboard" },
    { text: "Analytics", icon: <LeaderboardRoundedIcon />, path: "/analytics" },
    { text: "Reports", icon: <DescriptionRoundedIcon />, path: "/reports" },
    { text: "Profile", icon: <AccountCircleRoundedIcon />, path: "/profile" },
    { text: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" },
  ];

  const secondaryItems = [
    { text: "Log out", icon: <LogoutRoundedIcon />, path: "/" },
  ];

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <ListItems
        items={primaryItems}
        open={open}
        onItemClick={handleItemClick}
      />
      <Divider />
      <ListItems
        items={secondaryItems}
        open={open}
        onItemClick={handleItemClick}
      />
    </StyledDrawer>
  );
};

const ListItems = ({ items, open, onItemClick }) => (
  <List>
    {items.map((item) => (
      <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={() => onItemClick(item.path, item.text)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default Drawer;
