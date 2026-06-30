import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import * as authService from '../services/authService';

vi.mock('../services/authService', () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  logoutUser: vi.fn(),
}));

const TestComponent = () => {
  const { user, login, register, logout, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'Guest'}</div>
      <button onClick={() => login('user', 'pass')}>Login</button>
      <button onClick={() => register('Name', 'user', 'pass')}>Register</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize as guest if no token exists', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('Guest');
  });

  it('should initialize with user details if token and mock user exist', async () => {
    localStorage.setItem('auth_token', 'token123');
    localStorage.setItem('mock_user', JSON.stringify({ name: 'John Doe', username: 'johndoe' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('John Doe');
  });

  it('should update user state when login is successful', async () => {
    const mockUser = { name: 'Logged In User', username: 'logged' };
    vi.mocked(authService.loginUser).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText('Login');
    await act(async () => {
      loginBtn.click();
    });

    expect(authService.loginUser).toHaveBeenCalledWith('user', 'pass');
    expect(screen.getByTestId('user')).toHaveTextContent('Logged In User');
  });

  it('should update user state when register is successful', async () => {
    const mockUser = { name: 'Registered User', username: 'registered' };
    vi.mocked(authService.registerUser).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const registerBtn = screen.getByText('Register');
    await act(async () => {
      registerBtn.click();
    });

    expect(authService.registerUser).toHaveBeenCalledWith('Name', 'user', 'pass');
    expect(screen.getByTestId('user')).toHaveTextContent('Registered User');
  });

  it('should clear user state when logout is called', async () => {
    localStorage.setItem('auth_token', 'token123');
    localStorage.setItem('mock_user', JSON.stringify({ name: 'John Doe', username: 'johndoe' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('John Doe');

    const logoutBtn = screen.getByText('Logout');
    await act(async () => {
      logoutBtn.click();
    });

    expect(authService.logoutUser).toHaveBeenCalled();
    expect(screen.getByTestId('user')).toHaveTextContent('Guest');
  });
});
