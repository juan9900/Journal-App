import { useMemo } from "react";

import Google from "@mui/icons-material/Google";
import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { useForm } from "../../hooks";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from "../../store/auth";

const formData = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const dispatcher = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  //Esto va a evalur el estado de "status" cada vez que cambie, y va a retornar un booleano, cuando sea igual sera true y cuando no, sera false
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const { email, password, onInputChange } = useForm(formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatcher(startLoginWithEmailAndPassword(email, password));
  };

  const onGoogleSignIn = () => {
    dispatcher(startGoogleSignIn());
  };
  return (
    <AuthLayout formTitle="Iniciar Sesión">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
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

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            display={errorMessage ? "" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isCheckingAuthentication}
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
                disabled={isCheckingAuthentication}
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
