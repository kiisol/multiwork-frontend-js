// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid2';
// import IconButton from '@mui/material/IconButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import axios from 'axios';
// import { registerUser } from '../store/Slice/authSlice'; // Убедись, что путь правильный
// import Hello from '../../src/assets/icons/Hello.svg'; // Укажи правильный путь к иконке
// import { textStylesH2, textStylesBody1, textStylesBodyL2, buttonStyles } from './Styles/styles'; // Укажи правильный путь

// const PageSignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, } = useSelector((state) => state.auth);

//   const [userData, setUserData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     username: '',
//     password: '',
//     privacyPolicyAccepted: false,
//   });

//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     privacyPolicy: '',
//     serverError: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [privacyPolicy, setPrivacyPolicy] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'email') {
//       setUserData((prevState) => ({
//         ...prevState,
//         [name]: value,
//         username: value, // Автоматическое заполнение username на основе email
//       }));
//     } else {
//       setUserData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handlePrivacyPolicyChange = () => {
//     setPrivacyPolicy(!privacyPolicy);
//     setUserData((prevState) => ({
//       ...prevState,
//       privacyPolicyAccepted: !privacyPolicy,
//     }));
//   };

//   const validate = () => {
//     let tempErrors = {};
//     tempErrors.firstName = userData.firstName ? '' : 'Name is required';
//     tempErrors.lastName = userData.lastName ? '' : 'Last name is required';
//     tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email) ? '' : 'Invalid email';
//     tempErrors.password = userData.password.length >= 10 ? '' : 'Password must be at least 10 characters long';
//     tempErrors.privacyPolicy = privacyPolicy ? '' : 'Please accept the Privacy Policy';
//     setErrors({ ...errors, ...tempErrors });
//     return Object.values(tempErrors).every((x) => x === '');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validate()) {
//       // Отправляем только стандартные поля для регистрации
//       const registerData = {
//         username: userData.username,
//         email: userData.email,
//         password: userData.password,
//       };

//       console.log('Sending for registration:', registerData);
//       const action = await dispatch(registerUser(registerData));
//       console.log('Result:', action);

//       if (action.type === 'auth/registerUser/fulfilled') {
//         console.log('Success:', action.payload);

//         // После успешной регистрации обновляем пользователя с кастомными полями
//         const { jwt, user } = action.payload;
//         try {
//           const updateResponse = await axios.put(
//             `http://localhost:1337/api/users/${user.id}`,
//             {
//               firstName: userData.firstName,
//               lastName: userData.lastName,
//               privacyPolicyAccepted: userData.privacyPolicyAccepted,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${jwt}`,
//               },
//             }
//           );
//           console.log('User updated:', updateResponse.data);

