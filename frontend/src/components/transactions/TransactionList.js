import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axiosClient from '../../utils/axiosClient';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Loading from '../../utils/Loading';
import { useAuth } from '../../contexts/AuthContext';

const columns = [
    { id: 'description', label: 'Transaction', minWidth: 250 },
    {
        id: 'type',
        label: 'Type',
        minWidth: 100,
        format: (value, type) => value == 'expense' ? 'dépense' : 'revenue',
        color: ' ',
    },
    {
        id: 'category',
        label: 'Catégorie',
        minWidth: 150,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Montant(FCFA)',
        minWidth: 100,
        align: 'right',
        format: (value) => value == 'expense' ? `- ${value}` : `+ ${value}`,
        color: ' ',
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'right',
        format: (value) => new Date(value).toDateString()
    },
    {
        id: 'action',
        minWidth: 70,
        align: 'right',
    },
];

const TransactionList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const { load } = useAuth();

    const token = localStorage.getItem('token');

    //Charger les categories au montage du composant
    useEffect(() => {
        load(token);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [transResponse, categoriesResponse] = await Promise.all([
                axiosClient.get('/api/transactions'),
                axiosClient.get('/api/categories')
            ]);
            setTransactions(transResponse.data.data);
            setCategories(categoriesResponse.data.data);
            setLoading(false);

        } catch (error) {
            console.error('Erreur chargement donnees :', error);
        } finally {
            setLoading(false);
        }
    };


    const rows = transactions;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <Loading />

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            const type = row.type;
                                            if (column.id == 'category') {
                                                value = categories.find((categorie) => categorie._id == value).name;
                                            };
                                            if (column.id == 'action') {
                                                value = <Box display="flex" justifyContent="flex-end" >
                                                    <IconButton size="small">
                                                        <Edit color="" />
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => { handleDelete(row._id) }}>
                                                        <Delete color='error' />
                                                    </IconButton>
                                                </Box>
                                            };
                                            if (column.color) {
                                                column.color = type == 'expense' ? "#ff0000" : "#4caf50";
                                            }
                                            return (
                                                <TableCell key={column.id} align='center' sx={{ color: column.color }}>
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TransactionList;