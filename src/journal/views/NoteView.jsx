import { useEffect, useMemo, useRef } from "react";

import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Icon,
} from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { setActiveNote } from "../../store/journal";
import {
  startDeleteNote,
  startUpdateNote,
  startUploadingFiles,
} from "../../store/journal/thunks";

export const NoteView = () => {
  const { active: note, isSaving } = useSelector((state) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);

  const checkIfSaving = useMemo(() => isSaving === true);
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  });

  const dispatch = useDispatch();

  //Cuando se cambia un valor del formulario que usa useForm, el formstate cambia, por lo tanto en este hook cada vez que cambie el formstate vamos a actualizar la nota activa con los nuevos datos ingresados
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startUpdateNote());
  };

  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeleteNote());
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="animate__animated animate__fadeIn animate__faster"
      sx={{ mb: 1 }}
    >
      <Typography fontSize={39} fontWeight="light">
        {dateString}
      </Typography>

      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />

      <Grid item>
        <Button
          disabled={checkIfSaving}
          color="primary"
          onClick={() => fileInputRef.current.click()}
        >
          <UploadIcon sx={{ fontSize: 25 }} />
          Subir imágenes
        </Button>
        <Button
          disabled={checkIfSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ p: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          value={title}
          name="title"
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="¿Qué sucedió el día de hoy?"
          label="Contenido"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
          value={body}
          name="body"
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery images={note.imageUrls} />
      <Button onClick={onDeleteNote} variant="contained" color="error">
        Eliminar nota
      </Button>
    </Grid>
  );
};
