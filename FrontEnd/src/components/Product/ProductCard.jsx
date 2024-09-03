import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Rating } from '@mui/material';
import { useNavigate } from 'react-router';

const ProductCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345, m: 2, cursor: 'pointer', height: '100%' }}
      onClick={() => navigate(`${service._id}`)}
    >
      <CardMedia
        component="img"
        height="140"
        image={service.image}
        alt={service.name}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
        >
          {service.name}
        </Typography>
        <Rating
          value={service.averageRating}
          precision={0.5}
          readOnly
          sx={{ mt: 1 }}
        />
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Price: ₹{service.price}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Category: {service.category}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {`Provider: ${service.provider.name}`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Features: {service.features.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
