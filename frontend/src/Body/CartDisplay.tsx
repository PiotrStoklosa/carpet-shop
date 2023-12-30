import React, {useContext, useEffect, useState} from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {CartCarpet, CartContext} from "./Cart";
import BackArrow from "./BackArrow";
import axios from "axios";
import {Carpet} from "./Body";
import {Button, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from '@mui/icons-material/Remove';
import {NavLink} from 'react-router-dom';

const CartDisplay: React.FC = () => {
    const {carpets, removeFromCarpets, resetCart} = useContext(CartContext);

    const [data, setData] = useState<Carpet[]>([]);
    const [shippingAddress, setShippingAddress] = useState('');
    const [email, setEmail] = useState('');
    const [blik, setBlik] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carpet');
                setData(response.data as Carpet[]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function handleCart() {
        resetCart();
    }

    const calculateTotalPrice = (): number => {
        let totalPrice = 0;

        carpets.forEach((carpet) => {
            const {id, quantity} = carpet;
            const price = data[parseInt(id) - 1].price * quantity || 0;

            totalPrice += price;
        });

        return totalPrice;
    };

    return (

        <div>
            <BackArrow/>
            <Typography variant="h6" gutterBottom>
                Shopping Cart
            </Typography>

            {carpets.length === 0 || data.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <List>
                    {carpets.map((carpet: CartCarpet) => (
                        <ListItem key={carpet.id}>
                            <ListItemText
                                primary={`${data[parseInt(carpet.id) - 1].description}, Carpet ID: ${carpet.id}`}
                                secondary={`Quantity: ${carpet.quantity}, ${carpet.quantity * data[parseInt(carpet.id) - 1].price} PLN`}
                            />
                            <IconButton
                                color="primary"
                                onClick={() => removeFromCarpets(carpet.id)}
                                style={{color: '#684C38'}}
                            >
                                <RemoveIcon/>
                            </IconButton><img
                            src={`${process.env.PUBLIC_URL}/pictures/${data[parseInt(carpet.id) - 1].image}`}
                            alt={`Carpet ${carpet.id}`}
                            style={{maxWidth: '100px', maxHeight: '100px'}}
                        />
                        </ListItem>

                    ))}
                </List>
            )
            }
            {(carpets.length !== 0 && data.length !== 0) && (
                <>
                    <p>{calculateTotalPrice()} PLN</p>
                    <TextField
                        label="Shipping Address"
                        variant="outlined"
                        fullWidth
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        style={{margin: '10px 0'}}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{margin: '10px 0'}}
                    />
                    <TextField
                        label="Blik"
                        variant="outlined"
                        fullWidth
                        value={blik}
                        onChange={(e) => setBlik(e.target.value)}
                        style={{margin: '10px 0'}}
                    />
                    <NavLink to={'/thankyou'} style={{textDecoration: 'none'}}>
                        <Button
                            variant="contained"
                            style={{backgroundColor: '#684C38'}}
                            onClick={handleCart}
                        >
                            KUP
                        </Button>
                    </NavLink>
                </>
            )}

        </div>
    )
        ;
};

export default CartDisplay;