import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';

function Register() {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      nom: data.get('nom'),
      prenom: data.get('prenom'),
      email: data.get('email'),
      motpasse: data.get('password'),
      age: data.get('age'),
      adresse: data.get('adresse'),
    };

    try {
      const response = await axios.post('http://localhost:8080/StockMaster/api/inscrire', formData);
      if (response.status === 200) {
        setSnackbarMessage('Registration successful!');
        setOpenSuccessSnackbar(true);
        setTimeout(() => {
          window.location.href = '/StockMaster/Login';
        }, 2000);
      }
    } catch (error) {
      setSnackbarMessage((error.response.data === "") ? "Erreur" : error.response.data);
      setOpenErrorSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Inscription
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="prenom"
                  required
                  fullWidth
                  id="prenom"
                  label="Prenom"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="nom"
                  label="Nom"
                  name="nom"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                              >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      ),
                  }}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="adresse"
                  label="Adresse"
                  id="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'Inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/StockMaster/Login" variant="body2">
                  Vous avez déjà un compte? S'authentifier
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Alert onClose={handleSnackbarClose} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default Register;