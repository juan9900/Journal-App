import { useRef, useState } from "react";
import { Box, ImageListItem, Skeleton } from "@mui/material";

export const NoteImage = ({ image }) => {
  console.log(image);
  const loadedImage = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Box sx={{ position: "relative", maxWidth: 339, maxHeight: 300 }} container>
      <ImageListItem>
        <img
          ref={loadedImage}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          src={`${image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={image}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </ImageListItem>
      <Skeleton
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99,
          display: imageLoaded && "none",
        }}
        absolute
        variant="rectangular"
        width={"100%"}
        height={"100%"}
      />
    </Box>
  );
};
