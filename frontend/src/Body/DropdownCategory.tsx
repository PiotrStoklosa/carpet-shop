import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

interface Category {
    _id: string;
    category: string;
}

interface ChildProps {
    setCarpetURL: (url: string) => void;
}

const DropdownCategory: React.FC<ChildProps> = ({setCarpetURL}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
        setCarpetURL('http://localhost:3001/carpet/material/' + event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
                labelId="category-label"
                id="category-select"
                value={selectedCategory}
                label="Select Category"
                onChange={handleCategoryChange}
            >
                {categories.map((category) => (
                    <MenuItem key={category._id} value={category.category}>
                        {category.category}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropdownCategory;