import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("El UID del usuario no existe");
  const notesList = [];
  const querySnapshot = await getDocs(
    collection(firebaseDB, `${uid}/journal/notes`)
  );
  querySnapshot.forEach((doc) => {
    notesList.push({ id: doc.id, ...doc.data() });
  });
  return notesList;
};
