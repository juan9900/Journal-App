import { Box, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { Navbar, Sidebar } from "../components";

export const JournalLayout = ({ children }) => {
  const drawerWidth = 250;
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box sx={{ flexGrow: 1, p: 3 }} component="main">
        <Toolbar />
        {/* Este toolbar solo sirve para que el texto de main aparezca debajo del toolbar de navegacion, si no se coloca, el texto de main se esconderia detras del toolbar de navegacion
         */}
        {children}
      </Box>
    </Box>
  );
};

JournalLayout.propTypes = {
  children: PropTypes.node.IsRquired,
};
