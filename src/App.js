import React, { useEffect, useState } from "react";
import { getStocks } from "./api";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

function App() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState("");
  const [minutes, setMinutes] = useState(30);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStocks();
        setStocks(data.stocks);
      } catch (err) {
        console.error("❌ Error fetching stocks", err);
      }
    };
    fetchData();
  }, []);

  const fetchStockPrices = async () => {
    if (!selectedStock) return;
    try {
      const res = await axios.get(
        `http://localhost:4000/stocks/${selectedStock}?minutes=${minutes}`
      );
      setPriceData(res.data);
    } catch (err) {
      console.error("❌ Error fetching stock prices", err);
    }
  };

  const calculateAverage = () => {
    if (priceData.length === 0) return 0;
    const total = priceData.reduce((sum, p) => sum + p.price, 0);
    return (total / priceData.length).toFixed(2);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>📈 Stock Price Viewer</h1>

      {/* Stock Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Stock: </label>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="">--Choose a stock--</option>
          {Object.entries(stocks).map(([name, ticker]) => (
            <option key={ticker} value={ticker}>
              {name} ({ticker})
            </option>
          ))}
        </select>
      </div>

      {/* Minutes Input */}
      <div style={{ marginBottom: "20px" }}>
        <label>Minutes: </label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button onClick={fetchStockPrices} style={{ marginLeft: "10px" }}>
          Load Chart
        </button>
      </div>

      {/* Chart Section */}
      {priceData.length > 0 && (
        <>
          <h3>📊 Average Price: ${calculateAverage()}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lastUpdatedAt" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default App;



