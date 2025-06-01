import React, { useState, useEffect, useMemo } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, Box
} from '@mui/material';
import {
    PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axiosClient from '../../utils/axiosClient';
import Loading from '../../utils/Loading';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { load } = useAuth();

    useEffect(() => {
        load(localStorage.getItem('token'));
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [transResponse, statsResponse] = await Promise.all([
                axiosClient.get('/api/transactions'),
                axiosClient.get('/api/stats/categories')
            ]);
            setTransactions(transResponse.data.data);
            setCategoryStats(statsResponse.data.data);

        } catch (error) {
            console.error('Erreur chargement donnees :', error);
        } finally {
            setLoading(false);
        }
    };

    //Calculer les metriques principales
    const metrics = useMemo(() => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpenses;
        return { totalIncome, totalExpenses, balance };
    }, [transactions]);

    //Preparer donnees pour graphique camembert
    const pieData = categoryStats.map(stat => ({
        name: stat.categoryName,
        value: stat.total,
        color: stat.categoryColor
    }));

    //Formater montants en FCFA
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        < Container maxWidth="lg" sx={{ mt: '80px', mx:'5px' }}>
            < Typography variant="h4" gutterBottom>
                Tableau de Bord
            </Typography>
            {/* Cartes de metriques */}
            < Grid container spacing={3} mb={4}>
                < Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                Revenus Totaux
                            </Typography>
                            <Typography variant="h3" color="success.main">
                                {formatAmount(metrics.totalIncome)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                < Grid item xs={12} sm={4}>
                    <Card>
                        < CardContent>
                            < Typography variant="h6" color="textSecondary">
                                Depenses Totales
                            </Typography>
                            < Typography variant="h3" color="error.main">
                                {formatAmount(metrics.totalExpenses)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                < Grid item xs={12} sm={4}>
                    <Card>
                        < CardContent>
                            < Typography variant="h6" color="textSecondary">
                                Solde Net
                            </Typography>
                            < Typography
                                variant="h3"
                                color={metrics.balance >= 0 ? 'success.main' : 'error.main'}
                            >
                                {formatAmount(metrics.balance)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* Graphiques */}
            < Grid container spacing={3}>
                < Grid item xs={12} md={6}>
                    <Card>
                        < CardContent>
                            < Typography variant="h6" align="center" gutterBottom>
                                Repartition des Depenses
                            </Typography>
                            {pieData[0] ? (
                                < ResponsiveContainer width="100%" height={300}>
                                    < PieChart>
                                        < Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                < Cell key={index} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        < Tooltip
                                            formatter={(value) => formatAmount(value)}
                                        />
                                        < Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                < Typography variant="h6" align="center" >
                                    Ajouter des Depenses
                                </Typography>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
                < Grid item xs={12} md={6}>
                    <Card>
                        < CardContent>
                            < Typography variant="h6" align="center" gutterBottom>
                                Dernieres Transactions
                            </Typography>
                            {transactions[0] ? (
                                < Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                                    {transactions.slice(0, 5).map((transaction) => (
                                        < Box
                                            key={transaction._id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                py: 1,
                                                borderBottom: '1 px solid # eee'
                                            }}
                                        >
                                            < Typography variant="body2">
                                                {transaction.description}
                                            </Typography>
                                            < Typography
                                                variant="body2"
                                                color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                                            >
                                                {transaction.type === 'income' ? '+' : '-'}
                                                {formatAmount(transaction.amount)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                < Typography variant="h6" align="center" gutterBottom>
                                    Ajouter des transactions
                                </Typography>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;