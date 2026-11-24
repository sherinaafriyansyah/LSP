export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api',
  USE_MOCK: true
};

export function getToken() {
  return localStorage.getItem('lsp_token') || '';
}

export function setSession(user, token) {
  localStorage.setItem('lsp_user', JSON.stringify(user));
  localStorage.setItem('lsp_token', token || 'mock-jwt-token');
}

export function getSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('lsp_user') || 'null');
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem('lsp_user');
  localStorage.removeItem('lsp_token');
}

export async function apiRequest(endpoint, { method = 'GET', body = null, isFormData = false } = {}) {
  if (API_CONFIG.USE_MOCK) {
    return { mocked: true };
  }
  const headers = { Accept: 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Permintaan gagal diproses.');
  return data;
}