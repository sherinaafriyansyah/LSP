const STORAGE_KEY = 'nusaxnine_lsp_db_v1';

export const STATUS_FLOW = [
  'Cek',
  'Pemohon',
  'Apl_01',
  'Peserta',
  'Tagih',
  'Lunas',
  'Assesor',
  'Pra_Assesment',
  'Assesment',
  'Assesor_Yes'
];

const SEED_DATA = {
  schemes: [
    {
      id: 1,
      code: 'SS-FOTO-STD-001-2026',
      name: 'Fotografer Studio Junior (Portrait & Basic Lighting)',
      level: 'Okupasi / Jenjang 3',
      fee: 750000,
      duration: '1 Hari Uji (6 Jam)',
      summary: 'Sertifikasi kompetensi pengoperasian kamera digital, tata cahaya 1-3 titik, serta arahan pose dasar untuk studio komersial.',
      units: [
        { code: 'M.74FTG00.001.2', title: 'Memilih Perangkat Kamera dan Lensa Studio' },
        { code: 'M.74FTG00.004.2', title: 'Mengatur Pencahayaan Studio Strobe dan Continuous' },
        { code: 'M.74FTG00.009.2', title: 'Mengarahkan Subjek Pemotretan Portrait' },
        { code: 'M.74FTG00.014.2', title: 'Melakukan Pengolahan Awal File RAW (Color Grading)' }
      ],
      requirements: [
        'KTP / Identitas resmi yang masih berlaku',
        'Ijazah minimal SMA/SMK sederajat atau sertifikat pelatihan fotografi',
        'Portofolio minimal 10 karya foto studio (format PDF/JPG)',
        'Pas foto berwarna latar merah ukuran 3x4'
      ]
    },
    {
      id: 2,
      code: 'SS-FOTO-PRD-002-2026',
      name: 'Fotografer Produk Komersial & E-Commerce',
      level: 'Klaster / Jenjang 4',
      fee: 1150000,
      duration: '1 Hari Uji (8 Jam)',
      summary: 'Standar kompetensi teknis pemotretan still-life, material reflektif, katalog brand, serta konsistensi warna ICC Profile.',
      units: [
        { code: 'M.74FTG00.011.2', title: 'Merancang Konsep Visual dan Set Properti Produk' },
        { code: 'M.74FTG00.015.2', title: 'Mengendalikan Refleksi pada Material Kaca dan Logam' },
        { code: 'M.74FTG00.019.2', title: 'Melakukan Tethered Shooting dan Kalibrasi Warna' },
        { code: 'M.74FTG00.022.2', title: 'Menyiapkan Output Cetak dan Digital Resolusi Tinggi' }
      ],
      requirements: [
        'KTP dan CV pengalaman kerja/freelance minimal 6 bulan',
        'Portofolio 15 foto produk komersial dengan skema pencahayaan',
        'Surat keterangan kerja atau surat pernyataan praktisi studio'
      ]
    },
    {
      id: 3,
      code: 'SS-FOTO-DIR-003-2026',
      name: 'Studio Lighting Director & Editorial Fashion',
      level: 'Okupasi / Jenjang 5',
      fee: 1650000,
      duration: '2 Hari Uji',
      summary: 'Sertifikasi tingkat lanjut untuk kepala studio yang menangani produksi fashion editorial, multi-strobe kompleks, dan manajemen kru.',
      units: [
        { code: 'M.74FTG00.025.2', title: 'Menyusun Lighting Diagram Produksi Skala Besar' },
        { code: 'M.74FTG00.028.2', title: 'Mengelola Tim Produksi, MUA, dan Wardrobe di Studio' },
        { code: 'M.74FTG00.031.2', title: 'Menerapkan K3 Listrik Tegangan Tinggi Perangkat Studio' },
        { code: 'M.74FTG00.034.2', title: 'Melakukan High-End Retouching & Frequency Separation' }
      ],
      requirements: [
        'Pengalaman kerja minimal 2 tahun di studio komersial/agency',
        'Portofolio 3 proyek kampanye editorial/fashion terpublikasi',
        'Sertifikat kompetensi level sebelumnya (nilai tambah)'
      ]
    },
    {
      id: 4,
      code: 'SS-FOTO-RET-004-2026',
      name: 'Digital Imaging & Post-Production Specialist',
      level: 'Klaster / Jenjang 4',
      fee: 950000,
      duration: '1 Hari Uji',
      summary: 'Kompetensi olah digital pasca-pemotretan, compositing komersial, color management monitor, hingga arsip aset DAM.',
      units: [
        { code: 'M.74FTG00.018.2', title: 'Melakukan Kalibrasi Monitor dan Color Space CMYK/sRGB' },
        { code: 'M.74FTG00.021.2', title: 'Mengerjakan Retouching Beauty & Produk Presisi Tinggi' },
        { code: 'M.74FTG00.027.2', title: 'Menyusun Sistem Arsip & Metadata Hak Cipta Foto' }
      ],
      requirements: [
        'KTP dan portofolio Before-After retouching minimal 10 set',
        'Menguasai software pengolahan citra digital berlisensi/resmi'
      ]
    }
  ],
  tuks: [
    { id: 1, code: 'TUK-JKT-01', name: 'TUK Sewaktu NusaXNine Studio Flagship', city: 'Jakarta Pusat', type: 'TUK Sewaktu', capacity: 20, status: 'Terverifikasi BNSP', facilities: 'Cyclorama 8x10m, 6 Profoto Strobe, Tether Station' },
    { id: 2, code: 'TUK-JKT-02', name: 'TUK Mandiri Ruang Cahaya Kreatif', city: 'Jakarta Timur', type: 'TUK Mandiri', capacity: 16, status: 'Terverifikasi BNSP', facilities: 'Product Table, Godox Pro Series, Ruang Uji Teori' },
    { id: 3, code: 'TUK-TNG-03', name: 'TUK Tempat Kerja Lensa Nusantara', city: 'Tangerang', type: 'TUK Tempat Kerja', capacity: 12, status: 'Terverifikasi BNSP', facilities: 'Editorial Stage, Color Calibrated Workstation' }
  ],
  assessors: [
    { id: 1, reg: 'MET.000.004129 2024', name: 'Raka Mahendra, S.Sn.', spec: 'Commercial & Product Lighting', status: 'Aktif', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 2, reg: 'MET.000.005812 2025', name: 'Nadia Kusuma, M.Ds.', spec: 'Portrait & Editorial Fashion', status: 'Aktif', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
    { id: 3, reg: 'MET.000.003940 2024', name: 'Dimas Pradipta, S.Kom.', spec: 'Digital Imaging & Color Science', status: 'Aktif', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: 4, reg: 'MET.000.006210 2026', name: 'Siti Rahmawati, S.I.Kom.', spec: 'Studio Management & Basic Photo', status: 'Aktif', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' }
  ],
  schedules: [
    { id: 1, date: '28 November 2026', time: '08:30 - 16:00 WIB', schemeId: 1, tuk: 'TUK Sewaktu NusaXNine Studio Flagship', quota: 20, filled: 14, status: 'Dibuka' },
    { id: 2, date: '05 Desember 2026', time: '08:30 - 17:00 WIB', schemeId: 2, tuk: 'TUK Mandiri Ruang Cahaya Kreatif', quota: 16, filled: 12, status: 'Dibuka' },
    { id: 3, date: '12 Desember 2026', time: '09:00 - 17:00 WIB', schemeId: 3, tuk: 'TUK Sewaktu NusaXNine Studio Flagship', quota: 10, filled: 10, status: 'Penuh' },
    { id: 4, date: '19 Desember 2026', time: '08:30 - 16:00 WIB', schemeId: 4, tuk: 'TUK Tempat Kerja Lensa Nusantara', quota: 12, filled: 5, status: 'Dibuka' }
  ],
  articles: [
    { id: 1, category: 'Uji Studio', date: '14 Nov 2026', title: 'Pelaksanaan Uji Kompetensi Batch 18 Fotografi Produk Komersial', excerpt: 'Sebanyak 18 fotografer studio mengikuti asesmen praktik tata cahaya reflektif di TUK NusaXNine Jakarta.', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80' },
    { id: 2, category: 'Pengumuman', date: '09 Nov 2026', title: 'Pembaruan SLA Layanan Sertifikasi BNSP: Maksimal 5 Hari Kerja', excerpt: 'NusaXNine LSP menerapkan pemrosesan otomatis 1x24 jam pada setiap tahap verifikasi hingga terbit E-Sertifikat.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
    { id: 3, category: 'TUK Terverifikasi', date: '01 Nov 2026', title: 'Surveilan Tahunan TUK Mandiri Ruang Cahaya Kreatif', excerpt: 'Tim teknis LSP memverifikasi kalibrasi strobe dan kesiapan ruang uji teori untuk kuartal IV 2026.', img: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80' },
    { id: 4, category: 'Galeri', date: '22 Okt 2026', title: 'Workshop Pra-Asesmen APL-02 bagi Fotografer Pemula', excerpt: 'Pembekalan penyusunan portofolio bukti relevan sesuai SKKNI Fotografi Nasional.', img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80' },
    { id: 5, category: 'Uji Studio', date: '15 Okt 2026', title: 'Kolaborasi Sertifikasi Bersama Asosiasi Studio Jakarta', excerpt: 'Peningkatan daya saing fotografer komersial melalui pengakuan kompetensi berlisensi BNSP.', img: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=800&q=80' },
    { id: 6, category: 'Galeri', date: '04 Okt 2026', title: 'Penyerahan Sertifikat Kompetensi Skema Portrait & Lighting', excerpt: 'Tingkat kelulusan mencapai 94% pada sesi asesmen praktik di cyclorama studio.', img: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=800&q=80' }
  ],
  applications: [
    {
      id: 101,
      permitId: 'IZN-2026-0101',
      certNumber: 'SKK-FOTO-2026-00891',
      userId: 'user@lspfoto.id',
      fullname: 'Adistia Pratama',
      nik: '3171041205080001',
      phone: '081288901122',
      jobTitle: 'Studio Photographer — NusaXNine Creative',
      schemeId: 2,
      status: 'Assesor_Yes',
      deadline: 'Selesai dalam 4 hari kerja',
      fee: 1150000,
      invoiceNo: 'INV-LSP-2026-101',
      paymentProof: 'bukti_transfer_101.jpg',
      assessor: 'Raka Mahendra, S.Sn.',
      scheduleDate: '12 November 2026, 09:00 WIB',
      tuk: 'TUK Sewaktu NusaXNine Studio Flagship',
      aplApproved: true,
      agreementSigned: true,
      recommendation: 'Diterima',
      adminNote: 'Portofolio produk lengkap dan memenuhi persyaratan dasar.',
      mukScore: { pg: 92, essay: 88, oral: 90, practical: 94 },
      updatedAt: '16 Nov 2026'
    },
    {
      id: 102,
      permitId: 'IZN-2026-0102',
      certNumber: '',
      userId: 'user@lspfoto.id',
      fullname: 'Adistia Pratama',
      nik: '3171041205080001',
      phone: '081288901122',
      jobTitle: 'Studio Photographer — NusaXNine Creative',
      schemeId: 1,
      status: 'Tagih',
      deadline: 'Sisa SLA: 18 jam 20 menit',
      fee: 750000,
      invoiceNo: 'INV-LSP-2026-102',
      paymentProof: '',
      assessor: '',
      scheduleDate: '',
      tuk: 'TUK Sewaktu NusaXNine Studio Flagship',
      aplApproved: true,
      agreementSigned: false,
      recommendation: 'Diterima',
      adminNote: 'Berkas APL-01 dan APL-02 valid, silakan selesaikan tagihan administrasi.',
      mukScore: { pg: 0, essay: 0, oral: 0, practical: 0 },
      updatedAt: '19 Nov 2026'
    },
    {
      id: 103,
      permitId: 'IZN-2026-0103',
      certNumber: '',
      userId: 'bima@studio.id',
      fullname: 'Bima Nusantara',
      nik: '3175011903990004',
      phone: '081344559900',
      jobTitle: 'Freelance Commercial Photographer',
      schemeId: 3,
      status: 'Apl_01',
      deadline: 'SLA Verifikasi Admin: 14 jam lagi',
      fee: 1650000,
      invoiceNo: '',
      paymentProof: '',
      assessor: '',
      scheduleDate: '',
      tuk: 'TUK Mandiri Ruang Cahaya Kreatif',
      aplApproved: true,
      agreementSigned: false,
      recommendation: '',
      adminNote: '',
      mukScore: { pg: 0, essay: 0, oral: 0, practical: 0 },
      updatedAt: '19 Nov 2026'
    },
    {
      id: 104,
      permitId: 'IZN-2026-0104',
      certNumber: '',
      userId: 'clara@visual.id',
      fullname: 'Clara Wijaya',
      nik: '3671024807000002',
      phone: '085611223344',
      jobTitle: 'Retoucher — Lensa Studio',
      schemeId: 4,
      status: 'Lunas',
      deadline: 'Penjadwalan H+2: 21 Nov 2026',
      fee: 950000,
      invoiceNo: 'INV-LSP-2026-104',
      paymentProof: 'bukti_transfer_clara.png',
      assessor: '',
      scheduleDate: '',
      tuk: 'TUK Tempat Kerja Lensa Nusantara',
      aplApproved: true,
      agreementSigned: false,
      recommendation: 'Diterima',
      adminNote: 'Pembayaran lunas terverifikasi.',
      mukScore: { pg: 0, essay: 0, oral: 0, practical: 0 },
      updatedAt: '19 Nov 2026'
    },
    {
      id: 105,
      permitId: 'IZN-2026-0105',
      certNumber: '',
      userId: 'reza@frame.id',
      fullname: 'Reza Alamsyah',
      nik: '3173011002970007',
      phone: '081922334455',
      jobTitle: 'Portrait Photographer',
      schemeId: 1,
      status: 'Assesment',
      deadline: 'Input Penilaian MUK: 10 jam lagi',
      fee: 750000,
      invoiceNo: 'INV-LSP-2026-105',
      paymentProof: 'bukti_reza.jpg',
      assessor: 'Nadia Kusuma, M.Ds.',
      scheduleDate: '19 November 2026, 09:00 WIB',
      tuk: 'TUK Sewaktu NusaXNine Studio Flagship',
      aplApproved: true,
      agreementSigned: true,
      recommendation: 'Diterima',
      adminNote: 'Peserta sedang menyelesaikan lembar MUK.',
      mukScore: { pg: 85, essay: 82, oral: 86, practical: 0 },
      updatedAt: '19 Nov 2026'
    }
  ],
  admins: [
    { id: 1, fullname: 'Dewi Kartika', email: 'admin@lspfoto.id', role: 'admin', division: 'Verifikasi & Keuangan', status: 'Aktif' },
    { id: 2, fullname: 'Fajar Santoso', email: 'jadwal@lspfoto.id', role: 'admin', division: 'Penjadwalan & TUK', status: 'Aktif' },
    { id: 3, fullname: 'Hendra Gunawan', email: 'superadmin@lspfoto.id', role: 'super_admin', division: 'Direktur LSP', status: 'Aktif' }
  ]
};

export function loadDB() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return structuredClone(SEED_DATA);
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return structuredClone(SEED_DATA);
  }
}

export function saveDB(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
}

export function getSchemeById(db, id) {
  return db.schemes.find(s => Number(s.id) === Number(id)) || db.schemes[0];
}

export function statusBadgeClass(status) {
  if (status === 'Assesor_Yes' || status === 'Lunas' || status === 'Dibuka' || status === 'Aktif') return 'badge-navy';
  if (status === 'Tagih' || status === 'Apl_01' || status === 'Pra_Assesment') return 'badge-orange';
  if (status === 'Assesment' || status === 'Peserta' || status === 'Assesor') return 'badge-blue';
  if (status === 'Assesor_No' || status === 'Penuh') return 'badge-gray';
  return 'badge-sky';
}