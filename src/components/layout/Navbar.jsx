// src/components/layout/Navbar.jsx
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try { await logout(); }
    catch (error) { console.error('Logout error:', error); }
  };

  return (
    <nav className="navbar">
      <div className="container nav__inner">

        {/* Logo */}
        <Link to="/" className="nav__logo">
          Try<span>On</span>
        </Link>

        {/* Links — only shown when authenticated */}
        {isAuthenticated && (
          <ul className="nav__links">
            <li>
              <Link to="/products" className={`nav__link ${isActive('/products') ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/upload" className={`nav__link ${isActive('/upload') ? 'active' : ''}`}>
                Upload
              </Link>
            </li>
            <li>
              <Link to="/result" className={`nav__link ${isActive('/try-on') ? 'active' : ''}`}>
                Result
              </Link> 
            </li>
            <li>
              <Link to="/admin" className={`nav__link ${isActive('/admin') ? 'active' : ''}`}>
                Admin
              </Link>
            </li>
          </ul>
        )}

        {/* Right side */}
        <div className="nav__actions">
          {isAuthenticated ? (
            <>
              <div className="nav__user">
                <div className="nav__avatar">
                  {/* Show photo if available, else initial */}
                  {user?.photoURL
                    ? <img src={user.photoURL} alt="" style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover' }} />
                    : (user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()
                  }
                </div>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-text-muted)' }}>
                  {user?.displayName?.split(' ')[0] || user?.email}
                </span>
              </div>
              <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn--ghost btn--sm">Sign in</Link>
              <Link to="/auth" className="btn btn--primary btn--sm">Try free</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}