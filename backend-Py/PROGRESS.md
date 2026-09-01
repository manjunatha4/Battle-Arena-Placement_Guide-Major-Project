# Backend-Py & ML Engine — Progress Log
### Owners: Ganesh K (ML Model Training) & Manjunatha R (NLP Pipeline & FastAPI Serving)

---

## Sprint 2 — Weeks 3-4 (Custom ML Model Training & Serving Pipeline)

### ✅ 2026-08-08 — Dataset Generation & Feature Engineering (Ganesh K)
- Engineered synthetic placement interview dataset (`dataset/placement_interview_data.csv`) with 1,200 instances
- Extracted features:
  - `speech_wpm` (Words per minute, optimal: 130–150 WPM)
  - `filler_count` (Filler words frequency penalty)
  - `word_count` (Answer depth and completeness)
  - `semantic_relevance` (Cosine similarity against domain concepts)
  - `technical_depth` (Domain keyword density score)
  - `confidence_score` (Confidence articulation metric)
- Created domain classification dataset with 600 resume profiles across 5 engineering domains

### ✅ 2026-08-10 — NLP Domain & Skill Classifier (Manjunatha R)
- Built NLP pipeline with `TfidfVectorizer` (1500 n-gram features) + `MultinomialNB`
- Trained on 5 placement specializations: Full-Stack Web, ML/Data Science, Core Systems/DSA, Cloud/DevOps, Mobile
- Achieved **100.0% accuracy** on validation split
- Serialized to `trained_models/domain_classifier.pkl` and `domain_vectorizer.pkl`

### ✅ 2026-08-12 — Placement Readiness Regressor Training (Ganesh K)
- Trained `RandomForestRegressor` (120 Estimators, max_depth=12) to predict candidate readiness score (0-100%)
- Evaluated on test split:
  - **R² Score:** `0.8456`
  - **Mean Absolute Error (MAE):** `2.94`
- Serialized to `trained_models/readiness_regressor.pkl`

### ✅ 2026-08-15 — Hiring Tier Status Classifier (Ganesh K)
- Trained `GradientBoostingClassifier` (100 estimators, learning_rate=0.08)
- Predicts 3 hiring tiers: *Needs Preparation*, *Placement Ready*, *Top Performer Star*
- Evaluated on test split:
  - **Accuracy:** `82.50%`
  - **F1-Score (Weighted):** `0.8230`
- Serialized to `trained_models/placement_classifier.pkl`

### ✅ 2026-08-18 — FastAPI ML Microservice Deployment (Manjunatha R)
- Built FastAPI microservice (`main.py`) exposing:
  - `POST /api/ml/extract-skills` — Resume domain & skill extractor
  - `POST /api/ml/generate-questions` — Domain-adaptive technical question generator
  - `POST /api/ml/evaluate-interview` — Ensemble ML interview scoring & feedback engine
  - `GET /api/ml/model-info` — Real-time model architecture & metric metadata
- Built full interactive Jupyter Notebook (`Placement_ML_Model_Training.ipynb`) documenting the entire training process.
