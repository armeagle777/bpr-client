import { Box, Stack } from '@mui/material';

const PersonalInfoRow = ({ label, text, width }) => {
    return (
        <Stack direction='row'>
            <Box sx={{ width: `${width}%` }}>
                <small>{label}</small>
            </Box>
            <Box sx={{ width: `${100 - width}%` }}>
                <span>{text}</span>
            </Box>
        </Stack>
    );
};

export default PersonalInfoRow;
