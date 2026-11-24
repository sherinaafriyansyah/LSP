import { saveDB, getSchemeById, formatRupiah, statusBadgeClass } from './store.js';
import { apiRequest } from './api.js';
import { showToast, ICONS } from './layout.js';

export function renderAdminOverview(db) {
  const countApl = db.applications.filter(a => a.status === 'Apl_01').length;
  const countBill = db.applications.filter(a => a.status === 'Peserta' || a.status === 'Tagih').length;
  const countSched = db.applications.filter(a => a.status === 'Lunas').length;
  const countDone = db.applications.filter(a => a.status === 'Assesor_Yes').length;

  return `
    <h1 style="font-size:26px;font-weight:800;margin-bottom:6px;">Overview Operasional Admin LSP</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Ringkasan antrean verifikasi, penagihan, penjadwalan H+2, dan penerbitan sertifikat.</p>

    <div class="grid-4" style="margin-bottom:24px;">
      <div class="card"><span class="kicker">ANTREAN APL-01</span><strong style="font-size:30px;">${countApl}</strong><div style="font-size:12.5px;color:var(--text-muted);">Perlu verifikasi 1x24 jam</div></div>
      <div class="card"><span class="kicker">TAGIHAN & BAYAR</span><strong style="font-size:30px;">${countBill}</strong><div style="font-size:12.5px;color:var(--text-muted);">Menunggu invoice / lunas</div></div>
      <div class="card"><span class="kicker">SIAP JADWAL H+2</span><strong style="font-size:30px;">${countSched}</strong><div style="font-size:12.5px;color:var(--text-muted);">Sudah lunas, perlu asesor</div></div>
      <div class="card" style="background:var(--navy);color:var(--white);"><span class="kicker kicker-orange">KOMPETEN</span><strong style="font-size:30px;">${countDone}</strong><div style="font-size:12.5px;color:var(--sky);">E-Sertifikat diterbitkan</div></div>
    </div>

    <div class="card">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Daftar Seluruh Permohonan Masuk</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID Izin</th><th>Pemohon</th><th>Skema</th><th>Status</th><th>SLA / Update</th></tr></thead>
          <tbody>
            ${db.applications.map(a => `
              <tr>
                <td><strong>${a.permitId}</strong></td>
                <td><strong>${a.fullname}</strong><div style="font-size:12px;color:var(--text-muted);">${a.jobTitle}</div></td>
                <td>${getSchemeById(db, a.schemeId).name}</td>
                <td><span class="badge ${statusBadgeClass(a.status)}">${a.status}</span></td>
                <td>${a.deadline}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderAdminVerifikasi(db) {
  const list = db.applications.filter(a => a.status === 'Apl_01' || a.status === 'Pemohon');
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Verifikasi Berkas APL-01</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Periksa kelengkapan berkas pemohon berstatus Apl_01 dan tetapkan rekomendasi menjadi Peserta.</p>

    <div style="display:grid;gap:16px;">
      ${list.length ? list.map(a => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
            <div>
              <span class="badge badge-orange">${a.permitId}</span>
              <h3 style="font-size:19px;font-weight:800;margin-top:6px;">${a.fullname} — ${getSchemeById(db, a.schemeId).name}</h3>
            </div>
            <span class="badge ${statusBadgeClass(a.status)}">${a.status}</span>
          </div>
          <form class="form-grid admin-verify-form" data-app-id="${a.id}">
            <div class="form-group">
              <label>Rekomendasi Admin</label>
              <select class="input" name="rec">
                <option value="Diterima">Diterima (Lanjut ke Status Peserta)</option>
                <option value="Tidak diterima">Tidak Diterima (Revisi Berkas)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Catatan Verifikasi</label>
              <input class="input" name="note" required placeholder="Contoh: Portofolio & identitas sesuai persyaratan dasar.">
            </div>
            <div class="form-group full"><button type="submit" class="btn btn-navy">Simpan Keputusan Verifikasi</button></div>
          </form>
        </div>
      `).join('') : `<div class="card">Tidak ada antrean berkas APL-01 saat ini.</div>`}
    </div>
  `;
}

export function renderAdminTagihan(db) {
  const list = db.applications.filter(a => ['Peserta', 'Tagih', 'Lunas'].includes(a.status));
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Manajemen Tagihan & Pembayaran</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Terbitkan tagihan (Peserta → Tagih) dan validasi bukti transfer peserta menjadi Lunas.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID Izin</th><th>Peserta</th><th>Nominal</th><th>Bukti Bayar</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${list.map(a => `
            <tr>
              <td><strong>${a.permitId}</strong></td>
              <td>${a.fullname}</td>
              <td><strong>${formatRupiah(a.fee)}</strong></td>
              <td>${a.paymentProof ? `<span class="badge badge-sky">${a.paymentProof}</span>` : '<span style="color:var(--text-muted);">Belum unggah</span>'}</td>
              <td><span class="badge ${statusBadgeClass(a.status)}">${a.status}</span></td>
              <td style="display:flex;gap:6px;">
                ${a.status === 'Peserta' ? `<button class="btn btn-orange btn-sm" data-bill-action="tagih" data-app-id="${a.id}">Terbitkan Tagihan</button>` : ''}
                ${a.status === 'Tagih' ? `<button class="btn btn-navy btn-sm" data-bill-action="lunas" data-app-id="${a.id}">Validasi Lunas</button>` : ''}
                ${a.status === 'Lunas' ? `<span style="font-size:12.5px;font-weight:700;color:var(--navy);">Siap Dijadwalkan</span>` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function renderAdminJadwal(db) {
  const list = db.applications.filter(a => ['Lunas', 'Assesor', 'Pra_Assesment'].includes(a.status));
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Penjadwalan Uji (H+2) & Penugasan Asesor</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Tetapkan tanggal uji kompetensi serta Asesor MET aktif (Lunas → Assesor → Pra_Assesment).</p>

    <div style="display:grid;gap:16px;">
      ${list.length ? list.map(a => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
            <strong>${a.permitId} — ${a.fullname} (${getSchemeById(db, a.schemeId).name})</strong>
            <span class="badge ${statusBadgeClass(a.status)}">${a.status}</span>
          </div>
          <form class="form-grid admin-schedule-form" data-app-id="${a.id}">
            <div class="form-group">
              <label>Pilih Asesor Kompetensi</label>
              <select class="input" name="assessor">
                ${db.assessors.map(as => `<option value="${as.name}">${as.name} (${as.reg})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Tanggal & Jam Uji (H+2 Lunas)</label>
              <input class="input" name="date" required value="${a.scheduleDate || '22 November 2026, 09:00 WIB'}">
            </div>
            <div class="form-group full"><button type="submit" class="btn btn-orange">Tetapkan Jadwal & Kirim ke Pra_Assesment</button></div>
          </form>
        </div>
      `).join('') : `<div class="card">Belum ada peserta berstatus Lunas yang menunggu jadwal.</div>`}
    </div>
  `;
}

export function renderAdminAsesmen(db) {
  const list = db.applications.filter(a => ['Pra_Assesment', 'Assesment', 'Assesor_Yes', 'Assesor_No'].includes(a.status));
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Penilaian MUK & Keputusan LSP</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Input nilai observasi praktik (FR.IA.02/03), berita acara, status akhir (Assesor_Yes / Assesor_No), dan nomor sertifikat.</p>

    <div style="display:grid;gap:16px;">
      ${list.map(a => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div>
              <strong>${a.permitId} — ${a.fullname}</strong>
              <div style="font-size:12.5px;color:var(--text-muted);">Asesor: ${a.assessor || '-'} · Skema: ${getSchemeById(db, a.schemeId).name}</div>
            </div>
            <span class="badge ${statusBadgeClass(a.status)}">${a.status}</span>
          </div>
          <form class="form-grid admin-grade-form" data-app-id="${a.id}">
            <div class="form-group"><label>Skor Praktik & Observasi (FR.IA.02 / 03)</label><input type="number" min="0" max="100" class="input" name="practical" value="${a.mukScore.practical || 90}" required></div>
            <div class="form-group">
              <label>Keputusan Akhir Asesmen</label>
              <select class="input" name="decision">
                <option value="Assesor_Yes" ${a.status === 'Assesor_Yes' ? 'selected' : ''}>Assesor_Yes (Kompeten)</option>
                <option value="Assesor_No" ${a.status === 'Assesor_No' ? 'selected' : ''}>Assesor_No (Belum Kompeten)</option>
              </select>
            </div>
            <div class="form-group full"><label>Nomor Sertifikat SKK / Registrasi BNSP</label><input class="input" name="certNumber" value="${a.certNumber || `SKK-FOTO-2026-00${a.id}`}" placeholder="SKK-FOTO-2026-xxxxx"></div>
            <div class="form-group full"><button type="submit" class="btn btn-navy">Simpan Berita Acara & Terbitkan Keputusan</button></div>
          </form>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderAdminDokumen(db) {
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Arsip & Cetak Ulang Dokumen PDF</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Akses cepat cetak ulang formulir FR-APL-01 dan bundel MUK seluruh peserta.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID Izin</th><th>Peserta</th><th>Nomor Sertifikat</th><th>Status</th><th>Cetak Dokumen</th></tr></thead>
        <tbody>
          ${db.applications.map(a => `
            <tr>
              <td><strong>${a.permitId}</strong></td>
              <td>${a.fullname}</td>
              <td>${a.certNumber || '-'}</td>
              <td><span class="badge ${statusBadgeClass(a.status)}">${a.status}</span></td>
              <td style="display:flex;gap:8px;">
                <button class="btn btn-outline-navy btn-sm" data-print-doc="APL01_${a.permitId}">${ICONS.file} FR-APL-01</button>
                <button class="btn btn-navy btn-sm" data-print-doc="BUNDEL_MUK_${a.permitId}">${ICONS.award} Bundel MUK</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function renderSuperAdminsPage(db) {
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Manajemen Akun Admin LSP</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Kelola akun operasional Admin dan daftarkan akun baru melalui endpoint <code>POST /api/admin/register</code>.</p>

    <div class="grid-2" style="align-items:start;">
      <div class="card">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Daftar Admin Aktif</h3>
        <div class="table-wrap">
          <table style="min-width:100%;">
            <thead><tr><th>Nama</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              ${db.admins.map(ad => `
                <tr>
                  <td><strong>${ad.fullname}</strong><div style="font-size:12px;color:var(--text-muted);">${ad.division}</div></td>
                  <td>${ad.email}</td>
                  <td><span class="badge ${ad.role === 'super_admin' ? 'badge-orange' : 'badge-navy'}">${ad.role}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Register Admin Baru</h3>
        <form id="super-register-admin-form" style="display:grid;gap:14px;">
          <div class="form-group"><label>Nama Lengkap</label><input id="sa-name" class="input" required placeholder="Nama Admin LSP"></div>
          <div class="form-group"><label>Email Resmi</label><input type="email" id="sa-email" class="input" required placeholder="adminbaru@lspfoto.id"></div>
          <div class="form-group"><label>Divisi</label><input id="sa-div" class="input" required placeholder="Verifikasi / Penjadwalan"></div>
          <div class="form-group"><label>Kata Sandi Awal</label><input type="password" id="sa-pass" class="input" required minlength="6" placeholder="Minimal 6 karakter"></div>
          <button type="submit" class="btn btn-orange">Daftarkan Admin (POST /api/admin/register)</button>
        </form>
      </div>
    </div>
  `;
}

export function renderSuperMasterPage(db) {
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Master Data LSP Fotografi Studio</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Kelola katalog Skema Sertifikasi, Unit Kompetensi, data TUK, dan Asesor aktif.</p>

    <div class="grid-2" style="margin-bottom:24px;">
      <div class="card">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Tambah Skema Sertifikasi Baru</h3>
        <form id="master-add-scheme" style="display:grid;gap:12px;">
          <div class="form-group"><label>Nomor Skema</label><input id="ms-code" class="input" required placeholder="SS-FOTO-VID-005-2026"></div>
          <div class="form-group"><label>Nama Skema</label><input id="ms-name" class="input" required placeholder="Hybrid Studio Photo & Lighting"></div>
          <div class="form-group"><label>Jenjang / Klaster</label><input id="ms-level" class="input" required value="Klaster / Jenjang 4"></div>
          <div class="form-group"><label>Biaya Uji (IDR)</label><input type="number" id="ms-fee" class="input" required value="1050000"></div>
          <button type="submit" class="btn btn-orange">Simpan Skema Baru</button>
        </form>
      </div>

      <div class="card">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Tambah TUK Terverifikasi</h3>
        <form id="master-add-tuk" style="display:grid;gap:12px;">
          <div class="form-group"><label>Kode TUK</label><input id="mt-code" class="input" required placeholder="TUK-BDG-04"></div>
          <div class="form-group"><label>Nama Studio TUK</label><input id="mt-name" class="input" required placeholder="TUK Sewaktu Bandung Lightbox"></div>
          <div class="form-group"><label>Kota</label><input id="mt-city" class="input" required placeholder="Bandung"></div>
          <div class="form-group"><label>Fasilitas Utama</label><input id="mt-fac" class="input" required placeholder="Cyclorama, Strobe 4 Titik, Ruang Teori"></div>
          <button type="submit" class="btn btn-navy">Tambah TUK</button>
        </form>
      </div>
    </div>

    <div class="card">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:12px;">Ringkasan Master Data Aktif</h3>
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <span class="badge badge-navy">${db.schemes.length} Skema Sertifikasi</span>
        <span class="badge badge-blue">${db.tuks.length} Lokasi TUK</span>
        <span class="badge badge-orange">${db.assessors.length} Asesor Kompetensi</span>
      </div>
    </div>
  `;
}

export function bindAdminEvents(db, navigate) {
  document.querySelectorAll('.admin-verify-form').forEach(form => {
    form.onsubmit = e => {
      e.preventDefault();
      const app = db.applications.find(a => Number(a.id) === Number(form.dataset.appId));
      const rec = form.querySelector('[name="rec"]').value;
      const note = form.querySelector('[name="note"]').value;
      if (app) {
        app.recommendation = rec;
        app.adminNote = note;
        app.status = rec === 'Diterima' ? 'Peserta' : 'Pemohon';
        app.deadline = rec === 'Diterima' ? 'Menunggu penerbitan tagihan (1x24 jam)' : 'Perlu perbaikan berkas oleh pemohon';
        saveDB(db);
      }
      showToast(`Verifikasi disimpan. Status: ${app.status}`);
      navigate('/admin/verifikasi');
    };
  });

  document.querySelectorAll('[data-bill-action]').forEach(btn => {
    btn.onclick = () => {
      const app = db.applications.find(a => Number(a.id) === Number(btn.dataset.appId));
      if (!app) return;
      if (btn.dataset.billAction === 'tagih') {
        app.status = 'Tagih';
        app.invoiceNo = `INV-LSP-2026-${app.id}`;
        app.deadline = 'Menunggu pembayaran pemohon (1x24 jam)';
      } else {
        app.status = 'Lunas';
        app.deadline = 'Siap dijadwalkan H+2 oleh Admin';
      }
      saveDB(db);
      showToast(`Status tagihan diperbarui menjadi ${app.status}`);
      navigate('/admin/tagihan');
    };
  });

  document.querySelectorAll('.admin-schedule-form').forEach(form => {
    form.onsubmit = e => {
      e.preventDefault();
      const app = db.applications.find(a => Number(a.id) === Number(form.dataset.appId));
      if (app) {
        app.assessor = form.querySelector('[name="assessor"]').value;
        app.scheduleDate = form.querySelector('[name="date"]').value;
        app.status = 'Pra_Assesment';
        app.deadline = `Jadwal ditetapkan: ${app.scheduleDate}`;
        saveDB(db);
      }
      showToast('Jadwal & Asesor ditetapkan (Status: Pra_Assesment).');
      navigate('/admin/jadwal');
    };
  });

  document.querySelectorAll('.admin-grade-form').forEach(form => {
    form.onsubmit = e => {
      e.preventDefault();
      const app = db.applications.find(a => Number(a.id) === Number(form.dataset.appId));
      if (app) {
        app.mukScore.practical = Number(form.querySelector('[name="practical"]').value);
        app.status = form.querySelector('[name="decision"]').value;
        app.certNumber = app.status === 'Assesor_Yes' ? form.querySelector('[name="certNumber"]').value : '';
        app.deadline = app.status === 'Assesor_Yes' ? 'Sertifikat resmi diterbitkan' : 'Belum Kompeten — dapat mengajukan banding';
        saveDB(db);
      }
      showToast(`Keputusan asesmen disimpan (${app.status}).`);
      navigate('/admin/asesmen');
    };
  });

  const regAdminForm = document.getElementById('super-register-admin-form');
  if (regAdminForm) {
    regAdminForm.onsubmit = async e => {
      e.preventDefault();
      const fullname = document.getElementById('sa-name').value.trim();
      const email = document.getElementById('sa-email').value.trim();
      const division = document.getElementById('sa-div').value.trim();
      const password = document.getElementById('sa-pass').value;
      try {
        await apiRequest('/admin/register', { method: 'POST', body: { fullname, email, password, role: 'admin' } });
        db.admins.push({ id: Date.now(), fullname, email, role: 'admin', division, status: 'Aktif' });
        saveDB(db);
        showToast(`Admin baru (${email}) berhasil didaftarkan.`);
        navigate('/super-admin/admins');
      } catch (err) {
        showToast(err.message);
      }
    };
  }

  const addScheme = document.getElementById('master-add-scheme');
  if (addScheme) {
    addScheme.onsubmit = e => {
      e.preventDefault();
      db.schemes.push({
        id: Date.now() % 10000,
        code: document.getElementById('ms-code').value.trim(),
        name: document.getElementById('ms-name').value.trim(),
        level: document.getElementById('ms-level').value.trim(),
        fee: Number(document.getElementById('ms-fee').value),
        duration: '1 Hari Uji',
        summary: 'Skema sertifikasi fotografi studio berlisensi BNSP.',
        units: [{ code: 'M.74FTG00.099.2', title: 'Unit Kompetensi Utama Studio' }],
        requirements: ['KTP', 'Portofolio Studio']
      });
      saveDB(db);
      showToast('Skema sertifikasi baru ditambahkan ke Master Data.');
      navigate('/super-admin/master');
    };
  }

  const addTuk = document.getElementById('master-add-tuk');
  if (addTuk) {
    addTuk.onsubmit = e => {
      e.preventDefault();
      db.tuks.push({
        id: Date.now() % 10000,
        code: document.getElementById('mt-code').value.trim(),
        name: document.getElementById('mt-name').value.trim(),
        city: document.getElementById('mt-city').value.trim(),
        type: 'TUK Sewaktu',
        capacity: 15,
        status: 'Terverifikasi BNSP',
        facilities: document.getElementById('mt-fac').value.trim()
      });
      saveDB(db);
      showToast('TUK baru berhasil ditambahkan.');
      navigate('/super-admin/master');
    };
  }

  document.querySelectorAll('[data-print-doc]').forEach(btn => {
    btn.onclick = () => {
      showToast(`Mencetak ulang ${btn.dataset.printDoc}.pdf...`);
      window.print();
    };
  });
}