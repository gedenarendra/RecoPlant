import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { useLoginController } from '../hooks/useLoginController';

// Mock hook
vi.mock('../hooks/useLoginController', () => ({
  useLoginController: vi.fn(),
  loginImages: ['image1.jpg']
}));

// Mock framer-motion to avoid animation delays/errors in test
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>),
      h2: React.forwardRef(({ children, ...props }, ref) => <h2 ref={ref} {...props}>{children}</h2>),
      p: React.forwardRef(({ children, ...props }, ref) => <p ref={ref} {...props}>{children}</p>),
      img: React.forwardRef((props, ref) => <img ref={ref} {...props} />),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe('LoginPage', () => {
  const mockControllerDefault = {
    isLogin: true,
    currentImg: 0,
    formData: { username: '', password: '', name: '' },
    error: '',
    loading: false,
    loginImages: ['image1.jpg'],
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
    toggleLoginMode: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLoginController).mockReturnValue(mockControllerDefault);
  });

  it('renders login form by default', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Selamat Datang')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan kata sandi')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Masukkan nama Anda')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument();
  });

  it('renders registration form when isLogin is false', () => {
    vi.mocked(useLoginController).mockReturnValue({
      ...mockControllerDefault,
      isLogin: false
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Mulai Perjalanan Anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan nama Anda')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daftar Akun' })).toBeInTheDocument();
  });

  it('displays error message when error exists', () => {
    vi.mocked(useLoginController).mockReturnValue({
      ...mockControllerDefault,
      error: 'Username atau kata sandi yang Anda masukkan salah.'
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Username atau kata sandi yang Anda masukkan salah.')).toBeInTheDocument();
  });

  it('calls handleInputChange when input values change', () => {
    const handleInputChange = vi.fn();
    vi.mocked(useLoginController).mockReturnValue({
      ...mockControllerDefault,
      handleInputChange
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Masukkan username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(handleInputChange).toHaveBeenCalledWith('username', 'testuser');
  });

  it('calls toggleLoginMode when clicking toggle button', () => {
    const toggleLoginMode = vi.fn();
    vi.mocked(useLoginController).mockReturnValue({
      ...mockControllerDefault,
      toggleLoginMode
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByText('Daftar di sini');
    fireEvent.click(toggleBtn);
    expect(toggleLoginMode).toHaveBeenCalled();
  });

  it('redirects to home (/) when Kembali is clicked and source is guest path (e.g. /dashboard)', () => {
    let currentPath = '';
    const HelperComponent = () => {
      const location = useLocation();
      currentPath = location.pathname;
      return null;
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/login', state: { from: '/dashboard' } }]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HelperComponent />} />
        </Routes>
      </MemoryRouter>
    );

    const backBtn = screen.getByText('Kembali');
    fireEvent.click(backBtn);

    expect(currentPath).toBe('/');
  });

  it('goes back in history when Kembali is clicked and source is not a guest path', () => {
    let navigatedBack = false;
    
    // We mock navigate(-1) by checking if we hit the previous route.
    // In MemoryRouter, we can set up the stack: /about -> /login.
    // When clicking back, it should go to /about.
    render(
      <MemoryRouter initialEntries={['/about', '/login']}>
        <Routes>
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backBtn = screen.getByText('Kembali');
    fireEvent.click(backBtn);

    expect(screen.getByText('About Page')).toBeInTheDocument();
  });
});
