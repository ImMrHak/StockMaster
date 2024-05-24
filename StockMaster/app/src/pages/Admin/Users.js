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

const Users = () => {
    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    const [userData] = useState(storedUserData);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newUser, setNewUser] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        motpasse: '',
        email: '',
        role: {
            idRole: '',
            liebelle: '',
        }
    });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!userData) {
            navigate('/StockMaster/Login');
        }
        fetchData();
        fetchRoles();
    }, [userData, navigate]);

    const fetchData = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listUtilisateurs', userData);
            setUsers(response.data);
        } catch (error) {
            //console.error('Error fetching data:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const response = await axios.post('http://localhost:8080/StockMaster/api/admin/listRoles', userData);
            setRoles(response.data);
        } catch (error) {
            //console.error('Error fetching nationalities:', error);
        }
    };

    const handleUserCommandClick = (user) => {
        try {
            console.log(user);
            window.location.href = `http://localhost:3000/StockMaster/Orders/${user.idUtilisateur}`
        }
        catch (error) {
            //console.error('Error:', error.message);
        }
    }

    const handleEditClick = (user) => {
        setEditedUser({
            ...user,
            role: user.role.libelle
        });
        setOpenEditDialog(true);
    };

    const handleCreateClick = () => {
        setOpenCreateDialog(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setOpenDeleteDialog(true);
    };

    const handleEditUser = async (editedUser) => {
        try {
            const selectedRole = roles.find(n => n.libelle === editedUser.role);
            const userData = JSON.parse(sessionStorage.getItem('userData'));

            if (selectedRole) {
                const requestData = {
                    "u": userData,
                    "ua": {
                        ...editedUser,
                        role: {
                            idRole: selectedRole.idRole,
                            libelle: selectedRole.libelle
                        },
                    }
                };

                await axios.put(`http://localhost:8080/StockMaster/api/admin/modifierUtilisateur/${editedUser.idUtilisateur}`, requestData);
                setOpenEditDialog(false);
                fetchData();
                handleSuccessSnackbarOpen('L\'utilisateur a modifié avec succès.');
            } else {
                handleErrorSnackbarOpen('Erreur lors de la modification de l\'utilisateur. Veuillez réessayer.');
            }
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la modification de l\'utilisateur. Veuillez réessayer.');
        }
    };

    const handleCreateUser = async (newUser) => {
        try {
            const selectedRole = roles.find(n => n.libelle === newUser.role);
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            if (selectedRole) {
                const requestData = {
                    "u": userData,
                    "ua": {
                        ...newUser,
                        role: {
                            idRole: selectedRole.idRole,
                            libelle: selectedRole.libelle
                        },
                    }
                };

                await axios.post('http://localhost:8080/StockMaster/api/admin/ajouterUtilisateur', requestData);
                setOpenCreateDialog(false);
                fetchData();
                handleSuccessSnackbarOpen('Utilisateur créé avec succès.');
            } else {
                handleErrorSnackbarOpen('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
            }
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            await axios.delete(`http://localhost:8080/StockMaster/api/admin/supprimerUtilisateur/${userId}`, { data: userData });
            setOpenDeleteDialog(false);
            setUserToDelete(null);
            fetchData();
            handleSuccessSnackbarOpen('Utilisateur supprimé avec succès.');
        } catch (error) {
            handleErrorSnackbarOpen('Erreur lors de la suppression de l\'utilisateur. Veuillez réessayer.');
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
                        <h1>Liste des utilisateurs</h1>
                        <Button variant="contained" onClick={handleCreateClick}>Créer un utilisateur</Button>

                    </div>
                    <List>
                        {displayedUsers.map((user, index) => (
                            <React.Fragment key={user.idUtilisateur}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${user.prenom} ${user.nom}`}
                                        secondary={`Adresse: ${user.adresse}, Email: ${user.email}, Age: ${user.age}, Role: ${user.role.libelle}`}
                                    />
                                    <Button variant="outlined" onClick={() => handleEditClick(user)}>Modifier</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteClick(user)}>Supprimer</Button>
                                    <Button variant="outlined" onClick={() => handleUserCommandClick(user)}>Commandes</Button>
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
                        <DialogTitle>Modifier un utilisateur</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Prenom"
                                            variant="standard"
                                            fullWidth
                                            value={editedUser.prenom || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, prenom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Nom"
                                            variant="standard"
                                            fullWidth
                                            value={editedUser.nom || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, nom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse"
                                            variant="standard"
                                            fullWidth
                                            value={editedUser.adresse || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, adresse: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse e-mail"
                                            variant="standard"
                                            fullWidth
                                            value={editedUser.email || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Mot de passe"
                                            variant="standard"
                                            type="password"
                                            fullWidth
                                            value={editedUser.motpasse || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, motpasse: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Age"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={editedUser.age || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={20}>
                                        <TextField
                                            label="Role"
                                            variant="standard"
                                            fullWidth
                                            select
                                            value={editedUser.role || ''}
                                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                                        >
                                            {roles.map((r) => (
                                                <MenuItem key={r.idRole} value={r.libelle}>
                                                    {r.libelle}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleEditUser(editedUser)}>Enregistrer</Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                        <DialogTitle>Créer un utilisateur</DialogTitle>
                        <DialogContent>
                            <form className="dialog-content" onSubmit={(e) => e.preventDefault()}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Prenom"
                                            variant="standard"
                                            fullWidth
                                            value={newUser.prenom}
                                            onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Nom"
                                            variant="standard"
                                            fullWidth
                                            value={newUser.nom}
                                            onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse"
                                            variant="standard"
                                            fullWidth
                                            value={newUser.adresse}
                                            onChange={(e) => setNewUser({ ...newUser, adresse: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adresse e-mail"
                                            variant="standard"
                                            fullWidth
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Mot de passe"
                                            variant="standard"
                                            type="password"
                                            fullWidth
                                            value={newUser.motpasse}
                                            onChange={(e) => setNewUser({ ...newUser, motpasse: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Age"
                                            variant="standard"
                                            fullWidth
                                            type="number"
                                            value={newUser.age}
                                            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={20}>
                                        <TextField
                                            label="Role"
                                            variant="standard"
                                            fullWidth
                                            select
                                            value={newUser.role}
                                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        >
                                            {roles.map((r) => (
                                                <MenuItem key={r.idRole} value={r.libelle}>
                                                    {r.libelle}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenCreateDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleCreateUser(newUser)}>Créer</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Supprimer un utilisateur</DialogTitle>
                        <DialogContent>
                            Etes-vous sûr que vous voulez supprimer {userToDelete && `${userToDelete.prenom} ${userToDelete.nom}`}?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>Quitter</Button>
                            <Button onClick={() => handleDeleteUser(userToDelete.idUtilisateur)}>Supprimer</Button>
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

export default Users;