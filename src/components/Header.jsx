import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Stock Trading Platform</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
