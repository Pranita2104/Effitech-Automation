import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, Check, MessageSquare, Layers, FolderOpen, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState('services');
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // { type, data }
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) { navigate('/admin/login'); return; }
        fetchAll();
    }, [user]);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [sRes, pRes, mRes] = await Promise.all([
                API.get('/services'),
                API.get('/projects'),
                API.get('/messages'),
            ]);
            setServices(sRes.data);
            setProjects(pRes.data);
            setMessages(mRes.data);
        } catch (err) {
            setError('Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type, data = {}) => {
        setForm(data);
        setModal({ type, data });
        setError('');
    };

    const closeModal = () => { setModal(null); setForm({}); };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            if (modal.type === 'service') {
                if (form._id) await API.put(`/services/${form._id}`, form);
                else await API.post('/services', form);
            } else if (modal.type === 'project') {
                if (form._id) await API.put(`/projects/${form._id}`, form);
                else await API.post('/projects', form);
            }
            await fetchAll();
            closeModal();
        } catch (err) {
            setError('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        try {
            await API.delete(`/${type}s/${id}`);
            fetchAll();
        } catch {
            alert('Delete failed!');
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await API.delete(`/messages/${id}`);
            fetchAll();
        } catch {
            alert('Delete failed!');
        }
    };

    const iconOptions = ['Zap', 'Cpu', 'Wifi', 'Bot', 'BarChart2', 'Settings'];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-logo">
                    <Zap size={24} className="logo-icon" />
                    <span>Effi<span className="logo-accent">Tech</span></span>
                </div>
                <nav className="sidebar-nav">
                    {[
                        { key: 'services', icon: <Layers size={18} />, label: 'Services' },
                        { key: 'projects', icon: <FolderOpen size={18} />, label: 'Projects' },
                        { key: 'messages', icon: <MessageSquare size={18} />, label: 'Messages' },
                    ].map(({ key, icon, label }) => (
                        <button key={key} className={`sidebar-item ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
                            {icon} {label}
                            {key === 'messages' && messages.length > 0 && (
                                <span className="sidebar-badge">{messages.length}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <span className="sidebar-user">👤 {user?.username}</span>
                    <button className="btn-logout" onClick={() => { logout(); navigate('/'); }}>
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <div className="admin-topbar">
                    <h1 className="admin-title">
                        {tab === 'services' && 'Manage Services'}
                        {tab === 'projects' && 'Manage Projects'}
                        {tab === 'messages' && 'Contact Messages'}
                    </h1>
                    {tab !== 'messages' && (
                        <button className="btn-primary" onClick={() => openModal(tab === 'services' ? 'service' : 'project')}>
                            <Plus size={16} /> Add {tab === 'services' ? 'Service' : 'Project'}
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loader-container"><div className="loader"></div></div>
                ) : (
                    <>
                        {/* SERVICES TAB */}
                        {tab === 'services' && (
                            <div className="admin-table-wrap">
                                {services.length === 0 ? <p className="empty-state">No services yet. Add your first one!</p> : (
                                    <table className="admin-table">
                                        <thead>
                                            <tr><th>Title</th><th>Description</th><th>Icon</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {services.map(s => (
                                                <tr key={s._id}>
                                                    <td><strong>{s.title}</strong></td>
                                                    <td className="td-desc">{s.description}</td>
                                                    <td><span className="tag">{s.icon}</span></td>
                                                    <td className="td-actions">
                                                        <button className="icon-btn edit" onClick={() => openModal('service', s)}><Pencil size={15} /></button>
                                                        <button className="icon-btn delete" onClick={() => handleDelete('service', s._id)}><Trash2 size={15} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* PROJECTS TAB */}
                        {tab === 'projects' && (
                            <div className="admin-table-wrap">
                                {projects.length === 0 ? <p className="empty-state">No projects yet. Add your first one!</p> : (
                                    <table className="admin-table">
                                        <thead>
                                            <tr><th>Title</th><th>Category</th><th>Description</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {projects.map(p => (
                                                <tr key={p._id}>
                                                    <td><strong>{p.title}</strong></td>
                                                    <td><span className="tag">{p.category || '—'}</span></td>
                                                    <td className="td-desc">{p.description}</td>
                                                    <td className="td-actions">
                                                        <button className="icon-btn edit" onClick={() => openModal('project', p)}><Pencil size={15} /></button>
                                                        <button className="icon-btn delete" onClick={() => handleDelete('project', p._id)}><Trash2 size={15} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* MESSAGES TAB */}
                        {tab === 'messages' && (
                            <div className="admin-table-wrap">
                                {messages.length === 0 ? <p className="empty-state">No messages yet.</p> : (
                                    <table className="admin-table">
                                        <thead>
                                            <tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Actions</th></tr>
                                        </thead>
                                        <tbody>
                                            {messages.map(m => (
                                                <tr key={m._id}>
                                                    <td><strong>{m.name}</strong></td>
                                                    <td>{m.email}</td>
                                                    <td className="td-desc">{m.message}</td>
                                                    <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                                                    <td className="td-actions">
                                                        <button className="icon-btn delete" onClick={() => handleDeleteMessage(m._id)}><Trash2 size={15} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Modal */}
            {modal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{form._id ? 'Edit' : 'Add'} {modal.type === 'service' ? 'Service' : 'Project'}</h3>
                            <button className="modal-close" onClick={closeModal}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {modal.type === 'service' && (
                                <>
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. PLC Programming" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description *</label>
                                        <textarea rows={4} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe this service..." required />
                                    </div>
                                    <div className="form-group">
                                        <label>Icon</label>
                                        <select value={form.icon || 'Zap'} onChange={e => setForm({ ...form, icon: e.target.value })}>
                                            {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}
                            {modal.type === 'project' && (
                                <>
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Smart Factory Automation" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description *</label>
                                        <textarea rows={4} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Project description..." required />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL *</label>
                                        <input value={form.image || ''} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/image.jpg" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Manufacturing" />
                                    </div>
                                    <div className="form-group">
                                        <label>Project Link</label>
                                        <input value={form.link || ''} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
                                    </div>
                                </>
                            )}
                            {error && <p className="error-msg">{error}</p>}
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={closeModal}><X size={16} /> Cancel</button>
                            <button className="btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? <span className="btn-loader"></span> : <><Check size={16} /> Save</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
