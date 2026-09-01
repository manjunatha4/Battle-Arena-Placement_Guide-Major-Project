import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import BACKEND_URL from "@/config/api";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthModal } from "../context/AuthModalContext";

export function LoginForm({ isModal = false }) {
 const navigate = useNavigate();
 // Only use auth modal context if we're inside the provider
 const authModal = isModal ? useAuthModal() : null;

 const location = useLocation();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const res = await axios.post(`${BACKEND_URL}/api/users/auth/google/client`, {
          access_token: tokenResponse.access_token
        });
        
        // Save user data
        if (res.data.name) localStorage.setItem("profile_name", res.data.name);
        if (res.data.email) localStorage.setItem("profile_email", res.data.email);
        if (res.data.avatar) localStorage.setItem("profile_avatar", res.data.avatar);
        if (res.data.token) localStorage.setItem("token", res.data.token);
        
        if (isModal && authModal) authModal.closeModal();
        navigate("/app");
      } catch (err) {
        console.error("Google login failed on backend:", err);
        setError("Failed to authenticate with Google. Please try again.");
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      setError("Google login was cancelled or failed.");
    }
  });

 // Detect Google OAuth failure redirected back to /login?error=...
 useEffect(() => {
   const params = new URLSearchParams(location.search);
   const err = params.get("error");
   if (err === "google_failed") setError("Google sign-in failed. Please try again.");
   if (err === "no_user") setError("Could not retrieve your Google account. Please try again.");
   if (err === "token_failed") setError("Authentication error. Please try again.");
 }, [location.search]);

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!email || !password) {
 setError("Please fill in all required fields.");
 return;
 }

 setLoading(true);
 setError("");

 try {
 const response = await axios.post(`${BACKEND_URL}/api/users/auth`, {
 email,
 password,
 }, { withCredentials: true });

 if (response.data) {
 if (response.data.name) {
 localStorage.setItem("profile_name", response.data.name);
 }
 if (response.data.email) {
 localStorage.setItem("profile_email", response.data.email);
 }
 if (response.data.token) {
 localStorage.setItem("token", response.data.token);
 }
 if (isModal && authModal) authModal.closeModal();
 navigate("/app");
 }
 } catch (err) {
 console.error("Login error:", err);
 const message =
 err.response?.data?.message ||
 (err.message === "Network Error" ? "Network Error: Cannot reach backend server" : err.message) ||
 "Invalid email or password. Please try again.";
 setError(message);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="w-full glass-panel !bg-[var(--bg-glass)] p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
 {/* Top subtle line glow */}
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-cyan)] to-[var(--accent-blue)]"></div>

 {/* Brand Header */}
 <div className="text-center mb-8 space-y-2">
 <Link to="/" className="inline-flex items-center gap-2 group mb-1">
 <div className="w-10 h-10 rounded-xl bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] flex items-center justify-center group-hover:scale-105 transition-transform">
 <Sparkles className="w-5 h-5 text-[var(--text-main)]" />
 </div>
 <span className="text-xl font-extrabold text-[var(--text-main)] tracking-tight">
 Battle Arena <span className="text-[var(--text-main)]">Placement</span>
 </span>
 </Link>
 <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Welcome Back</h2>
 <p className="text-xs text-[var(--text-muted)]">
 Sign in to access your placement dashboard & AI tools
 </p>
 </div>

 {/* Continue with Google */}
 <button
 type="button"
 onClick={() => googleLogin()}
 disabled={loading}
 className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-[var(--border-glass)] bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm mb-5 group disabled:opacity-50"
 >
 {/* Official Google SVG Logo */}
 <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
   <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
   <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
   <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
   <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
   <path fill="none" d="M0 0h48v48H0z"/>
 </svg>
 <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
   {loading ? "Signing in..." : "Continue with Google"}
 </span>
 </button>

 {/* Divider */}
 <div className="flex items-center gap-3 mb-5">
 <div className="flex-1 h-px bg-[var(--border-glass)]"></div>
 <span className="text-xs text-[var(--text-muted)] font-medium">or</span>
 <div className="flex-1 h-px bg-[var(--border-glass)]"></div>
 </div>

 {/* Error alert badge */}
 {error && (
 <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400 animate-shake">
 <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
 <span className="leading-relaxed">{error}</span>
 </div>
 )}

 {/* Login Form */}
 <form onSubmit={handleSubmit} className="space-y-5">
 {/* Email field */}
 <div className="space-y-1.5">
 <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
 Email Address
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
 <Mail className="w-4 h-4" />
 </div>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="name@example.com"
 required
 className="w-full pl-10 pr-4 py-3 glass-input text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all"
 />
 </div>
 </div>

 {/* Password field */}
 <div className="space-y-1.5">
 <div className="flex items-center justify-between">
 <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
 Password
 </label>
 <a
 href="#"
 onClick={(e) => {
 e.preventDefault();
 alert("Please contact support or register a new account.");
 }}
 className="text-[11px] text-[var(--text-main)] hover:text-[var(--text-main)] transition-colors font-medium"
 >
 Forgot password?
 </a>
 </div>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
 <Lock className="w-4 h-4" />
 </div>
 <input
 type={showPassword ? "text" : "password"}
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="••••••••"
 required
 className="w-full pl-10 pr-10 py-3 glass-input text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
 >
 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
 </button>
 </div>
 </div>

 {/* Submit button */}
 <button
 type="submit"
 disabled={loading}
 className={`w-full glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-3.5 px-4 rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
 loading ? "opacity-60 cursor-not-allowed" : ""
 }`}
 >
 {loading ? (
 <>
 <Loader2 className="w-4 h-4 animate-spin" />
 <span>Authenticating...</span>
 </>
 ) : (
 <span>Sign In to Account</span>
 )}
 </button>

 {/* Footer switch */}
 <div className="pt-4 border-t border-[var(--border-glass)] text-center text-xs text-[var(--text-muted)] flex flex-col items-center gap-3">
 <div>
 Don&apos;t have an account?{" "}
 {isModal ? (
   <button type="button" onClick={() => authModal?.switchView('register')} className="text-[var(--accent-cyan)] hover:text-[var(--text-main)] font-bold transition-colors">
     Create an account
   </button>
 ) : (
   <Link to="/register" className="text-[var(--accent-cyan)] hover:text-[var(--text-main)] font-bold transition-colors">
     Create an account
   </Link>
 )}
 </div>

 {!isModal && (
 <Link
 to="/"
 className="inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mt-1"
 >
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
 </Link>
 )}
 </div>
 </form>
 </div>
 );
}