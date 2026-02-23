import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    const res = await api.get("/user/stores");
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const submitRating = async (storeId, rating) => {
    await api.post("/user/rate", { storeId, rating });
    fetchStores();
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "30px" }}>Stores</h1>

      {stores.map(store => (
        <div key={store.id} style={cardStyle}>
          <h2>{store.name}</h2>
          <p>{store.address}</p>
          <p>Average Rating: {store.averageRating}</p>
          <p>Your Rating: {store.userRating || "Not rated yet"}</p>

          <div>
            {[1,2,3,4,5].map(num => (
              <button
                key={num}
                style={ratingBtn}
                onClick={() => submitRating(store.id, num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      ))}
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

const ratingBtn = {
  padding: "8px 12px",
  marginRight: "8px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4e73df",
  color: "white",
  cursor: "pointer"
};

export default UserDashboard;