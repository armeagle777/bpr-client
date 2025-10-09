import { useState, useRef, useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import AvatarEditor from 'react-avatar-editor';
import {
  Box,
  Paper,
  Stack,
  Slider,
  Button,
  Container,
  Typography,
  Alert as MuiAlert,
} from '@mui/material';

import PersonLightDataCard from './PersonLightDataCard';
import DataLoader from '../../../components/DataLoader/DataLoader';
import useSearchByImageData from '../../../hooks/useSearchByImageData';

const SearchByImageTab = () => {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const editorRef = useRef();
  const { data, isError, error, isFetching, isLoading } = useSearchByImageData(imageBase64);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    console.log('Canvas', canvas);
    const base64 = canvas.toDataURL('image/jpeg');
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    console.log(cleanBase64);
    setImageBase64(cleanBase64);
  };

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setScale(1);
    setImageBase64(null);
    setRotate(1);
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Որոնում Լուսանկարով
        </Typography>
        <Box display="flex" gap={3} alignItems="center">
          {/* Left side: image */}
          <Box flex={1} display="flex" flexDirection="row" alignItems="center">
            {image ? (
              <>
                <Stack
                  mt={2}
                  sx={{ width: '100%' }}
                  direction="row"
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                >
                  <Box>
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
                </Stack>

                {/* Show uploaded image below the editor */}
              </>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button variant="outlined" component="label">
                  Ներբեռնել
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
              </Box>
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

              <Button variant="outlined" color="secondary" onClick={handleRemoveImage}>
                Հեռացնել
              </Button>
            </Stack>
          )}
        </Box>

        {/* Actions */}
        {image && (
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button variant="outlined" onClick={handleRemoveImage}>
              Չեղարկել
            </Button>
            <LoadingButton variant="contained" onClick={handleSave} loading={isFetching}>
              Որոնել
            </LoadingButton>
          </Box>
        )}
      </Paper>

      <Stack spacing={2}>
        {isError ? (
          <MuiAlert severity="error">{error.response?.data?.message || error.message}</MuiAlert>
        ) : isFetching ? (
          <DataLoader />
        ) : null}
        {!!data?.length && data.map((person) => <PersonLightDataCard data={person} />)}
      </Stack>
    </Container>
  );
};

export default SearchByImageTab;
