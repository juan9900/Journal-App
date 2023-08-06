import { Box, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { Navbar, Sidebar } from "../components";
import { useState } from "react";

export const JournalLayout = ({ children }) => {
  const drawerWidth = 250;
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = () => {
    setOpenDrawer((state) => !state);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        openDrawer={openDrawer}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` } }}
        component="main"
      >
        <Toolbar />
        {/* Este toolbar solo sirve para que el texto de main aparezca debajo del toolbar de navegacion, si no se coloca, el texto de main se esconderia detras del toolbar de navegacion
         */}
        {children}
      </Box>
    </Box>
  );
};
