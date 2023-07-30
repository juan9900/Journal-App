import { TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

export const Sidebar = ({ drawerWidth, openDrawer, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar>
        //{" "}
        <Typography variant="h6" noWrap component="div">
          // Juan Lauretta //{" "}
        </Typography>
        //{" "}
      </Toolbar>
      <Divider />

      <List>
        {["Enero", "Marzo", "Abril"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TurnedInNot />
              </ListItemIcon>
              <Grid container>
                <ListItemText primary={text} />
                <ListItemText secondary="lorem ipsum soneer citrum aleg" />
              </Grid>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box>
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerWidth: PropTypes.number,
};

Sidebar.defaultProps = {
  drawerWidth: 240,
};
