import { describe, it, expect } from 'vitest';
import { handleApiError } from '../services/errorHandler';

describe('handleApiError', () => {
  it('should return network connection error when error response is missing', () => {
    const error = { request: {} }; // no response
    const result = handleApiError(error);
    expect(result).toContain('Gagal terhubung ke server');
  });

  it('should return custom message on 400 status', () => {
    const error = {
      response: {
        status: 400,
        data: { message: 'Invalid request parameters' }
      }
    };
    const result = handleApiError(error);
    expect(result).toBe('Invalid request parameters');
  });

  it('should return session expired message on 401 status', () => {
    const error = { response: { status: 401 } };
    const result = handleApiError(error);
    expect(result).toContain('Sesi Anda telah berakhir');
  });

  it('should return permission error on 403 status', () => {
    const error = { response: { status: 403 } };
    const result = handleApiError(error);
    expect(result).toContain('Anda tidak memiliki izin');
  });

  it('should return not found message on 404 status', () => {
    const error = { response: { status: 404 } };
    const result = handleApiError(error);
    expect(result).toContain('tidak ditemukan');
  });

  it('should translate validation errors on 422 status', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: {
            username: ['username has already been taken'],
            NDVI: ['The NDVI must be between -1 and 1.']
          }
        }
      }
    };
    const result = handleApiError(error);
    expect(result).toContain('Username sudah digunakan');
    expect(result).toContain('Nilai NDVI harus berada di antara -1.0 dan 1.0.');
  });

  it('should return rate limit error on 429 status', () => {
    const error = { response: { status: 429 } };
    const result = handleApiError(error);
    expect(result).toContain('Terlalu banyak permintaan');
  });

  it('should handle ML service error specifically on 500 status', () => {
    const error = {
      response: {
        status: 500,
        data: { message: 'ML service error: 500' }
      }
    };
    const result = handleApiError(error);
    expect(result).toContain('Layanan analisis AI (ML Service) sedang mengalami gangguan');
  });

  it('should return general internal server error on standard 500 status', () => {
    const error = {
      response: {
        status: 500,
        data: { message: 'Some database crash' }
      }
    };
    const result = handleApiError(error);
    expect(result).toBe('Terjadi gangguan internal pada server. Tim kami sedang menanganinya.');
  });
});
