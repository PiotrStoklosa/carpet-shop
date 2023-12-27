import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

export interface Carpet {
    _id: string,
    shape: string,
    color: string,
    material: string,
    image: string,
    description: string
}


const Body: React.FC = () => {

    const [data, setData] = useState<Carpet[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carpet');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <Grid container spacing={3}>
            {data.map((card) => (
                <Grid item key={card._id as React.Key} xs={12} sm={4} md={3}>
                    <NavLink to={'/item/' + card._id} style={{textDecoration: 'none'}}>
                        <Card className="card">
                            <CardMedia
                                component="img"
                                height="140"
                                width="120"
                                image={`pictures/${card.image}`}
                                alt={`${card.description}`}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {card.material}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.shape}
                                </Typography>
                            </CardContent>
                        </Card>
                    </NavLink>
                </Grid>
            ))}
        </Grid>
    );
};

export default Body;