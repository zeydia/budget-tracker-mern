import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TransactionList from '../components/transactions/TransactionList'
import { Add } from '@mui/icons-material'
import TransactionForm from '../components/transactions/TransactionForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../utils/Loading'

const TransactionPage = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);


    

    const handleClose = () => {
        setOpen(false)
        location.reload()
        return;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: '80px', mx: '5px' }}>
            <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h4"> Mes Transactions </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                    sx={{ transform: 'translate(-30%, 0%)' }}
                >
                    Nouvelle Transaction
                </Button>
                <TransactionForm open={open} onClose={handleClose} />
            </Box>
            <TransactionList />
        </Container>
    )
}

export default TransactionPage