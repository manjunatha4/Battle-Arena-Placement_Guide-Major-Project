import os
import json
import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import mean_absolute_error, r2_score, accuracy_score, classification_report, f1_score

base_dir = r"c:\battle-arena\backend-Py"
dataset_dir = os.path.join(base_dir, "dataset")
models_dir = os.path.join(base_dir, "trained_models")
os.makedirs(dataset_dir, exist_ok=True)
os.makedirs(models_dir, exist_ok=True)

print("="*60)
print("BATTLE ARENA: TRAINING CUSTOM AI/ML PLACEMENT EVALUATOR")
print("="*60)

# 1. GENERATE SYNTHETIC REVENUE & INTERVIEW TRAINING DATASET
domains = [
    "Full-Stack Web Development",
    "Machine Learning & Data Science",
    "Core Systems, OS & DSA",
    "Cloud Computing & DevOps",
    "Mobile & App Engineering"
]

domain_keywords = {
    "Full-Stack Web Development": [
        "React", "Node.js", "Express", "MongoDB", "REST API", "Tailwind CSS", "JavaScript", "TypeScript",
        "Next.js", "Redux", "PostgreSQL", "HTML5", "CSS3", "JWT Authentication", "Webpack", "Microservices"
    ],
    "Machine Learning & Data Science": [
        "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "Deep Learning", "NLP",
        "Computer Vision", "Random Forest", "Linear Regression", "BERT", "Data Preprocessing", "Feature Engineering"
    ],
    "Core Systems, OS & DSA": [
        "C++", "Java", "Data Structures", "Algorithms", "Dynamic Programming", "Graph Theory", "Binary Trees",
        "Operating Systems", "Multithreading", "Mutex", "Memory Management", "DBMS", "SQL Queries", "System Design"
    ],
    "Cloud Computing & DevOps": [
        "Docker", "Kubernetes", "AWS", "EC2", "S3", "CI/CD Pipeline", "Terraform", "GitHub Actions",
        "Linux", "Nginx", "Prometheus", "Grafana", "Cloud Security", "Serverless Architecture"
    ],
    "Mobile & App Engineering": [
        "Flutter", "React Native", "Dart", "Swift", "Kotlin", "Android Studio", "iOS Development",
        "Mobile UI/UX", "Firebase", "State Management", "Push Notifications", "SQLite"
    ]
}

sample_resumes = []
sample_domains = []
for d_idx, (domain, kw_list) in enumerate(domain_keywords.items()):
    for i in range(120):  # 120 samples per domain = 600 samples
        selected_kw = np.random.choice(kw_list, size=np.random.randint(4, 9), replace=False)
        other_kw = np.random.choice(sum(domain_keywords.values(), []), size=np.random.randint(1, 3), replace=False)
        all_kw = list(selected_kw) + list(other_kw)
        text = f"Experience with {', '.join(all_kw[:3])}. Built projects using {', '.join(all_kw[3:6])}. Proficient in technical problem solving, {', '.join(all_kw[6:])}. Developed scalable applications and RESTful backend architectures."
        sample_resumes.append(text)
        sample_domains.append(domain)

# Save Domain Classifier Dataset
domain_df = pd.DataFrame({"resume_text": sample_resumes, "domain": sample_domains})
domain_csv_path = os.path.join(dataset_dir, "domain_classification_dataset.csv")
domain_df.to_csv(domain_csv_path, index=False)
print(f"[+] Generated Domain Dataset: {len(domain_df)} samples -> {domain_csv_path}")

# Train Domain Classifier
domain_vectorizer = TfidfVectorizer(max_features=1500, stop_words="english", ngram_range=(1, 2))
X_domain = domain_vectorizer.fit_transform(domain_df["resume_text"])
y_domain = domain_df["domain"]

X_d_train, X_d_test, y_d_train, y_d_test = train_test_split(X_domain, y_domain, test_size=0.2, random_state=42)
domain_clf = MultinomialNB(alpha=0.1)
domain_clf.fit(X_d_train, y_d_train)
d_acc = accuracy_score(y_d_test, domain_clf.predict(X_d_test))
print(f"[+] Domain Classification Model Accuracy: {d_acc * 100:.2f}%")

joblib.dump(domain_vectorizer, os.path.join(models_dir, "domain_vectorizer.pkl"))
joblib.dump(domain_clf, os.path.join(models_dir, "domain_classifier.pkl"))

# 2. GENERATE PLACEMENT READINESS & INTERVIEW PERFORMANCE DATASET
np.random.seed(42)
n_samples = 1200

speech_wpm = np.random.normal(loc=135, scale=25, size=n_samples).clip(80, 210)
filler_count = np.random.poisson(lam=4, size=n_samples).clip(0, 18)
word_count = np.random.normal(loc=180, scale=60, size=n_samples).clip(30, 450)
semantic_relevance = np.random.uniform(0.45, 0.98, size=n_samples)
technical_depth = np.random.uniform(40, 98, size=n_samples)
confidence_score = np.random.uniform(50, 99, size=n_samples)

