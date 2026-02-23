import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <h1 style={{ marginBottom: "30px" }}>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <DashboardCard title="Total Users" value={stats.totalUsers} />
        <DashboardCard title="Total Stores" value={stats.totalStores} />
        <DashboardCard title="Total Ratings" value={stats.totalRatings} />
      </div>
    </Layout>
  );
};

const DashboardCard = ({ title, value }) => (
  <div style={{
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    flex: 1
  }}>
    <h3 style={{ marginBottom: "10px", color: "#6b7280" }}>{title}</h3>
    <h1 style={{ fontSize: "28px" }}>{value || 0}</h1>
  </div>
);

export default AdminDashboard;