import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "primary.main", minHeight: "100vh" }}
    >
      <Grid item>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
