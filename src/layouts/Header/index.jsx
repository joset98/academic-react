import React, { useContext, useState, useRef } from "react";

import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Divider, Hidden, IconButton, Menu, Tooltip, Grid } from "@mui/material";
// import { CloseIcon, MenuIcon } from "@material-ui/data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ExitToApp } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { withTheme } from "styled-components";


import { AuthDataContext } from "providers/Auth/provider";
import { ConfigContext } from "providers/Config/provider";
import { setCookie } from "utils/cookie";

import Button from "components/Button";
import Text from "components/Text";
import { NavItem } from "components/Nav/styles";
import Container, { Avatar, Menu as MenuMobile, Logout, MenuItem } from "./styles";
import { Skeleton, Icon } from '../Sidebar/styles';

const dataFake = Array(20).fill(20).map((e, idx) => ({
  value: `Pago realizado del estudiante Ricardo ${idx}`,
  link: '/p/estudiantes/pagos/gestiona/289',
}));

const Header = ({ theme, routes, loading }) => {
  const notificationsRef = useRef();
  const navigate = useNavigate();
  const config = useContext(ConfigContext);
  const { name, lastname } = useContext(AuthDataContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState(dataFake);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (closeSession = false) => {
    setAnchorEl(null);
    if (closeSession) {
      setCookie('auth', null, -1);
      navigate('/auth/login');
    }
  };

  console.log({headerRoutes: routes})

  return (
    <Container sideBarStatic={config.sideBarStatic}>
      <Text fontFamily="secondary" color="gray700" fontWeight="600">
        {theme.config.name}
      </Text>

      <Grid item>
        <IconButton ref={notificationsRef}
          onClick={() => { setOpenNotifications(!openNotifications) }}
          aria-label="notifications" component="span"
        >
          <Tooltip title="Notificaciones" aria-label="back">
            <Badge badgeContent={notificationsList.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </Tooltip>
        </IconButton>
        <Menu
          id="notifications-menu"
          anchorEl={notificationsRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              maxHeight: '350px',
              width: '300px',
            },
          }}
          keepMounted
          open={openNotifications}
          onClose={() => { setOpenNotifications(!openNotifications) }}
        >
          {notificationsList.map((e) => (
            <MenuItem
              key={e.link}
              onClick={() => {
                navigate(`${e.link}`);
                setOpenNotifications(!openNotifications);
              }}
            >
              <Text>{e.value}</Text>
            </MenuItem>
          ))}
        </Menu>

        <Hidden smDown>
          <Button
            aria-controls="simple-menu"
            color="primary"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Text variant="p" pr="10px">
              {`${name ? name.split(' ')[0] : ''} ${lastname ? lastname.split(' ')[0] : ''}`}
            </Text>
            <Avatar>
              <PermIdentityOutlinedIcon fontSize="small" />
            </Avatar>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(false)}
          >
            <MenuItem onClick={() => handleClose(true)}>Cerrar Sesión</MenuItem>
          </Menu>
        </Hidden>

        <Hidden mdUp>
          <IconButton onClick={() => { setOpenMenu(!openMenu) }} color="primary" aria-label="upload picture" component="span">
            {!openMenu ?
              <MenuIcon />
              : <CloseIcon />}
          </IconButton>
        </Hidden>
        {openMenu && (
          <MenuMobile>
            {loading && Array(3).fill(3).map((item, index) => (
              <Skeleton variant="text" key={index} />
            ))}
            {
              !loading && routes.map((route, index) => (
                <NavItem to={route.path} activeClassName="active" exact="false" key={`${route.path + index}-`} onClick={() => { setOpenMenu(false) }}>
                  <Icon size="small">{route.icon}</Icon>
                  {route.name}
                </NavItem>
              ))
            }
            {
              !loading && (
                <>
                  <Divider />
                  <Logout onClick={() => handleClose(true)}>
                    <ExitToApp size="small" />
                    Cerrar sesión
                  </Logout>
                </>
              )
            }
          </MenuMobile>
        )}
      </Grid>
    </Container>
  );
};

Header.propTypes = {
  theme: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withTheme(Header);
