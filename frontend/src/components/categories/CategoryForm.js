import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, FormControl, InputLabel, Select, MenuItem,
    Switch, FormControlLabel, Box,
    Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axiosClient from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../../utils/ColorPicker';

const CategoryForm = ({ open, onClose }) => {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [formData, setFormData] = useState({
        name: '',
        color: "#ff0000",
        type: 'expense'
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axiosClient.post('/api/categories', formData);

            //Reset du formulaire
            setFormData({
                name: '',
                color: '',
                type: 'expense'
            });
            setSuccess(response.data.message);
            location.reload();
            
        } catch (error) {
            setError('Une categorie du meme nom existe deja.');
            console.error('Erreur creation de la categorie :', error);
        }

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleColorChange = (selectedColor) => {
        setFormData({
            ...formData,
            color: selectedColor
        });
        setError('');
        setSuccess('');
    };

    const handleMessage = () => {
        if (error) return <Alert severity="error" >{error} </Alert>;
        if (success) return <Alert severity="success">{success} </Alert>;
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle> Nouvelle Catégorie </DialogTitle>
                {handleMessage()}
                <DialogContent>
                    < Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        {/* Type de Catégorie */}
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={formData.type === 'income'}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        type: e.target.checked ? 'income' : 'expense'
                                    })}
                                    color=" success "
                                />
                            }
                            label={formData.type === 'income' ? 'Revenu' : 'Depense'}
                        />
                        {/* Description */}
                        < TextField
                            fullWidth
                            label="Catégorie"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=" Ex: Transport "
                            required
                        />
                        {/* Couleur */}
                        <ColorPicker onChange={handleColorChange} />

                    </Box>
                </DialogContent>
                < DialogActions>
                    < Button onClick={onClose}>Annuler</Button>
                    < Button type="submit" variant="contained">
                        Creer
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CategoryForm;