import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      login(data.user, data.token);
      navigate("/Dashboard");
    } catch {
      setError("Cannot connect to server. Make sure it's running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <svg
        className="mountains"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M870,55 Q876,50 882,55 Q888,50 894,55"
          stroke="rgba(80,60,140,0.5)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M920,42 Q925,37 930,42 Q935,37 940,42"
          stroke="rgba(80,60,140,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M1160,68 Q1164,64 1168,68 Q1172,64 1176,68"
          stroke="rgba(80,60,140,0.35)"
          strokeWidth="1.5"
          fill="none"
        />
        <polygon
          points="0,320 180,160 340,280 500,140 660,260 800,120 960,240 1100,100 1260,220 1440,160 1440,600 0,600"
          fill="rgba(140,120,200,0.45)"
        />
        <polygon
          points="0,400 200,220 400,360 600,180 750,310 900,150 1100,300 1280,180 1440,280 1440,600 0,600"
          fill="rgba(90,75,170,0.6)"
        />
        <polygon
          points="700,600 900,200 1100,600"
          fill="rgba(60,45,130,0.85)"
        />
        <polygon
          points="800,600 1050,140 1300,600"
          fill="rgba(55,40,120,0.9)"
        />
        <polygon
          points="0,600 0,420 200,300 400,440 600,320 750,460 900,350 1100,480 1300,360 1440,430 1440,600"
          fill="rgba(35,25,90,0.95)"
        />
        <polygon points="0,600 0,500 80,480 160,600" fill="rgba(20,15,60,1)" />
        <polygon points="60,600 120,490 180,600" fill="rgba(20,15,60,1)" />
        <polygon points="150,600 210,485 270,600" fill="rgba(20,15,60,1)" />
        <polygon points="1200,600 1260,490 1320,600" fill="rgba(20,15,60,1)" />
        <polygon points="1280,600 1340,478 1400,600" fill="rgba(20,15,60,1)" />
        <polygon
          points="1360,600 1400,488 1440,540 1440,600"
          fill="rgba(20,15,60,1)"
        />
        {[
          320, 370, 420, 470, 520, 570, 620, 680, 740, 800, 850, 900, 960, 1010,
          1060, 1110, 1150,
        ].map((x, i) => (
          <polygon
            key={i}
            points={`${x},600 ${x + 28},${530 - (i % 3) * 10} ${x + 56},600`}
            fill="rgba(18,12,55,1)"
          />
        ))}
      </svg>

      <div className="login-card register-card">
        <h1>Register</h1>

        <div className="input-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <span className="input-icon">👤</span>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
          />
          <span className="input-icon">✉</span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <span className="input-icon">🔒</span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <span className="input-icon">🔒</span>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button
          className="login-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="register-text">
          Already have an account?<a href="/login"> Login</a>
        </p>
      </div>
    </div>
  );
}
