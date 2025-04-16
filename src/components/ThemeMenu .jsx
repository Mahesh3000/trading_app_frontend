import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import { useThemeMode } from "../context/ThemeContext";

const ThemeMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { themeMode, toggleTheme } = useThemeMode();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode) => {
    toggleTheme(newMode);
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          padding: "8px",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {themeMode === "dark" ? (
          <DarkModeIcon fontSize="small" />
        ) : themeMode === "light" ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <SettingsSystemDaydreamIcon fontSize="small" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange("light")}
          sx={{ padding: "12px 16px", borderRadius: "4px" }}
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("dark")}
          sx={{ padding: "12px 16px", borderRadius: "4px" }}
        >
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("system")}
          sx={{ padding: "12px 16px", borderRadius: "4px" }}
        >
          System
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ThemeMenu;
