import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(form.username, form.password);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <Zap size={32} className="logo-icon" />
                    </div>
                    <h2>Admin <span className="gradient-text">Login</span></h2>
                    <p>Sign in to access the EffiTech dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-icon-wrap">
                            <User size={18} className="input-icon" />
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="admin"
                                value={form.username}
                                onChange={e => setForm({ ...form, username: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-icon-wrap">
                            <Lock size={18} className="input-icon" />
                            <input
                                id="password"
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                required
                            />
                            <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <div className="login-hint">
                        <small>Default credentials: <code>admin</code> / <code>admin123</code></small>
                    </div>
                    <button type="submit" className="btn-primary btn-full" disabled={loading}>
                        {loading ? <span className="btn-loader"></span> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
