# PLAN.md — Battle Arena Placement Preparation Platform
## Complete Build Plan (Phase 0 → Phase 8)

**Project:** AI & Machine Learning-Based Placement Preparation, Adaptive Mock Interview & Performance Evaluation Platform  
**Guide:** Kiran GM, Dept. of CSE, SIET Tumakuru (VTU Belagavi)  
**Team:** BS Dhanush Yadav, Ganesh K, Lakshmish A, Manjunatha R  
**Status:** Phase-1 Synopsis & Architecture approved. Phase-2 full-stack engineering & ML model deployment build plan.

---

## Current Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend (Node.js) | Node.js + Express.js + Multer + Mongoose |
| Backend (Python / ML) | Python 3.12 + FastAPI + Uvicorn |
| ML & NLP | Scikit-learn (Random Forest, Gradient Boosting, Multinomial Naive Bayes, TF-IDF), NumPy, Pandas, Joblib |
| Database | MongoDB Atlas (Cloud) via Mongoose ODM |
| Audio & Vision | Web Speech API (SpeechRecognition & SpeechSynthesis), MediaDevices (Webcam) |
| Resume Processing | `pdf-parse` (PDF) + `mammoth` (DOCX) |
| Authentication | JWT (JSON Web Tokens) + Google OAuth 2.0 (`@react-oauth/google`) |
| Deployment | Render / Railway (Backends), Vercel (Frontend) |
| Version Control | GitHub — branches: `backend-dev`, `ml-model`, `patient-app` (student-ui), `staff-dashboard` (modules) |

---

## Overview: 4 Moving Pieces

1. **Database (MongoDB Atlas)** — Stores users, authentication credentials, uploaded resume metadata, interview responses, battle history, and progress analytics.
2. **Node.js REST API Server (`backend-Node/`)** — Handles user auth, JWT cookies, Google OAuth, resume uploads, and routing.
3. **Python ML Engine (`backend-Py/`)** — Custom-trained NLP domain classifier, Random Forest score regressor, Gradient Boosting hiring tier classifier, and FastAPI inference endpoints.
4. **React Student Platform (`frontend/`)** — Interactive student dashboard, AI Mock Interview with real-time video/speech feedback, DSA Learning Path, and Gamified Aptitude Battle Arena.

Total: **8 Phases**, executed in strict dependency order.

---

## PHASE 0 — Setup & Environment Configuration
**Duration:** 1–2 days  
**Owner:** All Team Members

- Confirm GitHub repository and branches exist: `backend-dev`, `ml-model`, `patient-app`, `staff-dashboard`.
- Install prerequisites: Node.js (v18+), Python (3.11+), Git, VS Code.
- Set up cloud MongoDB Atlas database cluster and configure connection string.
- Create initial FastAPI server returning `{"status": "online", "service": "Battle Arena ML Engine"}` on `localhost:8000`.
- Create initial Express server returning `{"status": "ready"}` on `localhost:3000`.
- Verify React Vite frontend runs on `localhost:5173`.

**Goal:** All 3 subsystems run locally with zero startup errors.

---

## PHASE 1 — Database Modeling & Schema Architecture
**Duration:** 2–3 days  
**Owner:** Manjunatha R (`backend-dev` / database)

Mongoose Schemas to build:

| Collection / Schema | Purpose | Key Attributes |
|---|---|---|
| `users` | User credentials & profiles | `name`, `email`, `password` (hashed), `googleId`, `avatar`, `role`, `createdAt` |
| `resumes` | Resume file tracking & metadata | `fileName`, `fileId`, `contentType`, `userEmail`, `uploadTimestamp` |
| `interviews` | Interview session records | `userId`, `answers` (Q&A array), `overallScore`, `clarity`, `speechPace`, `feedback` |
| `battle_history` | Aptitude game sessions | `userId`, `fighterClass`, `score`, `streak`, `accuracy`, `date` |
| `dsa_progress` | Topic completion tracking | `userId`, `topicId`, `lecturesCompleted`, `assignmentsSolved` |
| `otps` | Email OTP verification | `email`, `otp`, `expiresAt` |

