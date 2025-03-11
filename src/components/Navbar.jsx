import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
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
} from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const isLargeScreen = useMediaQuery("(min-width: 768px)"); // Check if screen is large

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Watchlist", icon: <ListAlt /> },
    { text: "Holdings", icon: <BarChart /> },
    { text: "Profile", icon: <Person /> },
  ];

  // Conditionally render Sign In/Sign Up or Logout
  const authItems = isLoggedIn
    ? [
        {
          text: "Logout",
          icon: <Logout />,
        },
      ]
    : [
        {
          text: "Sign In",
          icon: <Login />,
        },
        {
          text: "Sign Up",
          icon: <HowToReg />,
        },
      ];

  const handleItemClick = (item) => {
    if (item === "Logout") {
      setIsLoggedIn(false); // Simulate logging out
    }
  };

  console.log("isLargeScreen", isLargeScreen);

  return (
    <div className="flex">
      {/* Permanent Sidebar */}
      <Drawer
        variant="permanent"
        className="hidden md:flex"
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
          {/* Menu Button */}
          <div className="mb-6 self-start">
            <IconButton onClick={() => setOpen(!open)} className="md:hidden">
              <Menu />
              {/* {open && <Typography variant="h6">Navigation</Typography>} */}
            </IconButton>
          </div>

          {/* Menu List */}
          <List className="flex-grow">
            {menuItems.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  className={`hover:bg-gray-100 rounded-lg p-2 flex items-center ${
                    text === "Sign In" || text === "Sign Up"
                      ? "justify-center"
                      : "justify-start"
                  }`}
                  onClick={() => handleItemClick(text)} // Set selected item on click
                >
                  {/* {icon && <ListItemIcon>{icon}</ListItemIcon>} */}
                  {open && text !== "Sign In" && text !== "Sign Up" && (
                    <ListItemText primary={text} />
                  )}
                  {(text === "Sign In" || text === "Sign Up") && open && (
                    <ListItemText primary={text} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Authentication Items (Sign In / Sign Up or Logout) */}
          <List>
            {authItems.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  className={`text-red-500 ${
                    text === "Logout" ? "hover:bg-gray-100" : ""
                  } p-2 flex items-center justify-center`} // Center the icons and text
                  onClick={() => handleItemClick(text)} // Set selected item on click
                >
                  {/* <ListItemIcon>{icon}</ListItemIcon> */}
                  {open && <ListItemText primary={text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
