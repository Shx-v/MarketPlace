import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Rating } from '@mui/material';

const DealDisplay = ({ data, onBuy }) => {
  // Function to calculate total price for a combination
  const calculateTotalPrice = (combination) => {
    return combination.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Grid
      container
      spacing={3}
      marginY={3}
    >
      {data.map((combination, index) => (
        <Grid
          item
          xs={12}
          key={index}
        >
          <Card variant="outlined">
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginY={2}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Combination {index + 1}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onBuy(combination)}
                >
                  Buy
                </Button>
              </Box>
              {/* Display the total price */}
              <Typography
                variant="h6"
                gutterBottom
                marginY={2}
              >
                Total Price: ${calculateTotalPrice(combination)}
              </Typography>
              <Grid
                container
                spacing={2}
              >
                {combination.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={item._id}
                  >
                    <Card variant="outlined">
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          mb={2}
                        >
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            by {item.provider.name}
                          </Typography>
                        </Box>

                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                        >
                          Category: {item.category}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                        >
                          Price: ${item.price}
                        </Typography>

                        <Rating
                          value={item.averageRating}
                          precision={0.5}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DealDisplay;
