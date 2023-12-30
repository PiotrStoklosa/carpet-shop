import React, {useContext, useEffect, useState} from 'react';
import {CartContext} from "./Cart";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {Carpet} from "./Body";
import {useParams} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BackArrow from "./BackArrow";

const defaultCarpet: Carpet = {
    _id: "",
    shape: "",
    color: "",
    material: "",
    image: "",
    description: "",
    price: 0
}

const CarpetItemView: React.FC = () => {


    const {itemID} = useParams();
    const item: string = itemID!;
    const {addToCarpets} = useContext(CartContext);
    const [carpet, setCarpet] = useState<Carpet>(defaultCarpet);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carpet/' + item);
                setCarpet(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <BackArrow/>

            <Card className="card">
                <CardMedia
                    component="img"
                    height="250"
                    width="120"
                    image={`${process.env.PUBLIC_URL}/pictures/${carpet.image}`}
                    style={{objectFit: 'contain'}}
                />
                <CardContent>
                    <Typography variant="h4" color="div">
                        {carpet.description}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {carpet.material}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {carpet.shape}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {carpet.price} PLN
                    </Typography>
                    <Typography style={{textAlign: 'right'}}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => {
                                addToCarpets(carpet._id);
                            }}
                        ><ShoppingCartIcon/>
                        </IconButton>
                    </Typography>

                </CardContent>
            </Card>
        </div>
    );
};

export default CarpetItemView;