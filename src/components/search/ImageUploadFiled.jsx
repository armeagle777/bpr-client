import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Slider,
  Typography,
  Stack,
} from "@mui/material";

const ImageEditorModal = ({
  open = true,
  onClose,
  uploadUrl,
  initialImage,
}) => {
  const [image, setImage] = useState(initialImage || null);
  const [scale, setScale] = useState(1.2);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "edited-image.jpg");

      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Upload successful!");
        console.log(response.data);
        onClose();
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }, "image/jpeg");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Խմբագրել նկարը</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={3} alignItems="center">
          {/* Left side: image */}
          <Box flex={1} display="flex" justifyContent="center">
            {image ? (
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={256}
                height={256}
                border={50}
                borderRadius={20}
                scale={scale}
                rotate={rotate}
              />
            ) : (
              <Button variant="outlined" component="label">
                Ներբեռնել
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            )}
          </Box>

          {/* Right side: tools */}
          {image && (
            <Stack flex={1} spacing={3}>
              <Box>
                <Typography gutterBottom>Մոտեցնել</Typography>
                <Slider
                  value={scale}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, value) => setScale(value)}
                />
              </Box>

              <Box>
                <Typography gutterBottom>Պտտել</Typography>
                <Slider
                  value={rotate}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e, value) => setRotate(value)}
                />
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setImage(null)}
              >
                Հեռացնել
              </Button>
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Չեղարկել</Button>
        {image && (
          <Button variant="contained" onClick={handleSave}>
            Պահպանել
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ImageEditorModal;
