import { ICONS, renderKicker, renderMarquee, showToast } from './layout.js';
import { formatRupiah, getSchemeById, statusBadgeClass } from './store.js';

const TESTIMONIALS = [
  {
    name: 'Rama Prakoso',
    role: 'Lead Commercial Photographer · Skema Produk',
    score: '5.0',
    quote: 'Proses pengajuan FR-APL-01 hingga jadwal asesmen di TUK berlangsung sangat terstruktur. Verifikasi benar-benar berjalan di bawah 24 jam dan E-Sertifikat BNSP sangat menunjang kredibilitas studio kami di mata klien korporat.'
  },
  {
    name: 'Alya Maharani',
    role: 'Editorial Fashion Photographer · Skema Lighting Director',
    score: '5.0',
    quote: 'Fasilitas cyclorama dan lampu strobe di TUK NusaXNine sangat representatif untuk uji praktik nyata. Asesor memberikan umpan balik teknis yang tajam sekaligus objektif sesuai standar SKKNI.'
  },
  {
    name: 'Kevin Tanuwijaya',
    role: 'Digital Imaging Artist · Skema Post-Production',
    score: '5.0',
    quote: 'Mulai dari pengisian asesmen mandiri APL-02 sampai pengerjaan lembar MUK digital semuanya rapi di satu portal. Tidak perlu bolak-balik mengurus berkas fisik.'
  }
];

function renderSealBadge(extraClass = '') {
  return `
    <div class="seal-badge ${extraClass}">
      <svg class="seal-text-ring" viewBox="0 0 100 100">
        <defs><path id="circlePath-${extraClass || 'hero'}" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/></defs>
        <text font-size="8.2" font-weight="800" fill="currentColor" letter-spacing="2.2">
          <textPath href="#circlePath-${extraClass || 'hero'}">TERLISENSI BNSP</textPath>
        </text>
      </svg>
      <span class="seal-badge-inner">${ICONS.arrowUpRight}</span>
    </div>
  `;
}

