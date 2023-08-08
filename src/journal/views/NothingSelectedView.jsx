import { Grid, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
export const NothingSelectedView = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="animate__animated animate__fadeIn animate__faster"
      sx={{
        minHeight: "calc(100vh - 115px)",
        backgroundColor: "rgba(0,0,70,0.1)",
        color: "primary.main",
        borderRadius: 2,
      }}
    >
      {" "}
      <Grid item xs={12}>
        <StarBorderOutlinedIcon sx={{ fontSize: "5rem" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography>Selecciona o crea una carpeta</Typography>
      </Grid>
    </Grid>
  );
};
