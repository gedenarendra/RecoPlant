import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NavLink = ({ to, children, activeSection }) => {
  const location = useLocation();
  const isHash = to.includes('#');

  // Reactive logic using scroll position if on Home Page
  let isActive = false;

  if (location.pathname === '/') {
    if (to === '/') isActive = activeSection === 'hero';
    else if (to === '/#about') isActive = activeSection === 'about';
    else if (to === '/#contact') isActive = activeSection === 'contact';
  } else {
    isActive = location.pathname === to;
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.div
          layoutId="nav-active-indicator"
          className="absolute left-0 right-0 -bottom-1 h-[2px] bg-brand-primary shadow-[0_0_10px_rgba(46,204,113,0.8)] rounded-full"
          initial={false}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </>
  );

  const className = `relative py-2 px-4 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`;

  // Custom Smooth Scroll function bypassing browser CSS bugs
  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startY + difference * easeInOutQuad(progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleHashClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const targetId = to.substring(2);
      const element = document.getElementById(targetId);

      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        smoothScrollTo(y);
        window.history.pushState(null, '', to);
      }
    }
  };

  const handleHomeClick = (e) => {
    if (to === '/') {
      e.preventDefault();
      smoothScrollTo(0);
      window.history.pushState(null, '', '/');
    }
  };

  if (isHash) {
    const hrefTarget = location.pathname === '/' ? to.substring(1) : to;
    return (
      <a href={hrefTarget} className={className} onClick={handleHashClick}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={handleHomeClick}>
      {content}
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const scrolled = useScrollPosition(30);

  // Array harus stabil (memoized) agar useEffect di scrollSpy tidak render ulang berlebih
  const sectionIds = useMemo(() => ['hero', 'about', 'contact'], []);
  const activeSection = useScrollSpy(sectionIds, 200);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group w-1/4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-primary/20 group-hover:border-brand-primary/50 transition-all duration-300">
            <Leaf className="text-success group-hover:text-brand-primary transition-colors duration-300" size={20} />
          </div>
          <h2 className="tracking-[0.2em] font-extrabold text-lg uppercase text-white transition-colors duration-300">
            Recoplant
          </h2>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-2 w-2/4">
          {user ? (
            <>
              <NavLink to="/dashboard" activeSection={activeSection}>Statistik</NavLink>
              <NavLink to="/predict" activeSection={activeSection}>Prediksi</NavLink>
              <NavLink to="/history" activeSection={activeSection}>Riwayat</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" activeSection={activeSection}>Home</NavLink>
              <NavLink to="/#about" activeSection={activeSection}>About</NavLink>
              <NavLink to="/#contact" activeSection={activeSection}>Contact</NavLink>
            </>
          )}
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center justify-end w-1/4">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full text-sm font-semibold text-white/80 border border-white/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all duration-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-7 py-2.5 rounded-full text-sm font-bold bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
            >
              Log In
            </Link>
          )}
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;
