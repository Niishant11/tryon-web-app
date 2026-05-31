// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TryOnProvider } from './context/TryOnContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import LandingPage      from './pages/LandingPage';
import AuthPage         from './pages/AuthPage';
import ProductSelection from './pages/ProductSelection';
import PhotoUpload      from './pages/PhotoUpload';
import TryOnResult      from './pages/TryOnResult';
import AdminPanel       from './pages/admin/AdminPanel';

import './App.css';

// ── Layout wrapper — conditionally renders Navbar ──────────────
// Keeps Navbar logic in one place. Admin gets its own sidebar nav
// so the global Navbar is hidden there.
function AppLayout() {
  const location = useLocation();

  // Pages that should NOT show the global top navbar
  const hideNavbarOn = ['/admin'];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-bg)' }}>

      {/* ✅ Single navbar — never renders on /admin */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/"     element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected — user-facing flow */}
        <Route path="/products" element={
          <ProtectedRoute><ProductSelection /></ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute><PhotoUpload /></ProtectedRoute>
        } />

        {/* Both /try-on and /tryon point to the same result page */}
        <Route path="/try-on" element={
          <ProtectedRoute><TryOnResult /></ProtectedRoute>
        } />
        <Route path="/tryon" element={
          <ProtectedRoute><TryOnResult /></ProtectedRoute>
        } />

        {/* Admin — has its own sidebar, no global navbar */}
        <Route path="/admin" element={
          <ProtectedRoute><AdminPanel /></ProtectedRoute>
        } />

        {/* 404 Fallback — redirect to landing page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

// ── Root App — providers wrap everything ──────────────────────
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TryOnProvider>
          {/* Router must wrap AppLayout so useLocation works inside it */}
          <Router>
            <AppLayout />
          </Router>
        </TryOnProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;