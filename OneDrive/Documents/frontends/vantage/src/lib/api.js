// Backend API service - All AI, detection, and analysis comes from backend only
const API_BASE_URL = 'http://127.0.0.1:5000';

// helper with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw new Error('Backend not reachable');
  }
};

/**
 * Health check
 * GET /
 */
export const checkHealth = async () => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/`);
  if (!response.ok) throw new Error('Health check failed');
  return response.text(); // backend returns plain text
};

/**
 * Scan a URL for threats
 * POST /predict
 */
export const scanUrl = async (url) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Failed to scan URL');
  }

  return response.json();
};

/**
 * Chat with Vantage AI
 * POST /chat
 */
export const chatWithVantage = async (message, url = null) => {
  const body = { message };
  if (url) body.url = url;

  const response = await fetchWithTimeout(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to get chat response');
  }

  return response.json();
};

/**
 * Save a threat to history
 * POST /history/add
 */
export const saveThreat = async (url, result, reason) => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/history/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, result, reason }),
  });

  if (!response.ok) {
    throw new Error('Failed to save threat');
  }

  return response.json();
};

/**
 * Get threat history
 * GET /history
 */
export const getThreatHistory = async () => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
};

/**
 * Get dashboard stats
 * GET /stats
 */
export const getDashboardStats = async () => {
  const response = await fetchWithTimeout(`${API_BASE_URL}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};
