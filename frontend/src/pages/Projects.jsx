import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import API from '../api/axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        API.get('/projects')
            .then(res => {
                setProjects(res.data);
                setFiltered(res.data);
            })
            .catch(() => setError('Failed to load projects. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

    const handleFilter = (cat) => {
        setActiveFilter(cat);
        setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat));
    };

    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <span className="section-tag">Portfolio</span>
                    <h1 className="page-hero-title">Our <span className="gradient-text">Projects</span></h1>
                    <p className="page-hero-sub">Explore our completed automation engineering projects across diverse industries.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filter Tabs */}
                    {!loading && projects.length > 0 && (
                        <div className="filter-tabs">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                                    onClick={() => handleFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && <div className="loader-container"><div className="loader"></div></div>}
                    {error && <p className="error-msg">{error}</p>}
                    {!loading && !error && projects.length === 0 && (
                        <p className="empty-state">No projects available yet. Check back soon!</p>
                    )}

                    {!loading && filtered.length > 0 && (
                        <div className="projects-grid">
                            {filtered.map(project => (
                                <div key={project._id} className="project-card project-card-lg">
                                    <div className="project-img">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            onError={e => e.target.src = 'https://placehold.co/600x340/1a1a2e/00d4ff?text=Project'}
                                        />
                                        {project.category && <span className="project-category">{project.category}</span>}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="project-overlay-link">
                                                <ExternalLink size={22} /> View Project
                                            </a>
                                        )}
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Projects;
