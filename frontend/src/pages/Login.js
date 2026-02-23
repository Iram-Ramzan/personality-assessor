import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import login from "./login.jpg"; 
import { GoogleLogin } from '@react-oauth/google';  // ✅ CHANGED: GoogleLogin instead of useGoogleLogin
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);  
  const togglePassword = () => setShowPassword(!showPassword);
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        alert("Login successful");
        navigate("/assessment");
      }
      else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // ✅ NEW: Google Success Handler (REPLACES useGoogleLogin)
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("✅ Google ID Token:", credentialResponse.credential?.substring(0, 50) + "...");
    
    if (!credentialResponse.credential) {
      alert("No Google token received");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      console.log("✅ Backend response:", data);
      
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        alert("Welcome back to Personality World!");
        navigate('/assessment');
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  // ✅ NEW: Google Error Handler
  const handleGoogleError = () => {
    console.log("❌ Google login failed");
    alert("Google login failed");
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">

        {/* LEFT SECTION */}
        <div className="leftSection">
          <div className="leftContent">
            <h1 className="leftTitle">Welcome Back</h1>
            <p className="leftSubtitle">
              Explore your personality and unlock your potential
            </p>
            <img
              src={login}
              alt="Login placeholder"
              className="leftPlaceholderImg"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="rightSection">
          <div className="headerCenter">
            <h2>Sign In</h2>
            <p className="signupText">
              Don't have an account?{" "}
              <span className="signupLink" onClick={() => navigate("/signup")}>
                Create Account
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <span className="inputIcon"><FaEnvelope /></span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <span className="inputIcon" aria-hidden="true">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="passwordToggle"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>

          <div className="divider">or</div>

          <div className="googleLoginContainer">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signup_with"
              shape="rectangular"
              width={360}   
              logo_alignment="center"
            />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
