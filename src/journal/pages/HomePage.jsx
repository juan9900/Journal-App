import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const HomePage = () => {
  const navigate = useNavigate();
  const btnNavigateLogin = () => {
    navigate("/auth/login");
  };

  const btnNavigateRegister = () => {
    navigate("/auth/register");
  };
  return (
    <>
      <div>HomePage</div>
      <button onClick={btnNavigateLogin}> Go to Login Page</button>
      <button onClick={btnNavigateRegister}> Go to Register Page</button>
      <Button variant="contained">Hello World</Button>
    </>
  );
};
