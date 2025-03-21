import React from 'react';
import { Provider } from 'react-redux';
import ScrollToTop from './components/ScrollToTop'
import {store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageSignUp from './pages/PageSignUp';
import PageCheckYourEmail from './pages/PageCheckYourEmail';
import PageLogin from './pages/PageLogin'
import Landing from './pages/Landing'
import Header from './components/Header/Header'
import PageHomeWithRegistration from './pages/PageHomeWithRegistration'
import './App.css';
import {useSelector} from 'react-redux'


const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  },
});

function ProtectedRoute({ children }) {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AuthRedirect({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/home" /> : children;
}

function LandingApp() {
  return (
    <>
      <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<PageSignUp />} />
            <Route path="/login" 
            element={
            <AuthRedirect>
                <PageLogin  />
            </AuthRedirect>
           } />
            <Route path="/checkYourEmail" element={<PageCheckYourEmail />} />
            <Route path="/home" element={
            <ProtectedRoute>
              <PageHomeWithRegistration />
            </ProtectedRoute>
          }
        />
            <Route path="/home/:registration" element={<PageCheckYourEmail />} />
          </Routes>
    </>
  );
};


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
            <Router>
              <LandingApp />
            </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;