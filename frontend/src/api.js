// src/api.js
const API = import.meta.env.VITE_API_URL;

// Example test call
export const testBackend = async () => {
  const res = await fetch(`${API}/api/test`);
  return res.json();
};

// Example user register call
export const registerUser = async (userData) => {
  const res = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};
