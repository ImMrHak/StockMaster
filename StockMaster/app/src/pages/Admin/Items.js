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
    TextField,
    DialogActions,
    MenuItem,
    Pagination,
    Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../../components/NavBarC';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Items = () => {
    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    const [userData] = useState(storedUserData);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [items, setItems] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({
        fournisseur: {
            idFournisseur: '',
            numeroTelephone: '',
            nom: '',
            email: ''
        },
        article: {
            idArticle: '',
            libelle: '',
            quantite: '',
            prixUnitaire: ''
        }
    });
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newItem, setNewItem] = useState({
        fournisseur: {
            idFournisseur: '',
            numeroTelephone: '',
            nom: '',
            email: ''
        },
        article: {
            libelle: '',
            quantite: '',
            prixUnitaire: ''
        }
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        fetchData();
        fetchFournisseurs();
    }, [userData, navigate]);

    const fetchData = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listArticlesFournisseurs', userData);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFournisseurs = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listFournisseurs', userData);
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Error fetching fournisseurs:', error);
        }
    };

    const handleEditClick = (item) => {
        setEditedItem({ ...item });
        setOpenEditDialog(true);
    };

    const handleCreateClick = () => {
        setOpenCreateDialog(true);
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setOpenDeleteDialog(true);
    };

    const handleEditSupplier = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                "utilisateur": userData,
                "articlefournisseur": {
                    ...editedItem
                }
            };

            requestData.articlefournisseur.idArticleFournisseur = '';

            await axios.put(`http://localhost:8080/StockMaster/api/admin/modifierArticle/${editedItem.article.idArticle}`, requestData);
            setOpenEditDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('L\'article a été modifié avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la modification de l\'article. Veuillez réessayer.');
        }
    };

    const handleCreateSupplier = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                "utilisateur": userData,
                "articlefournisseur": {
                    ...newItem,
                }
            };

            await axios.post('http://localhost:8080/StockMaster/api/admin/ajouterArticle', requestData);
            setOpenCreateDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('Article créé avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la création de l\'article. Veuillez réessayer.');
        }
    };

    const handleDeleteSupplier = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            await axios.delete(`http://localhost:8080/StockMaster/api/admin/supprimerArticle/${itemToDelete.article.idArticle}`, { data: userData });
            setOpenDeleteDialog(false);
            setItemToDelete(null);
            fetchData();
            handleSuccessSnackbarOpen('Article supprimé avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la suppression de l\'article. Veuillez réessayer.');
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

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const displayedUsers = items.slice(indexOfFirstUser, indexOfLastUser);

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
                        <h1>Liste des articles</h1>
                        <Button variant="contained" onClick={handleCreateClick}>Créer un article</Button>
                    </div>
                    <List>
                        {displayedUsers.map((item, index) => (
                            <React.Fragment key={item.article.idArticle}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.article.libelle}`}
                                        secondary={`Quantite: ${item.article.quantite}, Prix Unitaire: ${item.article.prixUnitaire}, Fournisseur: ${item.fournisseur.nom}`}
                                    />
                                    <Button variant="outlined" onClick={() => handleEditClick(item)}>Modifier</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteClick(item)}>Supprimer</Button>
                                </ListItem>
                                {index !== displayedUsers.length - 1 && <hr />}
                            </React.Fragment>
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(items.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        color="primary"
                        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />

                    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogTitle>Modifier un article</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Libelle"
                                            variant="standard"
                                            fullWidth
                                            value={editedItem.article.libelle || ''}
                                            onChange={(e) => setEditedItem({ ...editedItem, article: { ...editedItem.article, libelle: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Quantite"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={editedItem.article.quantite || ''}
                                            onChange={(e) => setEditedItem({ ...editedItem, article: { ...editedItem.article, quantite: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Prix Unitaire"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={editedItem.article.prixUnitaire || ''}
                                            onChange={(e) => setEditedItem({ ...editedItem, article: { ...editedItem.article, prixUnitaire: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Fournisseur"
                                            variant="standard"
                                            fullWidth
                                            select
                                            value={editedItem.fournisseur.nom || ''}
                                            onChange={(e) => {
                                                const selectedFournisseur = fournisseurs.find(f => f.nom === e.target.value);
                                                setEditedItem({
                                                    ...editedItem,
                                                    fournisseur: {
                                                        ...editedItem.fournisseur,
                                                        nom: selectedFournisseur.nom,
                                                        idFournisseur: selectedFournisseur.idFournisseur
                                                    }
                                                });
                                            }}
                                        >
                                            {fournisseurs.map((f) => (
                                                <MenuItem key={f.idFournisseur} value={f.nom}>
                                                    {f.nom}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditDialog(false)}>Quitter</Button>
                            <Button onClick={handleEditSupplier}>Enregistrer</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                        <DialogTitle>Créer un article</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Libelle"
                                            variant="standard"
                                            fullWidth
                                            value={newItem.article.libelle}
                                            onChange={(e) => setNewItem({ ...newItem, article: { ...newItem.article, libelle: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Quantite"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={newItem.article.quantite}
                                            onChange={(e) => setNewItem({ ...newItem, article: { ...newItem.article, quantite: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Prix Unitaire"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={newItem.article.prixUnitaire}
                                            onChange={(e) => setNewItem({ ...newItem, article: { ...newItem.article, prixUnitaire: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Fournisseur"
                                            variant="standard"
                                            fullWidth
                                            select
                                            value={newItem.fournisseur.nom || ''}
                                            onChange={(e) => {
                                                const selectedFournisseur = fournisseurs.find(f => f.nom === e.target.value);
                                                setNewItem({
                                                    ...newItem,
                                                    fournisseur: {
                                                        ...newItem.fournisseur,
                                                        nom: selectedFournisseur.nom,
                                                        idFournisseur: selectedFournisseur.idFournisseur
                                                    }
                                                });
                                            }}
                                        >
                                            {fournisseurs.map((f) => (
                                                <MenuItem key={f.idFournisseur} value={f.nom}>
                                                    {f.nom}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenCreateDialog(false)}>Quitter</Button>
                            <Button onClick={handleCreateSupplier}>Créer</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Supprimer un article</DialogTitle>
                        <DialogContent>
                            Etes-vous sûr que vous voulez supprimer {itemToDelete && `${itemToDelete.article.libelle}`}?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>Quitter</Button>
                            <Button onClick={handleDeleteSupplier}>Supprimer</Button>
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

export default Items;
