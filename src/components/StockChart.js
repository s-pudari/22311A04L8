import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine
} from "recharts";

const StockChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Parse time + calculate average
  const formattedData = data.map((entry) => ({
    time: new Date(entry.lastUpdatedAt).toLocaleTimeString(),
    price: parseFloat(entry.price.toFixed(2)),
  }));

  const average =
    formattedData.reduce((acc, curr) => acc + curr.price, 0) /
    formattedData.length;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Line type="monotone" dataKey="price" stroke="#007bff" dot={{ r: 4 }} />
        <ReferenceLine y={average} label="Average" stroke="green" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
