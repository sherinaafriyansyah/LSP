import { apiRequest, setSession } from './api.js';
import { showToast } from './layout.js';

export function renderLoginPage() {
  return `
    <div class="auth-shell">
      <div class="auth-side">
        <a href="#/" class="brand" style="color:var(--white);">
          <span class="brand-mark" style="background:var(--orange);color:var(--navy);">NX</span>
          <span>NUSAXNINE<span class="brand-dot">.</span>LSP</span>
        </a>
        <div>
          <span class="badge badge-orange" style="margin-bottom:14px;">SINGLE LOGIN 3-ROLE</span>
          <h1 style="font-size:36px;font-weight:800;line-height:1.15;margin-bottom:14px;">Satu Portal Untuk Asesi, Admin, & Super Admin.</h1>
          <p style="color:var(--sky);font-size:15px;">Sistem secara otomatis mengarahkan Anda ke dashboard operasional sesuai hak akses akun BNSP LSP Anda.</p>
        </div>
        <div style="font-size:13px;color:var(--sky);">© 2026 NusaXNine LSP Fotografi Studio</div>
      </div>

      <div class="auth-main">
        <div class="auth-card">
          <h2 style="font-size:26px;font-weight:800;margin-bottom:6px;">Masuk ke Portal LSP</h2>
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:24px;">Gunakan email dan kata sandi akun terdaftar.</p>
          <form id="login-form" style="display:grid;gap:16px;">
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="login-email" class="input" required placeholder="nama@domain.id">
            </div>
            <div class="form-group">
              <label>Kata Sandi</label>
              <input type="password" id="login-password" class="input" required placeholder="••••••••">
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
              <a href="#/forgot-password" style="color:var(--blue);font-weight:700;">Lupa kata sandi?</a>
              <a href="#/register" style="color:var(--navy);font-weight:700;">Daftar Pemohon</a>
            </div>
            <button type="submit" class="btn btn-orange btn-block">Masuk Sekarang</button>
          </form>

          <div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--ice);">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);">Akun Demo Cepat (Klik untuk mengisi):</div>
            <div class="demo-pills">
              <button type="button" class="btn btn-outline-navy btn-sm" data-demo="user">User / Pemohon</button>
              <button type="button" class="btn btn-outline-navy btn-sm" data-demo="admin">Admin LSP</button>
              <button type="button" class="btn btn-outline-navy btn-sm" data-demo="super_admin">Super Admin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderRegisterPage() {
  return `
    <div class="auth-shell">
      <div class="auth-side">
        <a href="#/" class="brand" style="color:var(--white);">
          <span class="brand-mark" style="background:var(--orange);color:var(--navy);">NX</span>
          <span>NUSAXNINE<span class="brand-dot">.</span>LSP</span>
        </a>
        <div>
          <span class="badge badge-orange" style="margin-bottom:14px;">REGISTRASI PEMOHON</span>
          <h1 style="font-size:34px;font-weight:800;line-height:1.15;margin-bottom:14px;">Mulai Sertifikasi Fotografi Studio Anda Hari Ini.</h1>
          <p style="color:var(--sky);font-size:15px;">Pendaftaran akun publik khusus untuk role Pemohon (Asesi). Akun Admin dibuat secara internal oleh Super Admin.</p>
        </div>
        <div style="font-size:13px;color:var(--sky);">Lisensi Resmi BNSP-LSP-2409-ID</div>
      </div>

      <div class="auth-main">
        <div class="auth-card">
          <h2 style="font-size:26px;font-weight:800;margin-bottom:6px;">Daftar Akun Pemohon</h2>
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Sudah memiliki akun? <a href="#/login" style="color:var(--blue);font-weight:700;">Masuk di sini</a></p>
          <form id="register-form" style="display:grid;gap:14px;">
            <div class="form-group"><label>Nama Lengkap (Sesuai KTP)</label><input id="reg-name" class="input" required placeholder="Muhammad Adistia Pratama"></div>
            <div class="form-group"><label>Email Aktif</label><input type="email" id="reg-email" class="input" required placeholder="email@domain.id"></div>
            <div class="form-group"><label>Nomor WhatsApp</label><input id="reg-phone" class="input" required placeholder="0812xxxxxxxx"></div>
            <div class="form-group"><label>Kata Sandi</label><input type="password" id="reg-pass" class="input" required minlength="6" placeholder="Minimal 6 karakter"></div>
            <button type="submit" class="btn btn-orange btn-block">Buat Akun Pemohon</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function renderForgotPasswordPage() {
  return `
    <div class="auth-shell">
      <div class="auth-side">
        <a href="#/" class="brand" style="color:var(--white);">
          <span class="brand-mark" style="background:var(--orange);color:var(--navy);">NX</span>
          <span>NUSAXNINE<span class="brand-dot">.</span>LSP</span>
        </a>
        <div>
          <span class="badge badge-orange" style="margin-bottom:14px;">PEMULIHAN AKUN</span>
          <h1 style="font-size:34px;font-weight:800;line-height:1.15;margin-bottom:14px;">Atur Ulang Kata Sandi dengan Aman.</h1>
          <p style="color:var(--sky);">Tautan reset akan dikirimkan melalui email resmi atau kode OTP WhatsApp terdaftar.</p>
        </div>
        <div style="font-size:13px;color:var(--sky);">Bantuan cepat: +62 812-2409-2026</div>
      </div>

      <div class="auth-main">
        <div class="auth-card">
          <h2 style="font-size:24px;font-weight:800;margin-bottom:8px;">Lupa Kata Sandi</h2>
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Pilih kanal pengiriman instruksi pemulihan akun.</p>
          <form id="forgot-form" style="display:grid;gap:16px;">
            <div class="form-group">
              <label>Metode Reset</label>
              <select class="input"><option>Email Terdaftar</option><option>WhatsApp OTP</option></select>
            </div>
            <div class="form-group"><label>Email atau Nomor WhatsApp</label><input class="input" required placeholder="user@lspfoto.id / 0812..."></div>
            <button type="submit" class="btn btn-orange btn-block">Kirim Instruksi Reset</button>
            <a href="#/login" class="btn btn-outline-navy btn-block">Kembali ke Login</a>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function bindAuthEvents(navigate) {
  const demoUsers = {
    user: { fullname: 'Adistia Pratama', email: 'user@lspfoto.id', role: 'user' },
    admin: { fullname: 'Dewi Kartika', email: 'admin@lspfoto.id', role: 'admin' },
    super_admin: { fullname: 'Hendra Gunawan', email: 'superadmin@lspfoto.id', role: 'super_admin' }
  };

  document.querySelectorAll('[data-demo]').forEach(btn => {
    btn.onclick = () => {
      const target = demoUsers[btn.dataset.demo];
      document.getElementById('login-email').value = target.email;
      document.getElementById('login-password').value = 'password123';
    };
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = async e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;
      try {
        const res = await apiRequest('/login', { method: 'POST', body: { email, password } });
        let user = res.user;
        if (res.mocked) {
          if (email.includes('super')) user = demoUsers.super_admin;
          else if (email.includes('admin')) user = demoUsers.admin;
          else user = { fullname: 'Adistia Pratama', email, role: 'user' };
        }
        setSession(user, res.token || 'mock-token');
        showToast(`Selamat datang, ${user.fullname} (${user.role})`);
        if (user.role === 'super_admin') navigate('/super-admin/admins');
        else if (user.role === 'admin') navigate('/admin');
        else navigate('/dashboard');
      } catch (err) {
        showToast(err.message);
      }
    };
  }

  const regForm = document.getElementById('register-form');
  if (regForm) {
    regForm.onsubmit = async e => {
      e.preventDefault();
      const fullname = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const password = document.getElementById('reg-pass').value;
      try {
        await apiRequest('/register', { method: 'POST', body: { fullname, email, phone, password, role: 'user' } });
        setSession({ fullname, email, role: 'user' }, 'mock-token');
        showToast('Registrasi pemohon berhasil! Silakan lengkapi FR-APL-01.');
        navigate('/dashboard');
      } catch (err) {
        showToast(err.message);
      }
    };
  }

  const forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.onsubmit = e => {
      e.preventDefault();
      showToast('Tautan pemulihan kata sandi telah dikirim.');
      navigate('/login');
    };
  }
}