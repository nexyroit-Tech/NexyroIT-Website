const PRIMARY_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const FALLBACK_URL = PRIMARY_URL.includes("localhost")
  ? PRIMARY_URL.replace("localhost", "127.0.0.1")
  : PRIMARY_URL;

let activeBaseUrl = PRIMARY_URL;

async function resilientFetch(endpoint, options = {}) {
  try {
    return await fetch(`${activeBaseUrl}${endpoint}`, options);
  } catch (err) {
    if (activeBaseUrl !== FALLBACK_URL) {
      activeBaseUrl = FALLBACK_URL;
      return await fetch(`${activeBaseUrl}${endpoint}`, options);
    }
    throw err;
  }
}

export const chatAPI = {
  sendMessage: async (message, conversationHistory = []) => {
    const response = await resilientFetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || `Server error: ${response.status}`);
    }
    return response.json();
  },

  getAvailability: async (date) => {
    const response = await resilientFetch(
      `/api/calendar/availability?date=${date}`
    );
    if (!response.ok) throw new Error("Failed to fetch availability");
    return response.json();
  },

  bookConsultation: async (bookingData) => {
    const response = await resilientFetch(`/api/calendar/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to book consultation");
    }
    return response.json();
  },

  healthCheck: async () => {
    const response = await resilientFetch(`/api/health`);
    if (!response.ok) throw new Error("Backend unavailable");
    return response.json();
  },
};
