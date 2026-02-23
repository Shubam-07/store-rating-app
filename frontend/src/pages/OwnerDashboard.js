import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const OwnerDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/owner/dashboard");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 style={{ marginBottom: "30px" }}>Store Overview</h1>

      <div style={cardStyle}>
        <h2>{data.storeName}</h2>
        <h3>Average Rating: {data.averageRating}</h3>
      </div>

      <div style={cardStyle}>
        <h3>Users Who Rated:</h3>
        {data.ratedUsers?.map((user, index) => (
          <p key={index}>
            {user.userName} ({user.userEmail}) - Rating: {user.rating}
          </p>
        ))}
      </div>
    </Layout>
  );
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 3px 8px rgba(0,0,0,0.05)"
};

export default OwnerDashboard;