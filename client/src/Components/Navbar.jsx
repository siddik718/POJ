import { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom'
import { deleteData } from '../Authoraization/Auth';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Avatar, Button, MenuItem, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const pages = [
  { name: 'Home', path: '/', id: 1 },
  { name: 'Contest', path: '/contest', id: 2 },
  { name: 'Community', path: '/community', id: 3 },
  { name: 'Problems', path: '/problems', id: 4 },
  { name: 'Submissions', path: '/submissions', id: 5 },
];

export function Navbar() {

  const { username, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteData();
    setUsername('');
    navigate('/');
  };

  const settings = [
    { name: username, path: `/me/${username}`, id: 1 },
    { name: 'My Discussions', path: '/my/blogs', id: 2 },
    { name: 'My Submissions', path: `submissions/my/${username}`, id: 3 },
    { name: 'Logout', onClick: handleLogout, id: 4 },
  ];


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={ Link }
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POJ
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
                {pages.map((page) => (
                  <Link key={page.id} to={page.path} style={{ textDecoration: 'none' }} >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={ Link }
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POJ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {username ? (
            <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: blue[700] }} />
                </IconButton>
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
                {settings.map((setting) => (
                  <MenuItem key={setting.id} onClick={() => {
                    handleCloseUserMenu();
                    if (setting.onClick) {
                      setting.onClick();
                    }
                  }} >
                    <Typography textAlign="center" component={Link} to={setting.path} sx={{ textDecoration:'none' }} >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (<Button color="inherit" component={Link} to="/login">
            Login
          </Button>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}