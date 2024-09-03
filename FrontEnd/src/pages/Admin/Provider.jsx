// src/pages/Providers.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Stack,
  TablePagination,
  Link,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddProviderDialog from './Modals/AddProviderDialog';
import { apiData } from 'src/apidata';
import { AuthContext } from 'src/contexts/auth/AuthContext';

const Providers = () => {
  const { token } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  useEffect(() => {
    handleGetProviders();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewProvider({ ...newProvider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiData.base}/api/v1/providers`, newProvider, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <Container sx={{ pt: 15, pb: 8 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          component="h1"
        >
          Providers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Provider
        </Button>
      </Box>
      {providers.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{
            height: '100%',
            textAlign: 'center',
            borderRadius: 2,
            p: 3,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            color="textSecondary"
          >
            No data available
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Please check back later.
          </Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {providers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((provider) => (
                  <TableRow key={provider._id}>
                    <TableCell>{provider.name}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.phone}</TableCell>
                    <TableCell align="right">
                      <Link
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Link
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={providers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      )}
      <AddProviderDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        provider={newProvider}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Providers;
