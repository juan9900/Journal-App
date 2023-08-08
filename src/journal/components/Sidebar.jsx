import { useDispatch, useSelector } from "react-redux";
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
import { SidebarItem } from "./SidebarItem";
import { setActiveNote } from "../../store/journal";

export const Sidebar = ({ drawerWidth, openDrawer, handleDrawerToggle }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const dispatcher = useDispatch();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {notes.length > 0 ? (
          notes.map((note) => <SidebarItem key={note.id} {...note} />)
        ) : (
          <ListItem key="not-found">
            <ListItemText primary="Aún no has creado ninguna nota..." />
          </ListItem>
        )}
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
