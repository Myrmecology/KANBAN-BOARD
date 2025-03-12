import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <header className="app-header">
      <Link to="/board" className="app-logo">
        Justin's Kanban Board
      </Link>
      
      <div className="header-actions">
        {!loginCheck ? (
          <Link to="/login" className="login-nav-button">
            Login
          </Link>
        ) : (
          <>
            <Link to="/create-ticket" className="create-button">
              New Ticket
            </Link>
            <button 
              className="logout-button"
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;