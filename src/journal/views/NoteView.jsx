import { SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import { setActiveNote } from "../../store/journal";
import { startUpdateNote } from "../../store/journal/thunks";

export const NoteView = () => {
  const { active: note } = useSelector((state) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);

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

      <Grid item>
        <Button onClick={onSaveNote} color="primary" sx={{ p: 2 }}>
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
      <ImageGallery />
    </Grid>
  );
};
