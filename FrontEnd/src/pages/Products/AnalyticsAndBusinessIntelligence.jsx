import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard';
import { useNavigate } from 'react-router';
import { apiData } from 'src/apidata';

const AnalyticsAndBusinessIntelligence = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const handleGetServices = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/services`);
      const data = response.data.EncryptedResponse;
      setServices(
        data.data.services.filter(
          (service) => service.category === 'Analytics and Business Intelligence'
        )
      );
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  return (
    <Container sx={{ pt: 10, pb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
        >
          Analytics and Business Intelligence Services
        </Typography>
      </Box>
      {services.length == 0 ? (
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
        <Grid
          container
          spacing={4}
        >
          {services.map((service, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
            >
              <ProductCard service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AnalyticsAndBusinessIntelligence;
