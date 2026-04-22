import { useState, useEffect } from 'react';
import { Cpu, Wifi, Bot, BarChart2, Settings, Zap } from 'lucide-react';
import API from '../api/axios';

const iconMap = { Cpu, Wifi, Bot, BarChart2, Settings, Zap };

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        API.get('/services')
            .then(res => setServices(res.data))
            .catch(() => setError('Failed to load services. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    const getIcon = (iconName) => {
        const IconComp = iconMap[iconName] || Zap;
        return <IconComp size={30} />;
    };

    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <span className="section-tag">What We Offer</span>
                    <h1 className="page-hero-title">Our <span className="gradient-text">Services</span></h1>
                    <p className="page-hero-sub">Comprehensive automation engineering services tailored to your operational needs.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {loading && <div className="loader-container"><div className="loader"></div></div>}
                    {error && <p className="error-msg">{error}</p>}
                    {!loading && !error && services.length === 0 && (
                        <p className="empty-state">No services available yet. Please check back soon.</p>
                    )}
                    {!loading && services.length > 0 && (
                        <div className="services-full-grid">
                            {services.map(service => (
                                <div key={service._id} className="service-card service-card-lg">
                                    <div className="service-icon-wrap">{getIcon(service.icon)}</div>
                                    <div className="service-body">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Process */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">How We Work</span>
                        <h2 className="section-title">Our <span className="gradient-text">Process</span></h2>
                    </div>
                    <div className="process-steps">
                        {[
                            { step: '01', title: 'Discovery & Analysis', desc: 'We analyze your current operations and identify automation opportunities.' },
                            { step: '02', title: 'Design & Planning', desc: 'Our engineers design a tailored automation solution and project roadmap.' },
                            { step: '03', title: 'Development & Testing', desc: 'We build and rigorously test every system before deployment.' },
                            { step: '04', title: 'Deployment & Support', desc: 'Seamless deployment with ongoing monitoring and 24/7 support.' },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="process-step">
                                <div className="step-number">{step}</div>
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
