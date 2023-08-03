import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
export const AuthLayout = ({ children, formTitle = "Bienvenido" }) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: "4" }}
    >
      <Grid
        item
        className="box-shadow"
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          margin: "auto",
        }}
        xs={11}
        sm={6}
        md={6}
        lg={3}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {formTitle}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  formTitle: PropTypes.string.isRequired,
};
