import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Admin/Login.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';

const PublicLayout = ({ children }) => (
    <div className="app-shell">
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
    </div>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Admin - No Global Layout */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin" element={<Dashboard />} />

                    {/* Public - Wrapped in Layout */}
                    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                    <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                    <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
                    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
