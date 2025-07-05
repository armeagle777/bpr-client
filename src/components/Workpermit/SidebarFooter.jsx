import styled from '@emotion/styled';
import React from 'react';
import PieChartIcon from '@mui/icons-material/PieChart';

import { Typography, Badge } from '@mui/material';

const StyledButton = styled.a`
    padding: 5px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    color: #484848;
    text-decoration: none;
`;

const StyledSidebarFooter = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    color: white;
    background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
    /* background: #0098e5; */
`;

const StyledCollapsedSidebarFooter = styled.a`
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    color: white;
    background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
    /* background: #0098e5; */
`;

const codeUrl = 'https://workpermit.am/am/home';

export const SidebarFooter = ({ children, collapsed, ...rest }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
            }}
        >
            {collapsed ? (
                <StyledCollapsedSidebarFooter href={codeUrl} target='_blank'>
                    <PieChartIcon size={28} />
                </StyledCollapsedSidebarFooter>
            ) : (
                <StyledSidebarFooter {...rest}>
                    <div style={{ marginBottom: '12px' }}>
                        <PieChartIcon size={30} />
                    </div>
                    <Typography
                        textAlign='center'
                        fontSize={10}
                        fontWeight={600}
                    >
                        Աշխատանքի թույլտվության բաժին
                    </Typography>
                    <Typography
                        variant='caption'
                        style={{ letterSpacing: 1, opacity: 0.7 }}
                    ></Typography>
                    <div style={{ marginTop: '16px' }}>
                        <StyledButton href={codeUrl} target='_blank'>
                            <Typography
                                variant='caption'
                                color='#607489'
                                fontWeight={600}
                            >
                                Այցելել
                            </Typography>
                        </StyledButton>
                    </div>
                </StyledSidebarFooter>
            )}
        </div>
    );
};
