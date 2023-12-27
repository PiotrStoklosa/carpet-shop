import React, {useContext, useEffect, useState} from 'react';
import {CartContext} from "./Cart";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {Carpet} from "./Body";
import { useParams } from 'react-router-dom';

const defaultCarpet: Carpet = {
    _id: "",
    shape: "",
    color: "",
    material: "",
    image: "",
    description: ""
}

const CarpetItemView: React.FC = () => {


    const { itemID } = useParams();
    const item: string = itemID!;
    const { amount, carpets, addToCarpets, removeFromCarpets } = useContext(CartContext);
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
    console.log(carpet)
    return (

        <Card className="card">
            <CardMedia
                component="img"
                height="250"
                width="120"
                image={`${process.env.PUBLIC_URL}/pictures/${carpet.image}`}
                style={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {carpet.material}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {carpet.shape}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CarpetItemView;