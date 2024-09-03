import React, { useContext, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Link, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { apiData } from 'src/apidata';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setToken, setIsAdmin } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (email !== '') {
      try {
        const response = await axios.post(`${apiData.base}/api/v1/auth/login`, {
          email,
          password,
        });

        const data = response.data.EncryptedResponse;

        if (data.success) {
          setToken(data?.data?.token);
          setUser(data?.data?.user._id);
          setIsLoggedIn(true);
          setIsAdmin(data.data.user.role === 'admin');
          navigate('/');
        } else {
          setError(data?.message);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;

          if (status === 401) {
            setError('Invalid credentials. Please try again.');
          } else if (status === 404) {
            setError('User not found.');
          } else {
            setError('An error occurred. Please try again later.');
          }
        } else if (error.request) {
          setError('No response from the server. Please check your network connection.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot_password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
