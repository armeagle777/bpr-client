import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Divider, ListItemIcon } from "@mui/material";
import { PersonAdd, Save, Logout, Group } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { userHasPermission } from "../../utils/helperFunctions";
import { permissionsMap } from "../../utils/constants";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);

  const navigate = useNavigate();
  const user = useAuthUser();

  const { onLogout } = useAuthData();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    setAnchorElUser(null);
    onLogout();
  };

  const onUserMenuClick = (path) => {
    setAnchorElUser(null);
    navigate(path || "/");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              width: 200,
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 300,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Համակարգ
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "center",
            }}
          >
            {userHasPermission(
              [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/">Անձի Որոնում</Link>
              </Button>
            )}
            {userHasPermission(
              [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="register">ԻԱՊՌ</Link>
              </Button>
            )}
            {userHasPermission(
              [
                permissionsMap.KADASTR_CERTIFICATE.uid,
                permissionsMap.ADMIN.uid,
              ],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="kadastr-certificates">Կադաստր</Link>
              </Button>
            )}
            {userHasPermission(
              [
                permissionsMap.ROADPOLICE_FULL_SEARCH.uid,
                permissionsMap.ADMIN.uid,
              ],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="vehicle-search">ՃՈ</Link>
              </Button>
            )}
            {userHasPermission(
              [permissionsMap.WP_PERSON_SEARCH.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="wp-person-search">WP Որոնում</Link>
              </Button>
            )}
            {userHasPermission(
              [permissionsMap.ASYLUM.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="asylum-search">Փախստականների Որոնում</Link>
              </Button>
            )}
            {userHasPermission(
              [permissionsMap.WEAPON.uid, permissionsMap.ADMIN.uid],
              user.permissions
            ) && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="weapon-search">Զենք</Link>
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${user.firstName || ""} ${user.lastName || ""}`}>
              <IconButton
                onClick={handleOpenUserMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  // src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={open}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => onUserMenuClick("/profile")}>
                <Avatar />
                Օգտահաշիվ
              </MenuItem>
              <Divider />
              {userHasPermission(
                [permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <div>
                  <MenuItem onClick={() => onUserMenuClick("/users")}>
                    <ListItemIcon>
                      <Group fontSize="small" />
                    </ListItemIcon>
                    Օգտատերեր
                  </MenuItem>
                  <MenuItem onClick={() => onUserMenuClick("/roles")}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Կարգավորումներ
                  </MenuItem>
                </div>
              )}

              <MenuItem onClick={() => onUserMenuClick("/likes")}>
                <ListItemIcon>
                  <Save fontSize="small" />
                </ListItemIcon>
                Պահպանված որոնումներ
              </MenuItem>
              <MenuItem onClick={logOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Ելք
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
