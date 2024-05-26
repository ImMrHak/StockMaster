import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Pagination,
    Snackbar,
    Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../../components/NavBarU';

const STATUS_LIVREE = 3;
const STATUS_EN_EXPEDITION = 2;
const STATUS_EN_PREPARATION = 1;

const getStatusColor = (status) => {
    switch (status) {
        case STATUS_LIVREE:
            return 'green';
        case STATUS_EN_EXPEDITION:
            return 'cyan';
        case STATUS_EN_PREPARATION:
            return 'red';
        default:
            return 'black'; // Default color
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 1:
            return "En préparation";
        case 2:
            return "En expédition";
        case 3:
            return "Livré";
        default:
            return "Statut inconnu";
    }
};

const Dashboard = () => {
    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    const [userData] = useState(storedUserData);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        fetchData();
        // eslint-disable-next-line
    }, [userData, navigate]);

    const fetchData = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/user/listCommandes', userData);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [orderDetails, setOrderDetails] = useState(null);
    const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);


    const handleShowItemsClick = async (order) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post(`http://localhost:8080/StockMaster/api/user/listCommandeArticles/${order.idCommande}`, userData);
            setOrderDetails({ ...order, articles: response.data });
            setOpenOrderDetailsDialog(true);
        } catch (error) {
            console.error('Error fetching order articles:', error);
            handleErrorSnackbarOpen('Erreur lors de la récupération des articles de la commande.');
        }
    };


    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const displayedOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleErrorSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setOpenErrorSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ResponsiveAppBar />
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1>Liste des commandes</h1>
                    </div>
                    <List>
                        {displayedOrders.map((order, index) => (
                            <React.Fragment key={order.idCommande}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Commande #${order.idCommande}`}
                                        secondary={`Utilisateur: ${order.utilisateur.nom} ${order.utilisateur.prenom}, Prix Total: ${order.prixTotal}, Status: ${getStatusText(order.status)}`}
                                        style={{ color: getStatusColor(order.status) }}
                                    />
                                    <Button variant="outlined" onClick={() => handleShowItemsClick(order)}>Détails commande</Button>
                                </ListItem>
                                {index !== displayedOrders.length - 1 && <hr />}
                            </React.Fragment>
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(orders.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        color="primary"
                        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />
                    <Dialog open={openOrderDetailsDialog} onClose={() => setOpenOrderDetailsDialog(false)}>
                        <DialogTitle>Détails de la commande</DialogTitle>
                        <DialogContent>
                            {orderDetails && (
                                <div>
                                    <p><strong>Commande #{orderDetails.idCommande}</strong></p>
                                    <p><strong>Propriétaire:</strong> {orderDetails.utilisateur.nom} {orderDetails.utilisateur.prenom}</p>
                                    <p><strong>Date:</strong> {orderDetails.date}</p>
                                    <p><strong>Prix Total:</strong> {orderDetails.prixTotal} DH</p>
                                    <p><strong>Status:</strong> {getStatusText(orderDetails.status)}</p>
                                    <p><strong>Articles:</strong></p>
                                    <List>
                                        {orderDetails.articles.map((article, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={`${article.article.libelle}`}
                                                    secondary={`Quantité: ${article.quantite}, Prix Unitaire: ${article.article.prixUnitaire} DH`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenOrderDetailsDialog(false)}>Fermer</Button>
                        </DialogActions>
                    </Dialog>

                </Container>
                <Snackbar
                    open={openSuccessSnackbar}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openErrorSnackbar}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </div>
    );
};

export default Dashboard;