import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ResponsiveAppBar from '../../components/NavBarC';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    // Hook to access navigation function
    const navigate = useNavigate();

    // Function to check if "userData" exists in local storage
    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        else {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            // Fetch data from the API endpoint
            axios.post('http://localhost:8080/StockMaster/api/admin/totalUtilisateurs', userData)
                .then(response => {
                    // Assuming the response contains the total number of users
                    setNumberOfUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching total users:', error);
                });

            axios.post('http://localhost:8080/StockMaster/api/admin/totalCommandes', userData)
                .then(response => {
                    setNumberOfOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching total orders:', error);
                });

            axios.post('http://localhost:8080/StockMaster/api/admin/totalArticles', userData)
                .then(response => {
                    setNumberOfItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching total items:', error);
                });
        }
    }, [navigate]);

    // Hook to check if the user prefers dark mode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Creating the theme based on the user's preference
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const [numberOfOrders, setNumberOfOrders] = React.useState(0);
    const [numberOfUsers, setNumberOfUsers] = React.useState(0);
    const [numberOfItems, setNumberOfItems] = React.useState(0);



    // Add a custom style object to remove the underline from the Link
    const linkStyle = {
        textDecoration: 'none',
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Rendering the NavBar component */}
            <ResponsiveAppBar />

            <br />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '53vh' }}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        {/* Use xs={12} to take full width on small screens and md={4} to take one-third width on medium screens and larger */}
                        <Link to="/StockMaster/Users" style={linkStyle}> {/* Applying the custom style */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://cdn-icons-png.flaticon.com/512/2302/2302386.png"
                                        style={{
                                            height: '350px', // Set a fixed height for the CardMedia
                                            width: '100%',   // Set a fixed width to ensure the entire image fits
                                            objectFit: '', // Maintain aspect ratio and fit the entire image within the container
                                        }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Nombre des utilisateurs: {numberOfUsers}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Link to="/StockMaster/Orders" style={linkStyle}> {/* Applying the custom style */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://pngimg.com/d/shopping_cart_PNG22.png"
                                        style={{
                                            height: '350px', // Set a fixed height for the CardMedia
                                            width: '100%',   // Set a fixed width to ensure the entire image fits
                                            objectFit: 'contain', // Maintain aspect ratio and fit the entire image within the container
                                        }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Nombre des commandes: {numberOfOrders}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Link to="/StockMaster/Items" style={linkStyle}> {/* Applying the custom style */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image="https://pngimg.com/d/box_PNG128.png"
                                        style={{
                                            height: '350px', // Set a fixed height for the CardMedia
                                            width: '100%',   // Set a fixed width to ensure the entire image fits
                                            objectFit: 'contain', // Maintain aspect ratio and fit the entire image within the container
                                        }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Nombre des articles: {numberOfItems}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default Dashboard;