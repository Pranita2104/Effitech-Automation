import { Target, Eye, Cpu, Users, TrendingUp, Globe } from 'lucide-react';

const About = () => {
    const team = [
        { name: 'Alex Carter', role: 'CEO & Founder', img: 'https://i.pravatar.cc/150?img=11' },
        { name: 'Priya Sharma', role: 'Chief Engineer', img: 'https://i.pravatar.cc/150?img=47' },
        { name: 'James Liu', role: 'Lead Automation Architect', img: 'https://i.pravatar.cc/150?img=33' },
        { name: 'Sofia Mendes', role: 'Head of IoT Solutions', img: 'https://i.pravatar.cc/150?img=45' },
    ];

    const values = [
        { icon: <Cpu size={26} />, title: 'Innovation', desc: 'We constantly push the boundaries of what automation can achieve.' },
        { icon: <Users size={26} />, title: 'Collaboration', desc: 'We work closely with clients as true engineering partners.' },
        { icon: <TrendingUp size={26} />, title: 'Excellence', desc: 'Every project is delivered to the highest quality standard.' },
        { icon: <Globe size={26} />, title: 'Sustainability', desc: 'Our solutions reduce waste and promote greener operations.' },
    ];

    return (
        <div className="page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="section-tag">About EffiTech</span>
                    <h1 className="page-hero-title">Engineering <span className="gradient-text">Excellence</span> Since 2008</h1>
                    <p className="page-hero-sub">We are a team of passionate engineers dedicated to building intelligent automation systems that transform industries worldwide.</p>
                </div>
            </section>

            {/* Story */}
            <section className="section">
                <div className="container about-story">
                    <div className="about-text">
                        <h2>Our <span className="gradient-text">Story</span></h2>
                        <p>Founded in 2008, EffiTech Automation began as a small consultancy with a bold vision: to make industrial automation accessible, reliable, and transformative. Over the years, we've grown into a globally recognized engineering company, serving clients across manufacturing, energy, food processing, and pharmaceuticals.</p>
                        <p>With a team of 50+ certified engineers, we've completed over 200 projects spanning PLC programming, advanced SCADA systems, robotic integration, and Industrial IoT deployments. Our solutions have helped clients reduce operating costs by up to 40% and increase throughput by 60%.</p>
                    </div>
                    <div className="about-image">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Engineering Team" />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section section-dark">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <div className="mv-icon"><Target size={32} /></div>
                            <h3>Our Mission</h3>
                            <p>To deliver precision-engineered automation solutions that empower businesses to operate smarter, faster, and more sustainably — driving measurable results in every project we undertake.</p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon"><Eye size={32} /></div>
                            <h3>Our Vision</h3>
                            <p>To be the world's most trusted automation engineering partner — a company synonymous with innovation, reliability, and the relentless pursuit of operational excellence across every industry we serve.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Core Values</span>
                        <h2 className="section-title">What Drives <span className="gradient-text">Us</span></h2>
                    </div>
                    <div className="highlights-grid">
                        {values.map(({ icon, title, desc }) => (
                            <div key={title} className="highlight-card">
                                <div className="highlight-icon">{icon}</div>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Leadership</span>
                        <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
                    </div>
                    <div className="team-grid">
                        {team.map(({ name, role, img }) => (
                            <div key={name} className="team-card">
                                <img src={img} alt={name} className="team-avatar" />
                                <h4>{name}</h4>
                                <p>{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
