import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import RupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from 'src/contexts/auth/AuthContext';
import { apiData } from 'src/apidata';

const CreateServiceModal = ({ open, onClose, selectedService }) => {
  const [name, setName] = useState(selectedService?.name ?? '');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [image, setImage] = useState(null);
  const { user, token } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [providers, setProviders] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
  };

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

  const handleGetProviders = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/providers`);
      const data = response.data.EncryptedResponse;
      if (data.success) {
        setProviders(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const serviceData = {
      name,
      provider,
      description,
      category,
      price: parseFloat(price),
      features: features.split(',').map((f) => f.trim()),
    };

    // if (image) {
    //   const data = new FormData();
    //   const filename = `${apiData.base}/uploads/` + image.name;
    //   data.append('image', image);
    //   serviceData.image = filename;
    //   try {
    //     const imgUpload = await axios.post(`${apiData.base}/api/v1/upload`, data, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });

    //     console.log(imgUpload);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    if (selectedService) {
      try {
        const res = await axios.put(
          `${apiData.base}/api/v1/services/${selectedService._id}`,
          serviceData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error creating service:', error);
      }
    } else {
      try {
        const res = await axios.post(`${apiData.base}/api/v1/services`, serviceData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error creating service:', error);
      }
    }
  };

  useEffect(() => {
    if (selectedService) {
      setName(selectedService.name || '');
      setDescription(selectedService.description || '');
      setCategory(selectedService.category || '');
      setProvider(selectedService.provider|| '')
      setPrice(selectedService.price || '');
      setFeatures(selectedService.features.join(',') || '');
    }
    handleGetUser();
    handleGetProviders();
  }, [selectedService]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setFeatures('');
        setImage(null);
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Create Service</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Provider"
            variant="outlined"
            fullWidth
            required
            select
            margin="normal"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            {providers.map((prov, index) => (
              <MenuItem value={prov}>{prov.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            required
            select
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={'Project Management'}>Project Management</MenuItem>
            <MenuItem value={'CRM'}>Customer Relationship Management</MenuItem>
            <MenuItem value={'HR'}>Human Resource</MenuItem>
            <MenuItem value={'Marketing Automation'}>Marketing Automation</MenuItem>
            <MenuItem value={'Analytics and Business Intelligence'}>
              Analytics and Business Intelligence
            </MenuItem>
          </TextField>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <RupeeIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Features (comma-separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

          <Box sx={{ mt: 2 }}>
            {image ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{image?.name}</Typography>
                <IconButton
                  onClick={handleRemove}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileSelect}
                />
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setName('');
            setDescription('');
            setCategory('');
            setPrice('');
            setFeatures('');
            setImage(null);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit();
            // onClose();
            // setName('');
            // setDescription('');
            // setCategory('');
            // setPrice('');
            // setFeatures('');
            // setImage(null);
          }}
          variant="contained"
          color="primary"
        >
          Create Service
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServiceModal;
