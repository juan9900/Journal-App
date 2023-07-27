import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import MailOutline from "@mui/icons-material/MailOutline";
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
      <MailOutline />
      <button onClick={btnNavigateLogin}> Go to Login Page</button>
      <button onClick={btnNavigateRegister}> Go to Register Page</button>
      <Button variant="contained">Hello World</Button>
    </>
  );
};
