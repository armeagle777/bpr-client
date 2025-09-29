import AvatarEditor from 'react-avatar-editor';
import { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Slider,
  Stack,
  Typography,
  Container,
  Paper,
  Alert as MuiAlert,
} from '@mui/material';

import useSearchByImageData from '../../../hooks/useSearchByImageData';
import DataLoader from '../../../components/DataLoader/DataLoader';
import PersonLightDataCard from './PersonLightDataCard';

const fakeData = [
  {
    psn: '2701850401',
    firstName: 'Tigran',
    lastName: 'Yeranyan',
    middleName: 'Ashot',
    birthdate: '17/01/1985',
    imageBase64: '',
    probability: 0.3,
    registrationAddress: 'Yerevan nice Address',
  },
  {
    psn: '2702350401',
    firstName: 'Tigr',
    lastName: 'Vardyan',
    middleName: '',
    birthdate: '20/01/1985',
    imageBase64: '',
    probability: 0.9,
    registrationAddress: 'Yerevan nice Address',
  },
];

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
    const base64 = canvas.toDataURL('image/jpeg');

    setImageBase64(base64);
  };

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setScale(1);
    setImageBase64(null);
    setRotate(1);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
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
            <Button variant="contained" onClick={handleSave}>
              Որոնել
            </Button>
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
