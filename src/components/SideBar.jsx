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
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const { isLoggedIn, login, logout } = useAuth();

  console.log("isLoggedIn", isLoggedIn);

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
        { text: "Sign In", icon: <Login />, action: login },
        { text: "Sign Up", icon: <HowToReg /> },
      ];

  const handleItemClick = (item) => {
    if (item.protected && !isLoggedIn) return;
    setSelectedItem(item.text);

    if (item.path) {
      window.location.href = item.path;
    }

    if (item.action) {
      item.action();
    }
  };

  console.log("selectedItem", selectedItem);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isLargeScreen ? (open ? 200 : 60) : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isLargeScreen ? (open ? 200 : 60) : 60,
          transition: "width 0.3s",
        },
      }}
    >
      <div className="h-screen bg-white border-r flex flex-col items-center p-4">
        <div className="w-full flex justify-end">
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Menu />}
          </IconButton>
        </div>
        {/* Menu List */}
        <List className="flex-grow">
          {menuItems.map(({ text, icon, path, protected: isProtected }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleItemClick({ text, path, protected: isProtected })
                }
                disabled={isProtected && !isLoggedIn}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* Authentication Items */}
        <List>
          {authItems.map(({ text, icon, action }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick({ text, action })}
                className="text-red-500"
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
