import { Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import CategoryList from '../components/categories/CategoryList'
import { Add } from '@mui/icons-material'
import CategoryForm from '../components/categories/CategoryForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../utils/Loading'

const CategoryPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        location.reload();
        return ;
    }

    return (
        < Container maxWidth="lg" sx={{ mt: '80px', mx: '5px' }}>
            <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h4"> Mes Categories </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                    sx={{ transform: 'translate(-30%, 0%)' }}
                >
                    Nouvelle Categorie
                </Button>
                <CategoryForm open={open} onClose={handleClose} />
            </Box>
            <CategoryList />
        </Container>
    )
}

export default CategoryPage;