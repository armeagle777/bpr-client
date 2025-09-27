import { useState, useRef } from 'react';
import { Box, Button, Slider, Stack, Typography, Container, Paper } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

const SearchByImage = () => {
  const [image, setImage] = useState(initialImage || null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    const base64 = canvas.toDataURL('image/jpeg');

    try {
      const uploadUrl = 'https://example.com';

      // const response = await axios.post(uploadUrl, {
      //   file: base64,
      //   filename: 'edited-image.jpg',
      // });

      console.log('Image ready for upload:', base64);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Որոնում Լուսանկարով
        </Typography>

        <Box display="flex" gap={3} alignItems="center">
          {/* Left side: image */}
          <Box flex={1} display="flex" flexDirection="column" alignItems="center">
            {image ? (
              <>
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={256}
                  height={256}
                  border={10}
                  borderRadius={20}
                  scale={scale}
                  rotate={rotate}
                />
                {/* Show uploaded image below the editor */}
                <Box mt={2}>
                  <Typography variant="subtitle1">Ներբեռնված Նկարը</Typography>
                  <img
                    src={image}
                    alt="Uploaded preview"
                    style={{
                      marginTop: 8,
                      width: 150,
                      height: 'auto',
                      borderRadius: 12,
                    }}
                  />
                </Box>
              </>
            ) : (
              <Button variant="outlined" component="label">
                Ներբեռնել
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
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

              <Button variant="outlined" color="secondary" onClick={() => setImage(null)}>
                Հեռացնել
              </Button>
            </Stack>
          )}
        </Box>

        {/* Actions */}
        {image && (
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button variant="outlined" onClick={() => setImage(null)}>
              Չեղարկել
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Որոնել
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SearchByImage;
