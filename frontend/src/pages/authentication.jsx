import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

// Theme matches Hero gradient
const theme = createTheme({
  palette: {
    primary: { main: '#FF9839' },
    secondary: { main: '#1e90ff' },
    background: { default: '#fff' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: { fontWeight: 700, color: '#FF9839' },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
        setName('');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
        <CssBaseline />

        {/* Left Image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://picsum.photos/1600/1200)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0 50px 50px 0',
            filter: 'brightness(0.85)',
          }}
        />

        {/* Form Container */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={12} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 4,
              p: 4,
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              {formState === 0 ? 'Welcome Back' : 'Create Account'}
            </Typography>

            {/* Toggle Login/Register */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setFormState(0)}
                sx={{
                  flex: 1,
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setFormState(1)}
                sx={{
                  flex: 1,
                  fontWeight: 600,
                  borderRadius: 3,
                  py: 1.5,
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form Fields */}
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus={formState === 0}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />

              {error && (
                <Typography color="error" sx={{ mt: 1, mb: 1, fontSize: 14 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #FF9839, #FFB76B)',
                  boxShadow: '0 5px 15px rgba(255, 152, 57, 0.4)',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FFB76B, #FF9839)',
                    transform: 'scale(1.03)',
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
}