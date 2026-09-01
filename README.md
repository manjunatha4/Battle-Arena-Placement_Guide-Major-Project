# Battle Arena — AI-Powered Placement Preparation & Mock Interview Platform

**AI & Machine Learning-based platform that prepares students for campus placements through adaptive mock interviews with real-time audio-visual feedback, custom-trained NLP evaluation models, DSA learning paths, aptitude battle arenas, contest tracking, and skill-based job recommendations** — built as a final-year major project (VTU, Phase 2) at SIET, Tumakuru.

**Guide:** Kiran GM, Dept. of CSE  
**Team:** BS Dhanush Yadav, Ganesh K, Lakshmish A, Manjunatha R

---

## What this project does

| Feature | Description |
|---|---|
| **AI Mock Interview & ML Evaluation** | Simulates real placement interviews with speech recognition, webcam analysis, and live feedback on speech pace, eye contact, posture, and confidence. Evaluates answers using a custom **Random Forest Regressor** & **Gradient Boosting Classifier** pipeline. |
| **Resume-Based Adaptive Questions** | Upload resume (PDF/DOCX); our trained **TF-IDF + Multinomial Naive Bayes Domain Classifier** extracts skills, classifies candidate domain, and generates targeted technical interview questions. |
| **Placement Readiness Scoring** | Multi-feature ML evaluation engine (WPM, filler penalty, semantic depth, response length) predicting overall readiness score (0–100%) and candidate placement status. |
| **DSA Learning Path** | Structured learning modules covering Arrays, Strings, Binary Search, Recursion, Linked Lists, Stacks & Queues, Heaps, Binary Trees, and BSTs — with video lectures and assignments. |
| **Aptitude Battle Arena** | Gamified aptitude test system where students select a "Fighter Class" (Math Mage, Logic Knight, Grammar Rogue) and battle through placement-level questions with combo streaks and scoring. |
| **Contest Tracker** | Aggregates upcoming contests from LeetCode, HackerRank, CodeForces, CodeChef, AtCoder, and TopCoder with notification subscriptions. |
| **Job Recommendations** | Skill-based job matching candidate profile against industry openings. |
| **Alumni Connect** | Network with placed alumni for guidance, referrals, and mentorship. |

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + Framer Motion |
| Backend (Node.js) | Node.js + Express + Multer + Mongoose |
| Backend (Python / ML) | Python 3.12 + FastAPI + Uvicorn + Jupyter |
| Machine Learning & NLP | Scikit-Learn (Random Forest, Gradient Boosting, Naive Bayes, TF-IDF Vectorizer), NumPy, Pandas, Joblib |
| Database | MongoDB Atlas (via Mongoose ODM) |
| Audio & Vision Processing | Web Speech API (SpeechRecognition & SpeechSynthesis), MediaDevices (Webcam) |
| Resume Parsing | pdf-parse, mammoth (DOCX) |
| Authentication | JWT (JSON Web Tokens) + Google OAuth 2.0 |
| Hosting | Vercel / Render (free tier) |

---

## Custom Machine Learning Architecture

Our placement evaluation system uses a custom **Ensemble ML Pipeline** trained on placement interview datasets:

```
+-----------------------------------------------------------------------------------+
|                           BATTLE ARENA ML PIPELINE                                |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Candidate Resume]  --->  [TF-IDF N-Gram Vectorizer]  --->  [Multinomial NB]     |
|                                                              (Domain Classifier)  |
|                                                                    |              |
|                                                                    v              |
|                                                      [Adaptive Question Engine]   |
|                                                                    |              |
|  [Interview Q&A]     --->  [Feature Extraction]                    v              |
|  - Speech Pace (WPM)       - Semantic Relevance          [5 Targeted Questions]   |
|  - Filler Word Count       - Technical Depth                       |              |
|  - Response Word Count     - Confidence Level                      v              |
|                                     |                         [Candidate Answer]  |
|                                     v                              |              |
|              +--------------------------------------+              |              |
|              |      TRAINED ENSEMBLE ML MODELS      | <------------+              |
|              +--------------------------------------+                             |
|              | 1. Random Forest Regressor (Score)   |                             |
|              |    - R² Score: 0.85 | MAE: 2.94      |                             |
|              | 2. Gradient Boosting (Status Class)  |                             |
|              |    - Accuracy: 82.5% | F1: 0.823     |                             |
|              +--------------------------------------+                             |
|                                     |                                             |
|                                     v                                             |
|                   [Comprehensive Performance Report]                              |
|                   - Overall Score (0-100%)                                        |
|                   - Placement Status (Ready / Needs Prep / Star)                  |
|                   - Lagging Areas & AI Coach Insights                             |
+-----------------------------------------------------------------------------------+
```

### Model Performance Metrics

| Model | Algorithm | Primary Metric | Purpose |
|---|---|---|---|
| **Domain Classifier** | Multinomial Naive Bayes + TF-IDF (1500 features) | **100.0% Accuracy** | Classifies candidate resume domain into Full-Stack, ML/AI, Core DSA/OS, Cloud, Mobile |
| **Readiness Regressor** | Random Forest Regressor (120 Estimators, Depth=12) | **R²: 0.85, MAE: 2.94** | Predicts quantitative placement readiness score (0–100%) |
| **Placement Classifier** | Gradient Boosting Classifier (100 Estimators, lr=0.08) | **82.5% Accuracy, 0.823 F1** | Categorizes candidates into: *Needs Preparation*, *Placement Ready*, *Top Performer* |

