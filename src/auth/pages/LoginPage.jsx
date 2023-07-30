import { useMemo } from "react";

import Google from "@mui/icons-material/Google";
import { Grid, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
export const LoginPage = () => {
  const dispatcher = useDispatch();

  const { status } = useSelector((state) => state.auth);

  //Esto va a evalur el estado de "status" cada vez que cambie, y va a retornar un booleano, cuando sea igual sera true y cuando no, sera false
  const isAuthenticated = useMemo(
    () => status === "checking" || status === "authenticated",
    [status]
  );

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatcher(checkingAuthentication());
  };

  const onGoogleSignIn = () => {
    console.log("on google sing in");
    dispatcher(startGoogleSignIn());
  };
  return (
    <AuthLayout formTitle="Iniciar Sesión">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="123456"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                variant="contained"
                fullWidth
                onClick={onSubmit}
                type="submit"
              >
                Entrar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google sx={{ mr: 1 }} /> Google
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ pt: 2 }}>
            <Link component={RouterLink} color="text.main" to="/auth/register">
              Aún no me he registrado...
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
