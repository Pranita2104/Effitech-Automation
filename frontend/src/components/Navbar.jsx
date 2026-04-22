import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/services', label: 'Services' },
        { to: '/projects', label: 'Projects' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <Zap size={28} className="logo-icon" />
                    <span>Effi<span className="logo-accent">Tech</span></span>
                </Link>

                {/* Desktop Links */}
                <ul className="navbar-links">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        <>
                            <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink></li>
                            <li>
                                <button onClick={handleLogout} className="btn-logout">
                                    <LogOut size={16} /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><NavLink to="/admin/login" className="btn-nav-cta">Admin Login</NavLink></li>
                    )}
                </ul>

                {/* Hamburger */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                        onClick={() => setMenuOpen(false)}
                    >
                        {label}
                    </NavLink>
                ))}
                {user ? (
                    <>
                        <NavLink to="/admin" className="mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                        <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="mobile-link mobile-logout">
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/admin/login" className="mobile-link mobile-cta" onClick={() => setMenuOpen(false)}>Admin Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
