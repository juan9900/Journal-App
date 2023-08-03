import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const { uid } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (uid === null) return navigate("/auth/login");
  }, []);
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        nesciunt enim quae, reiciendis, nulla expedita voluptas fugiat eos dolor
        assumenda quo rerum sapiente quos accusamus porro culpa? Nisi, maiores
        explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Esse, officia laudantium. Esse vitae provident, itaque similique earum
        fuga numquam aperiam perferendis odit voluptatem. Nostrum, itaque ab
        pariatur voluptatibus veniam nesciunt?
      </Typography> */}
      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.darker", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
