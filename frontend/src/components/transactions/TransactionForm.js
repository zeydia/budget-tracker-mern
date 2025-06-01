import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, FormControl, InputLabel, Select, MenuItem,
    Switch, FormControlLabel, Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axiosClient from '../../utils/axiosClient';

const TransactionForm = ({ open, onClose }) => {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date()
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (open) {
            fetchCategories();
        }
    }, [open]);
    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get('/api/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Erreur categories :', error);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/api/transactions', formData);

            //Reset du formulaire
            setFormData({
                description: '',
                amount: '',
                category: '',
                type: 'expense',
                date: new Date()
            });
            setSuccess(response.data.message);
            location.reload();
        } catch (error) {
            setError('Une categorie du meme nom existe deja.');
            console.error('Erreur creation transaction :', error);
        }
    };

        const handleMessage = () => {
            if (error) return <Alert severity="error" >{error} </Alert>;
            if (success) return <Alert severity="success">{success} </Alert>;
        };

    //Filtrer les categories par type
    const filteredCategories = categories.filter(cat => cat.type === formData.type);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle> Nouvelle Transaction </DialogTitle>
                {handleMessage}
                <DialogContent>
                    < Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        {/* Type de transaction */}
                        < FormControlLabel
                            control={
                                < Switch
                                    checked={formData.type === 'income'}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        type: e.target.checked ? 'income' : 'expense',
                                        category: ''//Reset categorie quand on change de type
                                    })}
                                    color=" success "
                                />
                            }
                            label={formData.type === 'income' ? 'Revenu' : 'Depense'}
                        />
                        {/* Description */}
                        < TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Ex: Car rapide UCAD -> Plateau"
                            required
                        />
                        {/* Montant */}
                        < TextField
                            fullWidth
                            label="Montant( FCFA )"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            inputProps={{ min: 0, step: 'any' }}
                        />
                        {/* Categorie */}
                        < FormControl fullWidth required>
                            < InputLabel> Categorie </InputLabel>
                            < Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Categorie"
                            >
                                {filteredCategories.map((category) => (
                                    < MenuItem key={category._id} value={category._id}>
                                        < Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            < Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor: category.color
                                                }}
                                            />
                                            {category.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Date */}
                        < DatePicker
                            label="Date"
                            value={formData.date}
                            onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                            renderInput={(params) => < TextField {...params} fullWidth />}
                            maxDate={new Date()}
                        />
                    </Box>
                </DialogContent>
                < DialogActions>
                    < Button onClick={onClose}> Annuler </Button>
                    < Button type="submit" variant="contained">
                        Creer
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default TransactionForm;