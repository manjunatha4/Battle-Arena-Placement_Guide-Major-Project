# Frontend — Progress Log
### Contributors: Lakshmish A (Core Pages & Auth UI), Manjunatha R (Learning Modules & Design System)

---

## Sprint 1 — Week 1 (Foundation)

### ✅ 2026-08-01 — React + Vite Project Setup (Lakshmish)
- Initialized React project with Vite build tool
- Configured Tailwind CSS for styling
- Set up folder structure: src/pages, src/components, src/context, src/config
- Installed deps: react-router-dom, axios, lucide-react, framer-motion, @react-oauth/google

### ✅ 2026-08-02 — Landing Page (Lakshmish)
- Built Hero section with animated gradient background
- Created Navbar with glass-morphism effect and theme toggle (dark/light)
- Implemented Features grid showcasing all platform capabilities
- Added responsive Footer component

### ✅ 2026-08-04 — Authentication UI (Lakshmish)
- Built Login/Register modal with email/password fields
- Integrated Google OAuth Sign-In button via @react-oauth/google
- Form validation and error handling (wrong password, user exists, etc.)
- Connected to backend auth APIs with JWT cookie storage
- Created AuthModalContext for global auth state management

---

## Sprint 2 — Week 3 (Core Pages)

### ✅ 2026-08-08 — Dashboard Page (Lakshmish)
- Built main dashboard with stat cards: Resume Score, Interviews Given, Level, Streak
- Created AI Interview Assistant quick-start card
- Added Job Recommendations feed with match percentages
- Built DSA Progress tracker showing topic completion
- Implemented AI Tips section with personalized suggestions

### ✅ 2026-08-10 — Mock Interview Page (Lakshmish)
- Built interview config screen: mode selection (raw/resume), voice tone picker, resume upload
- Implemented webcam feed with getUserMedia API and mirror view (scaleX(-1))
- Created live AI feedback sidebar: speech pace, eye contact, posture, confidence
- Built question display card with Re-play Audio button (Web Speech Synthesis API)
- Integrated Click to Speak (Web Speech Recognition API) for answer transcription
- Built Finish Answer flow: save answer → next question → speak question
- Created performance report page with score, metrics, lagging areas, AI recommendations
- Added Download Feedback button (generates .txt report)

### ✅ 2026-08-14 — Profile & Settings Pages (Lakshmish)
- User profile page with editable name/email
- Settings page with theme preferences
- Logout functionality

---

## Sprint 3 — Week 5 (Learning Modules & Design)

### ✅ 2026-08-08 — DSA Learning Path (Manjunatha)
- Built DSAContent page with structured topic cards
- 10+ topic modules: Arrays, Strings, Binary Search, Recursion, Bit Manipulation, Sliding Window, Greedy, Linked Lists, Stacks/Queues, Heaps, Binary Trees, BST
- Each topic card shows lecture count and assignment progress
- Expandable detail views with VideoPlayer and AssignmentList components

### ✅ 2026-08-10 — Aptitude Battle Arena (Manjunatha)
- Gamified aptitude test system with 3 Fighter Classes: Math Mage, Logic Knight, Grammar Rogue
- Each class has unique skills and combat-themed question categories
- Battle interface with combo streaks, XP scoring, and level progression
- Company-specific question banks (TCS, Infosys, Wipro, etc.)
- Multi-mode: Solo Practice, Ranked Battle, Company Prep
- Battle History and Analytics views

### ✅ 2026-08-12 — Contest Tracker (Manjunatha)
- Coding Platforms Explorer: LeetCode, HackerRank, CodeForces, CodeChef, AtCoder, TopCoder
- Each platform card shows contest frequency, user count, and difficulty level
- Show Contests button reveals upcoming contest schedule
- Notification subscription system

### ✅ 2026-08-15 — Alumni Connect (Manjunatha)
- Alumni networking page with profile cards
- Displays company, role, batch year, and connect button
- Filter by company and graduation year

### ✅ 2026-08-17 — Job Recommendations (Manjunatha)
- AI-powered job listing page
- Job cards show match percentage based on resume skills
- Company, role, location, and apply link for each listing

### ✅ 2026-08-20 — Premium UI & Design System (Manjunatha)
- Implemented dark/light theme toggle via ThemeProvider context
- Designed glass-morphism classes: glass-panel, glass-button, glass-input in index.css
- Integrated Plus Jakarta Sans (headings) and Inter (body) from Google Fonts
- Added smooth cubic-bezier hover animations on all interactive elements
- Built responsive sidebar navigation with active route highlighting
- Unified color palette using CSS custom properties (--bg-base, --text-main, --accent-purple, etc.)