**Goal:** All Mongoose models defined in `models/`, connected to MongoDB Atlas, and validated with test insertions.

---

## PHASE 2 — Core Backend REST APIs & Authentication
**Duration:** 1–1.5 weeks  
**Owner:** BS Dhanush Yadav (`backend-dev`)

Build in this exact order:

1. **Authentication API:**
   - `POST /api/users` — Registration with password hashing (`bcryptjs`) & email OTP
   - `POST /api/users/auth` — Email/password login with HTTP-only JWT cookie
   - `POST /api/users/auth/google/client` — Google OAuth token verification and account creation
   - `POST /api/users/logout` — Secure cookie clearance
2. **User Profile API:**
   - `GET /api/users/profile` — Fetch authenticated user profile (protected by `authMiddleware.js`)
   - `PUT /api/users/profile` — Update user details
3. **Resume Upload API:**
   - `POST /api/interview/upload-resume` — Multer disk storage handler for `.pdf` and `.docx`
   - Text extraction using `pdf-parse` and `mammoth`
4. **Offline Mode Resilience:**
   - In-memory mock storage fallback for local development when database is offline

**Goal:** All auth and upload endpoints tested via Postman / frontend modals with real JWT token cookies.

---

## PHASE 3 — Custom Machine Learning & NLP Pipeline
**Duration:** 1–1.5 weeks  
**Owners:** Manjunatha R & Ganesh K (`ml-model`)

Build in `backend-Py/`:

1. **Dataset Engineering (`dataset/`):**
   - Generate `placement_interview_data.csv` (1,200 instances) with features: `speech_wpm`, `filler_count`, `word_count`, `semantic_relevance`, `technical_depth`, `confidence_score`, `readiness_score`, `placement_status`.
   - Generate `domain_classification_dataset.csv` (600 resume profiles across 5 domains).
2. **Model 1: NLP Domain & Skill Classifier:**
   - TF-IDF N-Gram Vectorizer (1,500 features) + Multinomial Naive Bayes (Laplace smoothing $lpha=0.1$).
   - 100.0% validation accuracy across 5 engineering specializations.
3. **Model 2: Placement Readiness Score Regressor:**
   - Random Forest Regressor (120 Estimators, max_depth=12).
   - Evaluate $R^2$ score ($0.85$), MAE ($2.94$), and RMSE.
4. **Model 3: Candidate Hiring Tier Classifier:**
   - Gradient Boosting Classifier (100 estimators, $lr=0.08$).
   - Classifies candidates into: *Needs Preparation*, *Placement Ready*, *Top Performer Star* (82.5% accuracy, 0.823 F1).
5. **Model Serialization & Export:**
   - Save binary models via `joblib.dump()` into `trained_models/*.pkl`.
6. **Jupyter Notebook (`Placement_ML_Model_Training.ipynb`):**
   - Document complete EDA, training runs, loss graphs, confusion matrices, and inference tests for the project guide.
7. **FastAPI Serving (`main.py`):**
   - Expose `POST /api/ml/extract-skills`, `POST /api/ml/generate-questions`, `POST /api/ml/evaluate-interview`, and `GET /api/ml/model-info`.

**Goal:** All 4 ML models trained, serialized to `.pkl`, tested in Jupyter Notebook, and serving live predictions on port 8000.

---

## PHASE 4 — Audio-Visual Stream & Real-Time Feedback Logic
**Duration:** 3–4 days  
**Owner:** Lakshmish A (`patient-app`)

1. **Webcam Stream Integration:**
   - WebRTC `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`.
   - Mirrored camera view using CSS `scaleX(-1)` transform for natural eye-contact experience.
2. **Speech-to-Text (Transcription):**
   - Web Speech API `SpeechRecognition` / `webkitSpeechRecognition`.
   - Continuous listening mode with live interim transcription preview and persistent base text appending.
3. **Text-to-Speech (AI Voice):**
   - `SpeechSynthesisUtterance` with natural speech rate (`1.2`–`1.45`) and professional pitch modulation.
