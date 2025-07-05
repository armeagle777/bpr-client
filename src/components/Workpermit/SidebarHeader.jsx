import styled from '@emotion/styled';
import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';

const StyledSidebarHeader = styled.div`
    height: 64px;
    min-height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    > div {
        width: 100%;
        overflow: hidden;
    }
`;

const StyledLogo = styled.div`
    width: 35px;
    min-width: 35px;
    height: 35px;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: white;
    font-size: 24px;
    font-weight: 700;
    background-color: #009fdb;
    background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
    ${({ rtl }) =>
        rtl
            ? `
      margin-left: 10px;
      margin-right: 4px;
      `
            : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader = ({ children, rtl, theme, setTheme, ...rest }) => {
    return (
        <StyledSidebarHeader {...rest}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLogo rtl={rtl}>WP</StyledLogo>
                <Typography
                    variant='subtitle1'
                    fontWeight={700}
                    color='#0098e5'
                    fontSize={16}
                >
                    WorkPermit
                </Typography>
                <IconButton
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                    color={theme === 'light' ? 'primary' : 'secondary'}
                    aria-label='change Theme'
                >
                    {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </div>
        </StyledSidebarHeader>
    );
};
