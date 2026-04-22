import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Users, Award, ChevronDown } from 'lucide-react';
import API from '../api/axios';

const Home = () => {
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sRes, pRes] = await Promise.all([API.get('/services'), API.get('/projects')]);
                setServices(sRes.data.slice(0, 3));
                setProjects(pRes.data.slice(0, 3));
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { value: '200+', label: 'Projects Completed' },
        { value: '50+', label: 'Expert Engineers' },
        { value: '15+', label: 'Years Experience' },
        { value: '98%', label: 'Client Satisfaction' },
    ];

    const highlights = [
        { icon: <Zap size={28} />, title: 'Cutting-Edge Tech', desc: 'Using the latest automation technologies for maximum efficiency.' },
        { icon: <Shield size={28} />, title: 'Reliable & Safe', desc: 'Industry-grade reliability with uncompromising safety standards.' },
        { icon: <Users size={28} />, title: 'Expert Team', desc: 'Certified engineers with decades of hands-on automation experience.' },
        { icon: <Award size={28} />, title: 'Award Winning', desc: 'Recognized globally for innovation and engineering excellence.' },
    ];

    return (
        <div className="page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-content">
                    <div className="hero-badge">🚀 Innovation Through Automation</div>
                    <h1 className="hero-title">
                        Engineering a <span className="gradient-text">Smarter Future</span><br />
                        Through Automation
                    </h1>
                    <p className="hero-subtitle">
                        EffiTech delivers world-class industrial automation solutions — from PLC programming and robotics to SCADA systems and Industrial IoT — helping businesses maximize efficiency, reduce costs, and achieve operational excellence.
                    </p>
                    <div className="hero-ctas">
                        <Link to="/services" className="btn-primary">
                            Explore Services <ArrowRight size={18} />
                        </Link>
                        <Link to="/contact" className="btn-secondary">
                            Get a Free Quote
                        </Link>
                    </div>
                    <div className="hero-checks">
                        {['ISO Certified', 'Free Consultation', '24/7 Support'].map(c => (
                            <span key={c} className="hero-check"><CheckCircle size={16} />{c}</span>
                        ))}
                    </div>
                </div>
                <a href="#stats" className="hero-scroll-hint">
                    <ChevronDown size={28} />
                </a>
            </section>

            {/* Stats Section */}
            <section id="stats" className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="stat-card">
                                <h3 className="stat-value gradient-text">{value}</h3>
                                <p className="stat-label">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Why EffiTech</span>
                        <h2 className="section-title">Built for the <span className="gradient-text">Industry</span></h2>
                        <p className="section-subtitle">We combine cutting-edge technology with deep engineering expertise to deliver automation solutions that truly work.</p>
                    </div>
                    <div className="highlights-grid">
                        {highlights.map(({ icon, title, desc }) => (
                            <div key={title} className="highlight-card">
                                <div className="highlight-icon">{icon}</div>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">What We Do</span>
                        <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
                    </div>
                    {loading ? (
                        <div className="loader-container"><div className="loader"></div></div>
                    ) : services.length > 0 ? (
                        <div className="cards-grid">
                            {services.map(service => (
                                <div key={service._id} className="service-card">
                                    <div className="service-icon-wrap"><Zap size={24} /></div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">No services added yet. Check back soon!</p>
                    )}
                    <div className="section-cta">
                        <Link to="/services" className="btn-primary">View All Services <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            {/* Projects Preview */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Our Work</span>
                        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
                    </div>
                    {loading ? (
                        <div className="loader-container"><div className="loader"></div></div>
                    ) : projects.length > 0 ? (
                        <div className="cards-grid">
                            {projects.map(project => (
                                <div key={project._id} className="project-card">
                                    <div className="project-img">
                                        <img src={project.image} alt={project.title} onError={e => e.target.src = 'https://placehold.co/400x220/1a1a2e/00d4ff?text=Project'} />
                                        {project.category && <span className="project-category">{project.category}</span>}
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">No projects added yet. Check back soon!</p>
                    )}
                    <div className="section-cta">
                        <Link to="/projects" className="btn-primary">View All Projects <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="container cta-banner-inner">
                    <h2>Ready to Automate Your Operations?</h2>
                    <p>Let's build something exceptional together. Talk to our engineers today.</p>
                    <Link to="/contact" className="btn-primary btn-large">
                        Start Your Project <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
