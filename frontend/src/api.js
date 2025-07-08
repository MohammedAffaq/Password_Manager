// src/api.js
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api"
  : "/api";

// GET all passwords
export const getPasswords = async () => {
  const res = await fetch(`${BASE_URL}/passwords`);
  return await res.json();
};

// POST a password
export const savePasswordToDB = async (data) => {
  const res = await fetch(`${BASE_URL}/passwords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// DELETE a password
export const deletePasswordFromDB = async (data) => {
  const res = await fetch(`${BASE_URL}/passwords`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
