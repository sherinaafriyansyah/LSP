import { STATUS_FLOW, saveDB, getSchemeById, formatRupiah, statusBadgeClass } from './store.js';
import { showToast, ICONS } from './layout.js';

function renderStepper(currentStatus) {
  const idx = STATUS_FLOW.indexOf(currentStatus);
  return `
    <div class="stepper">
      ${STATUS_FLOW.map((st, i) => `
        <div class="step-node ${i < idx ? 'done' : i === idx ? 'current' : ''}">
          <div>${i + 1}. ${st}</div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderUserDashboard(db, user) {
  const myApps = db.applications.filter(a => a.userId === user.email || a.id === 101 || a.id === 102);
  const active = myApps.find(a => a.status !== 'Assesor_Yes' && a.status !== 'Assesor_No') || myApps[0];

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
      <div>
        <h1 style="font-size:26px;font-weight:800;">Dashboard Pemohon</h1>
        <p style="font-size:14px;color:var(--text-muted);">Pantau status permohonan sertifikasi fotografi studio Anda secara real-time.</p>
      </div>
      <a href="#/dashboard/pengajuan" class="btn btn-orange">+ Pengajuan Skema Baru</a>
    </div>

    ${active ? `
      <div class="sla-alert">
        <div>
          <span class="badge badge-orange" style="margin-bottom:6px;">NOTIFIKASI TENGGAT SLA</span>
          <div style="font-weight:800;font-size:15px;">Permohonan ${active.permitId} — Status: ${active.status}</div>
          <div style="font-size:13px;color:var(--text-muted);">${active.deadline}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${active.status === 'Pemohon' ? `<a href="#/dashboard/permohonan/${active.id}/apl" class="btn btn-navy btn-sm">Lanjut APL-02</a>` : ''}
          ${active.status === 'Tagih' ? `<a href="#/dashboard/permohonan/${active.id}/pembayaran" class="btn btn-orange btn-sm">Bayar Tagihan</a>` : ''}
          ${active.status === 'Pra_Assesment' || active.status === 'Assesment' ? `<a href="#/dashboard/permohonan/${active.id}/asesmen" class="btn btn-blue btn-sm">Masuk Ujian MUK</a>` : ''}
        </div>
      </div>

      <div class="card" style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <span class="kicker" style="margin-bottom:4px;">PROGRESS STEPPER AKTIF</span>
            <h3 style="font-size:19px;font-weight:800;">${getSchemeById(db, active.schemeId).name}</h3>
          </div>
          <span class="badge ${statusBadgeClass(active.status)}">${active.status}</span>
        </div>
        ${renderStepper(active.status)}
      </div>
    ` : ''}

    <div class="card">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Riwayat Permohonan Saya</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID Izin</th><th>Skema Sertifikasi</th><th>Status</th><th>Tenggat SLA</th><th>Aksi</th></tr></thead>
          <tbody>
            ${myApps.map(a => `
              <tr>
                <td><strong>${a.permitId}</strong></td>
                <td>${getSchemeById(db, a.schemeId).name}</td>
                <td><span class="badge ${statusBadgeClass(a.status)}">${a.status}</span></td>
                <td>${a.deadline}</td>
                <td style="display:flex;gap:6px;flex-wrap:wrap;">
                  <a href="#/dashboard/permohonan/${a.id}/apl" class="btn btn-outline-navy btn-sm">APL-02</a>
                  <a href="#/dashboard/permohonan/${a.id}/pembayaran" class="btn btn-outline-navy btn-sm">Bayar</a>
                  <a href="#/dashboard/permohonan/${a.id}/asesmen" class="btn btn-navy btn-sm">MUK</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderUserPengajuan(db, user) {
  return `
    <h1 style="font-size:26px;font-weight:800;margin-bottom:6px;">Form Pengajuan & FR-APL-01</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px;">Lengkapi data diri, riwayat pekerjaan studio, pilihan skema, dan berkas bukti persyaratan dasar.</p>

    <div class="card">
      <form id="user-apl01-form" class="form-grid">
        <div class="form-group"><label>Nama Lengkap (Sesuai KTP)</label><input id="apl-name" class="input" value="${user.fullname}" required></div>
        <div class="form-group"><label>NIK (16 Digit)</label><input id="apl-nik" class="input" required placeholder="3171xxxxxxxxxxxx"></div>
        <div class="form-group"><label>Nomor WhatsApp</label><input id="apl-phone" class="input" required placeholder="0812xxxxxxxx"></div>
        <div class="form-group"><label>Jabatan / Studio Tempat Bekerja</label><input id="apl-job" class="input" required placeholder="Fotografer Komersial — Studio X"></div>
        <div class="form-group full">
          <label>Pilih Skema Sertifikasi Fotografi Studio</label>
          <select id="apl-scheme" class="input">
            ${db.schemes.map(s => `<option value="${s.id}">${s.code} — ${s.name} (${formatRupiah(s.fee)})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Pilih Lokasi TUK</label>
          <select id="apl-tuk" class="input">
            ${db.tuks.map(t => `<option value="${t.name}">${t.name} (${t.city})</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Upload Bukti Kelengkapan (KTP, Ijazah, Portofolio PDF)</label><input type="file" id="apl-files" class="input"></div>
        <div class="form-group full">
          <button type="submit" class="btn btn-orange">Simpan & Lanjut ke Asesmen Mandiri (APL-02)</button>
        </div>
      </form>
    </div>
  `;
}

export function renderUserApl(db, id) {
  const app = db.applications.find(a => Number(a.id) === Number(id)) || db.applications[1];
  const scheme = getSchemeById(db, app.schemeId);
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Asesmen Mandiri (FR-APL-02) — ${app.permitId}</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Skema: <strong>${scheme.name}</strong> · Status Saat Ini: <span class="badge ${statusBadgeClass(app.status)}">${app.status}</span></p>

    <div class="card">
      <form id="user-apl02-form" data-app-id="${app.id}">
        <div class="table-wrap" style="margin-bottom:20px;">
          <table>
            <thead><tr><th>Kode Unit</th><th>Elemen / Unit Kompetensi</th><th>Penilaian Mandiri</th><th>Bukti Relevan</th></tr></thead>
            <tbody>
              ${scheme.units.map(u => `
                <tr>
                  <td><span class="badge badge-sky">${u.code}</span></td>
                  <td><strong>${u.title}</strong></td>
                  <td>
                    <label style="margin-right:12px;font-weight:700;"><input type="radio" name="unit_${u.code}" value="K" checked> K (Kompeten)</label>
                    <label style="font-weight:600;"><input type="radio" name="unit_${u.code}" value="BK"> BK</label>
                  </td>
                  <td>Portofolio Studio PDF</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <label style="display:flex;align-items:flex-start;gap:10px;padding:16px;background:var(--ice);border-radius:14px;margin-bottom:20px;font-size:13.5px;font-weight:600;">
          <input type="checkbox" required style="margin-top:4px;">
          <span>Saya menyatakan seluruh data pada FR-APL-01 dan asesmen mandiri FR-APL-02 adalah benar serta siap diverifikasi oleh Admin LSP (Pemohon → Apl_01).</span>
        </label>
        <button type="submit" class="btn btn-orange">Setujui & Kirim ke Admin LSP (Status Apl_01)</button>
      </form>
    </div>
  `;
}

export function renderUserPayment(db, id) {
  const app = db.applications.find(a => Number(a.id) === Number(id)) || db.applications[1];
  const scheme = getSchemeById(db, app.schemeId);
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Tagihan & Pembayaran — ${app.permitId}</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Status Saat Ini: <span class="badge ${statusBadgeClass(app.status)}">${app.status}</span></p>

    <div class="grid-2">
      <div class="dark-cta-card">
        <span class="badge badge-orange" style="margin-bottom:12px;">INVOICE ${app.invoiceNo || 'INV-LSP-BARU'}</span>
        <h3>${formatRupiah(app.fee || scheme.fee)}</h3>
        <p style="margin-bottom:18px;">Skema: ${scheme.name}</p>
        <div style="background:rgba(255,255,255,0.08);padding:16px;border-radius:14px;font-size:13.5px;display:grid;gap:6px;">
          <div>Bank Tujuan: <strong>Bank Mandiri (Virtual Account LSP)</strong></div>
          <div>No. Rekening: <strong>123-00-24092026-9</strong></div>
          <div>Atas Nama: <strong>LSP NusaXNine Fotografi Studio</strong></div>
        </div>
      </div>

      <div class="card">
        <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Unggah Bukti Transfer</h3>
        <form id="user-payment-form" data-app-id="${app.id}" style="display:grid;gap:16px;">
          <div class="form-group"><label>Nama Pengirim</label><input class="input" required value="${app.fullname}"></div>
          <div class="form-group"><label>File Bukti Transfer (JPG/PNG/PDF)</label><input type="file" id="pay-file" class="input" required></div>
          <button type="submit" class="btn btn-orange">Kirim Bukti Pembayaran</button>
        </form>
      </div>
    </div>
  `;
}

export function renderUserAssessment(db, id) {
  const app = db.applications.find(a => Number(a.id) === Number(id)) || db.applications[4];
  const scheme = getSchemeById(db, app.schemeId);
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Jadwal, Persetujuan & Ujian MUK — ${app.permitId}</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Skema: <strong>${scheme.name}</strong> · Status: <span class="badge ${statusBadgeClass(app.status)}">${app.status}</span></p>

    <div class="grid-3" style="margin-bottom:22px;">
      <div class="card"><span class="kicker">JADWAL ASESMEN</span><strong>${app.scheduleDate || 'Menunggu Penjadwalan H+2'}</strong></div>
      <div class="card"><span class="kicker">ASESOR BERTUGAS</span><strong>${app.assessor || 'Belum Ditugaskan'}</strong></div>
      <div class="card"><span class="kicker">LOKASI TUK</span><strong>${app.tuk}</strong></div>
    </div>

    ${!app.agreementSigned ? `
      <div class="sla-alert">
        <div>
          <strong>Persetujuan Asesmen & Kerahasiaan (FR.AK.01)</strong>
          <div style="font-size:13px;color:var(--text-muted);">Setujui dokumen pra-asesmen untuk membuka lembar pengerjaan MUK (Pra_Assesment → Assesment).</div>
        </div>
        <button class="btn btn-orange" id="btn-sign-agreement" data-app-id="${app.id}">Setujui & Mulai Asesmen</button>
      </div>
    ` : ''}

    <div class="card">
      <div class="tabs" id="muk-tabs">
        <button class="tab-btn active" data-tab="ia05">FR.IA.05 (Pilihan Ganda)</button>
        <button class="tab-btn" data-tab="ia06">FR.IA.06 (Esai Tertulis)</button>
        <button class="tab-btn" data-tab="ia07">FR.IA.07 (Pertanyaan Lisan)</button>
      </div>

      <form id="muk-submit-form" data-app-id="${app.id}">
        <div class="muk-panel" data-panel="ia05">
          <div style="display:grid;gap:16px;">
            <div class="card-ice">
              <div style="font-weight:700;margin-bottom:8px;">1. Modifikator cahaya yang menghasilkan transisi bayangan paling lembut untuk foto portrait studio adalah:</div>
              <label style="display:block;margin-bottom:6px;"><input type="radio" name="pg1" value="a" checked> Octabox besar dengan double diffuser</label>
              <label style="display:block;margin-bottom:6px;"><input type="radio" name="pg1" value="b"> Snoot tanpa grid</label>
              <label style="display:block;"><input type="radio" name="pg1" value="c"> Bare bulb strobe jarak 5 meter</label>
            </div>
            <div class="card-ice">
              <div style="font-weight:700;margin-bottom:8px;">2. Standar ruang warna (color space) terbaik saat proses tethered shooting RAW agar gamut tetap luas adalah:</div>
              <label style="display:block;margin-bottom:6px;"><input type="radio" name="pg2" value="a" checked> ProPhoto RGB / Adobe RGB 16-bit</label>
              <label style="display:block;"><input type="radio" name="pg2" value="b"> Indexed Color 8-bit</label>
            </div>
          </div>
        </div>

        <div class="muk-panel" data-panel="ia06" style="display:none;">
          <div class="form-group">
            <label>Jelaskan prosedur kalibrasi White Balance menggunakan ColorChecker dan pengaturan rasio key-to-fill light 3:1 di studio:</label>
            <textarea class="input" placeholder="Tuliskan jawaban teknis Anda..."></textarea>
          </div>
        </div>

        <div class="muk-panel" data-panel="ia07" style="display:none;">
          <div class="card-ice">
            <strong>Panduan Wawancara Lisan (FR.IA.07)</strong>
            <p style="font-size:13.5px;color:var(--text-muted);margin-top:6px;">Sesi tanya jawab langsung bersama Asesor <strong>${app.assessor || 'Terjadwal'}</strong> mengenai penerapan K3 kabel listrik strobe, hak cipta komersial, dan penanganan revisi klien.</p>
          </div>
        </div>

        <div style="margin-top:20px;">
          <button type="submit" class="btn btn-navy">Simpan & Kirim Jawaban MUK</button>
        </div>
      </form>
    </div>
  `;
}

export function renderUserDocuments(db, user) {
  const myApps = db.applications.filter(a => a.userId === user.email || a.id === 101 || a.id === 102);
  return `
    <h1 style="font-size:25px;font-weight:800;margin-bottom:6px;">Dokumen Resmi & E-Sertifikat</h1>
    <p style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Unduh PDF FR-APL-01, bundel lembar MUK, serta E-Sertifikat BNSP bagi permohonan yang telah dinyatakan Kompeten.</p>

    <div class="table-wrap">
      <table>
        <thead><tr><th>ID Izin</th><th>Skema</th><th>Status</th><th>Unduhan Resmi</th></tr></thead>
        <tbody>
          ${myApps.map(a => `
            <tr>
              <td><strong>${a.permitId}</strong></td>
              <td>${getSchemeById(db, a.schemeId).name}</td>
              <td><span class="badge ${statusBadgeClass(a.status)}">${a.status}</span></td>
              <td style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="btn btn-outline-navy btn-sm" data-print-doc="FR-APL-01_${a.permitId}">${ICONS.file} FR-APL-01.pdf</button>
                <button class="btn btn-outline-navy btn-sm" data-print-doc="MUK_${a.permitId}">${ICONS.file} Berkas MUK.pdf</button>
                ${a.status === 'Assesor_Yes'
                  ? `<button class="btn btn-orange btn-sm" data-print-doc="ESERTIFIKAT_${a.certNumber}">${ICONS.award} E-Sertifikat (${a.certNumber})</button>`
                  : `<span class="badge badge-gray">Menunggu Kompeten</span>`
                }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function bindUserEvents(db, user, navigate) {
  const apl01Form = document.getElementById('user-apl01-form');
  if (apl01Form) {
    apl01Form.onsubmit = e => {
      e.preventDefault();
      const newId = Date.now() % 10000;
      const schemeId = Number(document.getElementById('apl-scheme').value);
      const scheme = getSchemeById(db, schemeId);
      db.applications.unshift({
        id: newId,
        permitId: `IZN-2026-${newId}`,
        certNumber: '',
        userId: user.email,
        fullname: document.getElementById('apl-name').value,
        nik: document.getElementById('apl-nik').value,
        phone: document.getElementById('apl-phone').value,
        jobTitle: document.getElementById('apl-job').value,
        schemeId,
        status: 'Pemohon',
        deadline: 'Selesaikan APL-02 dalam 1x24 jam',
        fee: scheme.fee,
        invoiceNo: '',
        paymentProof: '',
        assessor: '',
        scheduleDate: '',
        tuk: document.getElementById('apl-tuk').value,
        aplApproved: false,
        agreementSigned: false,
        recommendation: '',
        adminNote: '',
        mukScore: { pg: 0, essay: 0, oral: 0, practical: 0 },
        updatedAt: 'Hari ini'
      });
      saveDB(db);
      showToast('FR-APL-01 tersimpan! Lanjutkan ke pengisian APL-02.');
      navigate(`/dashboard/permohonan/${newId}/apl`);
    };
  }

  const apl02Form = document.getElementById('user-apl02-form');
  if (apl02Form) {
    apl02Form.onsubmit = e => {
      e.preventDefault();
      const app = db.applications.find(a => Number(a.id) === Number(apl02Form.dataset.appId));
      if (app) {
        app.aplApproved = true;
        app.status = 'Apl_01';
        app.deadline = 'Menunggu verifikasi Admin LSP (SLA 1x24 jam)';
        saveDB(db);
      }
      showToast('APL-02 disetujui. Status berubah menjadi Apl_01.');
      navigate('/dashboard');
    };
  }

  const payForm = document.getElementById('user-payment-form');
  if (payForm) {
    payForm.onsubmit = e => {
      e.preventDefault();
      const app = db.applications.find(a => Number(a.id) === Number(payForm.dataset.appId));
      if (app) {
        const fileInput = document.getElementById('pay-file');
        app.paymentProof = fileInput.files[0]?.name || 'bukti_transfer.jpg';
        app.deadline = 'Bukti bayar diunggah — menunggu validasi Admin (1x24 jam)';
        saveDB(db);
      }
      showToast('Bukti pembayaran berhasil diunggah.');
      navigate('/dashboard');
    };
  }

  const signBtn = document.getElementById('btn-sign-agreement');
  if (signBtn) {
    signBtn.onclick = () => {
      const app = db.applications.find(a => Number(a.id) === Number(signBtn.dataset.appId));
      if (app) {
        app.agreementSigned = true;
        app.status = 'Assesment';
        saveDB(db);
      }
      showToast('Persetujuan kerahasiaan ditandatangani. Status: Assesment.');
      navigate(`/dashboard/permohonan/${signBtn.dataset.appId}/asesmen`);
    };
  }

  const tabs = document.getElementById('muk-tabs');
  if (tabs) {
    tabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.onclick = () => {
        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.muk-panel').forEach(p => {
          p.style.display = p.dataset.panel === btn.dataset.tab ? 'block' : 'none';
        });
      };
    });
  }

  const mukForm = document.getElementById('muk-submit-form');
  if (mukForm) {
    mukForm.onsubmit = e => {
      e.preventDefault();
      showToast('Lembar jawaban MUK berhasil dikirim ke Asesor untuk penilaian.');
    };
  }

  document.querySelectorAll('[data-print-doc]').forEach(btn => {
    btn.onclick = () => {
      showToast(`Menyiapkan dokumen resmi ${btn.dataset.printDoc}.pdf...`);
      window.print();
    };
  });
}