import React, { useState } from 'react';
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { textStylesH2, textStylesBody2, buttonStyles } from './Styles/styles';
import IconSend from '../../src/assets/icons/IconSend.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from 'axios';
import { API_URL } from '../config'
import {logoutUser} from '../store/Slice/authSlice'

const PageCheckYourEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Получаем email из location.state или localStorage
  const myEmail = localStorage.getItem('email') || '';
  const { email: emailFromState } = location.state || {};
  const emailToShow = emailFromState || myEmail || 'your email';

  const handleResendEmail = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Отправляем запрос на повторную отправку письма подтверждения
      await axios.post(`${API_URL}/auth/send-email-confirmation`, {
        email: emailToShow,
      });
      setSuccess('Email resent successfully! Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to resend email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    dispatch(logoutUser()); // Очищаем состояние аутентификации
    navigate('/login'); // Перенаправляем на страницу логина
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Check your email
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '50px' }}>
          <Box component="img" src={IconSend} alt="Iconsend" />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'center' }}>
              An email has been sent to you at <strong>{emailToShow}</strong>.
            </Typography>
            <Typography variant="body2" sx={{ ...textStylesBody2, textAlign: 'center', color: '#1976d2' }}>
              Click on the link in the email to access your account.
            </Typography>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress sx={{ color: '#814AEB' }} />
            </Box>
          )}
          {error && (
            <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ color: 'green', textAlign: 'center', mt: 2 }}>
              {success}
            </Typography>
          )}

          <Button
            onClick={handleResendEmail}
            variant="outlined"
            sx={{
              ...buttonStyles,
              borderRadius: '4px',
              padding: '10px 18px',
              marginTop: '24px',
              borderColor: '#814AEB',
              color: '#814AEB',
              textTransform: 'capitalize',
            }}
            disabled={loading}
          >
            Resend email
          </Button>
          <Button
            onClick={handleGoBack}
            variant="text"
            sx={{
              ...buttonStyles,
              marginTop: '24px',
              color: '#814AEB',
              textTransform: 'capitalize',
            }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PageCheckYourEmail;