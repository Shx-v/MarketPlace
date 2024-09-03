import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from 'src/contexts/auth/AuthContext';
import { apiData } from 'src/apidata';

const SubscriptionOrderModal = ({ open, handleClose, service }) => {
  const { user, token } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/users/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.EncryptedResponse;
      setCurrentUser(data.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      user: currentUser,
      services: [
        {
          service: service,
          quantity: 1,
          price: service.price,
        },
      ],
      paymentMethod,
      totalAmount: service.price,
    };

    try {
      const response = await axios.post(`${apiData.base}/api/v1/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.EncryptedResponse;
      if (data.success) {
        handleClose();
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Payment Method"
          name="paymentMethond"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
          }}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="PayPal">PayPal</MenuItem>
          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
        </TextField>
        {paymentMethod === 'Credit Card' && (
          <Stack
            spacing={2}
            marginTop={2}
          >
            <TextField
              label="Card Number"
              name="cardNumber"
              type="text"
              fullWidth
            />
            <TextField
              label="Cardholder Name"
              name="cardholderName"
              type="text"
              fullWidth
            />
            <Stack
              direction="row"
              spacing={2}
            >
              <TextField
                label="Expiry Date"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                fullWidth
              />
              <TextField
                label="CVV"
                name="cvv"
                type="password"
                fullWidth
              />
            </Stack>
          </Stack>
        )}

        {paymentMethod === 'PayPal' && (
          <Stack
            spacing={2}
            marginTop={2}
          >
            <TextField
              label="PayPal Email"
              name="paypalEmail"
              type="email"
              fullWidth
            />
          </Stack>
        )}

        {paymentMethod === 'Bank Transfer' && (
          <Stack
            spacing={2}
            marginTop={2}
          >
            <Typography variant="body2">
              Please transfer the amount to the following bank account:
            </Typography>
            <Typography variant="body2">
              <strong>Bank Name:</strong> Example Bank
            </Typography>
            <Typography variant="body2">
              <strong>Account Number:</strong> 123456789
            </Typography>
            <Typography variant="body2">
              <strong>IFSC Code:</strong> EXAMP00123
            </Typography>
            <Typography variant="body2">
              Once the transfer is complete, please enter the transaction ID below:
            </Typography>
            <TextField
              label="Bank Transaction ID"
              name="transactionId"
              type="text"
              fullWidth
              margin="normal"
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionOrderModal;
