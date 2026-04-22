import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import API from '../api/axios';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await API.post('/messages', form);
            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: <Mail size={22} />, label: 'Email', value: 'info@effitech.com' },
        { icon: <Phone size={22} />, label: 'Phone', value: '+1 (555) 987-6543' },
        { icon: <MapPin size={22} />, label: 'Address', value: '123 Automation Drive, Tech City, CA 90210' },
    ];

    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <span className="section-tag">Get In Touch</span>
                    <h1 className="page-hero-title">Contact <span className="gradient-text">Us</span></h1>
                    <p className="page-hero-sub">Have a project in mind? We'd love to hear about it. Let's build something great together.</p>
                </div>
            </section>

            <section className="section">
                <div className="container contact-layout">
                    {/* Info Panel */}
                    <div className="contact-info-panel">
                        <h2>Let's Start a <span className="gradient-text">Conversation</span></h2>
                        <p>Our team of expert engineers is ready to help you automate and optimize your operations. Reach out through any of the channels below.</p>
                        <div className="contact-items">
                            {contactInfo.map(({ icon, label, value }) => (
                                <div key={label} className="contact-item">
                                    <div className="contact-icon">{icon}</div>
                                    <div>
                                        <span className="contact-label">{label}</span>
                                        <p>{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="office-hours">
                            <h4>Office Hours</h4>
                            <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                            <p>Saturday: 9:00 AM – 2:00 PM</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-panel">
                        <h2>Send Us a <span className="gradient-text">Message</span></h2>
                        {success ? (
                            <div className="success-msg">
                                <CheckCircle size={48} />
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button className="btn-primary" onClick={() => setSuccess(false)}>Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input id="name" type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input id="email" type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows={6} placeholder="Tell us about your project..." value={form.message} onChange={handleChange} required />
                                </div>
                                {error && <p className="error-msg">{error}</p>}
                                <button type="submit" className="btn-primary btn-full" disabled={loading}>
                                    {loading ? <span className="btn-loader"></span> : <><Send size={18} /> Send Message</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
