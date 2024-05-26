import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    MenuItem,
    Pagination,
    Grid,
    IconButton,
    Select,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../../components/NavBarC';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

const Orders = () => {
    let { id } = useParams();

    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    const [userData] = useState(storedUserData);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newOrder, setNewOrder] = useState({
        utilisateur: '',
        articles: [],
    });
    const [editedOrder, setEditedOrder] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        fetchData();
        fetchUsers();
        fetchArticles();
        // eslint-disable-next-line
    }, [userData, navigate]);

    const fetchData = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = id != null
                ? await axios.post(`http://localhost:8080/StockMaster/api/admin/listCommandes/${id}`, userData)
                : await axios.post('http://localhost:8080/StockMaster/api/admin/listCommandes', userData);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listUtilisateurs', userData);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchArticles = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listArticles', userData);
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const [orderDetails, setOrderDetails] = useState(null);
    const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);


    const handleShowItemsClick = async (order) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post(`http://localhost:8080/StockMaster/api/admin/listCommandeArticles/${order.idCommande}`, userData);
            setOrderDetails({ ...order, articles: response.data });
            setOpenOrderDetailsDialog(true);
        } catch (error) {
            console.error('Error fetching order articles:', error);
            handleErrorSnackbarOpen('Erreur lors de la récupération des articles de la commande.');
        }
    };


    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            await axios.delete(`http://localhost:8080/StockMaster/api/admin/supprimerCommande/${orderToDelete.idCommande}`, { data: userData });
            setOpenDeleteDialog(false);
            setOrderToDelete(null);
            fetchData();
            handleSuccessSnackbarOpen('Commande supprimée avec succès.');
        } catch (error) {
            setOpenDeleteDialog(false);
            setOrderToDelete(null);
            handleErrorSnackbarOpen('Erreur lors de la suppression de la commande. Veuillez réessayer.');
        }
    };

    const handleCreateClick = () => {
        setOpenCreateDialog(true);
    };

    const handleEditClick = async (order) => {
        setEditedOrder(order);
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post(`http://localhost:8080/StockMaster/api/admin/listCommandeArticles/${order.idCommande}`, userData);
            setEditedOrder(prevState => ({
                ...prevState,
                articles: response.data
            }));
            setOpenEditDialog(true);
        } catch (error) {
            console.error('Error fetching articles for order:', error);
        }
    };

    const handleAddArticle = () => {
        setNewOrder({
            ...newOrder,
            articles: [...newOrder.articles, { article: '', quantite: 1 }],
        });
    };

    const handleRemoveArticle = (index) => {
        const updatedArticles = newOrder.articles.filter((_, i) => i !== index);
        setNewOrder({ ...newOrder, articles: updatedArticles });
    };

    const handleEditOrder = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                utilisateur: userData,
                commandeutilisateurarticle: {
                    commandeutilisateur: editedOrder.utilisateur,
                    articles: editedOrder.articles,
                },
            };

            await axios.put(`http://localhost:8080/StockMaster/api/admin/modifierCommande/${editedOrder.idCommande}`, requestData);
            setOpenEditDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('Commande modifiée avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la modification de la commande. Veuillez réessayer.');
        }
    };

    const handleCreateOrder = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                utilisateur: userData,
                commandeutilisateurarticle: {
                    commandeutilisateur: newOrder.utilisateur,
                    articles: newOrder.articles,
                },
            };

            await axios.post('http://localhost:8080/StockMaster/api/admin/ajouterCommande', requestData);
            setOpenCreateDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('Commande créée avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la création de la commande. Veuillez réessayer.');
        }
    };

    const handleStatusClick = async (order) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            await axios.post(`http://localhost:8080/StockMaster/api/admin/modifierStatusCommande/${order.idCommande}`, userData);
            fetchData();
            handleSuccessSnackbarOpen('Statut de la commande modifié avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la modification du statut de la commande.');
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

    const handleAddArticleToEditedOrder = (selectedArticle) => {
        setEditedOrder((prevOrder) => ({
            ...prevOrder,
            articles: [...prevOrder.articles, { article: selectedArticle, quantite: 1 }],
        }));
    };

    const handleRemoveArticleFromEditedOrder = (index) => {
        const updatedArticles = [...editedOrder.articles];
        updatedArticles.splice(index, 1);
        setEditedOrder((prevOrder) => ({ ...prevOrder, articles: updatedArticles }));
    };

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const displayedOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleSuccessSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setOpenSuccessSnackbar(true);
    };

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
                        <Button variant="contained" onClick={handleCreateClick}>Créer une commande</Button>
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
                                    <Button variant="outlined" onClick={() => handleStatusClick(order)}>Changer Status</Button>
                                    <Button variant="outlined" onClick={() => handleShowItemsClick(order)}>Détails commande</Button>
                                    <Button variant="outlined" onClick={() => handleEditClick(order)}>Modifier</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteClick(order)}>Supprimer</Button>
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

                    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                        <DialogTitle>Créer une commande</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Utilisateur</InputLabel>
                                    <Select
                                        required
                                        value={newOrder.utilisateur.idUtilisateur || ''}
                                        onChange={(e) => {
                                            const selectedUser = users.find(user => user.idUtilisateur === e.target.value);
                                            setNewOrder({ ...newOrder, utilisateur: selectedUser });
                                        }}
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.idUtilisateur} value={user.idUtilisateur}>
                                                {user.nom} {user.prenom}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                                {newOrder.articles.map((article, index) => (
                                    <Grid container spacing={2} key={index} alignItems="center">
                                        <Grid item xs={6}>
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel>Article</InputLabel>
                                                <Select
                                                    value={article.article}
                                                    onChange={(e) => {
                                                        const updatedArticles = newOrder.articles.map((a, i) =>
                                                            i === index ? { ...a, article: e.target.value } : a
                                                        );
                                                        setNewOrder({ ...newOrder, articles: updatedArticles });
                                                    }}
                                                >
                                                    {articles && articles.map((art) => (
                                                        <MenuItem key={art.idArticle} value={art}>
                                                            {art.libelle}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Quantité"
                                                type="number"
                                                fullWidth
                                                required
                                                InputProps={{ inputProps: { min: 1, max: article.article.quantite } }}
                                                value={article.quantite}
                                                onChange={(e) => {
                                                    const updatedArticles = newOrder.articles.map((a, i) =>
                                                        i === index ? { ...a, quantite: e.target.value } : a
                                                    );
                                                    setNewOrder({ ...newOrder, articles: updatedArticles });
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => handleRemoveArticle(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button onClick={handleAddArticle} startIcon={<AddIcon />}>
                                    Ajouter un article
                                </Button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenCreateDialog(false)}>Annuler</Button>
                            <Button onClick={handleCreateOrder}>Créer</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogTitle>Modifier une commande</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Utilisateur</InputLabel>
                                    <Select
                                        required
                                        value={editedOrder.utilisateur ? editedOrder.utilisateur.idUtilisateur : ''} // Check if utilisateur is not null or undefined
                                        onChange={(e) => {
                                            const selectedUser = users.find(user => user.idUtilisateur === e.target.value);
                                            setEditedOrder({ ...editedOrder, utilisateur: selectedUser });
                                        }}
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.idUtilisateur} value={user.idUtilisateur}>
                                                {user.nom} {user.prenom}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                                {editedOrder.articles && editedOrder.articles.map((article, index) => (
                                    <Grid container spacing={2} key={index} alignItems="center">
                                        <Grid item xs={6}>
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel>Article</InputLabel>
                                                <Select
                                                    required
                                                    value={article.article.idArticle} // Use article.article.idArticle as the value
                                                    onChange={(e) => {
                                                        const selectedArticle = articles.find(art => art.idArticle === e.target.value);
                                                        const updatedArticles = editedOrder.articles.map((a, i) =>
                                                            i === index ? { ...a, article: selectedArticle } : a
                                                        );
                                                        setEditedOrder({ ...editedOrder, articles: updatedArticles });
                                                    }}
                                                >
                                                    {articles.map((art) => (
                                                        <MenuItem key={art.idArticle} value={art.idArticle}>
                                                            {art.libelle}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Quantité"
                                                type="number"
                                                fullWidth
                                                required
                                                value={article.quantite}
                                                InputProps={{ inputProps: { min: 1, max: article.article.quantite } }}
                                                onChange={(e) => {
                                                    const updatedArticles = editedOrder.articles.map((a, i) =>
                                                        i === index ? { ...a, quantite: e.target.value } : a
                                                    );
                                                    setEditedOrder({ ...editedOrder, articles: updatedArticles });
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={() => handleRemoveArticleFromEditedOrder(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button onClick={handleAddArticleToEditedOrder} startIcon={<AddIcon />}>
                                    Ajouter un article
                                </Button>

                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
                            <Button onClick={handleEditOrder}>Enregistrer</Button>
                        </DialogActions>


                    </Dialog>
                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Supprimer une commande</DialogTitle>
                        <DialogContent>
                            {orderToDelete && (
                                <p>Etes-vous sûr de vouloir supprimer la commande #{orderToDelete.idCommande} ?</p>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>
                            <Button onClick={handleConfirmDelete} color="error" autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>
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

export default Orders;