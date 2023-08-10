import { useState, useEffect } from "react";

import { ImageList, ImageListItem } from "@mui/material";
import { NoteImage } from "./NoteImage";

export const ImageGallery = ({ images }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if all images have loaded
    const allImagesLoaded = images.every((image) => image.complete);
    if (allImagesLoaded) {
      setImagesLoaded(true);
    }
  }, [images]);

  if (images.length === 0) {
    return;
  }
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={300}>
      {images.map((image) => (
        <NoteImage key={image} image={image} />
      ))}
    </ImageList>
  );
};
