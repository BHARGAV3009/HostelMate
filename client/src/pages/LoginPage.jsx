import { useState } from "react";
import { Building2, Mail, Lock, User, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, signupUser, loginWithGoogle } from "../api/api";
import { GoogleLogin } from "@react-oauth/google";
import "./LoginPage.css";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const isLogin = location.pathname !== "/signup";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        login(data.token, data.user);
        navigate(data.user.role === "admin" ? "/admin" : "/home");
      } else {
        const data = await signupUser(
          formData.fullName,
          formData.email,
          formData.password,
          formData.phone,
          formData.role,
        );
        login(data.token, data.user);
        navigate(data.user.role === "admin" ? "/admin" : "/home");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onhandleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await loginWithGoogle(credentialResponse.credential);
      login(data.token, data.user);
      navigate(data.user.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const onhandleGoogleFailure = (error) => {
    setError("Google authentication failed. Please try again.");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div id="icon-wrapper">
          <Building2 color="white" size={28} />
        </div>
        <h2>HostelMate</h2>
        <p className="subtitle">Your smart hostel companion</p>
      </div>

      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Sign Up As</label>
                <div
                  className="radio-group"
                  style={{ display: "flex", gap: "20px", marginTop: "8px" }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        accentColor: "#f97415",
                        transform: "scale(1.2)",
                      }}
                    />
                    Student
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        accentColor: "#f97415",
                        transform: "scale(1.2)",
                      }}
                    />
                    Admin
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                name="password"
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
          </button>

          <div className="social-login-separator">or</div>

          <div className="oauth-login">
            <GoogleLogin
              onSuccess={onhandleGoogleSuccess}
              onError={onhandleGoogleFailure}
              theme="outline"
              shape="pill"
              text="continue_with"
              autoPrompt={false}
              useBig={true}
            />
            <p>Note: Sign in with Google works only for Students</p>
          </div>
        </form>
      </div>

      <p className="footer-text">
        {isLogin
          ? "Don't have an account? Sign up above."
          : "By signing up, you agree to our terms and conditions."}
      </p>
    </div>
  );
};

export default LoginPage;
