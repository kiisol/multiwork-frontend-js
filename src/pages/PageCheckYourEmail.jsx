import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { textStylesH2, textStylesBody2 } from './Styles/styles'
import IconSend from '../../src/assets/icons/IconSend.svg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PageCheckYourEmail = () => {
  const location = useLocation();
  const myEmail = localStorage.getItem('email') || ''; // Значение по умолчанию, если email отсутствует
  const { email: emailFromState } = location.state || {}; // Деструктуризация с безопасным значением по умолчанию
  const navigate = useNavigate();

  // Используем email из location.state, если есть, иначе из localStorage
  const emailToShow = emailFromState || myEmail || 'your email';

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
          Check your email
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '50px' }}>
          <Box component="img" src={IconSend} alt="Iconsend" />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{ ...textStylesBody2, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              An email has been sent to you at <strong>{emailToShow}</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...textStylesBody2, textAlign: 'left', color: '#1976d2', textDecoration: 'none', '&:hover': { color: '#1565c0' } }}
              component="a"
              href={`mailto:${emailToShow}`} // Используем mailto: для email-ссылок
              target="_blank"
              rel="noopener noreferrer" // Безопасность для target="_blank"
            >
              Click on the link to access your account.
            </Typography>
          </Box>
          <Button
            variant="text"
            sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px' }}
            component="a"
            href={`mailto:${emailToShow}`} // Используем mailto: для повторной отправки
            target="_blank"
            rel="noopener noreferrer"
          >
            Resend email
          </Button>
          <Button
            variant="text"
            sx={{ textTransform: 'capitalize', color: '#0A0A0A', marginTop: '24px' }}
            onClick={() => navigate('/signup')}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PageCheckYourEmail;
