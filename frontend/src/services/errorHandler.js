/**
 * Menerjemahkan pesan error validasi teknis (Laravel) ke Bahasa Indonesia yang ramah pengguna.
 */
const translateValidationMessage = (msg) => {
  if (msg.includes('username has already been taken') || msg.includes('unique')) {
    return 'Username sudah digunakan. Silakan pilih username lain.';
  }
  if (msg.includes('password') && (msg.includes('must be at least 6 characters') || msg.includes('min:6'))) {
    return 'Kata sandi terlalu pendek. Harus terdiri dari minimal 6 karakter.';
  }
  if (msg.includes('required') || msg.includes('wajib diisi')) {
    return 'Semua kolom bertanda wajib harus diisi.';
  }
  if (msg.includes('between -1 and 1')) {
    if (msg.includes('NDVI')) return 'Nilai NDVI harus berada di antara -1.0 dan 1.0.';
    if (msg.includes('NDWI')) return 'Nilai NDWI harus berada di antara -1.0 dan 1.0.';
    if (msg.includes('EVI')) return 'Nilai EVI harus berada di antara -1.0 dan 1.0.';
    return 'Parameter indeks harus berada di antara -1.0 dan 1.0.';
  }
  if (msg.includes('between 0 and 1')) {
    if (msg.includes('Red')) return 'Nilai Merah (Red) harus berada di antara 0.0 dan 1.0.';
    if (msg.includes('Green')) return 'Nilai Hijau (Green) harus berada di antara 0.0 dan 1.0.';
    if (msg.includes('NIR')) return 'Nilai NIR harus berada di antara 0.0 dan 1.0.';
    if (msg.includes('SWIR')) return 'Nilai SWIR harus berada di antara 0.0 dan 1.0.';
    return 'Nilai spektrum warna harus berada di antara 0.0 dan 1.0.';
  }
  if (msg.includes('credentials') || msg.includes('Kredensial salah')) {
    return 'Username atau kata sandi yang Anda masukkan salah.';
  }

  return msg;
};

/**
 * Memproses error Axios dan mengembalikan pesan ramah pengguna.
 */
export const handleApiError = (error) => {
  // 1. Masalah Jaringan atau Server Offline
  if (!error.response) {
    return 'Gagal terhubung ke server. Pastikan koneksi internet Anda aktif dan server backend sedang berjalan.';
  }

  const { status, data } = error.response;

  // 2. Pemetaan Status Code HTTP
  switch (status) {
    case 400:
      return data?.message || 'Permintaan tidak dapat diproses. Pastikan data yang dimasukkan benar.';
    
    case 401:
      return 'Sesi Anda telah berakhir atau kredensial salah. Silakan masuk kembali.';
    
    case 403:
      return 'Anda tidak memiliki izin untuk mengakses fitur ini.';
    
    case 404:
      return 'Data yang Anda cari tidak ditemukan di server.';
    
    case 422:
      // Validasi input form dari Laravel
      if (data?.errors) {
        const errorList = Object.values(data.errors).flat();
        if (errorList.length > 0) {
          return errorList.map(msg => translateValidationMessage(msg)).join(' ');
        }
      }
      return data?.message ? translateValidationMessage(data.message) : 'Data yang dimasukkan tidak valid.';
    
    case 429:
      return 'Terlalu banyak permintaan dalam waktu singkat. Harap tunggu 1-2 menit sebelum mencoba kembali.';
    
    case 500:
      // Biasanya disebabkan ML service mati atau error DB
      if (data?.message && data.message.includes('ML service error')) {
        return 'Layanan analisis AI (ML Service) sedang mengalami gangguan. Harap hubungi administrator.';
      }
      return 'Terjadi gangguan internal pada server. Tim kami sedang menanganinya.';
    
    default:
      return data?.message || 'Terjadi kesalahan sistem yang tidak dikenal.';
  }
};