---

## Team Roles & Assigned Technical Deliverables

All four team members have dedicated, balanced ownership across the software, database, and machine learning pipeline:

| Team Member | Core Role | Assigned Technical Modules | Working Directory |
|---|---|---|---|
| **Manjunatha R** | **ML Model Training & Database Lead** | Supervised ML Model Training (Random Forest Regressor, Gradient Boosting Classifier), Jupyter Notebook Pipeline (`Placement_ML_Model_Training.ipynb`), MongoDB Atlas Database Schema Design (`models/`), and Model Serialization. | `backend-Py/` & `backend-Node/` |
| **BS Dhanush Yadav** | **Backend REST APIs & Auth Lead** | RESTful APIs (Express.js), JWT & Google OAuth 2.0 Authentication, Protected Routes (`authMiddleware.js`), Multer Resume Upload & Text Extraction (`pdf-parse`, `mammoth`). | `backend-Node/` |
| **Ganesh K** | **NLP Pipeline & Model Evaluation Lead** | NLP Resume Skill Extractor (TF-IDF N-Gram Vectorizer + Naive Bayes), Domain-Adaptive Question Engine, Model Metrics & Cross-Validation, FastAPI Serving (`main.py`). | `backend-Py/` |
| **Lakshmish A** | **Frontend UI & Audio-Visual Lead** | React 18 + Vite Platform, Web Speech API (Speech Recognition & TTS), Live Webcam Stream HUD, Student Dashboard, Mock Interview Flow, and Glassmorphism Design System. | `frontend/` |

---

## Git guide for beginners

### One-time setup
```bash
git clone <your-repo-url>
cd battle-arena
git checkout -b your-branch-name
git push -u origin your-branch-name
```

### Daily workflow
```bash
git checkout your-branch-name
git pull origin main
# Do your work
git add .
git commit -m "short message describing what you did"
git push
```

---

## Folder structure

```
battle-arena/
├── backend-Node/          ← BS Dhanush Yadav (Node.js APIs, Auth, Multer, Express)
│   ├── config/            ← Database connection (MongoDB Atlas)
│   ├── controllers/       ← userController.js, interviewController.js
│   ├── middlewares/       ← JWT auth middleware
│   ├── models/            ← Mongoose schemas (User, Resume, OTP)
│   ├── routes/            ← API route definitions
│   ├── uploads/           ← Uploaded resumes (PDF/DOCX)
│   ├── utils/             ← Token generation utilities
│   ├── index.js           ← Express server entry point
│   └── PROGRESS.md        ← Dhanush progress log
├── backend-Py/            ← Ganesh K & Manjunatha R (Python FastAPI, ML Training & Jupyter)
│   ├── dataset/           ← Training datasets (placement_interview_data.csv, domain_classification_dataset.csv)
│   ├── trained_models/    ← Serialized models (domain_classifier.pkl, readiness_regressor.pkl, placement_classifier.pkl)
│   ├── train_models.py    ← Model training script with evaluation metrics
│   ├── Placement_ML_Model_Training.ipynb ← Interactive Jupyter Notebook for presentation
│   ├── main.py            ← FastAPI server serving ML prediction endpoints
│   ├── requirements.txt   ← Python dependencies
│   └── PROGRESS.md        ← Ganesh & Manjunatha ML progress log
├── frontend/              ← Lakshmish A & Manjunatha R (React + Vite)
│   ├── src/
│   │   ├── pages/         ← Dashboard, MockInterview, DSA, Contests, Aptitude, Alumni, Jobs
│   │   ├── components/    ← Navbar, Sidebar, AuthModal, ThemeProvider, etc.
│   │   ├── context/       ← Auth & Theme contexts
│   │   └── config/        ← API base URL config
│   ├── index.html         ← HTML entry point
│   ├── vite.config.js     ← Vite build config
│   └── PROGRESS.md        ← Lakshmish & Manjunatha progress log
└── README.md
```

---

## Sprint plan (2-week cycles)

| Sprint | Weeks | Focus |
|---|---|---|
| **Sprint 1** | Weeks 1–2 | Setup, database schema, backend APIs (Auth, User CRUD) |
| **Sprint 2** | Weeks 3–4 | Custom ML model training (Random Forest, Gradient Boosting, NLP) & FastAPI pipeline |
| **Sprint 3** | Weeks 5–6 | DSA Learning Path + Battle Arena + Contest Tracker |
| **Sprint 4** | Weeks 7–8 | Deployment, testing, report writing, viva prep |

---

## How to train the ML models & run locally

### 1. Interactive Jupyter Notebook (Best for Project Guide & Viva)
```bash
cd backend-Py
jupyter notebook Placement_ML_Model_Training.ipynb
```
*Or open `Placement_ML_Model_Training.ipynb` directly in VS Code.*

### 2. Retrain the Machine Learning Models via Terminal
```bash
cd backend-Py
python train_models.py
```
*Output: Generates datasets, evaluates models, and saves `.pkl` model artifacts into `trained_models/`.*

### 3. Start the Python ML FastAPI Server
```bash
cd backend-Py
pip install -r requirements.txt
python main.py
```
*Runs on: `http://localhost:8000`*

### 4. Start the Node.js Backend Server
```bash
cd backend-Node
npm install
npm start
```
*Runs on: `http://localhost:3000`*

### 5. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on: `http://localhost:5173`*

---

## License

This project is built for academic purposes as part of the VTU Final Year Major Project at SIET, Tumakuru.
