# Backend-Node — Progress Log
### Contributors: BS Dhanush Yadav (APIs & Auth), Ganesh K (Gemini Integration)

---

## Sprint 1 — Week 1 (Setup & Database)

### ✅ 2026-08-01 — Initial Backend Setup (Dhanush)
- Initialized Node.js project with Express.js framework
- Set up MongoDB Atlas cluster and connected via Mongoose ODM
- Installed core deps: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, multer
- Created .env configuration for MONGO_URI, JWT_SECRET, PORT
- Configured CORS with credentials for frontend communication

### ✅ 2026-08-03 — User Authentication System (Dhanush)
- Created User Mongoose schema (name, email, password, googleId, avatar)
- Password hashing with bcryptjs (salt rounds: 10)
- Built REST APIs:
  - POST /api/users/auth — Login with email/password
  - POST /api/users — Register new user with OTP verification
  - POST /api/users/logout — Clear JWT cookie
  - GET /api/users/profile — Get authenticated user profile
  - PUT /api/users/profile — Update user profile
- JWT token generation with 30-day expiry in HTTP-only cookies
- Created authMiddleware.js for route protection

**Errors hit:**
- MongooseError buffering timed out — Fixed by adding IP whitelist 0.0.0.0/0 in MongoDB Atlas
- CORS errors from frontend — Fixed by adding credentials: true in cors config

### ✅ 2026-08-05 — Google OAuth 2.0 Integration (Dhanush)
- Client-side Google OAuth flow using @react-oauth/google
- POST /api/users/auth/google/client endpoint
- Verifies Google access token via googleapis.com/oauth2/v3/userinfo
- Auto-creates user account on first Google login
- Added offline fallback mode (in-memory users) for MongoDB downtime

---

## Sprint 2 — Week 3 (AI Interview Backend)

### ✅ 2026-08-10 — Resume Upload & Parsing API (Dhanush)
- POST /api/interview/upload-resume with Multer diskStorage
- pdf-parse for PDF text extraction
- mammoth for DOCX text extraction
- Files stored on disk in uploads/ directory for persistence

### ✅ 2026-08-12 — AI Question Generation with Gemini (Ganesh)
- Integrated Google Gemini 1.5 Pro API for question generation
- POST /api/interview/generate endpoint
- Two modes: raw (general placement) and resume (personalized)
- Gemini generates 5 targeted questions from resume context
- Prompt engineering: system prompt instructs Gemini as senior interviewer

### ✅ 2026-08-14 — Interview Feedback Generation (Ganesh)
- POST /api/interview/feedback endpoint
- Sends Q&A pairs to Gemini for comprehensive analysis
- Returns structured JSON: overallScore, clarity, speechPace, totalWords, fillerWords, laggingAreas, insights
- Fallback mock response if backend/Gemini fails
