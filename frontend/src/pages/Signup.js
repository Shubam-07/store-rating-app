import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            className="input"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            className="input"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;