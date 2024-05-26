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

const Suppliers = () => {
    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    const [userData] = useState(storedUserData);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedSupplier, setEditedSupplier] = useState({});
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newSupplier, setNewSupplier] = useState({
        email: '',
        nom: '',
        numeroTelephone: ''
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        fetchData();
    }, [userData, navigate]);

    const fetchData = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listFournisseurs', userData);
            setUsers(response.data);
        } catch (error) {
            //console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditedSupplier({
            ...user
        });
        setOpenEditDialog(true);
    };

    const handleCreateClick = () => {
        setOpenCreateDialog(true);
    };

    const handleDeleteClick = (user) => {
        setSupplierToDelete(user);
        setOpenDeleteDialog(true);
    };

    const handleEditSupplier = async (editedSupplier) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                "u": userData,
                "ua": {
                    ...editedSupplier
                }
            };

            await axios.put(`http://localhost:8080/StockMaster/api/admin/modifierFournisseur/${editedSupplier.idFournisseur}`, requestData);
            setOpenEditDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('Fournisseur est modifié avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la modification du fournisseur. Veuillez réessayer.');
        }
    };

    const handleCreateSupplier = async (newSupplier) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const requestData = {
                "u": userData,
                "ua": {
                    ...newSupplier,
                }
            };


            await axios.post('http://localhost:8080/StockMaster/api/admin/ajouterFournisseur', requestData);
            setOpenCreateDialog(false);
            fetchData();
            handleSuccessSnackbarOpen('Fournisseur créé avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la création du fournisseur. Veuillez réessayer.');
        }
    };

    const handleDeleteSupplier = async (supplierId) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            await axios.delete(`http://localhost:8080/StockMaster/api/admin/supprimerFournisseur/${supplierId}`, { data: userData });
            setOpenDeleteDialog(false);
            setSupplierToDelete(null);
            fetchData();
            handleSuccessSnackbarOpen('Fournisseur supprimé avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la suppression du fournisseur. Veuillez réessayer.');
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
    const displayedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
                        <h1>Liste des fournisseurs</h1>
                        <Button variant="contained" onClick={handleCreateClick}>Créer un fournisseur</Button>

                    </div>
                    <List>
                        {displayedUsers.map((supplier, index) => (
                            <React.Fragment key={supplier.idFournisseur}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${supplier.nom}`}
                                        secondary={`Email: ${supplier.email}, Numero Telephone: ${supplier.numeroTelephone}`}
                                    />
                                    <Button variant="outlined" onClick={() => handleEditClick(supplier)}>Modifier</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteClick(supplier)}>Supprimer</Button>
                                </ListItem>
                                {index !== displayedUsers.length - 1 && <hr />} {/* Add <hr> except for the last item */}
                            </React.Fragment>
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(users.filter(user => !user.isDeleted).length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        color="primary"
                        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                    />

                    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogTitle>Modifier un fournisseur</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Nom"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={editedSupplier.nom || ''}
                                            onChange={(e) => setEditedSupplier({ ...editedSupplier, nom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse e-mail"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={editedSupplier.email || ''}
                                            onChange={(e) => setEditedSupplier({ ...editedSupplier, email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Numero de telephone"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={editedSupplier.numeroTelephone || ''}
                                            onChange={(e) => setEditedSupplier({ ...editedSupplier, numeroTelephone: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleEditSupplier(editedSupplier)}>Enregistrer</Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                        <DialogTitle>Créer un fournisseur</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Nom"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={newSupplier.nom}
                                            onChange={(e) => setNewSupplier({ ...newSupplier, nom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse e-mail"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={newSupplier.email}
                                            onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Numero de telephone"
                                            variant="standard"
                                            fullWidth
                                            required
                                            value={newSupplier.numeroTelephone}
                                            onChange={(e) => setNewSupplier({ ...newSupplier, numeroTelephone: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenCreateDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleCreateSupplier(newSupplier)}>Créer</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Supprimer un fournisseur</DialogTitle>
                        <DialogContent>
                            Etes-vous sûr que vous voulez supprimer {supplierToDelete && `${supplierToDelete.nom}`}?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleDeleteSupplier(supplierToDelete.idFournisseur)}>Supprimer</Button>
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

export default Suppliers;