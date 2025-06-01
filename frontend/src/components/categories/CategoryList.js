import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Card, CardContent, Typography,
    IconButton, Button, Box, Chip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axiosClient from '../../utils/axiosClient';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../utils/Loading';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { load } = useAuth();

    const token = localStorage.getItem('token');

    //Charger les categories au montage du composant
    useEffect(() => {
        load(token);
        fetchCategories();
    }, [token]);
    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get('/api/categories');            
            setCategories(response.data.data);
        } catch (error) {
            console.error('Erreur lors du chargement des categories :', error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Supprimer cette categorie ?')) {
            try {
                await axiosClient.delete('/api/categories/${id}');
                setCategories(categories.filter(cat => cat._id !== id));
            } catch (error) {
                console.error('Erreur lors de la suppression :', error);
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category._id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Box
                                        width={24}
                                        height={24}
                                        borderRadius="50%"
                                        bgcolor={category.color}
                                        mr={2}
                                    />
                                    <Typography variant="h6">{category.name} </Typography>
                                </Box>
                                <Chip
                                    label={category.type === 'income' ? 'Revenu' : 'Depense'}
                                    color={category.type === 'income' ? 'success' : 'error'}
                                    size="small"
                                />
                                <Box mt={2} display="flex" justifyContent="flex - end">
                                    <IconButton size="small">
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default CategoryList;