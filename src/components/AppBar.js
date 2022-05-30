import * as React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store/reducers/authSlice';
import { removeCompany } from '../store/reducers/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/images/ace_tech_logo.png'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import BackgroundLetterAvatars from './Avatar';



const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userAuthenticated = useSelector((state) => state.auth.user_authenticated);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/' className='text-decoration-none link-light'>
              <img className='appbar-logo' alt='logo' src={logo} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/' className='text-decoration-none link-dark'>
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              {userAuthenticated &&
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/customers' className='text-decoration-none link-dark'>
                    <Typography textAlign="center">Customers</Typography>
                  </Link>
                </MenuItem>
              }
              {userAuthenticated &&
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/recent' className='text-decoration-none link-dark'>
                    <Typography textAlign="center">Recent</Typography>
                  </Link>
                </MenuItem>
              }
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to='/' className='text-decoration-none link-light'>
              Ace Tech Apps
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userAuthenticated &&
              <>
                <Link to='/' className='text-decoration-none'>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    Home
                  </Button>
                </Link>
                <Link to='/customers' className='text-decoration-none'>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    Customers
                  </Button>
                </Link>
                <Link to='/recent' className='text-decoration-none'>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    Recent
                  </Button>
                </Link>
              </>
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {userAuthenticated ?
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.providerId ?
                    <Avatar alt="Remy Sharp" src={user.photoURL} />
                    :
                    <BackgroundLetterAvatars user={user} />
                  }
                </IconButton>
              </Tooltip>
              :
              <Link to='/login' className='text-decoration-none link-dark'>
                <Button variant="contained" disableElevation>Login</Button>
              </Link>
            }

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to='/profile' className='text-decoration-none link-dark'>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link to='/dashboard' className='text-decoration-none link-dark'>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </Link>
              <Link to='/login' className='text-decoration-none link-dark'>
                <MenuItem onClick={() => {
                  dispatch(logout());
                  dispatch(removeCompany());
                  handleCloseUserMenu();
                }}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;