//           // Перенаправление на страницу /checkYourEmail
//           navigate('/checkYourEmail', { state: { email: userData.email } });
//           localStorage.setItem('email', userData.email);
//         } catch (updateError) {
//           console.error('Failed to update user:', updateError.response?.data);
//           setErrors({
//             ...errors,
//             serverError: 'Registration succeeded, but failed to update user data: ' + (updateError.response?.data?.error?.message || 'Unknown error'),
//           });
//         }
//       } else {
//         const errorMessage = action.payload?.error?.message || 'Registration failed';
//         setErrors({ ...errors, serverError: errorMessage });
//       }
//     } else {
//       console.error('Validation failed:', errors);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//         <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
//           Sign Up
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
//           <Box component="img" src={Hello} alt="Hello" sx={{ marginRight: '8px' }} />
//           <Typography variant="h2" sx={{ ...textStylesBody1, fontWeight: '600' }}>
//             Welcome to MultyWork!
//           </Typography>
//         </Box>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid size={12} sx={{ marginTop: '4px' }}>
//               <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>First name*</Typography>
//               <TextField
//                 required
//                 sx={{
//                   marginTop: '8px',
//                   '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
//                   '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': { borderColor: '#814AEB' },
//                     '&.Mui-focused fieldset': { borderColor: '#814AEB' },
//                   },
//                 }}
//                 fullWidth
//                 label="Enter your first name"
//                 id="first-name"
//                 name="firstName"
//                 value={userData.firstName}
//                 onChange={handleChange}
//                 error={!!errors.firstName}
//                 helperText={errors.firstName}
//                 autoComplete="off"
//               />
//             </Grid>
//             <Grid size={12} sx={{ marginTop: '8px' }}>
//               <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Last name*</Typography>
//               <TextField
//                 required
//                 sx={{
//                   marginTop: '8px',
//                   '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
//                   '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': { borderColor: '#814AEB' },
//                     '&.Mui-focused fieldset': { borderColor: '#814AEB' },
//                   },
//                 }}
//                 fullWidth
//                 label="Enter your last name"
//                 id="last-name"
//                 name="lastName"
//                 value={userData.lastName}
//                 onChange={handleChange}
//                 error={!!errors.lastName}
//                 helperText={errors.lastName}
//                 autoComplete="off"
//               />
//             </Grid>
//             <Grid size={12} sx={{ marginTop: '8px' }}>
//               <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
//               <TextField
//                 required
//                 sx={{
//                   marginTop: '8px',
//                   '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
//                   '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': { borderColor: '#814AEB' },
//                     '&.Mui-focused fieldset': { borderColor: '#814AEB' },
//                   },
//                 }}
//                 fullWidth
//                 label="Enter your email address"
//                 id="email"
//                 name="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 autoComplete="off"
//               />
//             </Grid>
//             <Grid size={12} sx={{ marginTop: '8px' }}>
//               <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Create password*</Typography>
//               <TextField
//                 required
//                 sx={{
//                   marginTop: '8px',
//                   '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
//                   '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': { borderColor: '#814AEB' },
//                     '&.Mui-focused fieldset': { borderColor: '#814AEB' },
//                   },
//                 }}
//                 fullWidth
//                 label="Use at least 10 characters"
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   ),
//                 }}
//                 autoComplete="off"
//               />
//             </Grid>
//             <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={privacyPolicy}
//                     onChange={handlePrivacyPolicyChange}
//                     sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#814AEB' } }}
//                   />
//                 }
//                 label={
//                   <Typography>
//                     I agree to the <Link href="#">Privacy Policy</Link>
//                   </Typography>
//                 }
//               />
//               {errors.privacyPolicy && <Typography color="error">{errors.privacyPolicy}</Typography>}
//             </Grid>
//           </Grid>

//           {loading && (
//             <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
//               <CircularProgress />
//             </Box>
//           )}

//           {errors.serverError && (
//             <Typography sx={{ color: 'red', textAlign: 'center', marginY: 2 }}>
//               {errors.serverError}
//             </Typography>
//           )}

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               ...buttonStyles,
//               borderRadius: '4px',
//               padding: '10px 18px',
//               marginTop: '16px',
//               background: '#814AEB',
//               color: '#FFF',
//               textTransform: 'capitalize',
//             }}
//             aria-label="Sign Up"
//             disabled={loading}
//           >
//             Sign Up
//           </Button>
//           <Typography sx={{ textAlign: 'center', margin: '30px' }}>
//             Have an account?{' '}
//             <Link href="/login" variant="body2" sx={{ ...textStylesBodyL2, color: '#814AEB', textDecoration: 'none' }}>
//               Log in
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default PageSignUp;

import React, { useState} from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import { textStylesH2, textStylesBody1, textStylesBodyL2, buttonStyles } from '../pages/Styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/Slice/authSlice';

const PageSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    privacyPolicyAccepted: false,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    privacyPolicyAccepted: '',
    serverError: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = userData.firstName ? '' : 'First name is required';
    tempErrors.lastName = userData.lastName ? '' : 'Last name is required';
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email) ? '' : 'Invalid email';
    tempErrors.password = userData.password.length >= 8 ? '' : 'Password must be at least 8 characters long';
    tempErrors.privacyPolicyAccepted = userData.privacyPolicyAccepted ? '' : 'You must accept the privacy policy';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const registerData = {
        username: userData.email, // Strapi использует email как username
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName, // Передаём кастомные поля
        lastName: userData.lastName,
        privacyPolicyAccepted: userData.privacyPolicyAccepted ? 1 : 0,
      };

      try {
        console.log('Sending for registration:', registerData);
        const action = await dispatch(registerUser(registerData));
        console.log('Result:', action);
        if (registerUser.fulfilled.match(action)) {
          // Сохраняем email в localStorage для отображения на странице CheckYourEmail
          localStorage.setItem('email', userData.email);

          // Перенаправляем на страницу CheckYourEmail
          navigate('/checkYourEmail', { state: { email: userData.email } });
        } else {
          setErrors((prev) => ({
            ...prev,
            serverError: action.payload || 'Registration failed. Please try again.',
          }));
        }
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          serverError: err.message || 'An unexpected error occurred.',
        }));
      }
    }
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            width: '258px',
            height: '148px',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <CircularProgress sx={{ marginRight: '8px', color: '#814AEB' }} />
          <Typography>Loading... Please wait...</Typography>
        </Box>
      )}
      {errors.serverError && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography sx={{ color: 'red' }}>{errors.serverError}</Typography>
        </Box>
      )}
      {!loading && (
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography component="h1" variant="h5" sx={{ ...textStylesH2, textAlign: 'center', width: '100%' }}>
              Sign Up
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>First Name*</Typography>
                <TextField
                  sx={{
                    marginTop: '8px',
                    '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
                    '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#814AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#814AEB' },
                    },
                  }}
                  required
                  fullWidth
                  label="Enter your first name"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  autoComplete="off"
                />
              </Grid>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Last Name*</Typography>
                <TextField
                  sx={{
                    marginTop: '8px',
                    '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
                    '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#814AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#814AEB' },
                    },
                  }}
                  required
                  fullWidth
                  label="Enter your last name"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  autoComplete="off"
                />
              </Grid>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Email*</Typography>
                <TextField
                  sx={{
                    marginTop: '8px',
                    '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
                    '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#814AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#814AEB' },
                    },
                  }}
                  required
                  fullWidth
                  label="Enter your email address"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="off"
                />
              </Grid>
              <Grid size={12} sx={{ marginTop: '4px' }}>
                <Typography sx={{ ...textStylesBodyL2, textAlign: 'left' }}>Password*</Typography>
                <TextField
                  sx={{
                    marginTop: '8px',
                    '& .MuiInputLabel-root.Mui-focused': { color: '#814AEB' },
                    '& .MuiInputBase-root.Mui-focused': { borderColor: '#814AEB' },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#814AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#814AEB' },
                    },
                  }}
                  required
                  fullWidth
                  label="Enter your password"
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="off"
                />
              </Grid>
              <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="privacyPolicyAccepted"
                      checked={userData.privacyPolicyAccepted}
                      onChange={handleChange}
                      sx={{
                        color: '#D0D5DD',
                        '&.Mui-checked': {
                          color: '#814AEB',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ ...textStylesBody1 }}>
                      I agree to the{' '}
                      <Link href="/privacy-policy" sx={{ color: '#814AEB', textDecoration: 'none' }}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
              {errors.privacyPolicyAccepted && (
                <Typography sx={{ color: 'red', fontSize: '12px', mt: 1 }}>
                  {errors.privacyPolicyAccepted}
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                ...buttonStyles,
                borderRadius: '4px',
                padding: '10px 18px',
                marginTop: '8px',
                background: '#814AEB',
                color: '#FFF',
                textTransform: 'capitalize',
              }}
              aria-label="Sign Up"
              disabled={loading}
            >
              Sign Up
            </Button>
            <Typography sx={{ textAlign: 'center', marginTop: '30px' }}>
              Already have an account?{' '}
              <span>
                <Link href="/login" variant="body2" sx={{ ...textStylesBodyL2, color: '#814AEB', textDecoration: 'none' }}>
                  Log In
                </Link>
              </span>
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

export default PageSignUp;