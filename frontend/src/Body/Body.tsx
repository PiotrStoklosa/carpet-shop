import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import DropdownCategory from "./DropdownCategory";

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
    const [carpetURL, setCarpetURL] = useState<string>('http://localhost:3001/carpet');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(carpetURL)
                const response = await axios.get(carpetURL);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [carpetURL]);
    return (
        <>
            <div style={{maxWidth: '20%', height: '30px'}}>
                <DropdownCategory setCarpetURL={setCarpetURL} />
            </div>

            <Grid container spacing={3}  style={{  paddingTop: '40px' }}>
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
        </>
    )
        ;
};

export default Body;