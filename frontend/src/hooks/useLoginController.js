import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const loginImages = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?auto=format&fit=crop&w=1200&q=80"
];

export const useLoginController = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % loginImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    // Validasi input di sisi klien
    if (!isLogin) {
      if (formData.name.trim().length === 0) {
        setError('Nama lengkap wajib diisi.');
        return;
      }
      if (formData.name.trim().length > 50) {
        setError('Nama lengkap tidak boleh lebih dari 50 karakter.');
        return;
      }
      if (formData.username.trim().length < 3 || formData.username.trim().length > 20) {
        setError('Username harus berukuran antara 3 sampai 20 karakter.');
        return;
      }
      if (formData.password.length < 6 || formData.password.length > 32) {
        setError('Kata sandi harus berukuran antara 6 sampai 32 karakter.');
        return;
      }
    } else {
      if (!formData.username.trim() || !formData.password) {
        setError('Username dan kata sandi wajib diisi.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData.name, formData.username, formData.password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMode = () => {
    setIsLogin(!isLogin);
  };

  return {
    isLogin,
    currentImg,
    formData,
    error,
    loading,
    loginImages,
    handleInputChange,
    handleSubmit,
    toggleLoginMode
  };
};
