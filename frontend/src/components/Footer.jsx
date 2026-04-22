import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo">
                            <Zap size={26} className="logo-icon" />
                            <span>Effi<span className="logo-accent">Tech</span></span>
                        </Link>
                        <p className="footer-tagline">
                            Powering the future through precision automation engineering solutions.
                        </p>
                        <div className="footer-socials">
                            {/* Icons removed for debugging */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/projects', 'Projects'], ['/contact', 'Contact']].map(([to, label]) => (
                                <li key={to}><Link to={to} className="footer-link">{label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Our Services</h4>
                        <ul className="footer-links">
                            {['PLC Programming', 'SCADA Systems', 'Robotics Integration', 'Industrial IoT', 'Process Automation'].map(s => (
                                <li key={s}><span className="footer-link">{s}</span></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - Text Only for now */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-contact-list">
                            <li><span>info@effitech.com</span></li>
                            <li><span>+1 (555) 987-6543</span></li>
                            <li><span>123 Automation Drive, Tech City, CA 90210</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} EffiTech Automation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
