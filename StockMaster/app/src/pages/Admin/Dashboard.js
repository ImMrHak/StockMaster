import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ResponsiveAppBar from '../../components/NavBarC';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function Dashboard() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            navigate('/StockMaster/Login');
        } else {
            const parsedUserData = JSON.parse(userData);

            axios.post('http://localhost:8080/StockMaster/api/admin/listUtilisateurs', parsedUserData)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching total users:', error);
                });

            axios.post('http://localhost:8080/StockMaster/api/admin/listArticles', parsedUserData)
                .then(response => {
                    setArticles(response.data);
                })
                .catch(error => {
                    console.error('Error fetching total items:', error);
                });
        }
    }, [navigate]);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    // Random colors for charts
    const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Prepare articles data for chart
    const articlesChartData = articles.map(article => ({
        name: article.libelle,
        value: article.quantite,
        color: getRandomColor()
    }));

    // Prepare data for users chart
    const adminCount = users.filter(user => user.role.libelle === 'ADMIN').length;
    const userCount = users.filter(user => user.role.libelle === 'USER').length;

    const userChartData = [
        { name: 'ADMIN', value: adminCount, color: getRandomColor() },
        { name: 'USER', value: userCount, color: getRandomColor() }
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ResponsiveAppBar />
            <br />
            <br />
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={articlesChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                dataKey="value"
                            >
                                {articlesChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={userChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                dataKey="value"
                            >
                                {userChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Dashboard;