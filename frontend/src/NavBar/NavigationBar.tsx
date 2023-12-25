import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import logo from './logo.png';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import {Badge} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function MenuAppBar() {

    const handleAddToCart = () => {
        setCartItems(cartItems + 1);
    };

    const [cartItems, setCartItems] = useState(0);
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: '#684C38'}}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        <Link href="/" underline="none">
                            <Avatar sx={{width: 60, height: 60}} alt="Logo" src={logo}/>
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 2}}/>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleAddToCart}
                    >
                        <Badge badgeContent={cartItems} color="error">
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
