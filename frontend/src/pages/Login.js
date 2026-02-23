import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      if (res.data.role === "USER") navigate("/user");
      if (res.data.role === "STORE_OWNER") navigate("/owner");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "25px" }}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>

          {/* Email */}
          <div style={inputContainer}>
            <FaEnvelope style={iconStyle} />
            <input
              type="email"
              placeholder="Email Address"
              style={inputStyle}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div style={inputContainer}>
            <FaLock style={iconStyle} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={eyeIconStyle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button style={buttonStyle} type="submit">
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <span
            style={linkStyle}
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #4e73df, #1cc88a)"
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  width: "360px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const inputContainer = {
  position: "relative",
  marginBottom: "20px",
  width: "100%"
};

const inputStyle = {
  width: "100%",
  padding: "12px 40px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  boxSizing: "border-box"
};

const iconStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#888"
};

const eyeIconStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#888"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4e73df",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
};

const linkStyle = {
  color: "#4e73df",
  cursor: "pointer",
  fontWeight: 500
};

export default Login;