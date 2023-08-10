export const fileUpload = async (file) => {
  if (!file) throw new Error("No se seleccionó ningún archivo");

  const CLOUD_URL = "https://api.cloudinary.com/v1_1/do8t1qxve/image/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(CLOUD_URL, { method: "POST", body: formData });
    if (!resp.ok) throw new Error("no se pudo subir la imagen");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    throw new Error("Ocurrió un error durante la subida del archivo.");
  }
};
