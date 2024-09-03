import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Stack,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  ButtonGroup,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { AuthContext } from 'src/contexts/auth/AuthContext';
import { apiData } from 'src/apidata';

const Orders = () => {
  const { token, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleGetOrders = async () => {
    if (user) {
      try {
        const response = await axios.get(`${apiData.base}/api/v1/orders`);
        const data = response.data.EncryptedResponse;
        setOrders(data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
  };

  const handleUpdateOrder = async (status, id) => {
    try {
      const response = await axios.put(
        `${apiData.base}/api/v1/orders/${id}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.EncryptedResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${apiData.base}/api/v1/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.EncryptedResponse;
      if(data.success) {
        handleDeleteOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

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
          Orders
        </Typography>
      </Box>
      {orders.length == 0 ? (
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
          <Box>
            <InfoIcon
              color="primary"
              fontSize="large"
            />
          </Box>
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
                <TableCell>Order by</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user.firstName}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      variant="text"
                      aria-label="icon button group"
                    >
                      {order.orderStatus == 'Pending' && (
                        <IconButton
                          color="success"
                          onClick={() => handleUpdateOrder('Complete', order._id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      )}
                      {order.orderStatus == 'Pending' && (
                        <IconButton
                          color="warning"
                          onClick={() => handleUpdateOrder('Cancelled', order._id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={orders.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      )}
    </Container>
  );
};

export default Orders;
