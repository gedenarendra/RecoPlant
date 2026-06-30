import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/guest/DashboardPage';
import PredictionPage from './pages/guest/PredictionPage';
import HistoryPage from './pages/guest/HistoryPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './middleware/PrivateRoute';
import PublicRoute from './middleware/PublicRoute';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Public Pages Route Group (Redirects to Dashboard if logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Guest Pages Route Group */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
