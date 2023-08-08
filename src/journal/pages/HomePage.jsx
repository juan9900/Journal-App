import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { startCreateNewNote } from "../../store/journal/thunks";
export const HomePage = () => {
  const dispatch = useDispatch();
  const onClickNewNote = () => {
    dispatch(startCreateNewNote());
  };
  const { isSaving, active } = useSelector((state) => state.journal);

  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);
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

      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSavingNote}
        onClick={onClickNewNote}
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
