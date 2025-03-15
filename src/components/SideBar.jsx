import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Menu,
  Dashboard,
  ListAlt,
  BarChart,
  Person,
  Login,
  HowToReg,
  Logout,
  Close,
} from "@mui/icons-material";

const Sidebar = () => {
  const [state, setState] = useState({
    open: false,
    selectedItem: "Dashboard",
    name: "User",
  });
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const { isLoggedIn, login, logout } = useAuth();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    {
      text: "Watchlist",
      icon: <ListAlt />,
      path: "/watchlist",
      protected: true,
    },
    {
      text: "Holdings",
      icon: <BarChart />,
      path: "/holdings",
      protected: true,
    },
    { text: "Profile", icon: <Person />, path: "/profile", protected: true },
  ];

  const authItems = isLoggedIn
    ? [{ text: "Logout", icon: <Logout />, action: logout }]
    : [
        { text: "Sign In", icon: <Login />, path: "/signin" }, // Changed path
        { text: "Sign Up", icon: <HowToReg />, path: "/signup" }, // Changed path
      ];

  const handleItemClick = (item) => {
    if (item.protected && !isLoggedIn) return;
    setState((prev) => ({ ...prev, selectedItem: item.text }));

    if (item.path) {
      window.location.href = item.path;
    }

    if (item.action) {
      item.action();
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isLargeScreen ? (state.open ? 200 : 60) : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isLargeScreen ? (state.open ? 200 : 60) : 60,
          transition: "width 0.3s",
        },
      }}
    >
      <div className="h-screen bg-white border-r flex flex-col items-center p-4">
        <div className="w-full flex justify-between items-center">
          {state.open && (
            <span className="text-lg font-semibold">{state.name}</span>
          )}
          <IconButton
            onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
          >
            <Tooltip title={state.open ? "Close Menu" : "Open Menu"}>
              {state.open ? <Close /> : <Menu />}
            </Tooltip>
          </IconButton>
        </div>
        {/* Menu List */}
        <List className="flex-grow">
          {menuItems.map(({ text, icon, path, protected: isProtected }) => (
            <ListItem key={text} disablePadding>
              <Tooltip title={text} placement="right">
                <ListItemButton
                  onClick={() =>
                    handleItemClick({ text, path, protected: isProtected })
                  }
                  disabled={isProtected && !isLoggedIn}
                >
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    {icon}
                  </ListItemIcon>
                  {state.open && <ListItemText primary={text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        {/* Authentication Items */}
        <List>
          {authItems.map(({ text, icon, action, path }) => (
            <ListItem key={text} disablePadding>
              <Tooltip title={text} placement="right">
                <ListItemButton
                  onClick={() => handleItemClick({ text, action, path })}
                  className="text-red-500"
                >
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    {icon}
                  </ListItemIcon>
                  {state.open && <ListItemText primary={text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
