import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, Button, Rating, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from 'src/contexts/auth/AuthContext';
import SubscriptionOrderModal from './Modals/SubscriptionOrderModal';
import { apiData } from 'src/apidata';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token, isLoggedIn } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [service, setService] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  const handleGetCurrentUser = async () => {
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

  const handleGetService = async () => {
    try {
      const response = await axios.get(
        `https://marketplacebackend-5jv3.onrender.com/api/v1/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.EncryptedResponse;
      setService(data.data.service);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        await axios.post(
          `https://marketplacebackend-5jv3.onrender.com/api/v1/services/review/${id}`,
          { user: currentUser, rating, comment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRating(5);
        setComment('');
        handleGetService();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    handleGetService();
    handleGetCurrentUser();
  }, []);

  return (
    <Container sx={{ pt: 10, pb: 8 }}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Box
            component="img"
            src={service?.image}
            alt={service?.name}
            sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
          >
            {service?.name}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            {service?.category} by {service?.provider?.name}
          </Typography>
          <Rating
            value={service?.averageRating ?? 0}
            precision={0.5}
            readOnly
          />
          <Typography
            variant="h5"
            sx={{ mt: 2 }}
          >
            ₹{service?.price}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 4 }}
          >
            {service?.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 4 }}
          >
            Features:
          </Typography>
          <ul>
            {service?.features.map((feature, index) => (
              <li key={index}>
                <Typography variant="body1">{feature}</Typography>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={() => {
              if (isLoggedIn) {
                handleOpen();
              } else {
                navigate('/auth/login');
              }
            }}
          >
            Subscribe Now
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5">Reviews</Typography>

        {service?.reviews.length > 0 ? (
          service?.reviews.map((review) => (
            <Box
              key={review._id}
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle2">
                {`${review.user.firstName} ${review.user.lastName}`}
              </Typography>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {review.comment}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            No reviews yet.
          </Typography>
        )}

        {/* Review Form */}
        <Box
          component="form"
          onSubmit={handleSubmitReview}
          sx={{ mt: 4 }}
        >
          <Typography variant="h6">Add a Review</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{ mt: 1 }}
          />
          <TextField
            label="Comment"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
        </Box>
      </Box>

      <SubscriptionOrderModal
        open={isDialogOpen}
        handleClose={handleClose}
        service={service}
      />
    </Container>
  );
};

export default ServiceDetail;
