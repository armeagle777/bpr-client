import * as React from 'react';
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    menuClasses,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PieChartIcon from '@mui/icons-material/PieChart';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { Typography, Badge, Chip, Box, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const themes = {
    light: {
        sidebar: {
            backgroundColor: '#ffffff',
            color: '#607489',
        },
        menu: {
            menuContent: '#fbfcfd',
            icon: '#0098e5',
            hover: {
                backgroundColor: '#c5e4ff',
                color: '#44596e',
            },
            disabled: {
                color: '#9fb6cf',
            },
        },
    },
    dark: {
        sidebar: {
            backgroundColor: '#0b2948',
            color: '#8ba1b7',
        },
        menu: {
            menuContent: '#082440',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#00458b',
                color: '#b6c8d9',
            },
            disabled: {
                color: '#3e5e7e',
            },
        },
    },
};

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Aside = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);
    const [rtl, setRtl] = React.useState(false);
    const [hasImage, setHasImage] = React.useState(false);
    const [theme, setTheme] = React.useState('dark');

    // handle on theme change event
    const handleThemeChange = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const menuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(
                          themes[theme].menu.menuContent,
                          hasImage && !collapsed ? 0.4 : 1
                      )
                    : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(
                    themes[theme].menu.hover.backgroundColor,
                    hasImage ? 0.8 : 1
                ),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };
    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={() => setToggled(false)}
            onBreakPoint={setBroken}
            image='https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg'
            rtl={rtl}
            breakPoint='md'
            backgroundColor={hexToRgba(
                themes[theme].sidebar.backgroundColor,
                hasImage ? 0.9 : 1
            )}
            rootStyles={{
                color: themes[theme].sidebar.color,
                height: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Stack
                    sx={{
                        width: '100%',
                        alignItems: 'flex-end',
                        margin: '0',
                        padding: '0',
                    }}
                >
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
                    </IconButton>
                </Stack>
                <SidebarHeader
                    rtl={rtl}
                    style={{ marginBottom: '24px', marginTop: '16px' }}
                    theme={theme}
                    setTheme={setTheme}
                />
                <div style={{ flex: 1, marginBottom: '32px' }}>
                    <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                        <Typography
                            variant='body2'
                            fontWeight={600}
                            style={{
                                opacity: collapsed ? 0 : 0.7,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Հիմնական
                        </Typography>
                    </div>
                    <Menu menuItemStyles={menuItemStyles}>
                        <SubMenu
                            label='Գործողություններ'
                            icon={<PieChartIcon />}
                            suffix={
                                <Chip label='6' size='small' color='error' />
                            }
                        >
                            <MenuItem component={<Link to='ssns-fromfile' />}>
                                Ներբեռնել xcel
                            </MenuItem>
                            <MenuItem> Line charts</MenuItem>
                            <MenuItem> Bar charts</MenuItem>
                        </SubMenu>
                        <SubMenu label='Maps' icon={<PieChartIcon />}>
                            <MenuItem> Google maps</MenuItem>
                            <MenuItem> Open street maps</MenuItem>
                        </SubMenu>
                        <SubMenu label='Components' icon={<PieChartIcon />}>
                            <MenuItem> Grid</MenuItem>
                            <MenuItem> Layout</MenuItem>
                            <SubMenu label='Forms'>
                                <MenuItem> Input</MenuItem>
                                <MenuItem> Select</MenuItem>
                                <SubMenu label='More'>
                                    <MenuItem> CheckBox</MenuItem>
                                    <MenuItem> Radio</MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </Menu>

                    <div
                        style={{
                            padding: '0 24px',
                            marginBottom: '8px',
                            marginTop: '32px',
                        }}
                    >
                        <Typography
                            variant='body2'
                            fontWeight={600}
                            style={{
                                opacity: collapsed ? 0 : 0.7,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Հավելյալ
                        </Typography>
                    </div>

                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            icon={<PieChartIcon />}
                            suffix={
                                <Chip
                                    label='New'
                                    color='success'
                                    size='small'
                                />
                            }
                        >
                            Calendar
                        </MenuItem>
                        <MenuItem icon={<PieChartIcon />}>
                            Documentation
                        </MenuItem>
                    </Menu>
                </div>
                <SidebarFooter collapsed={collapsed} />
            </div>
        </Sidebar>
    );
};

export default Aside;
