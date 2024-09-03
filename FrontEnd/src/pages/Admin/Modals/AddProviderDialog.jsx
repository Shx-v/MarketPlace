// src/components/AddProviderDialog.js

import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from '@mui/material';

const AddProviderDialog = ({ open, onClose, onSubmit, provider, onChange }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add New Provider</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={provider.name}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={provider.email}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={provider.phone}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Website"
            name="website"
            value={provider.website}
            onChange={onChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProviderDialog;