4. **Live Metric Simulation Feed:**
   - Real-time HUD cues for Speech Pace (WPM), Eye Contact alignment, Posture stability, and Confidence score.

**Goal:** User speaks into the microphone and sees live real-time transcription while the webcam feed runs with zero freezing.

---

## PHASE 5 — Student Core UI & AI Mock Interview Flow
**Duration:** 1–1.5 weeks  
**Owner:** Lakshmish A (`patient-app`)

Build screens in order:

1. **Landing Page:** Hero section, platform features, animated CTA buttons, and responsive navbar.
2. **Authentication Modals:** Seamless Login / Sign Up tabs with Google OAuth one-tap button.
3. **Student Dashboard (`/app`):**
   - Stat cards: Resume Score, Total Interviews Given, Rank Level, Active Streak.
   - Quick Action: Start AI Mock Interview.
   - Job Recommendations feed with matching percentages.
   - DSA Progress tracker.
4. **AI Mock Interview (`/app/interview`):**
   - Mode Selector: General Practice ("raw") vs Resume-Driven ("resume").
   - Question card with "Re-play Audio" and "Question X of 5" badge.
   - "Click to Speak" recording button with live transcript text box.
   - "Finish Answer" handler saving answer array and advancing to next question.
   - End-of-Session Performance Report with overall ML score, metrics, lagging areas, and downloadable feedback file (`.txt`).
5. **Profile & Settings Pages (`/app/profile`, `/app/settings`):**
   - User profile management, theme customization, and account preferences.

**Goal:** A student can complete a full 5-question mock interview, speak answers, view live feedback, and download their AI evaluation report.

---

## PHASE 6 — Gamified Learning Modules & Design System
**Duration:** 1 week  
**Owner:** Manjunatha R (`staff-dashboard`)

Build modules in order:

1. **DSA Learning Path (`/app/dsa`):**
   - 10+ topic cards: Arrays, Strings, Binary Search, Recursion, Bit Manipulation, Sliding Window, Greedy, Linked Lists, Stacks & Queues, Heaps, Binary Trees, BST.
   - Expandable lecture video player and assignment checklist.
2. **Aptitude Battle Arena (`/app/aptitude`):**
   - 3 Fighter Classes: *Math Mage*, *Logic Knight*, *Grammar Rogue*.
   - Battle UI with combo streaks, countdown timer, XP level progression, and question bank selector (TCS, Infosys, Wipro).
   - Battle History and Analytics breakdown.
3. **Contest Tracker (`/app/contests`):**
   - Competitive programming platform explorer: LeetCode, HackerRank, CodeForces, CodeChef, AtCoder, TopCoder.
   - Notification subscription toggle and upcoming contest schedule modal.
4. **Alumni Connect (`/app/alumni`):**
   - Placed alumni cards with company tags, role, graduation batch, and Connect button.
5. **Job Recommendations (`/app/job`):**
   - AI job match feed with direct apply links.
6. **Design System & Glassmorphism (`index.css`):**
   - Custom utility tokens (`glass-panel`, `glass-button`, `glass-input`).
   - Premium typography pairing: **Plus Jakarta Sans** (headings) + **Inter** (body).
   - Dynamic dark/light theme switching with CSS variables.

**Goal:** All learning modules, Battle Arena, contest tracking, and theme switching fully functional and visually cohesive.

---

## PHASE 7 — End-to-End Integration & Robustness Testing
**Duration:** 3–5 days  
**Owner:** All Team Members

Test complete end-to-end user journeys:

- [ ] **Resume Flow:** Upload resume (PDF/DOCX) → verify text extraction → verify ML domain classifier → verify 5 adaptive questions generated.
- [ ] **Speech Flow:** Click "Click to Speak" on Q1 through Q5 → verify audio transcribe cleanly → test question audio playback.
- [ ] **ML Scoring Flow:** Complete interview → verify Random Forest predicted score and Gradient Boosting hiring status tier in report.
- [ ] **Battle Arena Flow:** Pick Fighter Class → play round → verify XP/score increments correctly.
- [ ] **Cross-Browser Compatibility:** Verify speech recognition & camera in Google Chrome, Microsoft Edge, and Brave.
- [ ] **Failover Resilience:** Verify backend gracefully falls back to embedded ML heuristics if Python service restarts.

