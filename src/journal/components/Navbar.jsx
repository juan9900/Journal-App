import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ display: { sm: "none" } }}
          onClick={() => {
            handleDrawerToggle();
          }}
        >
          <MenuOutlined></MenuOutlined>
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {" "}
            Journal App
          </Typography>
          <IconButton color="inherit">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  drawerWidth: PropTypes.number,
};
