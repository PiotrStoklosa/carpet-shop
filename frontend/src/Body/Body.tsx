import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

interface CarpetCard {
    _id: String,
    shape: String,
    color: String,
    material: String,
    image: String,
    description: String
}


const Body: React.FC = () => {

    const [data, setData] = useState<CarpetCard[]>([]);

    useEffect(() => {
        // Funkcja do pobierania danych
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
                    <Card className="card">
                        <CardMedia
                            component="img"
                            height="140"
                            width = "120"
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
                </Grid>
            ))}
        </Grid>
    );
};

export default Body;