**Goal:** Zero console errors, smooth page transitions, and stable speech/video handling throughout the entire user journey.

---

## PHASE 8 — Deployment & Viva Presentation Prep
**Duration:** 2–3 days  
**Owner:** All Team Members

1. **Production Deployment:**
   - Python ML FastAPI Engine → Render / Railway
   - Node.js Backend → Render / Railway
   - React Frontend → Vercel
   - MongoDB Atlas → Whitelist production IP ranges (`0.0.0.0/0`)
2. **Live URL Verification:** Verify deployed web app against production backend endpoints.
3. **Viva Demonstration Deliverables:**
   - **Live Web App:** Deployed URL / `localhost:5173`
   - **Interactive Jupyter Notebook:** `backend-Py/Placement_ML_Model_Training.ipynb` for showing model training & graphs to examiners.
   - **Swagger API Docs:** `http://localhost:8000/docs` showing live FastAPI ML endpoints.
   - **Source Code Repository:** GitHub repository with clean branch histories and individual `PROGRESS.md` logs.

**Goal:** A fully working, deployed platform ready for examination and review by Dr. / Prof. Kiran GM.

---

## Suggested Timeline (6–7 Weeks Total)

| Week | Focus Areas | Key Deliverables |
|---|---|---|
| **Week 1** | Phase 0 + Phase 1 | Environment setup, MongoDB schemas, initial backend stubs |
| **Week 2–3** | Phase 2 + Phase 3 | Authentication APIs, Resume parser, ML dataset generation, Model training (`.pkl` + Jupyter) |
| **Week 3–4** | Phase 4 + Phase 5 | Web Speech transcription, camera mirror, Interview HUD, Student Dashboard |
| **Week 4–5** | Phase 5 + Phase 6 | End-to-end Mock Interview report, DSA Learning Path, Aptitude Battle Arena |
| **Week 6** | Phase 6 + Phase 7 | Contest Tracker, Alumni Connect, Theme polish, Integration testing |
| **Week 7** | Phase 8 | Cloud deployment, Jupyter presentation rehearsal, Final Viva prep |

---

## Team Work Split & Ownership (4 Members)

| Team Member | Primary Responsibility | Key Deliverables |
|---|---|---|
| **Manjunatha R** | **ML Model Training & Database Lead** | Phase 1 (Database Schemas & Modeling), Phase 3 (Supervised ML Model Training, Random Forest & Gradient Boosting, Jupyter Notebook Pipeline), `backend-Py/PROGRESS.md` |
| **BS Dhanush Yadav** | **Backend REST APIs & Auth Lead** | Phase 2 (Core REST APIs, JWT & Google OAuth, Resume Parser & Multer Storage), `backend-Node/PROGRESS.md` |
| **Ganesh K** | **NLP Pipeline & Model Evaluation Lead** | Phase 3 (NLP Resume Skill Extractor, Domain-Adaptive Question Engine, FastAPI Model Serving `main.py`), `backend-Py/PROGRESS.md` |
| **Lakshmish A** | **Frontend UI & Audio-Visual Lead** | Phase 4 (Speech & Camera Stream), Phase 5 (Student Dashboard, Mock Interview UI, Auth Modals), Phase 6 (DSA Path & Battle Arena UI), Phase 7 (Testing) |

*Every team member maintains their continuous `PROGRESS.md` log after each session.*

---

## Outstanding Item Carried Over From Phase 1

> **Correction Required:** Figure 4.1 in Chapter 4 of the Phase-1 report incorrectly displays Holland's RIASEC career-guidance hexagon. **In the Phase-2 Major Project Report, this must be replaced with the actual Battle Arena System Architecture Diagram** (React Frontend + Web Speech API → Node.js Express Gateway → Python FastAPI ML Engine [Random Forest & TF-IDF NLP] → MongoDB Atlas).
