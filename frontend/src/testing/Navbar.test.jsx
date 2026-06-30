import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useScrollSpy } from '../hooks/useScrollSpy';

// Mock hook dependencies
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}));

vi.mock('../hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(() => false)
}));

vi.mock('../hooks/useScrollSpy', () => ({
  useScrollSpy: vi.fn(() => 'hero')
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      nav: React.forwardRef(({ children, ...props }, ref) => <nav ref={ref} {...props}>{children}</nav>),
      div: React.forwardRef(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>),
    },
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders guest navigation links when user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      logout: vi.fn()
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Log In' })).toBeInTheDocument();
    
    expect(screen.queryByText('Statistik')).not.toBeInTheDocument();
    expect(screen.queryByText('Prediksi')).not.toBeInTheDocument();
    expect(screen.queryByText('Riwayat')).not.toBeInTheDocument();
  });

  it('renders user navigation links and logout button when user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'John Doe', username: 'johndoe' },
      logout: vi.fn()
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Statistik')).toBeInTheDocument();
    expect(screen.getByText('Prediksi')).toBeInTheDocument();
    expect(screen.getByText('Riwayat')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log Out' })).toBeInTheDocument();
    
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('About')).not.toBeInTheDocument();
    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
  });

  it('calls logout and redirects to home (/) when clicking Log Out', async () => {
    const logoutMock = vi.fn().mockResolvedValue();
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'John Doe', username: 'johndoe' },
      logout: logoutMock
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<Navbar />} />
          <Route path="/" element={<div>Home Landing Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: 'Log Out' });
    
    await act(async () => {
      fireEvent.click(logoutBtn);
    });

    expect(logoutMock).toHaveBeenCalled();
    expect(screen.getByText('Home Landing Page')).toBeInTheDocument();
  });
});