# Formula for true readiness score + Gaussian noise
# WPM optimum is ~130-150. Penalize if <100 or >180
wpm_factor = 1.0 - (np.abs(speech_wpm - 140) / 100.0).clip(0, 0.5)
filler_penalty = (filler_count * 2.2).clip(0, 20)
length_score = (word_count / 300.0 * 20).clip(5, 20)

readiness_target = (
    0.35 * technical_depth +
    0.25 * semantic_relevance * 100 +
    0.20 * confidence_score +
    0.10 * (wpm_factor * 100) +
    length_score -
    filler_penalty +
    np.random.normal(0, 2.5, size=n_samples)
).clip(35, 99)

# Categorical Placement Status (0 = Needs Prep, 1 = Ready, 2 = Placement Star)
status_target = np.where(readiness_target >= 82, 2, np.where(readiness_target >= 68, 1, 0))

perf_df = pd.DataFrame({
    "speech_wpm": speech_wpm,
    "filler_count": filler_count,
    "word_count": word_count,
    "semantic_relevance": semantic_relevance,
    "technical_depth": technical_depth,
    "confidence_score": confidence_score,
    "readiness_score": readiness_target,
    "placement_status": status_target
})

perf_csv_path = os.path.join(dataset_dir, "placement_interview_data.csv")
perf_df.to_csv(perf_csv_path, index=False)
print(f"[+] Generated Placement Readiness Dataset: {len(perf_df)} instances -> {perf_csv_path}")

# Train Placement Readiness Regressor (Random Forest Regressor)
feature_cols = ["speech_wpm", "filler_count", "word_count", "semantic_relevance", "technical_depth", "confidence_score"]
X = perf_df[feature_cols]
y_reg = perf_df["readiness_score"]
y_cls = perf_df["placement_status"]

X_train, X_test, y_reg_train, y_reg_test = train_test_split(X, y_reg, test_size=0.2, random_state=42)
_, _, y_cls_train, y_cls_test = train_test_split(X, y_cls, test_size=0.2, random_state=42)

rf_regressor = RandomForestRegressor(n_estimators=120, max_depth=12, random_state=42)
rf_regressor.fit(X_train, y_reg_train)
y_pred_reg = rf_regressor.predict(X_test)
mae = mean_absolute_error(y_reg_test, y_pred_reg)
r2 = r2_score(y_reg_test, y_pred_reg)

print(f"[+] Random Forest Readiness Regressor — MAE: {mae:.2f}, R² Score: {r2:.4f}")

# Train Status Classifier (Gradient Boosting)
gb_classifier = GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=5, random_state=42)
gb_classifier.fit(X_train, y_cls_train)
y_pred_cls = gb_classifier.predict(X_test)
cls_acc = accuracy_score(y_cls_test, y_pred_cls)
cls_f1 = f1_score(y_cls_test, y_pred_cls, average="weighted")
print(f"[+] Gradient Boosting Placement Classifier — Accuracy: {cls_acc * 100:.2f}%, F1-Score: {cls_f1:.4f}")

# Save models
joblib.dump(rf_regressor, os.path.join(models_dir, "readiness_regressor.pkl"))
joblib.dump(gb_classifier, os.path.join(models_dir, "placement_classifier.pkl"))

# Save Metrics Metadata JSON
metrics_info = {
    "model_architecture": "Ensemble ML Pipeline (TF-IDF + Multinomial NB Domain Classifier, Random Forest Regressor & Gradient Boosting Placement Classifier)",
    "domain_classifier": {
        "algorithm": "Multinomial Naive Bayes + TF-IDF (1500 n-gram features)",
        "accuracy": round(float(d_acc) * 100, 2),
        "domains_supported": domains
    },
    "readiness_regressor": {
        "algorithm": "Random Forest Regressor (120 Estimators, Depth=12)",
        "r2_score": round(float(r2), 4),
        "mean_absolute_error": round(float(mae), 2)
    },
    "placement_classifier": {
        "algorithm": "Gradient Boosting Classifier",
        "accuracy": round(float(cls_acc) * 100, 2),
        "f1_score": round(float(cls_f1), 4),
        "classes": ["Needs Preparation", "Placement Ready", "Top Performer Star"]
    },
    "features_used": feature_cols,
    "training_samples": len(perf_df)
}

with open(os.path.join(models_dir, "model_metrics.json"), "w", encoding="utf-8") as f:
    json.dump(metrics_info, f, indent=2)

print("\n" + "="*60)
print("TRAINING COMPLETE: ALL 4 MODEL ARTIFACTS PERSISTED")
print(f"Saved into: {models_dir}")
print("="*60)
