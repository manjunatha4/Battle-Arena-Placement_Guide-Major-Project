import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, User, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import BACKEND_URL from "@/config/api";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthModal } from "../context/AuthModalContext";

export function RegisterForm({ isModal = false }) {
 const navigate = useNavigate();
 // Only use auth modal context if we're inside the provider
 const authModal = isModal ? useAuthModal() : null;
 const [step, setStep] = useState(1);

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [otp, setOtp] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [successMsg, setSuccessMsg] = useState("");

 const googleLogin = useGoogleLogin({
   onSuccess: async (tokenResponse) => {
     try {
       setLoading(true);
       const res = await axios.post(`${BACKEND_URL}/api/users/auth/google/client`, {
         access_token: tokenResponse.access_token
       });
       
       if (res.data.name) localStorage.setItem("profile_name", res.data.name);
       if (res.data.email) localStorage.setItem("profile_email", res.data.email);
       if (res.data.avatar) localStorage.setItem("profile_avatar", res.data.avatar);
       if (res.data.token) localStorage.setItem("token", res.data.token);
       
       if (isModal && authModal) authModal.closeModal();
       navigate("/app");
     } catch (err) {
       console.error("Google register failed:", err);
       setError("Failed to register with Google. Please try again.");
       setLoading(false);
     }
   },
   onError: () => {
     setError("Google registration was cancelled or failed.");
   }
 });

 const handleSendOtp = async (e) => {
 e.preventDefault();
 if (!name || !email || !password) {
 setError("Please fill in all required fields.");
 return;
 }

 setLoading(true);
 setError("");
 setSuccessMsg("");

 try {
 await axios.post(`${BACKEND_URL}/api/users/send-otp`, {
 name,
 email,
 password,
 }, { withCredentials: true });

 setSuccessMsg("OTP has been sent to your email!");
 setStep(2);
 } catch (err) {
 console.error("OTP error:", err);
 const message = err.response?.data?.message || "Failed to send OTP. Please try again.";
 setError(message);
 } finally {
 setLoading(false);
 }
 };

 const handleVerifyOtp = async (e) => {
 e.preventDefault();
 if (!otp) {
 setError("Please enter the OTP.");
 return;
 }

 setLoading(true);
 setError("");

 try {
 const response = await axios.post(`${BACKEND_URL}/api/users/`, {
 name,
 email,
 password,
 otp
 }, { withCredentials: true });

 if (response.data) {
 if (isModal && authModal) {
   authModal.switchView('login');
 } else {
   navigate("/login");
 }
 }
 } catch (err) {
 console.error("Registration error:", err);
 const message = err.response?.data?.message || "Invalid OTP. Please try again.";
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
 <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">
 {step === 1 ? "Create an Account" : "Verify Your Email"}
 </h2>
 <p className="text-xs text-[var(--text-muted)]">
 {step === 1 ? "Start your AI placement preparation & executive practice" : `We sent a 6-digit OTP to ${email}`}
 </p>
 </div>

 {/* Alert badges */}
 {error && (
 <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400 animate-shake">
 <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
 <span className="leading-relaxed">{error}</span>
 </div>
 )}
 {successMsg && step === 2 && (
 <div className="mb-6 p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-2.5 text-xs text-green-400">
 <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
 <span className="leading-relaxed">{successMsg}</span>
 </div>
 )}

  {/* Continue with Google - only show on step 1 */}
  {step === 1 && (
  <>
  <button
  type="button"
  onClick={() => googleLogin()}
  disabled={loading}
  className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-[var(--border-glass)] bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm mb-5 group disabled:opacity-50"
  >
  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
    {loading ? "Signing up..." : "Continue with Google"}
  </span>
  </button>
  <div className="flex items-center gap-3 mb-5">
  <div className="flex-1 h-px bg-[var(--border-glass)]"></div>
  <span className="text-xs text-[var(--text-muted)] font-medium">or</span>
  <div className="flex-1 h-px bg-[var(--border-glass)]"></div>
  </div>
  </>
  )}

 {/* Step 1: Details Form */}
 {step === 1 && (
 <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-5">
 <div className="space-y-1.5">
 <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
 Full Name
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
 <User className="w-4 h-4" />
 </div>
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Enter your full name"
 required
 className="w-full pl-10 pr-4 py-3 glass-input text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all"
 />
 </div>
 </div>

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

 <div className="space-y-1.5">
 <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
 Password
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
 <Lock className="w-4 h-4" />
 </div>
 <input
 type={showPassword ? "text" : "password"}
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="Choose a strong password"
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
 <span>Sending OTP...</span>
 </>
 ) : (
 <span>Continue</span>
 )}
 </button>
 </form>
 )}

 {/* Step 2: OTP Verification Form */}
 {step === 2 && (
 <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-5">
 <div className="space-y-1.5">
 <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block text-center">
 Enter 6-Digit OTP
 </label>
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
 <KeyRound className="w-4 h-4" />
 </div>
 <input
 type="text"
 value={otp}
 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
 placeholder="• • • • • •"
 required
 className="w-full pl-10 pr-4 py-3 glass-input text-lg tracking-[0.5em] text-center text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all font-mono"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={loading || otp.length !== 6}
 className={`w-full glass-button !bg-[var(--accent-purple)] !text-white border border-[var(--border-glass)] hover:opacity-90 font-bold py-3.5 px-4 rounded-xl text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
 loading || otp.length !== 6 ? "opacity-60 cursor-not-allowed" : ""
 }`}
 >
 {loading ? (
 <>
 <Loader2 className="w-4 h-4 animate-spin" />
 <span>Verifying...</span>
 </>
 ) : (
 <span>Verify & Create Account</span>
 )}
 </button>

 <button
 type="button"
 onClick={() => {
 setStep(1);
 setError("");
 setSuccessMsg("");
 }}
 className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mt-2"
 >
 Change Email Address
 </button>
 </form>
 )}

 {/* Footer switch */}
 <div className="pt-4 border-t border-[var(--border-glass)] text-center text-xs text-[var(--text-muted)] flex flex-col items-center gap-3 mt-5">
 <div>
 Already have an account?{" "}
 {isModal ? (
   <button type="button" onClick={() => authModal?.switchView('login')} className="text-[var(--accent-cyan)] hover:text-[var(--text-main)] font-bold transition-colors">
     Sign in
   </button>
 ) : (
   <Link to="/login" className="text-[var(--accent-cyan)] hover:text-[var(--text-main)] font-bold transition-colors">
     Sign in
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
 </div>
 );
}