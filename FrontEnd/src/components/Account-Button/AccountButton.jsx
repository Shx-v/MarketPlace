import React, { useState } from 'react';
import { Button, Popover, Typography, Box, Avatar, SvgIcon, Divider, ButtonBase } from '@mui/material';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { apiData } from 'src/apidata';
import { Link } from 'react-router-dom';

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, token, setUser, setToken, setIsLoggedIn, setIsAdmin } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

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
      console.error('Error fetching services:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${apiData.base}/api/v1/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.EncryptedResponse;
      console.log(data);
      if (data.success) {
        setUser(false);
        setToken(false);
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : undefined;

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 30,
          width: 30,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 30,
            width: 30,
          }}
        >
          <SvgIcon style={{ width: '20px', height: '20px' }}>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, ml: 1 }}>
          {user && (
            <>
              <Typography variant="body1">{currentUser?.firstName}</Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {currentUser?.email}
              </Typography>
            </>
          )}
        </Box>
        <Divider sx={{ width: '100%' }} />
        {currentUser?.role === 'user' ? (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              marginLeft: '15px',
              gap: '8px',
            }}
          >
            <ButtonBase
              href="/account/orders"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                color: 'inherit',
              }}
              onClick={handleClose}
            >
              <SvgIcon
                fontSize="small"
                color="primary"
              >
                <ShoppingCartIcon />
              </SvgIcon>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                My Orders
              </Typography>
            </ButtonBase>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              marginLeft: '15px',
              gap: '8px',
            }}
          >
            <ButtonBase
              href="/admin/providers"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                color: 'inherit',
              }}
              onClick={handleClose}
            >
              <SvgIcon
                fontSize="small"
                color="primary"
              >
                <PeopleIcon />
              </SvgIcon>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                Providers
              </Typography>
            </ButtonBase>
            <ButtonBase
              href="/admin/services"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                color: 'inherit',
              }}
              onClick={handleClose}
            >
              <SvgIcon
                fontSize="small"
                color="primary"
              >
                <LocalOfferIcon />
              </SvgIcon>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                Services
              </Typography>
            </ButtonBase>
            <ButtonBase
              href="/admin/orders"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                color: 'inherit',
              }}
              onClick={handleClose}
            >
              <SvgIcon
                fontSize="small"
                color="primary"
              >
                <ReceiptIcon />
              </SvgIcon>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                Orders
              </Typography>
            </ButtonBase>
          </Box>
        )}
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            p: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            color="inherit"
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountButton;
