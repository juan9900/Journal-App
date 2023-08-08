import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import {
  Grid,
  TextField,
  Link,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreateUserWithEmail } from "../../store/auth";

const initialFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener minimo 6 caracteres",
  ],
  confirmPassword: [
    (value, passwordToMatch) => value === passwordToMatch,
    "Las contraseñas tienen que coincidir",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    displayName,
    email,
    password,
    confirmPassword,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    confirmPasswordValid,
    isFormValid,
  } = useForm(initialFormData, formValidations);

  const { errorMessage, status } = useSelector((state) => {
    return state.auth;
  });

  const isCheckigAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    const { ok } = await dispatcher(
      startCreateUserWithEmail({ email, password, displayName })
    );

    if (ok) return navigate("/", { replace: true });
  };

  return (
    <AuthLayout formTitle="Crear cuenta">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="John Doe"
              fullWidth
              value={displayName}
              name="displayName"
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              value={email}
              name="email"
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="123456"
              fullWidth
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Confirmar contraseña"
              type="password"
              placeholder="123456"
              fullWidth
              value={confirmPassword}
              name="confirmPassword"
              onChange={onInputChange}
              error={!!confirmPasswordValid && formSubmitted}
              helperText={confirmPasswordValid}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 1 }}
            display={errorMessage ? "" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button
                disabled={
                  (!isFormValid && formSubmitted) || isCheckigAuthentication
                }
                type="submit"
                variant="contained"
                fullWidth
                onClick={onSubmit}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ pt: 2 }}>
            ¿Ya tienes una cuenta?
            <Link
              component={RouterLink}
              color="text.main"
              to="/auth/login"
              sx={{ ml: 1 }}
            >
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
