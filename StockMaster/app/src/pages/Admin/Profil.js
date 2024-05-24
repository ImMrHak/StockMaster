import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../../components/NavBarC';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Profil = () => {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

  const [userData, setUserData] = useState(storedUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);

  const [formData, setFormData] = useState({
    idUtilisateur: userData ? userData.idUtilisateur : '',
    nom: userData ? userData.nom : '',
    prenom: userData ? userData.prenom : '',
    email: userData ? userData.email : '',
    adresse: userData ? userData.adresse : '',
    age: userData ? userData.age : '',
  });

  useEffect(() => {
    if (!userData) {
      navigate('/StockMaster/Login');
    }
  }, [navigate, userData]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      console.log(updatedData);

      const response = await axios.put(`http://localhost:8080/StockMaster/api/admin/modifierProfil`, updatedData);

      if (response.status === 200) {
        setUserData(updatedData);
        sessionStorage.setItem('userData', JSON.stringify(updatedData));
        setIsEditing(false);
        handleSnackbarOpen('Mise à jour du profil réussie.');
      } else {
        handleSnackbarOpen('Échec de la mise à jour du profil.');
      }
    } catch (error) {
      handleSnackbarOpen('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setIsCancelled(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsCancelled(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      ...userData,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      adresse: formData.adresse,
      age: formData.age,
    };

    handleProfileUpdate(updatedData);
    console.log('Profile updated:', updatedData);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <br />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Votre Profil
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nom"
                required
                fullWidth
                id="nom"
                label="Nom"
                autoFocus
                disabled={!isEditing || isCancelled}
                variant="standard"
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                defaultValue={formData.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="prenom"
                label="Prenom"
                name="prenom"
                autoComplete="family-name"
                disabled={!isEditing || isCancelled}
                variant="standard"
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                defaultValue={formData.prenom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={!isEditing || isCancelled}
                variant="standard"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                defaultValue={formData.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="adresse"
                label="Adresse"
                name="adresse"
                autoComplete="adresse"
                disabled={!isEditing || isCancelled}
                variant="standard"
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                defaultValue={formData.adresse}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                disabled={!isEditing || isCancelled}
                variant="standard"
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                defaultValue={formData.age}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isEditing ? (
                  <div>
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{
                        marginRight: { xs: 0, sm: 2 },
                        width: { xs: '100%', sm: 'auto' },
                        marginBottom: { xs: 1, sm: 0 },
                      }}
                      onClick={handleCancelClick}
                    >
                      Annuler les modifications
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: { xs: '100%', sm: 'auto' },
                      }}
                    >
                      Soumettre les modifications
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: { xs: 4, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                    onClick={handleEditButtonClick}
                  >
                    Activer modification
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Profil;
