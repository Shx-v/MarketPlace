import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar } from '@mui/material';
import {
  People,
  Work,
  //  Mission,
  // Vision
} from '@mui/icons-material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const About = () => {
  return (
    <Box>

      <Box sx={{ pt: 15, pb: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            gutterBottom
          >
            About Us
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            Learn more about our mission, vision, and the team behind our platform.
          </Typography>
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
            md={6}
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
                <EmojiFlagsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography variant="h5">Our Mission</Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography color="textSecondary">
                  Our mission is to provide businesses with the most powerful and easy-to-use SaaS
                  tools to help them grow and succeed.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
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
                <LightbulbIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                <Typography variant="h5">Our Vision</Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography color="textSecondary">
                  Our vision is to be the leading SaaS marketplace where businesses of all sizes can
                  find the tools they need to thrive.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Meet Our Team
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
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mx: 'auto' }}>
                <People sx={{ fontSize: 40 }} />
              </Avatar>
              <Box
                flexGrow={1}
                mt={2}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  John Doe
                </Typography>
                <Typography color="textSecondary">CEO & Founder</Typography>
              </Box>
              <Typography
                color="textSecondary"
                mt={2}
              >
                John is the visionary behind our platform, bringing years of experience in SaaS and
                technology.
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
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mx: 'auto' }}>
                <People sx={{ fontSize: 40 }} />
              </Avatar>
              <Box
                flexGrow={1}
                mt={2}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Jane Smith
                </Typography>
                <Typography color="textSecondary">Chief Operating Officer</Typography>
              </Box>
              <Typography
                color="textSecondary"
                mt={2}
              >
                Jane oversees our operations, ensuring everything runs smoothly from day to day.
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
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mx: 'auto' }}>
                <People sx={{ fontSize: 40 }} />
              </Avatar>
              <Box
                flexGrow={1}
                mt={2}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Alice Johnson
                </Typography>
                <Typography color="textSecondary">Chief Technology Officer</Typography>
              </Box>
              <Typography
                color="textSecondary"
                mt={2}
              >
                Alice leads our tech team, driving innovation and technical excellence.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: 'primary.main', py: 4 }}>
        <Container
          maxWidth="lg"
          sx={{ textAlign: 'center' }}
        >
          <Typography
            variant="body1"
          >
            © 2024 Your SaaS Marketplace. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
