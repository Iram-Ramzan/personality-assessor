import React, { useState } from "react";
import "./Signup.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';  // ✅ CHANGED
import { useNavigate } from "react-router-dom";
import signup from "./signup.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!form.terms) {
      alert("Please accept Terms and Conditions");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  // ✅ FIXED Google Success Handler
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
        alert("Welcome to Personality World!");
        navigate('/assessment');
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  const handleGoogleError = () => {
    console.log("❌ Google login failed");
    alert("Google login failed");
  };

  return (
    <div className="signupContainer">
      <div className="signupCard">
        {/* LEFT SECTION */}
        <div className="leftSection">
          <div className="leftContent">
            <h1 className="leftTitle">Welcome to Personality World</h1>
            <p className="leftSubtitle">
              Discover your strengths and explore who you truly are
            </p>
            <img
              className="leftPlaceholderImg"
              src={signup}
              alt="Signup placeholder"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="rightSection">
          <div className="headerCenter">
            <h2>Create Account</h2>
            <p className="loginText">
              Already have an account?{" "}
              <span className="loginLink" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <span className="inputIcon" aria-hidden="true">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <span className="inputIcon" aria-hidden="true">
                <FaEnvelope />
              </span>
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

            <label className="termsRow">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <span>
                I agree to <strong>Terms</strong> and <strong>Conditions</strong>
              </span>
            </label>

            <button className="signupBtn" type="submit">
              Create Account
            </button>
          </form>

          <div className="divider">or</div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
            width="100%"
            logo_alignment="center"  
          />
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
