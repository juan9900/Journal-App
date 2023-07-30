import { AuthLayout } from "../layout/AuthLayout";
import { Grid, TextField, Link, Button } from "@mui/material";
import Google from "@mui/icons-material/Google";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";

const initialFormData = {
  displayName: "Juan Lauretta",
  email: "Juanluislauretta@gmail.com",
  password: "12345",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 5,
    "La contraseña debe tener minimo 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const {
    displayName,
    email,
    password,
    onInputChange,
    onResetForm,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(initialFormData, formValidations);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <AuthLayout formTitle="Crear cuenta">
      <form onSubmit={onSubmit}>
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
              error={displayNameValid}
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
              error={emailValid}
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
              error={passwordValid}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
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
