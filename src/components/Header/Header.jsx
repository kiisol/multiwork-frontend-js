// import React, { useState, useMemo } from 'react';
// import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import logo from '../../assets/images/Logo.svg';
// import { Button, Box, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery} from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import { buttonStyles} from '../Styles/styles';
// import MenuIcon from '@mui/icons-material/Menu';
// import IconButton from '@mui/material/IconButton';
// import SearchBar from '../SearchBar';
// import {useSelector } from 'react-redux';
// import UserDropdown from '../UserDropdown/UserDropdown';
// import NotificationDropdown from '../Notification/NotificationDropdown';



// const navItems = [
//   { name: 'Features', to: 'features' },
//   { name: 'Audience', to: 'audience' },
//   { name: 'Compare', to: 'compare' },
// ];

// // Страницы, где должна отображаться только логотип
// const hideNavigationPages = ['/pageDeclined',,'/pageSuccessfulJoining','/signup', '/login', '/checkYourEmail', '/forgotPassword', '/resetYourPassword', '/newPassword', '/404', '/confirmPassword', '/confirmation'];

// // Страницы, где логотип должен быть скрыт, но отображаются кнопки логина/регистрации
// const noLogoPages = ['/home/WithoutRegistration'];


// // Вспомогательная функция для проверки соответствия пути
// const doesPathMatch = (path, patterns) => {
//   return patterns.some((pattern) => matchPath({ path: pattern, end: false }, path));
// };

// // Страницы, где кнопка Sign Up должна иметь специальный стиль
// const specialSignUpPages = ['/home/WithoutRegistration', ];


// function Header() {
//   const location = useLocation();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const loggedInUser = useSelector(state => state.auth.user);
//   const notifications = useSelector(state => state.notifications);
//   // console.log(loggedInUser);

//   const currentPath = location.pathname;

//   const isSimpleHeader = useMemo(
//     () => doesPathMatch(currentPath, hideNavigationPages),
//     [currentPath]
//   );
//   const isNoLogoPage = useMemo(
//     () => doesPathMatch(currentPath, noLogoPages),
//     [currentPath]
//   );

//   const isSpecialSignUpPage = useMemo(
//     () => doesPathMatch(currentPath, specialSignUpPages),
//     [currentPath]
//   );

//   const formatText = (text) => {
//     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//   };

//   const loginButtonStyles = {
//     ...buttonStyles,
//     marginLeft: '40px',
//     [theme.breakpoints.down('sm')]: {
//       marginLeft: '0',
//       marginTop: '10px',
//       width: '100%',
//     },
//   };

