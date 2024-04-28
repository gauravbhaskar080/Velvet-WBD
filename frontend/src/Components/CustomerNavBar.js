import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';

import logo from './logo.jpeg'

import { useNavigate } from "react-router-dom";
import { logout } from '../features/login/loginSlice';


function ResponsiveAppBar() {
    
    const isCustomerLoggedIn = useSelector(state => state.isCustomerLoggedIn);
    const dispatch = useDispatch();

    const pages = ['Tiles', 'Furniture', 'Sanitary', 'Artifacts', 'Paints'];
    const settings = ['Profile', 'Cart', 'Login As Seller', 'Login As Admin', isCustomerLoggedIn ? 'Logout': 'Login'];

    const navigate = useNavigate();
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

    const handleRedirect = (page) => {
        if(page==='Tiles'){
            navigate('/velvethomes/showprodcat/64a594174f6b05e6fe5a5545');
        }
        else if(page==='Furniture'){
            navigate('/velvethomes/showprodcat/64a5955d9b3dc77cbe74db29');
        }else if(page==='Sanitary'){
            navigate('/velvethomes/showprodcat/64a5960c7b9dea400786c055')
        }else if(page==='Artifacts'){
            navigate('/velvethomes/showallprodsubcat/64aa7d3f3f89f953e9b1e8a8')
        }else if(page==='Paints'){
            navigate('/velvethomes/showallprodsubcat/64aa7d3f3f89f953e9b1e8aa')
        }else if(page==='Cart'){
            navigate('/velvethomes/cart')
        }else if(page==='Profile'){
            navigate('/velvethomes/pinfo')
        }else if(page==='Login As Seller'){
            navigate('/velvethomes/seller/login')
        }else if(page==='Login As Admin'){
            navigate('/velvethomes/admin/login')
        }else if(page==='Login'){
            navigate('/login')
        }else{
            dispatch(logout());
        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} onClick={() => navigate('/')} height='70px' style={{ marginTop: '10px', cursor: 'pointer', marginBottom: '10px', borderRadius: '25%' }} alt="" />
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Velvet Homes
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
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Velvet Homes
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=>handleRedirect(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <img style={{height:"50px", width:"50px"}} src="https://cdn-icons-png.flaticon.com/128/847/847969.png" alt="profile" />
                            </IconButton>
                        </Tooltip>
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
                                <MenuItem key={setting} onClick={()=>handleRedirect(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;