import React from 'react';
import { Box, Button, Typography, Container, Grid, Paper, TextField, Avatar } from '@mui/material';
import { Search, TrendingUp, People, Layers, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoney from '@mui/icons-material/AttachMoney';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ pt: 15, pb: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            mb={4}
            gutterBottom
          >
            One Platform, Countless SaaS Solutions
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            Discover and deploy powerful SaaS tools to grow your business
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={() => navigate('/products/all')}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ py: 8 }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <Layers sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Project Management
              </Typography>
              <Typography color="textSecondary">
                Organize tasks and track progress with powerful tools.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products/proj_mgmt')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <People sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                CRM
              </Typography>
              <Typography color="textSecondary">
                Manage customer relationships and sales pipelines.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products/cus_mgmt')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <TrendingUp sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Marketing Automation
              </Typography>
              <Typography color="textSecondary">
                Automate your marketing efforts with advanced tools.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products/mkt_auto')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <BusinessIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Analytics and Business Intelligence
              </Typography>
              <Typography color="textSecondary">
                Gain insights and make data-driven decisions with powerful analytics tools.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products/analytics_business_intl')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <NaturePeopleIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Human Resources
              </Typography>
              <Typography color="textSecondary">
                Streamline HR processes and manage employee data efficiently.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products/hum_res')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, textAlign: 'center' }}
            >
              <AttachMoney sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Top Deals
              </Typography>
              <Typography color="textSecondary">
                Find top deals with our discounted prices.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/deals')}
              >
                Explore
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            mb={4}
            gutterBottom
          >
            How It Works
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <Paper
                elevation={3}
                sx={{ p: 3, textAlign: 'center' }}
              >
                <Search sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Find a Service
                </Typography>
                <Typography color="textSecondary">
                  Search for the perfect tool that fits your business needs.
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <Paper
                elevation={3}
                sx={{ p: 3, textAlign: 'center' }}
              >
                <Layers sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Deploy Instantly
                </Typography>
                <Typography color="textSecondary">
                  Start using the service immediately with our seamless setup.
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <Paper
                elevation={3}
                sx={{ p: 3, textAlign: 'center' }}
              >
                <TrendingUp sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Grow Your Business
                </Typography>
                <Typography color="textSecondary">
                  Leverage powerful tools to scale and improve efficiency.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h4"
          align="center"
          mb={4}
          gutterBottom
        >
          What Our Customers Say
        </Typography>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="subtitle1">John Doe</Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  "A game-changer for our business!"
                </Typography>
                <Typography color="textSecondary">
                  We've streamlined our operations and increased efficiency with the tools available
                  on this platform.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="subtitle1">Jane Smith</Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  "Excellent customer support."
                </Typography>
                <Typography color="textSecondary">
                  The team is responsive and always ready to help with any issues we face.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper
              elevation={3}
              sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Box
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="subtitle1">Alice Johnson</Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  "Highly recommend!"
                </Typography>
                <Typography color="textSecondary">
                  The wide variety of SaaS tools has made it easy for us to find exactly what we
                  need.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: 'primary.main', py: 4 }}>
        <Container
          maxWidth="lg"
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="body1">
            © 2024 Your SaaS Marketplace. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
