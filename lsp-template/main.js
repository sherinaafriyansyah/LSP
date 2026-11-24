import { loadDB } from './js/store.js';
import { getSessionUser } from './js/api.js';
import { renderPublicLayout, renderDashboardLayout, bindGlobalLayoutEvents, showToast } from './js/layout.js';
import {
  renderHomePage, renderAboutPage, renderSchemesPage, renderSchemeDetailPage,
  renderFlowPage, renderTukPage, renderAssessorsPage, renderSchedulesPage,
  renderVerifyPage, renderNewsPage, renderContactPage, bindPublicEvents
} from './js/pages-public.js';
import { renderLoginPage, renderRegisterPage, renderForgotPasswordPage, bindAuthEvents } from './js/pages-auth.js';
import {
  renderUserDashboard, renderUserPengajuan, renderUserApl,
  renderUserPayment, renderUserAssessment, renderUserDocuments, bindUserEvents
} from './js/pages-user.js';
import {
  renderAdminOverview, renderAdminVerifikasi, renderAdminTagihan,
  renderAdminJadwal, renderAdminAsesmen, renderAdminDokumen,
  renderSuperAdminsPage, renderSuperMasterPage, bindAdminEvents
} from './js/pages-admin.js';

function getCurrentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash.startsWith('/') ? hash : '/';
}

function navigate(path) {
  window.location.hash = `#${path}`;
}

function renderApp() {
  const app = document.getElementById('app');
  const db = loadDB();
  const path = getCurrentPath();
  const user = getSessionUser();

  window.scrollTo(0, 0);

  if (path === '/login') {
    app.innerHTML = renderLoginPage();
    bindAuthEvents(navigate);
    return;
  }
  if (path === '/register') {
    app.innerHTML = renderRegisterPage();
    bindAuthEvents(navigate);
    return;
  }
  if (path === '/forgot-password') {
    app.innerHTML = renderForgotPasswordPage();
    bindAuthEvents(navigate);
    return;
  }

  if (path.startsWith('/dashboard')) {
    if (!user) {
      showToast('Silakan login terlebih dahulu.');
      navigate('/login');
      return;
    }
    let content = '';
    const aplMatch = path.match(/^\/dashboard\/permohonan\/(\d+)\/apl$/);
    const payMatch = path.match(/^\/dashboard\/permohonan\/(\d+)\/pembayaran$/);
    const asmMatch = path.match(/^\/dashboard\/permohonan\/(\d+)\/asesmen$/);

    if (path === '/dashboard') content = renderUserDashboard(db, user);
    else if (path === '/dashboard/pengajuan') content = renderUserPengajuan(db, user);
    else if (aplMatch) content = renderUserApl(db, aplMatch[1]);
    else if (payMatch) content = renderUserPayment(db, payMatch[1]);
    else if (asmMatch) content = renderUserAssessment(db, asmMatch[1]);
    else if (path === '/dashboard/dokumen') content = renderUserDocuments(db, user);
    else content = renderUserDashboard(db, user);

    app.innerHTML = renderDashboardLayout(path, user, content);
    bindGlobalLayoutEvents(navigate);
    bindUserEvents(db, user, navigate);
    return;
  }

  if (path.startsWith('/admin') || path.startsWith('/super-admin')) {
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      showToast('Akses terbatas untuk Admin LSP.');
      navigate('/login');
      return;
    }
    if (path.startsWith('/super-admin') && user.role !== 'super_admin') {
      showToast('Halaman ini khusus untuk Super Admin.');
      navigate('/admin');
      return;
    }

    let content = '';
    if (path === '/admin') content = renderAdminOverview(db);
    else if (path === '/admin/verifikasi') content = renderAdminVerifikasi(db);
    else if (path === '/admin/tagihan') content = renderAdminTagihan(db);
    else if (path === '/admin/jadwal') content = renderAdminJadwal(db);
    else if (path === '/admin/asesmen') content = renderAdminAsesmen(db);
    else if (path === '/admin/dokumen') content = renderAdminDokumen(db);
    else if (path === '/super-admin/admins') content = renderSuperAdminsPage(db);
    else if (path === '/super-admin/master') content = renderSuperMasterPage(db);
    else content = renderAdminOverview(db);

    app.innerHTML = renderDashboardLayout(path, user, content);
    bindGlobalLayoutEvents(navigate);
    bindAdminEvents(db, navigate);
    return;
  }

  let publicHtml = '';
  const schemeDetailMatch = path.match(/^\/skema\/(\d+)$/);

  if (path === '/') publicHtml = renderHomePage(db);
  else if (path === '/tentang') publicHtml = renderAboutPage();
  else if (path === '/skema') publicHtml = renderSchemesPage(db);
  else if (schemeDetailMatch) publicHtml = renderSchemeDetailPage(db, schemeDetailMatch[1]);
  else if (path === '/alur') publicHtml = renderFlowPage();
  else if (path === '/tuk') publicHtml = renderTukPage(db);
  else if (path === '/asesor') publicHtml = renderAssessorsPage(db);
  else if (path === '/jadwal') publicHtml = renderSchedulesPage(db);
  else if (path === '/cek-sertifikat') publicHtml = renderVerifyPage();
  else if (path === '/berita') publicHtml = renderNewsPage(db);
  else if (path === '/kontak') publicHtml = renderContactPage();
  else publicHtml = renderHomePage(db);

  app.innerHTML = renderPublicLayout(path, publicHtml);
  bindGlobalLayoutEvents(navigate);
  bindPublicEvents(db);
}

window.addEventListener('hashchange', renderApp);
window.addEventListener('DOMContentLoaded', renderApp);