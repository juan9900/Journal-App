import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const handleBtnPress = () => {
    navigate("/");
  };
  return (
    <>
      <div>RegisterPage</div>
      <button onClick={handleBtnPress}> Go to HomePage</button>
    </>
  );
};
