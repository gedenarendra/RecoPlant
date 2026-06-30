export const showcasePlants = [
  {
    id: 1,
    name: 'Padi',
    desc: '"Berdasarkan testimoni petani kami, varietas ini menghasilkan panen yang optimal ketika ditanam pada lahan dengan irigasi stabil, meningkatkan hasil hingga 20%."',
    img: '/padi.jpg'
  },
  {
    id: 2,
    name: 'Jagung',
    desc: '"Menurut Pak Andi, petani jagung mitra kami, jagung ini sangat tahan cuaca panas dan tongkolnya besar-besar. Sangat direkomendasikan untuk musim kemarau."',
    img: '/jagung.jpg'
  },
  {
    id: 3,
    name: 'Kapas',
    desc: '"Kapas kami tumbuh sangat baik di daerah kering hangat dengan paparan sinar matahari penuh selama masa pematangan serat kapas."',
    img: '/kapas.jpeg'
  },
  {
    id: 4,
    name: 'Gandum',
    desc: '"Menurut uji coba petani mitra, gandum ini tumbuh subur pada iklim dingin dengan kebutuhan air yang rendah selama masa panen."',
    img: '/gandum.jpeg'
  },
  {
    id: 5,
    name: 'Tebu',
    desc: '"Hasil panen tebu kami sangat optimal dengan rendemen gula tinggi pada wilayah tropis bersuhu hangat sepanjang tahun."',
    img: '/tebu.jpeg'
  }
];

export const reasonsData = [
  { num: '1', title: 'Akurasi Tinggi', desc: 'Menggunakan algoritma LightGBM untuk memastikan hasil presisi.' },
  { num: '2', title: 'Real-time', desc: 'Sistem merespons input parameter Anda secara instan tanpa perlu menunggu.' },
  { num: '3', title: 'Komprehensif', desc: 'Menganalisis 18 parameter dalam satu klik.' },
  { num: '4', title: 'Aksesibilitas', desc: 'Mudah digunakan oleh praktisi lapangan maupun akademisi pertanian.' }
];

export const mockUsers = [
  {
    id: 1,
    name: "Petani Cerdas",
    username: "petani",
    password: "password123",
    role: "guest"
  },
  {
    id: 2,
    name: "Admin Recoplant",
    username: "admin",
    password: "admin",
    role: "guest"
  }
];

export const dummyStats = {
  total_predictions: 1245,
  today_predictions: 18,
  top_plants: [
    { result_plant: 'Padi', total: 450 },
    { result_plant: 'Jagung', total: 320 },
    { result_plant: 'Kacang Tanah', total: 210 },
    { result_plant: 'Cabai', total: 150 },
    { result_plant: 'Kopi', total: 115 }
  ],
  spectral_correlation: [
    { plant: 'Padi', NDVI: 0.65, NDWI: 0.15, EVI: 0.45 },
    { plant: 'Jagung', NDVI: 0.55, NDWI: -0.05, EVI: 0.35 },
    { plant: 'Kacang Tanah', NDVI: 0.45, NDWI: -0.15, EVI: 0.30 },
    { plant: 'Cabai', NDVI: 0.50, NDWI: 0.05, EVI: 0.40 },
    { plant: 'Kopi', NDVI: 0.75, NDWI: 0.20, EVI: 0.55 },
  ]
};