//   // Стили для кнопки Sign Up в зависимости от страницы
//   const signUpButtonStyles = {
//     ...buttonStyles,
//     marginLeft: '8px',
//     border: isSpecialSignUpPage ? '1px solid #814AEB' : '1px solid #0A0A0A',
//     backgroundColor: isSpecialSignUpPage ? '#814AEB' : 'transparent',
//     color: isSpecialSignUpPage ? '#fff' : 'inherit',
//     borderRadius: '8px',
//     padding: '8px 16px',
//     width: '122px',
//     height: '60px',
//     [theme.breakpoints.down('sm')]: {
//       marginLeft: '0',
//       marginTop: '10px',
//       width: '100%',
//     },
//   };

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const renderDrawerList = () => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {!isSimpleHeader && 
//           navItems.map((item) => (
//             currentPath === '/' ? (
//               <ScrollLink
//                 key={item.name}
//                 to={item.to}
//                 smooth={true}
//                 duration={500}
//                 offset={-100}
//                 spy={true}
//                 activeClass="active"
//                 style={{ textDecoration: 'none', color: 'inherit' }}
//               >
//                 <ListItem button>
//                   <ListItemText primary={formatText(item.name)} />
//                 </ListItem>
//               </ScrollLink>
//             ) : (
//               <RouterLink
//                 key={item.name}
//                 to={`/#${item.to}`}
//                 style={{ textDecoration: 'none', color: 'inherit' }}
//               >
//                 <ListItem button>
//                   <ListItemText primary={formatText(item.name)} />
//                 </ListItem>
//               </RouterLink>
//             )
//           ))}

//         {!isSimpleHeader && !isNoLogoPage && !loggedInUser && (
//           <>
//             <RouterLink
//               to="/login"
//               style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <ListItem button>
//                 <ListItemText primary="Log in" />
//               </ListItem>
//             </RouterLink>
//             <RouterLink
//               to="/signup"
//               style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <ListItem button>
//                 <ListItemText primary="Sign Up" />
//               </ListItem>
//             </RouterLink>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   const handleSearch = (event) => {
//     const query = event.target.value;
   
//     // console.log('Поисковый запрос:', query);
//   };

//   return (
//     <Box sx={{ flexGrow: 1, }}>
//       <Grid container alignItems="center" justifyContent="space-between"
//         sx={{padding: { xs: '16px 24px', sm: '24px 80px' }, maxWidth: '100%', height: '108px', boxShadow: isSimpleHeader ? 'none' : '1px 0 24px 0 rgba(105, 65, 198, 0.05)', }} >

//          {/* Main header for logged-in users */}
//          {loggedInUser && !isSimpleHeader && (

//           <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft:'180px', marginTop:'-20px' }}>
//             <Box sx={{ width: '100%', maxWidth: '600px' , marginLeft: '80px'}}>
//               <SearchBar onChange={handleSearch} isHeader={true}/>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', }}>
//               <NotificationDropdown />
//               <UserDropdown name={loggedInUser.firstName} lastName={loggedInUser.lastName} email={loggedInUser.email}/>
//             </Box>
//           </Grid>
//         )}

//         {/* Логотип на страницах из hideNavigationPages */}
//         {isSimpleHeader && !isNoLogoPage && (
//           <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
//             <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '190px', height: '36px' }} />
//           </Grid>
//         )}

//         {/* Полный хедер на остальных страницах */}
//         {!isSimpleHeader && !isNoLogoPage &&  !loggedInUser && (
//           <>
//             {/* Логотип */}
//             <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
//               <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '175px', height: '36px' }} />
//             </Grid>

//             {/* Строка поиска (не на мобильных)
//           {!isMobile && (
//             <Grid size={4} sx={{ display: 'flex', justifyContent: 'center' }}>
//               <Box >
//                 <SearchBar onChange={handleSearch} isHeader={true} />
//               </Box>
//             </Grid>
//           )} */}

//             {/* Навигация и кнопки (для десктопа) */}
//             {!isMobile && !loggedInUser && (
//               <Grid size={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
//                 {navItems.map((item) =>
//                   currentPath === '/' ? (
//                     <ScrollLink
//                       key={item.name}
//                       to={item.to}
//                       smooth={true}
//                       duration={500}
//                       offset={-100}
//                       spy={true}
//                       activeClass="active"
//                       style={{ textDecoration: 'none' }}
//                     >
//                       <Button sx={{ ...buttonStyles, marginRight: '24px' }}>
//                         {formatText(item.name)}
//                       </Button>
//                     </ScrollLink>
//                   ) : (
//                     <RouterLink
//                       key={item.name}
//                       to={`/#${item.to}`}
//                       style={{ textDecoration: 'none' }}
//                     >
//                       <Button sx={{ ...buttonStyles, marginRight: '24px' }}>
//                         {formatText(item.name)}
//                       </Button>
//                     </RouterLink>
//                   )
//                 )}
//                 <Button
//                   sx={loginButtonStyles}
//                   component={RouterLink}
//                   to="/login"
//                 >
//                   {formatText('Log in')}
//                 </Button>
//                 <Button
//                   sx={signUpButtonStyles}
//                   component={RouterLink}
//                   to="/signup"
//                 >
//                   {formatText('Sign Up')}
//                 </Button>
//               </Grid>
//             )}
//           </>
//         )}

//         {/* Заголовок с поиском: Строка поиска + Кнопки (без логотипа) */}
//         {!isMobile && isNoLogoPage &&  !loggedInUser && (
//           <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '230px' }}>
//             <Box sx={{ width: '100%', maxWidth: '600px' }}>
//               <SearchBar onChange={handleSearch} isHeader={true} />
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Button
//                 sx={loginButtonStyles}
//                 component={RouterLink}
//                 to="/login"
//               >
//                 {formatText('Log in')}
//               </Button>
//               <Button
//                 sx={signUpButtonStyles}
//                 component={RouterLink}
//                 to="/signup"
//               >
//                 {formatText('Sign Up')}
//               </Button>
//             </Box>
//           </Grid>
//         )}


//         {/* Меню для мобильных устройств */}
//         {isMobile && !isSimpleHeader && !isNoLogoPage && (
//           <Grid size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="right"
//               open={drawerOpen}
//               onClose={toggleDrawer(false)}
//             >
//               {renderDrawerList()}
//             </Drawer>
//           </Grid>
//         )}

//         {/* Строка поиска для мобильных устройств на страницах с поиском */}
//         {isMobile && isNoLogoPage && (
//           <Grid size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
//             <Box sx={{ width: '100%' }}>
//               <SearchBar onChange={handleSearch} isHeader={true} />
//             </Box>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }

// export default Header;


import React, { useState, useMemo } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/images/Logo.svg';
import { Button, Box, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { buttonStyles } from '../../pages/Styles/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchBar from '../SearchBar';
import { useSelector } from 'react-redux';
import UserDropdown from '../UserDropdown/UserDropdown';
import NotificationDropdown from "../Notification/NotificationDropdown";

const navItems = [
  { name: 'Features', to: 'features' },
  { name: 'Audience', to: 'audience' },
  { name: 'Compare', to: 'compare' },
];

// Страницы, где должна отображаться только логотип
const hideNavigationPages = [
  '/pageDeclined',
  '/pageSuccessfulJoining',
  '/signup',
  '/login',
  '/checkYourEmail',
  '/forgotPassword',
  '/resetYourPassword',
  '/newPassword',
  '/404',
  '/confirmPassword',
  '/confirmation',
];

// Страницы, где логотип должен быть скрыт, но отображаются кнопки логина/регистрации
const noLogoPages = ['/home/WithoutRegistration'];

// Вспомогательная функция для проверки соответствия пути
const doesPathMatch = (path, patterns) => {
  return patterns.some((pattern) => matchPath({ path: pattern, end: false }, path));
};

// Страницы, где кнопка Sign Up должна иметь специальный стиль
const specialSignUpPages = ['/home/WithoutRegistration'];

function Header() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Безопасное извлечение данных из Redux
  const authState = useSelector((state) => state.auth);
  const loggedInUser = authState?.user || null; // Проверяем, что user существует
  const notificationsState = useSelector((state) => state.notifications);
  const notifications = notificationsState?.data || []; // Извлекаем data или пустой массив

  // Логирование для отладки
  console.log('authState:', authState);
  console.log('loggedInUser:', loggedInUser);
  console.log('notificationsState:', notificationsState);
  console.log('notifications:', notifications);

  const currentPath = location.pathname;

  const isSimpleHeader = useMemo(
    () => doesPathMatch(currentPath, hideNavigationPages),
    [currentPath]
  );
  const isNoLogoPage = useMemo(
    () => doesPathMatch(currentPath, noLogoPages),
    [currentPath]
  );

  const isSpecialSignUpPage = useMemo(
    () => doesPathMatch(currentPath, specialSignUpPages),
    [currentPath]
  );

  const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const loginButtonStyles = {
    ...buttonStyles,
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginTop: '10px',
      width: '100%',
    },
  };

  const signUpButtonStyles = {
    ...buttonStyles,
    marginLeft: '8px',
    border: isSpecialSignUpPage ? '1px solid #814AEB' : '1px solid #0A0A0A',
    backgroundColor: isSpecialSignUpPage ? '#814AEB' : 'transparent',
    color: isSpecialSignUpPage ? '#fff' : 'inherit',
    borderRadius: '8px',
    padding: '8px 16px',
    width: '122px',
    height: '60px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginTop: '10px',
      width: '100%',
    },
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderDrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {!isSimpleHeader &&
          navItems.map((item) =>
            currentPath === '/' ? (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-100}
                spy={true}
                activeClass="active"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem button>
                  <ListItemText primary={formatText(item.name)} />
                </ListItem>
              </ScrollLink>
            ) : (
              <RouterLink
                key={item.name}
                to={`/#${item.to}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem button>
                  <ListItemText primary={formatText(item.name)} />
                </ListItem>
              </RouterLink>
            )
          )}

        {!isSimpleHeader && !isNoLogoPage && !loggedInUser && (
          <>
            <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemText primary="Log in" />
              </ListItem>
            </RouterLink>
            <RouterLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </RouterLink>
          </>
        )}
      </List>
    </Box>
  );

  const handleSearch = (event) => {
    const query = event.target.value;
    console.log('Поисковый запрос:', query);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          padding: { xs: '16px 24px', sm: '24px 80px' },
          maxWidth: '100%',
          height: '108px',
          boxShadow: isSimpleHeader ? 'none' : '1px 0 24px 0 rgba(105, 65, 198, 0.05)',
        }}
      >
        {/* Main header for logged-in users */}
        {loggedInUser && !isSimpleHeader && (
          <Grid
            size={12}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '180px', marginTop: '-20px' }}
          >
            <Box sx={{ width: '100%', maxWidth: '600px', marginLeft: '80px' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationDropdown notifications={notifications} />
              <UserDropdown
                name={loggedInUser?.firstName || 'User'}
                lastName={loggedInUser?.lastName || ''}
                email={loggedInUser?.email || ''}
              />
            </Box>
          </Grid>
        )}

        {/* Логотип на страницах из hideNavigationPages */}
        {isSimpleHeader && !isNoLogoPage && (
          <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '190px', height: '36px' }} />
          </Grid>
        )}

        {/* Полный хедер на остальных страницах */}
        {!isSimpleHeader && !isNoLogoPage && !loggedInUser && (
          <>
            {/* Логотип */}
            <Grid xs={isMobile ? 6 : 5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Box component="img" src={logo} alt="logo" sx={{ width: isMobile ? '150px' : '175px', height: '36px' }} />
            </Grid>

            {/* Навигация и кнопки (для десктопа) */}
            {!isMobile && !loggedInUser && (
              <Grid size={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {navItems.map((item) =>
                  currentPath === '/' ? (
                    <ScrollLink
                      key={item.name}
                      to={item.to}
                      smooth={true}
                      duration={500}
                      offset={-100}
                      spy={true}
                      activeClass="active"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button sx={{ ...buttonStyles, marginRight: '24px' }}>{formatText(item.name)}</Button>
                    </ScrollLink>
                  ) : (
                    <RouterLink key={item.name} to={`/#${item.to}`} style={{ textDecoration: 'none' }}>
                      <Button sx={{ ...buttonStyles, marginRight: '24px' }}>{formatText(item.name)}</Button>
                    </RouterLink>
                  )
                )}
                <Button sx={loginButtonStyles} component={RouterLink} to="/login">
                  {formatText('Log in')}
                </Button>
                <Button sx={signUpButtonStyles} component={RouterLink} to="/signup">
                  {formatText('Sign Up')}
                </Button>
              </Grid>
            )}
          </>
        )}

        {/* Заголовок с поиском: Строка поиска + Кнопки (без логотипа) */}
        {!isMobile && isNoLogoPage && !loggedInUser && (
          <Grid
            size={12}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '230px' }}
          >
            <Box sx={{ width: '100%', maxWidth: '600px' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={loginButtonStyles} component={RouterLink} to="/login">
                {formatText('Log in')}
              </Button>
              <Button sx={signUpButtonStyles} component={RouterLink} to="/signup">
                {formatText('Sign Up')}
              </Button>
            </Box>
          </Grid>
        )}

        {/* Меню для мобильных устройств */}
        {isMobile && !isSimpleHeader && !isNoLogoPage && (
          <Grid size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {renderDrawerList()}
            </Drawer>
          </Grid>
        )}

        {/* Строка поиска для мобильных устройств на страницах с поиском */}
        {isMobile && isNoLogoPage && (
          <Grid size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <SearchBar onChange={handleSearch} isHeader={true} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Header;