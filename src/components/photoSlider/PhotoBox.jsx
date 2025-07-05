import { useState } from 'react';
import { Box } from '@mui/material';

const PhotoBox = ({ src, activeStep, index }) => {
    return (
        <div>
            {Math.abs(activeStep - index) <= 2 ? (
                <Box
                    component='img'
                    sx={{
                        height: 255,
                        display: 'block',
                        maxWidth: 400,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                    src={src}
                    // alt={step.label}
                />
            ) : null}
        </div>
    );
};

export default PhotoBox;