export function renderHomePage(db) {
  return `
    <section class="hero-clean">
      <div class="container hero-clean-grid">
        <div>
          ${renderKicker('Lembaga Sertifikasi Profesi BNSP')}
          <h1>Sertifikasi Kompetensi Standar Nasional</h1>
          <p>Lorem ipsum” is a standard placeholder text used in printing, graphic design, and web development, originating from a scrambled 45 BC Latin passage in Cicero’s De Finibus Bonorum et Malorum.</p>
          <div class="hero-cta-row">
            <a href="#/register" class="btn btn-dark">Daftar Sertifikasi ${ICONS.arrow}</a>
            <a href="#/skema" class="link-underline">Lihat Semua Skema</a>
          </div>
        </div>

        <div class="hero-collage">
          <span class="sparkle-lime" style="position:absolute;top:-16px;left:42%;z-index:3;">${ICONS.sparkle}</span>
          <div class="hero-collage-col">
            <div class="hero-photo-box" style="aspect-ratio:1/1;">
              <img class="mono-img" src="https://cms.semenmerahputih.com/storage/5712/responsive-images/teknik-konstruksi-adalah___converted_806_537.jpg" alt="Uji Studio">
            </div>
            <div class="hero-photo-box" style="aspect-ratio:4/3;">
              <img class="mono-img" src="https://coachfianda.com/wp-content/uploads/2019/12/20191203_145252.jpg" alt="Asesor Kompetensi">
            </div>
          </div>
          <div class="hero-photo-box" style="aspect-ratio:3/4.2;">
            <img class="mono-img" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAIzKkNuwVEQEtUXj0BeQn7ml3pfroR3xxWjE8sZD-eEs7sXd_" alt="Pekerja">
          </div>
          <div class="hero-seal-pos">${renderSealBadge()}</div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('Profil LSP')}
          <h2>Mewujudkan Kompetensi Standar Nasional</h2>
        </div>

        <div class="about-split">
          <div class="about-photos">
            <div class="about-photo-card">
              <img class="mono-img" src="https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80" alt="Asesmen Studio">
            </div>
            <div class="about-photo-card">
              <img class="mono-img" src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=800&q=80" alt="Ruang Uji Teori">
            </div>
            <div class="about-seal-pos">${renderSealBadge('lime')}</div>
          </div>

          <div>
            <p style="color:var(--text-muted);font-size:15px;">
              NusaXNine LSP adalah Lembaga Sertifikasi Profesi Pihak Ketiga berlisensi BNSP-LSP-2409-ID yang berdedikasi menilai kompetensi fotografer studio secara objektif, imparsial, dan berbasis bukti praktik nyata.
            </p>
            <div class="progress-list">
              <div>
                <div class="progress-meta"><span>Tingkat Kelulusan Asesi</span><span>94%</span></div>
                <div class="progress-track"><div class="progress-fill" style="width:94%;"></div></div>
              </div>
              <div>
                <div class="progress-meta"><span>Kepatuhan SLA 1x24 Jam</span><span>98%</span></div>
                <div class="progress-track"><div class="progress-fill" style="width:98%;"></div></div>
              </div>
              <div>
                <div class="progress-meta"><span>Kepuasan Fasilitas TUK & Asesor</span><span>96%</span></div>
                <div class="progress-track"><div class="progress-fill" style="width:96%;"></div></div>
              </div>
            </div>
            <a href="#/tentang" class="btn btn-dark">Profil Lengkap LSP</a>
          </div>
        </div>

        <div class="stats-row-clean">
          <div class="stat-clean-item"><strong>1.250+</strong><span>Asesi Kompeten</span></div>
          <div class="stat-clean-item"><strong>${db.schemes.length} Skema</strong><span>Fotografi Studio BNSP</span></div>
          <div class="stat-clean-item"><strong>18+</strong><span>TUK Terverifikasi</span></div>
          <div class="stat-clean-item"><strong>5 Hari</strong><span>Maks. SLA Terbit</span></div>
        </div>
      </div>
    </section>

    <section class="section-dark-pattern">
      <div class="container">
        <div class="section-head-split">
          <div>
            ${renderKicker('Skema Sertifikasi')}
            <h2>Tingkatkan Karier dengan<br>Skema Resmi BNSP</h2>
          </div>
          <a href="#/skema" class="btn btn-white">
            <span>Lihat Semua Skema</span>
            <span class="btn-icon-dot">${ICONS.arrow}</span>
          </a>
        </div>

        <div class="grid-3">
          <article class="service-dark-card">
            <div class="service-thumb">
              <img class="mono-img" src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=700&q=80" alt="${db.schemes[0].name}">
            </div>
            <div>
              <h3>${db.schemes[0].name}</h3>
              <p>${db.schemes[0].summary}</p>
              <a href="#/skema/${db.schemes[0].id}" class="service-more-link">Pelajari Skema ${ICONS.arrow}</a>
            </div>
          </article>

          <article class="service-dark-card featured-lime">
            <div>
              <h3>${db.schemes[1].name}</h3>
              <p>${db.schemes[1].summary}</p>
              <a href="#/skema/${db.schemes[1].id}" class="service-more-link">Pelajari Skema ${ICONS.arrow}</a>
            </div>
            <div class="service-thumb">
              <img class="mono-img" src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=700&q=80" alt="${db.schemes[1].name}">
            </div>
          </article>

          <article class="service-dark-card">
            <div class="service-thumb">
              <img class="mono-img" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80" alt="${db.schemes[2].name}">
            </div>
            <div>
              <h3>${db.schemes[2].name}</h3>
              <p>${db.schemes[2].summary}</p>
              <a href="#/skema/${db.schemes[2].id}" class="service-more-link">Pelajari Skema ${ICONS.arrow}</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('Keunggulan Kami')}
          <h2>Mengapa Fotografer Memilih<br>NusaXNine LSP</h2>
        </div>

        <div class="why-grid">
          <div class="why-visual-box">
            <div class="why-photo-main">
              <img class="mono-img" src="https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=800&q=80" alt="Suasana Uji Studio">
            </div>
            <span class="sparkle-lime" style="position:absolute;left:-14px;bottom:24px;z-index:3;">${ICONS.sparkle}</span>
            <div class="why-squiggle-tile" aria-hidden="true">
              <svg width="72" height="54" viewBox="0 0 80 60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
                <path d="M8 46C18 14 28 14 34 38C40 58 50 12 60 32C66 44 72 26 76 18"/>
              </svg>
            </div>
          </div>

          <div class="why-features-panel">
            <div class="why-feature-item">
              <div class="why-feature-icon">${ICONS.users}</div>
              <h4>Asesor Berlisensi MET</h4>
              <p>Seluruh uji kompetensi dinilai langsung oleh praktisi studio senior pemegang sertifikat Asesor aktif BNSP.</p>
            </div>
            <div class="why-feature-item">
              <div class="why-feature-icon">${ICONS.clock}</div>
              <h4>SLA Cepat 1x24 Jam</h4>
              <p>Verifikasi APL-01, validasi pembayaran, hingga penjadwalan H+2 dipantau dengan pengingat batas waktu.</p>
            </div>
            <div class="why-feature-item">
              <div class="why-feature-icon">${ICONS.award}</div>
              <h4>Diakui Nasional BNSP</h4>
              <p>Sertifikat kompetensi resmi berlogo Garuda Emas dengan verifikasi daring seketika bagi klien dan instansi.</p>
            </div>
            <div class="why-feature-item">
              <div class="why-feature-icon">${ICONS.shield}</div>
              <h4>Pelaporan Transparan</h4>
              <p>Lacak status permohonan secara real-time mulai dari Cek, APL-01, Tagih, Lunas, hingga terbit E-Sertifikat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container">
        <div class="section-head-split">
          <div>
            ${renderKicker('Alur Sertifikasi')}
            <h2>Langkah Sistematis Menuju<br>E-Sertifikat BNSP</h2>
          </div>
          <p>Dirancang ringkas dan terukur sesuai pedoman BNSP dengan jaminan SLA 1x24 jam pada tiap tahapan dan batas maksimal 5 hari kerja.</p>
        </div>

        <div class="grid-3">
          <div class="process-card">
            <div class="process-body">
              <h3>Pengajuan FR-APL-01 & APL-02</h3>
              <p>Registrasi akun pemohon, unggah portofolio studio, dan selesaikan asesmen mandiri untuk verifikasi admin.</p>
              <div class="process-watermark">01</div>
            </div>
            <div class="process-bar"><span>TAHAP</span><span>01</span></div>
          </div>

          <div class="process-card">
            <div class="process-body">
              <h3>Pembayaran & Penjadwalan H+2</h3>
              <p>Setelah dinyatakan Peserta, selesaikan tagihan administrasi untuk penugasan Asesor dan jadwal TUK.</p>
              <div class="process-watermark">02</div>
            </div>
            <div class="process-bar"><span>TAHAP</span><span>02</span></div>
          </div>

          <div class="process-card">
            <div class="process-body">
              <h3>Uji MUK & Terbit E-Sertifikat</h3>
              <p>Ikuti uji praktik studio (FR.IA.02/03) serta MUK (FR.IA.05–07) hingga penetapan Kompeten dan terbit sertifikat.</p>
              <div class="process-watermark">03</div>
            </div>
            <div class="process-bar"><span>TAHAP</span><span>03</span></div>
          </div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('Fasilitas & TUK')}
          <h2>Studio Uji & Dokumentasi Nyata</h2>
        </div>

        <div class="grid-2" style="margin-bottom:36px;">
          ${[
            { tag: 'TUK Sewaktu', title: 'NusaXNine Studio Flagship — Cyclorama & Multi-Strobe', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', link: '/tuk' },
            { tag: 'TUK Mandiri', title: 'Ruang Cahaya Kreatif — Table Top Produk & Kalibrasi', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', link: '/tuk' },
            { tag: 'Uji Praktik', title: 'Asesmen Tata Cahaya Editorial Fashion & Portrait', img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80', link: '/jadwal' },
            { tag: 'Post-Production', title: 'Workstation Color Management & Retouching Presisi', img: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80', link: '/skema/4' }
          ].map(w => `
            <a href="#${w.link}" class="work-card">
              <div class="work-thumb"><img class="mono-img" src="${w.img}" alt="${w.title}"></div>
              <span class="work-tag">${w.tag}</span>
              <div class="work-bottom">
                <h4>${w.title}</h4>
                <span class="circle-arrow-lime">${ICONS.arrowUpRight}</span>
              </div>
            </a>
          `).join('')}
        </div>

        <div style="text-align:center;">
          <a href="#/tuk" class="btn btn-dark">Lihat Semua TUK</a>
        </div>
      </div>
    </section>

    <section class="section-dark-pattern">
      <div class="container award-split">
        <div>
          ${renderKicker('Legalitas & Standar')}
          <h2 style="font-size:clamp(28px,3.6vw,42px);font-weight:800;line-height:1.15;letter-spacing:-0.03em;">
            Perjalanan Lisensi &<br>Pengakuan Resmi BNSP
          </h2>
          <div class="laurel-wrap">
            <svg width="210" height="150" viewBox="0 0 200 150" fill="currentColor">
              <path d="M100 32l8 24h25l-20 15 8 24-21-15-21 15 8-24-20-15h25z"/>
              <path d="M44 40c-14 26-10 66 18 88 10 8 22 12 34 13v-10c-10-1-19-5-27-11-21-17-25-48-14-72L44 40zm112 0l-11 8c11 24 7 55-14 72-8 6-17 10-27 11v10c12-1 24-5 34-13 28-22 32-62 18-88z"/>
            </svg>
          </div>
        </div>

        <div class="award-list">
          ${[
            { cat: 'Lisensi Nasional', title: 'SK Lisensi BNSP-LSP-2409-ID', year: '/ 2025', link: '/tentang' },
            { cat: 'Standar Kompetensi', title: 'Adopsi Penuh SKKNI Fotografi Studio', year: '/ 2025', link: '/skema' },
            { cat: 'Verifikasi TUK', title: 'Akreditasi 18+ Studio Uji Terverifikasi', year: '/ 2026', link: '/tuk' },
            { cat: 'Komitmen Mutu Digital', title: 'Audit SLA Verifikasi 1x24 Jam & E-Sertifikat', year: '/ 2026', link: '/alur' }
          ].map(aw => `
            <a href="#${aw.link}" class="award-row">
              <div>
                <div class="award-cat">${aw.cat}</div>
                <div class="award-title">${aw.title} <span class="award-year">${aw.year}</span></div>
              </div>
              <span class="circle-arrow-ghost">${ICONS.arrowUpRight}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('Konsultasi & Pengajuan')}
          <h2>Konsultasikan Skema Uji Anda!</h2>
        </div>

        <div class="contact-split">
          <form id="home-consult-form" class="form-grid" style="align-content:start;">
            <div class="form-group"><label>Nama Lengkap *</label><input class="input" required placeholder="Nama Anda"></div>
            <div class="form-group"><label>Email *</label><input type="email" class="input" required placeholder="email@domain.id"></div>
            <div class="form-group"><label>No. WhatsApp *</label><input class="input" required placeholder="0812xxxxxxxx"></div>
            <div class="form-group">
              <label>Skema Diminati *</label>
              <select class="input">
                ${db.schemes.map(s => `<option>${s.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group full"><label>Pesan / Pertanyaan *</label><textarea class="input" required placeholder="Ceritakan pengalaman studio atau jadwal uji yang Anda inginkan..."></textarea></div>
            <div class="form-group full"><div><button type="submit" class="btn btn-dark">Kirim Permintaan</button></div></div>
          </form>

          <div class="contact-photo-wrap">
            <img class="mono-img" src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=800&q=80" alt="Sekretariat LSP">
            <span class="sparkle-lime" style="position:absolute;right:18px;bottom:18px;">${ICONS.sparkle}</span>
          </div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container">
        <div class="section-head-split">
          <div>
            ${renderKicker('Testimoni')}
            <h2>Testimoni: Dipercaya<br>oleh Asesi Kami</h2>
          </div>
          <div>
            <p style="margin-bottom:14px;">Pengalaman nyata para fotografer studio dan digital imaging artist yang telah meraih sertifikasi resmi BNSP.</p>
            <a href="#/berita" class="btn btn-dark btn-sm">Semua Dokumentasi ${ICONS.arrow}</a>
          </div>
        </div>

        <div class="testi-grid">
          <div class="rating-dark-box">
            <div>
              <div class="rating-big">4.9</div>
              <div class="stars-lime">★★★★★</div>
              <div style="font-size:13px;color:var(--text-on-dark);margin-top:6px;">(350+ Ulasan Asesi)</div>
            </div>
            <div>
              <p style="font-size:13.5px;color:var(--white);margin-top:18px;">Pengalaman sertifikasi transparan yang diakui industri kreatif.</p>
              <div class="avatar-stack">
                ${db.assessors.slice(0, 3).map(a => `<img class="mono-img" src="${a.img}" alt="${a.name}">`).join('')}
                <span class="avatar-plus">+</span>
              </div>
            </div>
          </div>

          <div class="testi-review-box" id="home-testi-box">
            <div>
              <div style="display:flex;align-items:center;gap:10px;">
                <span class="stars-lime">★★★★★</span>
                <strong id="testi-score">${TESTIMONIALS[0].score}</strong>
              </div>
              <p class="testi-quote" id="testi-quote">${TESTIMONIALS[0].quote}</p>
            </div>
            <div class="testi-footer">
              <div>
                <strong id="testi-name" style="display:block;font-size:16px;">${TESTIMONIALS[0].name}</strong>
                <span id="testi-role" style="font-size:13px;color:var(--text-muted);">${TESTIMONIALS[0].role}</span>
              </div>
              <div class="testi-nav">
                <button class="circle-btn-lime" id="testi-prev" aria-label="Sebelumnya">${ICONS.arrowLeft}</button>
                <button class="circle-btn-dark" id="testi-next" aria-label="Berikutnya">${ICONS.arrow}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('Asesor Kompetensi')}
          <h2>Kenali Tim Asesor Berlisensi</h2>
        </div>

        <div class="grid-3">
          ${db.assessors.slice(0, 3).map((a, idx) => `
            <div class="team-card ${idx === 0 ? 'active-card' : ''}">
              <div class="team-photo">
                <img class="mono-img" src="${a.img}" alt="${a.name}">
                ${idx === 0 ? `
                  <div class="team-socials">
                    <span class="social-circle-lime" style="width:30px;height:30px;font-size:10px;">MET</span>
                    <span class="social-circle-lime" style="width:30px;height:30px;font-size:10px;">BNSP</span>
                  </div>
                ` : ''}
              </div>
              <div class="team-info">
                <h4>${a.name}</h4>
                <p>${a.spec} · ${a.reg}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section-dark-pattern">
      <div class="container">
        <div class="section-head-split">
          <div>
            ${renderKicker('Berita & Pengumuman')}
            <h2>Berita & Informasi<br>Terbaru LSP</h2>
          </div>
          <a href="#/berita" class="btn btn-white">
            <span>Lihat Semua Berita</span>
            <span class="btn-icon-dot">${ICONS.arrow}</span>
          </a>
        </div>

        <div class="grid-3">
          ${db.articles.slice(0, 3).map(art => `
            <article class="blog-dark-card">
              <div class="blog-thumb">
                <img class="mono-img" src="${art.img}" alt="${art.title}">
                <span class="blog-pill-lime">${art.category}</span>
              </div>
              <h3>${art.title}</h3>
              <p>${art.excerpt}</p>
              <a href="#/berita" class="service-more-link">Baca Selengkapnya ${ICONS.arrow}</a>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head center">
          ${renderKicker('FAQs')}
          <h2>Pertanyaan? Lihat di sini.</h2>
        </div>

        <div class="faq-split">
          <div class="faq-stack">
            ${[
              { q: 'Skema sertifikasi fotografi studio apa saja yang tersedia?', a: 'Kami melayani 4 skema utama berlisensi BNSP: Fotografer Studio Junior (Portrait & Basic Lighting), Fotografer Produk Komersial, Studio Lighting Director, dan Digital Imaging Post-Production.' },
              { q: 'Berapa lama proses sertifikasi sampai E-Sertifikat terbit?', a: 'Maksimal 5 hari kerja sejak berkas APL-01 dan APL-02 lengkap, dengan SLA verifikasi 1x24 jam pada setiap tahap serta penjadwalan uji H+2 setelah pembayaran lunas.' },
              { q: 'Apakah peserta harus membawa peralatan lighting studio sendiri?', a: 'Tidak perlu. Seluruh TUK Terverifikasi telah dilengkapi cyclorama, strobe lighting, modifier, dan kalibrasi warna. Peserta cukup membawa kamera DSLR/Mirrorless pribadi.' },
              { q: 'Bagaimana cara memverifikasi keaslian sertifikat BNSP?', a: 'Masukkan ID Izin atau Nomor Sertifikat pada kolom verifikasi di bagian bawah halaman ini atau pada menu Verifikasi Sertifikat.' },
              { q: 'Apakah saya bisa mengajukan banding jika hasil dinyatakan Belum Kompeten?', a: 'Ya, peserta berhak mengajukan banding resmi melalui formulir FR.AK.04 pada halaman Kontak & Pengaduan paling lambat 7 hari kerja setelah keputusan.' }
            ].map((f, i) => `
              <div class="faq-item ${i === 1 ? 'open' : ''}">
                <button class="faq-q" data-faq-toggle>${f.q} <span>${i === 1 ? '−' : '+'}</span></button>
                <div class="faq-a">${f.a}</div>
              </div>
            `).join('')}
          </div>

          <div class="faq-side-stack">
            <div class="faq-dark-box">
              <div style="color:var(--lime);margin-bottom:14px;">${ICONS.chat}</div>
              <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">Punya pertanyaan berbeda?</h3>
              <p style="font-size:13px;color:var(--text-on-dark);margin-bottom:20px;">Tim sekretariat LSP siap membantu memilih skema dan menyiapkan portofolio Anda.</p>
              <a href="#/kontak" class="btn btn-lime btn-sm">Hubungi Kami</a>
            </div>
            <div class="faq-phone-box">
              <div class="why-feature-icon" style="margin:0;flex-shrink:0;">${ICONS.phone}</div>
              <div>
                <div style="font-size:12px;color:var(--text-muted);font-weight:600;">Layanan SLA 1x24 Jam</div>
                <strong style="font-size:16px;">(021) 5089-2409</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderMarquee()}

    <section class="section">
      <div class="container" style="text-align:center;">
        <div class="section-head center" style="margin-bottom:28px;">
          ${renderKicker('Verifikasi Instan')}
          <h2>Cek Status Permohonan &<br>Keaslian Sertifikat BNSP</h2>
        </div>

        <form class="newsletter-pill-form" id="home-verify-form">
          <span class="newsletter-icon-dot">${ICONS.shield}</span>
          <input type="text" id="home-verify-input" placeholder="Masukkan ID Izin (IZN-2026-0101) atau No. Sertifikat..." required>
          <button type="submit" class="btn btn-dark">Cek Sekarang</button>
        </form>
        <div id="home-verify-result" style="max-width:620px;margin:20px auto 0;"></div>
      </div>
    </section>

    ${renderMarquee()}
  `;
}

export function renderAboutPage() {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Profil Lembaga')}
        <h1>Tentang NusaXNine LSP Fotografi Studio</h1>
        <p>Lembaga Sertifikasi Profesi Pihak Ketiga independen yang berfokus menjaga standar kualitas tenaga kerja fotografi studio di Indonesia.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-2" style="margin-bottom:36px;">
          <div class="card-ice">
            <span class="badge badge-navy" style="margin-bottom:12px;">VISI</span>
            <h3 style="font-size:22px;font-weight:800;margin-bottom:10px;">Menjadi Rujukan Nasional Sertifikasi Fotografi Studio</h3>
            <p style="color:var(--text-muted);">Mencetak ekosistem fotografer studio, lighting director, dan digital imaging artist Indonesia yang diakui kompetensinya secara nasional maupun internasional.</p>
          </div>
          <div class="card">
            <span class="badge badge-orange" style="margin-bottom:12px;">MISI</span>
            <ul class="check-list" style="margin:8px 0 0;">
              <li><span class="check-dot">${ICONS.check}</span> Menyelenggarakan uji kompetensi objektif, imparsial, dan transparan sesuai pedoman BNSP.</li>
              <li><span class="check-dot">${ICONS.check}</span> Memelihara mutu TUK studio serta pemutakhiran skema mengikuti teknologi pencahayaan.</li>
              <li><span class="check-dot">${ICONS.check}</span> Menjamin layanan digital cepat dengan SLA 1x24 jam di setiap tahapan.</li>
            </ul>
          </div>
        </div>

        <div class="grid-3" style="margin-bottom:44px;">
          <div class="card">
            <span class="kicker">LEGALITAS BNSP</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:8px;">BNSP-LSP-2409-ID</h4>
            <p style="font-size:13.5px;color:var(--text-muted);">SK Ketua BNSP Nomor KEP.2409/BNSP/III/2025 tentang Pemberian Lisensi LSP Pihak Ketiga Bidang Fotografi Studio.</p>
          </div>
          <div class="card">
            <span class="kicker">AKTA PENDIRIAN</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:8px;">AHU-0019284.AH.01.07</h4>
            <p style="font-size:13.5px;color:var(--text-muted);">Terdaftar resmi di Kementerian Hukum dan HAM RI sebagai badan hukum pelaksana sertifikasi kompetensi independen.</p>
          </div>
          <div class="card">
            <span class="kicker">SEKRETARIAT RESMI</span>
            <h4 style="font-size:18px;font-weight:800;margin-bottom:8px;">Jakarta Pusat</h4>
            <p style="font-size:13.5px;color:var(--text-muted);">Gedung NusaXNine Creative Hub Lt. 3, Tanah Abang, Jakarta Pusat. Operasional Senin–Jumat 08.00–17.00 WIB.</p>
          </div>
        </div>

        <div class="section-head">
          ${renderKicker('Tata Kelola')}
          <h2>Struktur Organisasi LSP</h2>
        </div>
        <div class="grid-4">
          ${[
            { role: 'Ketua Pengarah', name: 'Ir. Bagus Prakasa', desc: 'Pengawasan imparsialitas & kebijakan strategis.' },
            { role: 'Direktur LSP', name: 'Hendra Gunawan', desc: 'Penanggung jawab operasional & lisensi BNSP.' },
            { role: 'Manajer Sertifikasi', name: 'Nadia Kusuma, M.Ds.', desc: 'Pengelolaan skema, MUK, dan penugasan asesor.' },
            { role: 'Manajer Mutu & TUK', name: 'Raka Mahendra, S.Sn.', desc: 'Audit internal, surveilan TUK, dan kepatuhan SLA.' }
          ].map(o => `
            <div class="card">
              <span class="badge badge-orange" style="margin-bottom:10px;">${o.role}</span>
              <h4 style="font-size:17px;font-weight:800;margin-bottom:6px;">${o.name}</h4>
              <p style="font-size:13px;color:var(--text-muted);">${o.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderSchemesPage(db) {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Katalog Skema BNSP')}
        <h1>Skema Sertifikasi Fotografi Studio</h1>
        <p>Seluruh skema mengacu pada SKKNI Bidang Fotografi terbaru untuk jenjang pemula hingga direktur pencahayaan studio.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-2">
          ${db.schemes.map(s => `
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
                  <span class="badge badge-navy">${s.code}</span>
                  <span class="badge badge-orange">${s.level}</span>
                </div>
                <h3 style="font-size:22px;font-weight:800;margin-bottom:10px;">${s.name}</h3>
                <p style="color:var(--text-muted);font-size:14.5px;margin-bottom:18px;">${s.summary}</p>
                <div style="display:flex;gap:16px;font-size:13px;font-weight:700;margin-bottom:22px;flex-wrap:wrap;">
                  <span>${s.units.length} Unit Kompetensi</span>
                  <span>·</span>
                  <span>${s.duration}</span>
                  <span>·</span>
                  <span style="color:var(--dark);">${formatRupiah(s.fee)}</span>
                </div>
              </div>
              <div style="display:flex;gap:12px;">
                <a href="#/skema/${s.id}" class="btn btn-dark">Lihat Unit & Syarat</a>
                <a href="#/register" class="btn btn-lime">Ajukan Skema</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderSchemeDetailPage(db, id) {
  const s = getSchemeById(db, id);
  return `
    <section class="page-hero">
      <div class="container">
        <a href="#/skema" style="color:var(--lime);font-size:13.5px;font-weight:700;display:inline-block;margin-bottom:14px;">← Kembali ke Katalog Skema</a>
        <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <span class="badge badge-orange">${s.code}</span>
          <span class="badge badge-blue">${s.level}</span>
        </div>
        <h1>${s.name}</h1>
        <p>${s.summary}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="faq-split">
          <div>
            <h2 style="font-size:24px;font-weight:800;margin-bottom:16px;">Daftar Unit Kompetensi</h2>
            <div class="table-wrap" style="margin-bottom:32px;">
              <table>
                <thead><tr><th>No</th><th>Kode Unit</th><th>Judul Unit Kompetensi</th></tr></thead>
                <tbody>
                  ${s.units.map((u, i) => `
                    <tr>
                      <td><strong>${i + 1}</strong></td>
                      <td><span class="badge badge-sky">${u.code}</span></td>
                      <td><strong>${u.title}</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h2 style="font-size:24px;font-weight:800;margin-bottom:14px;">Persyaratan Dasar Pemohon</h2>
            <div class="card-ice">
              <ul class="check-list" style="margin:0;">
                ${s.requirements.map(r => `<li><span class="check-dot">${ICONS.check}</span> ${r}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="dark-cta-card">
            <span class="badge badge-orange" style="margin-bottom:12px;">RINGKASAN BIAYA</span>
            <h3>${formatRupiah(s.fee)}</h3>
            <p style="margin-bottom:20px;">Durasi Asesmen: ${s.duration} · Metode: Observasi Praktik Studio, Tes Tertulis (FR.IA.05/06) & Wawancara Lisan (FR.IA.07).</p>
            <a href="#/dashboard/pengajuan" class="btn btn-lime btn-block" style="margin-bottom:10px;">Ajukan FR-APL-01 Sekarang</a>
            <a href="#/jadwal" class="btn btn-outline-light btn-block">Cek Jadwal Tersedia</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFlowPage() {
  const steps = [
    { no: '01', code: 'Cek -> Pemohon', title: 'Registrasi & Pengajuan FR-APL-01', sla: 'Hari ke-1', desc: 'Pemohon membuat akun, memilih skema fotografi studio, mengisi data pribadi & pekerjaan, serta mengunggah bukti persyaratan dasar.' },
    { no: '02', code: 'Pemohon -> Apl_01', title: 'Asesmen Mandiri (APL-02) & Verifikasi', sla: 'SLA 1x24 Jam', desc: 'Pemohon mengisi penilaian mandiri APL-02 dan menyetujui kebenaran data. Admin LSP memverifikasi kelengkapan berkas.' },
    { no: '03', code: 'Peserta -> Tagih -> Lunas', title: 'Penerbitan Tagihan & Pembayaran', sla: 'SLA 1x24 Jam', desc: 'Pemohon berstatus Peserta menerima invoice resmi, mengunggah bukti transfer, dan Admin memvalidasi status menjadi Lunas.' },
    { no: '04', code: 'Lunas -> Assesor -> Pra_Assesment', title: 'Penjadwalan Uji (H+2) & Penugasan Asesor', sla: 'H+2 Setelah Lunas', desc: 'Admin menetapkan jadwal TUK dan Asesor berlisensi MET. Peserta menyetujui formulir kerahasiaan asesmen.' },
    { no: '05', code: 'Assesment -> Assesor_Yes/No', title: 'Pelaksanaan MUK & Penerbitan E-Sertifikat', sla: 'Maks. Hari ke-5', desc: 'Uji praktik studio (FR.IA.02/03) & MUK (FR.IA.05, 06, 07). Jika dinyatakan Kompeten, Nomor Sertifikat & E-Sertifikat resmi terbit.' }
  ];

  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Standar Operasional Prosedur')}
        <h1>Alur & SLA Sertifikasi Kompetensi</h1>
        <p>Komitmen layanan tepat waktu: maksimal 1x24 jam pada setiap antrean verifikasi dan total proses maksimal 5 hari kerja.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="sla-alert" style="margin-bottom:36px;">
          <div>
            <strong>Aturan Batas Waktu (Service Level Agreement)</strong>
            <div style="font-size:13.5px;color:var(--text-muted);">Setiap status memiliki penghitung mundur 1x24 jam. Jadwal uji ditetapkan otomatis H+2 sejak status Lunas.</div>
          </div>
          <span class="badge badge-orange">SLA 1x24 Jam · Batas 5 Hari Kerja</span>
        </div>

        <div style="display:grid;gap:18px;">
          ${steps.map(st => `
            <div class="process-card">
              <div class="process-body" style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;">
                <div style="max-width:740px;">
                  <span class="badge badge-navy" style="margin-bottom:8px;">${st.code}</span>
                  <h3>${st.title}</h3>
                  <p>${st.desc}</p>
                </div>
                <span class="badge badge-orange">${st.sla}</span>
              </div>
              <div class="process-bar"><span>TAHAP SERTIFIKASI</span><span>${st.no}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderTukPage(db) {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Tempat Uji Kompetensi')}
        <h1>Daftar TUK Terverifikasi</h1>
        <p>Seluruh studio uji telah melalui surveilan kelayakan peralatan pencahayaan, standar K3 listrik, dan ruang ujian teori.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3">
          ${db.tuks.map(t => `
            <div class="card">
              <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
                <span class="badge badge-navy">${t.code}</span>
                <span class="badge badge-orange">${t.type}</span>
              </div>
              <h3 style="font-size:19px;font-weight:800;margin-bottom:8px;">${t.name}</h3>
              <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:14px;">${t.facilities}</p>
              <div style="font-size:13px;font-weight:700;">Kota: ${t.city} · Kapasitas: ${t.capacity} Asesi</div>
              <div style="margin-top:12px;"><span class="badge badge-sky">${t.status}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderAssessorsPage(db) {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Asesor Kompetensi')}
        <h1>Daftar Asesor Aktif Berlisensi BNSP</h1>
        <p>Praktisi senior fotografi studio yang memiliki sertifikat Asesor Kompetensi (MET) aktif dari BNSP.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-4">
          ${db.assessors.map((a, idx) => `
            <div class="team-card ${idx === 0 ? 'active-card' : ''}">
              <div class="team-photo"><img class="mono-img" src="${a.img}" alt="${a.name}"></div>
              <div class="team-info">
                <h4>${a.name}</h4>
                <p style="font-weight:700;margin-top:4px;">${a.reg}</p>
                <p>${a.spec}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderSchedulesPage(db) {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Kalender Asesmen')}
        <h1>Jadwal Uji Kompetensi Terbuka</h1>
        <p>Pilih jadwal pelaksanaan asesmen yang masih tersedia kuotanya dan lakukan pendaftaran melalui akun Pemohon.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Tanggal & Waktu</th><th>Skema Sertifikasi</th><th>Lokasi TUK</th><th>Kuota</th><th>Status</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              ${db.schedules.map(sc => {
                const scheme = getSchemeById(db, sc.schemeId);
                return `
                  <tr>
                    <td><strong>${sc.date}</strong><div style="font-size:12px;color:var(--text-muted);">${sc.time}</div></td>
                    <td><strong>${scheme.name}</strong><div style="font-size:12px;color:var(--dark);font-weight:700;">${scheme.code}</div></td>
                    <td>${sc.tuk}</td>
                    <td><strong>${sc.filled} / ${sc.quota}</strong></td>
                    <td><span class="badge ${statusBadgeClass(sc.status)}">${sc.status}</span></td>
                    <td>${sc.status === 'Dibuka' ? `<a href="#/register" class="btn btn-lime btn-sm">Daftar</a>` : `<span style="color:var(--text-muted);font-size:12.5px;">Kuota Penuh</span>`}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

export function renderVerifyPage() {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Verifikasi Resmi')}
        <h1>Cek Status Permohonan & Validasi Sertifikat</h1>
        <p>Masukkan ID Izin permohonan atau Nomor Sertifikat untuk memastikan keaslian sertifikat kompetensi fotografi studio.</p>
      </div>
    </section>
    <section class="section">
      <div class="container" style="max-width:780px;">
        <div class="card">
          <form id="page-verify-form" class="newsletter-pill-form" style="max-width:100%;">
            <span class="newsletter-icon-dot">${ICONS.shield}</span>
            <input type="text" id="page-verify-input" placeholder="Contoh: IZN-2026-0101 atau SKK-FOTO-2026-00891" required>
            <button type="submit" class="btn btn-dark">Cari Data</button>
          </form>
          <div style="font-size:12.5px;color:var(--text-muted);margin-top:12px;text-align:center;">
            ID uji: <strong>IZN-2026-0101</strong> (Kompeten), <strong>IZN-2026-0102</strong> (Tagih), atau <strong>IZN-2026-0105</strong> (Assesment).
          </div>
          <div id="page-verify-result" style="margin-top:24px;"></div>
        </div>
      </div>
    </section>
  `;
}

export function renderNewsPage(db) {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Berita & Galeri')}
        <h1>Dokumentasi & Pengumuman Resmi LSP</h1>
        <p>Informasi jadwal batch terbaru, surveilan TUK, serta kegiatan uji kompetensi fotografi studio.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3">
          ${db.articles.map(a => `
            <article class="work-card">
              <div class="work-thumb"><img class="mono-img" src="${a.img}" alt="${a.title}"></div>
              <span class="work-tag">${a.category}</span>
              <h4 style="font-size:17px;font-weight:800;margin-bottom:6px;">${a.title}</h4>
              <p style="font-size:13px;color:var(--text-muted);">${a.date} · ${a.excerpt}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderContactPage() {
  return `
    <section class="page-hero">
      <div class="container">
        ${renderKicker('Kontak & Banding Asesmen')}
        <h1>Hubungi Sekretariat & Layanan Pengaduan</h1>
        <p>Sampaikan pertanyaan, keluhan layanan, atau pengajuan banding hasil asesmen secara resmi dan terdokumentasi.</p>
      </div>
    </section>
    <section class="section">
      <div class="container faq-split">
        <div class="card">
          <h3 style="font-size:22px;font-weight:800;margin-bottom:18px;">Formulir Pengaduan / Banding Hasil Asesmen</h3>
          <form id="contact-complaint-form" class="form-grid">
            <div class="form-group"><label>Nama Lengkap</label><input class="input" required placeholder="Nama pemohon / instansi"></div>
            <div class="form-group"><label>Email / WhatsApp</label><input class="input" required placeholder="0812... / email@domain.id"></div>
            <div class="form-group">
              <label>Kategori Layanan</label>
              <select class="input">
                <option>Pertanyaan Umum Sertifikasi</option>
                <option>Pengaduan Layanan / SLA</option>
                <option>Banding Hasil Asesmen (FR.AK.04)</option>
              </select>
            </div>
            <div class="form-group"><label>ID Izin (Opsional)</label><input class="input" placeholder="IZN-2026-xxxx"></div>
            <div class="form-group full"><label>Uraian Pesan / Alasan Banding</label><textarea class="input" required placeholder="Tuliskan detail laporan atau alasan banding secara objektif..."></textarea></div>
            <div class="form-group full"><button type="submit" class="btn btn-dark">Kirim Laporan Resmi</button></div>
          </form>
        </div>

        <div class="dark-cta-card">
          <span class="badge badge-orange" style="margin-bottom:14px;">SEKRETARIAT RESMI</span>
          <h3>NusaXNine LSP Fotografi</h3>
          <p style="margin-bottom:20px;">Gedung NusaXNine Creative Hub Lt. 3, Jl. Kebon Kacang Raya, Tanah Abang, Jakarta Pusat 10240.</p>
          <ul class="check-list" style="color:var(--white);">
            <li><span class="check-dot">${ICONS.check}</span> Telp: (021) 5089-2409</li>
            <li><span class="check-dot">${ICONS.check}</span> WhatsApp: +62 812-2409-2026</li>
            <li><span class="check-dot">${ICONS.check}</span> Email: sekretariat@nusaxninelsp.id</li>
          </ul>
          <a href="#/alur" class="btn btn-lime btn-block">Pelajari Kebijakan SLA</a>
        </div>
      </div>
    </section>
  `;
}

function buildVerifyResultHtml(db, query) {
  const q = query.trim().toLowerCase();
  const found = db.applications.find(a =>
    a.permitId.toLowerCase() === q ||
    (a.certNumber && a.certNumber.toLowerCase() === q)
  );
  if (!found) {
    return `<div class="card" style="border-color:var(--dark);text-align:left;">Data dengan ID <strong>${query}</strong> tidak ditemukan dalam registri LSP.</div>`;
  }
  const scheme = getSchemeById(db, found.schemeId);
  return `
    <div class="card" style="border:2px solid var(--dark);text-align:left;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
        <span class="badge badge-navy">${found.permitId}</span>
        <span class="badge ${statusBadgeClass(found.status)}">Status: ${found.status}</span>
      </div>
      <h4 style="font-size:19px;font-weight:800;">${found.fullname}</h4>
      <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:10px;">Skema: <strong>${scheme.name}</strong> (${scheme.code})</p>
      <div style="font-size:13px;display:grid;gap:4px;">
        <div>Nomor Sertifikat: <strong>${found.certNumber || 'Belum terbit (dalam proses)'}</strong></div>
        <div>TUK / Asesor: <strong>${found.tuk}</strong> ${found.assessor ? `· ${found.assessor}` : ''}</div>
        <div>Keterangan Progres: <strong>${found.deadline}</strong></div>
      </div>
    </div>
  `;
}

export function bindPublicEvents(db) {
  document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
    btn.onclick = () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('open');
      parent.parentElement.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        const sp = item.querySelector('.faq-q span');
        if (sp) sp.textContent = '+';
      });
      if (!isOpen) {
        parent.classList.add('open');
        const sp = btn.querySelector('span');
        if (sp) sp.textContent = '−';
      }
    };
  });

  let testiIdx = 0;
  const renderTesti = () => {
    const t = TESTIMONIALS[testiIdx];
    const q = document.getElementById('testi-quote');
    const n = document.getElementById('testi-name');
    const r = document.getElementById('testi-role');
    const s = document.getElementById('testi-score');
    if (q && n && r && s) {
      q.textContent = t.quote;
      n.textContent = t.name;
      r.textContent = t.role;
      s.textContent = t.score;
    }
  };
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => { testiIdx = (testiIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length; renderTesti(); };
    nextBtn.onclick = () => { testiIdx = (testiIdx + 1) % TESTIMONIALS.length; renderTesti(); };
  }

  const bindVerify = (formId, inputId, resId) => {
    const form = document.getElementById(formId);
    if (!form) return;
    form.onsubmit = e => {
      e.preventDefault();
      const val = document.getElementById(inputId).value;
      document.getElementById(resId).innerHTML = buildVerifyResultHtml(db, val);
    };
  };
  bindVerify('home-verify-form', 'home-verify-input', 'home-verify-result');
  bindVerify('page-verify-form', 'page-verify-input', 'page-verify-result');

  const consultForm = document.getElementById('home-consult-form');
  if (consultForm) {
    consultForm.onsubmit = e => {
      e.preventDefault();
      consultForm.reset();
      showToast('Permintaan konsultasi terkirim. Admin LSP akan menghubungi dalam 1x24 jam.');
    };
  }

  const contactForm = document.getElementById('contact-complaint-form');
  if (contactForm) {
    contactForm.onsubmit = e => {
      e.preventDefault();
      contactForm.reset();
      showToast('Laporan / pengajuan banding resmi telah tercatat.');
    };
  }
}