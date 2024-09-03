import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { apiData } from 'src/apidata';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${apiData.base}/api/v1/auth/forgot-password`, {
        email,
      },);

      setSuccess('Password reset instructions have been sent to your email.');
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
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
        <Typography
          component="h1"
          variant="h5"
        >
          Forgot Password
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, mb: 2 }}
        >
          Please enter your email address and we will send you instructions to reset your password.
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
        >
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
            onChange={handleChange}
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              color="success"
              variant="body2"
              align="center"
            >
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="/auth/login"
                variant="body2"
              >
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
