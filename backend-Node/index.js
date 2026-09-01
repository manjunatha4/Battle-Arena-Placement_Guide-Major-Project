import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import session from "express-session"
import passport from "./config/passport.js"
import jwt from "jsonwebtoken"
dotenv.config()
const PORT = process.env.PORT || 3000
import axios from "axios"
import connectDB from "./config/db.js"

connectDB()

const app = express()

// Change this origin when in production
// app.use(cors({ origin: "https://dev-clash-flax.vercel.app"})) // for production


// app.use(cors({ origin: "http://localhost:5173"}, )) // for Localhost


// app.use(cors({
//   origin: "https://dev-clash-flax.vercel.app/",
//   credentials: true, // Allow cookies or Authorization headers
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure all required methods are allowed
//   allowedHeaders: ["Content-Type", "Authorization"] // Include necessary headers
// }))

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.use(cookieParser())

// Session middleware (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || "battle_arena_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", userRoutes)
app.use("/api/interview", interviewRoutes)

// ===== GOOGLE OAUTH ROUTES =====
// Step 1: Redirect to Google
app.get("/api/users/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// Step 2: Google Callback - Custom handler for full control
app.get("/api/users/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      // On any error or failure, redirect to frontend login with error message
      if (err) {
        console.error("Google OAuth Error:", err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_failed`);
      }
      if (!user) {
        console.error("Google OAuth: No user returned", info);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
      }

      try {
        // Generate JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        // Redirect to frontend success page with user data encoded in URL
        const userData = encodeURIComponent(JSON.stringify({
          name: user.name,
          email: user.email,
          avatar: user.avatar || "",
          token
        }));

        res.redirect(`${process.env.FRONTEND_URL}/auth/google/success?data=${userData}`);
      } catch (tokenErr) {
        console.error("Token generation error:", tokenErr);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=token_failed`);
      }
    })(req, res, next);
  }
)

const MOCK_JOBS = [
  {
    job_title: "Software Development Engineer (SDE I)",
    employer_name: "Amazon",
    job_city: "Hyderabad",
    job_country: "India",
    job_employment_type: "Full-time",
    job_posted_at_datetime_utc: new Date().toISOString(),
    job_apply_link: "https://amazon.jobs",
  },
  {
    job_title: "Frontend Engineer - React/TypeScript",
    employer_name: "Google",
    job_city: "Bangalore",
    job_country: "India",
    job_employment_type: "Full-time",
    job_posted_at_datetime_utc: new Date().toISOString(),
    job_apply_link: "https://careers.google.com",
  },
  {
    job_title: "Associate Software Engineer",
    employer_name: "Microsoft",
    job_city: "Hyderabad",
    job_country: "India",
    job_employment_type: "Full-time",
    job_posted_at_datetime_utc: new Date(Date.now() - 86400000).toISOString(),
    job_apply_link: "https://careers.microsoft.com",
  },
  {
    job_title: "Software Engineer II",
    employer_name: "Meta",
    job_city: "Remote",
    job_country: "India",
    job_employment_type: "Full-time",
    job_posted_at_datetime_utc: new Date(Date.now() - 172800000).toISOString(),
    job_apply_link: "https://metacareers.com",
  },
  {
    job_title: "Full Stack Developer (MERN)",
    employer_name: "Netflix",
    job_city: "Mumbai",
    job_country: "India",
    job_employment_type: "Full-time",
    job_posted_at_datetime_utc: new Date(Date.now() - 259200000).toISOString(),
    job_apply_link: "https://jobs.netflix.com",
  },
  {
    job_title: "Data Structures & Algorithms Intern",
    employer_name: "Uber",
    job_city: "Bangalore",
    job_country: "India",
    job_employment_type: "Internship",
    job_posted_at_datetime_utc: new Date(Date.now() - 345600000).toISOString(),
    job_apply_link: "https://uber.com/careers",
  }
];

app.get("/job-recommendations", async (req, res) => {
  const appId = process.env.ADZUNA_API_ID;
  const apiKey = process.env.ADZUNA_API_KEY;
  const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`;
  const queryParams = {
    app_id: appId,
    app_key: apiKey,
    results_per_page: 20,
    what: "developer",
    "content-type": "application/json"
  };

  try {
    const response = await axios.get(url, { params: queryParams });
    const rawJobs = response.data.results || [];
    
    const jobs = rawJobs.map(job => ({
      job_title: job.title,
      employer_name: job.company?.display_name || "Technology Company",
      job_city: job.location?.display_name || "Remote",
      job_country: "India",
      job_employment_type: job.contract_type === "permanent" ? "Full-time" : (job.contract_type || "Full-time"),
      job_posted_at_datetime_utc: job.created || new Date().toISOString(),
      job_apply_link: job.redirect_url,
    }));

    res.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs from Adzuna (using mock fallback):", error.message);
    res.json({ jobs: MOCK_JOBS });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error("Backend Error:", err);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on port: " + PORT)
})
