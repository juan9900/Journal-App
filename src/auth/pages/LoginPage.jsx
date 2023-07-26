import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const handleBtnPress = () => {
    navigate("/");
  };
  return (
    <>
      <Typography variant={"h1"}>Login Page</Typography>
      <button onClick={handleBtnPress}> Go to HomePage</button>
    </>
  );
};
