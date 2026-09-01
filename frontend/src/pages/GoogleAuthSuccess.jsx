import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (data) {
      try {
        const user = JSON.parse(decodeURIComponent(data));
        if (user.name) localStorage.setItem("profile_name", user.name);
        if (user.email) localStorage.setItem("profile_email", user.email);
        if (user.avatar) localStorage.setItem("profile_avatar", user.avatar);
        if (user.token) localStorage.setItem("token", user.token);
        navigate("/app");
      } catch (e) {
        console.error("Failed to parse Google auth data", e);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-[var(--text-main)]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-lg font-semibold">Signing you in with Google...</p>
      </div>
    </div>
  );
}
