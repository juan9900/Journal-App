import { useState, useMemo, useEffect } from "react";

import {
  Box,
  Toolbar,
  Button,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";
import { Navbar, Sidebar } from "../components";
import { useSelector } from "react-redux";

export const JournalLayout = ({ children }) => {
  const drawerWidth = 250;
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = () => {
    setOpenDrawer((state) => !state);
  };

  const { messageSaved } = useSelector((state) => state.journal);

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setShowSnackbar(messageSaved.includes("actualizada"));
  }, [messageSaved]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };
  const snackBarAction = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        action={snackBarAction}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Nota guardada con éxito!
        </Alert>
      </Snackbar>
    </Box>
  );
};
