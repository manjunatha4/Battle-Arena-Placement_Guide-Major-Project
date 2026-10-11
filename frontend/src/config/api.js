// Central API configuration
// In production (Vercel multi-service project), use relative URL "" so requests route to backend-node on the same domain via Vercel rewrites.
// In local development, fall back to VITE_BACKEND_URL or "http://localhost:3000".
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL !== undefined
  ? import.meta.env.VITE_BACKEND_URL
  : (import.meta.env.PROD ? "" : "http://localhost:3000");

export default BACKEND_URL;
