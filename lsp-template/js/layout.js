import { getSessionUser, clearSession } from './api.js';

export const ICONS = {
  camera: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  shield: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  clock: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  award: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  users: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  file: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  calendar: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  card: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  grid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowUpRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  pin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  chat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  starburst: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 6.8L21 5.6l-3.8 6.4L23 14.2l-6.8 2.2 2.2 6.6-6.4-3.8L9.8 23l-2.2-6.8L1 18.4l3.8-6.4L1 9.8l6.8-2.2L5.6 1l6.4 3.8z"/></svg>`,
  sparkle: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  database: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
};

export function renderKicker(text) {
  return `<div class="kicker-dots"><span class="dots-pair"><i></i><i></i></span><span>${text}</span></div>`;
}

export function renderMarquee() {
  const items = [
    'Fotografi Studio BNSP',
    'Uji Kompetensi Praktik',
    'Asesor Berlisensi MET',
    'TUK Terverifikasi',
    'SLA Cepat 1x24 Jam',
    'E-Sertifikat Resmi'
  ];
  const repeated = [...items, ...items, ...items, ...items];
  return `
    <div class="marquee-strip">
      <div class="marquee-track">
        ${repeated.map(t => `<span class="marquee-item">${t}<span class="marquee-star">${ICONS.starburst}</span></span>`).join('')}
      </div>
    </div>
  `;
}

export function showToast(msg) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

const PUBLIC_NAV = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Profil' },
  { path: '/skema', label: 'Skema' },
  { path: '/alur', label: 'Alur' },
  { path: '/tuk', label: 'TUK' },
  { path: '/asesor', label: 'Asesor' },
  { path: '/jadwal', label: 'Jadwal' },
  { path: '/cek-sertifikat', label: 'Verifikasi' },
  { path: '/berita', label: 'Berita' },
  { path: '/kontak', label: 'Kontak' }
];

export function renderPublicLayout(currentPath, contentHtml) {
  const user = getSessionUser();
  const dashPath = user ? (user.role === 'user' ? '/dashboard' : '/admin') : '/login';

  return `
    <div class="topbar-split">
      <div class="topbar-left">
        <span class="topbar-item">${ICONS.phone} (021) 5089-2409</span>
        <span class="topbar-item">${ICONS.mail} sekretariat@nusaxninelsp.id</span>
        <span class="topbar-item">${ICONS.pin} Gedung NusaXNine Hub Lt. 3, Jakarta Pusat</span>
      </div>
      <div class="topbar-right-lime">
        <a href="#/kontak" class="social-circle-dark" title="Instagram">IG</a>
        <a href="#/kontak" class="social-circle-dark" title="WhatsApp">WA</a>
        <a href="#/kontak" class="social-circle-dark" title="YouTube">YT</a>
        <a href="#/kontak" class="social-circle-dark" title="LinkedIn">IN</a>
      </div>
    </div>

    <header class="navbar">
      <div class="container navbar-inner">
        <a href="#/" class="brand">
          <span class="brand-mark">NX</span>
          <span>NusaXNine LSP</span>
        </a>
        <nav class="nav-links">
          ${PUBLIC_NAV.slice(0, 8).map(item => `
            <a href="#${item.path}" class="nav-link ${currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)) ? 'active' : ''}">${item.label}</a>
          `).join('')}
        </nav>
        <div class="nav-actions">
          ${user
            ? `<a href="#${dashPath}" class="btn btn-dark btn-sm">Dashboard (${user.role})</a>`
            : `<a href="#/login" class="btn btn-outline-navy btn-sm">Masuk</a>
               <a href="#/register" class="btn btn-dark btn-sm">Daftar Uji</a>`
          }
          <button class="nav-toggle" id="mobile-nav-toggle" aria-label="Menu">${ICONS.menu}</button>
        </div>
      </div>
    </header>

    <div class="mobile-drawer" id="mobile-drawer">
      ${PUBLIC_NAV.map(item => `
        <a href="#${item.path}" class="${currentPath === item.path ? 'active' : ''}">${item.label}</a>
      `).join('')}
      <div style="display:flex;gap:10px;margin-top:12px;">
        <a href="#/login" class="btn btn-outline-navy btn-block">Masuk</a>
        <a href="#/register" class="btn btn-dark btn-block">Daftar Uji</a>
      </div>
    </div>

    <main>${contentHtml}</main>

    <footer class="footer-white">
      <div class="container">
        <div class="footer-top-bar">
          <h2>Terhubung Bersama Kami</h2>
          <a href="#/kontak" class="btn btn-dark">Hubungi Kami</a>
        </div>
        <div class="footer-grid">
          <div>
            <a href="#/" class="brand" style="margin-bottom:14px;">
              <span class="brand-mark">NX</span>
              <span>NusaXNine LSP</span>
            </a>
            <p style="font-size:13.5px;color:var(--text-muted);max-width:290px;margin:12px 0 20px;">
              Lembaga Sertifikasi Profesi Pihak Ketiga berlisensi BNSP khusus Fotografi Studio, Tata Cahaya Komersial, dan Olah Digital.
            </p>
            <div style="display:flex;gap:8px;">
              <a href="#/kontak" class="social-circle-lime">IG</a>
              <a href="#/kontak" class="social-circle-lime">WA</a>
              <a href="#/kontak" class="social-circle-lime">YT</a>
              <a href="#/kontak" class="social-circle-lime">IN</a>
            </div>
          </div>
          <div>
            <h4>Navigasi</h4>
            <ul class="footer-links">
              <li><a href="#/tentang">Profil & Legalitas</a></li>
              <li><a href="#/skema">Katalog Skema</a></li>
              <li><a href="#/alur">Alur & SLA</a></li>
              <li><a href="#/tuk">Daftar TUK</a></li>
              <li><a href="#/asesor">Asesor Kompetensi</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <ul class="footer-links">
              <li>(021) 5089-2409</li>
              <li>sekretariat@nusaxninelsp.id</li>
              <li>Gedung NusaXNine Hub Lt. 3, Tanah Abang, Jakarta Pusat</li>
              <li>SK: KEP.2409/BNSP/III/2025</li>
            </ul>
          </div>
          <div>
            <h4>Dapatkan Info Jadwal</h4>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Terima pembaruan kuota uji kompetensi terbaru.</p>
            <form class="footer-input-pill" id="footer-sub-form">
              <input type="email" required placeholder="Alamat email Anda">
              <button type="submit" class="circle-btn-dark" style="width:36px;height:36px;" aria-label="Kirim">${ICONS.arrow}</button>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container footer-copyright-inner">
          <span>Copyright © 2026 NusaXNine LSP Fotografi Studio. All Rights Reserved.</span>
          <div style="display:flex;gap:18px;">
            <a href="#/alur">Standar SLA</a>
            <span>|</span>
            <a href="#/kontak">Pengaduan & Banding</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function renderDashboardLayout(currentPath, user, contentHtml) {
  const userMenus = [
    { path: '/dashboard', label: 'Tracking Progres', icon: ICONS.grid },
    { path: '/dashboard/pengajuan', label: 'Pengajuan FR-APL-01', icon: ICONS.file },
    { path: '/dashboard/permohonan/102/apl', label: 'Asesmen Mandiri APL-02', icon: ICONS.shield },
    { path: '/dashboard/permohonan/102/pembayaran', label: 'Tagihan & Pembayaran', icon: ICONS.card },
    { path: '/dashboard/permohonan/105/asesmen', label: 'Jadwal & Ujian MUK', icon: ICONS.calendar },
    { path: '/dashboard/dokumen', label: 'Dokumen & E-Sertifikat', icon: ICONS.award }
  ];

  const adminMenus = [
    { path: '/admin', label: 'Overview Admin', icon: ICONS.grid },
    { path: '/admin/verifikasi', label: 'Verifikasi APL-01', icon: ICONS.file },
    { path: '/admin/tagihan', label: 'Tagihan & Lunas', icon: ICONS.card },
    { path: '/admin/jadwal', label: 'Penjadwalan & Asesor', icon: ICONS.calendar },
    { path: '/admin/asesmen', label: 'Penilaian MUK & SKK', icon: ICONS.award },
    { path: '/admin/dokumen', label: 'Arsip & Cetak PDF', icon: ICONS.shield }
  ];

  const superMenus = [
    { path: '/super-admin/admins', label: 'Manajemen Akun Admin', icon: ICONS.users },
    { path: '/super-admin/master', label: 'Master Data LSP', icon: ICONS.database }
  ];

  const isSuper = user.role === 'super_admin';
  const isAdmin = user.role === 'admin' || isSuper;

  return `
    <div class="dash-shell">
      <aside class="dash-sidebar" id="dash-sidebar">
        <div>
          <a href="#/" class="brand" style="color:var(--white);padding:0 10px;">
            <span class="brand-mark">NX</span>
            <span>NusaXNine LSP</span>
          </a>

          ${user.role === 'user' ? `
            <div class="dash-nav-group">
              <div class="dash-nav-label">Portal Asesi / Pemohon</div>
              ${userMenus.map(m => `
                <a href="#${m.path}" class="dash-nav-link ${currentPath === m.path ? 'active' : ''}">${m.icon}<span>${m.label}</span></a>
              `).join('')}
            </div>
          ` : ''}

          ${isSuper ? `
            <div class="dash-nav-group">
              <div class="dash-nav-label">Super Admin</div>
              ${superMenus.map(m => `
                <a href="#${m.path}" class="dash-nav-link ${currentPath === m.path ? 'active' : ''}">${m.icon}<span>${m.label}</span></a>
              `).join('')}
            </div>
          ` : ''}

          ${isAdmin ? `
            <div class="dash-nav-group">
              <div class="dash-nav-label">Operasional Admin LSP</div>
              ${adminMenus.map(m => `
                <a href="#${m.path}" class="dash-nav-link ${currentPath === m.path ? 'active' : ''}">${m.icon}<span>${m.label}</span></a>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.14);padding-top:16px;">
          <div style="padding:0 12px 12px;">
            <div style="font-size:13.5px;font-weight:700;">${user.fullname}</div>
            <div style="font-size:11.5px;color:var(--lime);text-transform:uppercase;letter-spacing:0.06em;">Role: ${user.role}</div>
          </div>
          <a href="#/" class="dash-nav-link">${ICONS.camera}<span>Website Publik</span></a>
          <button id="btn-logout" class="dash-nav-link" style="width:100%;color:var(--lime);">${ICONS.logout}<span>Keluar Sesi</span></button>
        </div>
      </aside>

      <div class="dash-main">
        <header class="dash-topbar">
          <div style="display:flex;align-items:center;gap:12px;">
            <button class="mobile-dash-btn" id="dash-menu-toggle">${ICONS.menu} Menu</button>
            <div>
              <strong style="font-size:15px;">Sistem Sertifikasi LSP Fotografi Studio</strong>
              <div style="font-size:12px;color:var(--text-muted);">Standar SLA BNSP: 1x24 Jam per Tahap · Maks. 5 Hari Kerja</div>
            </div>
          </div>
          <span class="badge badge-sky">${user.email}</span>
        </header>
        <div class="dash-content">${contentHtml}</div>
      </div>
    </div>
  `;
}

export function bindGlobalLayoutEvents(navigate) {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (navToggle && drawer) {
    navToggle.onclick = () => drawer.classList.toggle('open');
    drawer.querySelectorAll('a').forEach(a => {
      a.onclick = () => drawer.classList.remove('open');
    });
  }

  const dashToggle = document.getElementById('dash-menu-toggle');
  const sidebar = document.getElementById('dash-sidebar');
  if (dashToggle && sidebar) {
    dashToggle.onclick = () => sidebar.classList.toggle('open');
  }

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      clearSession();
      showToast('Berhasil keluar dari sesi.');
      navigate('/login');
    };
  }

  const footerSub = document.getElementById('footer-sub-form');
  if (footerSub) {
    footerSub.onsubmit = e => {
      e.preventDefault();
      footerSub.reset();
      showToast('Email terdaftar untuk notifikasi jadwal uji terbaru.');
    };
  }
}