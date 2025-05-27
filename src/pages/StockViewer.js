import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
import axios from "axios";

const STOCKS = {
  "Alphabet Inc. Class C (GOOG)": "GOOG",
  "Alphabet Inc. Class A (GOOGL)": "GOOGL",
  "Amazon.com, Inc. (AMZN)": "AMZN",
  "Microsoft Corporation (MSFT)": "MSFT",
};

const StockViewer = () => {
  const [selectedStock, setSelectedStock] = useState("GOOG");
  const [minutes, setMinutes] = useState(30);
  const [stockData, setStockData] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `http://20.244.56.144/evaluation-service/stocks/${selectedStock}?minutes=${minutes}`
      );
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []); // Load initially

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stock Price Viewer
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          select
          label="Select Stock"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          sx={{ width: 250 }}
        >
          {Object.entries(STOCKS).map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          sx={{ width: 150 }}
        />

        <Button variant="contained" onClick={fetchStockData}>
          Load Chart
        </Button>
      </Box>

      <StockChart data={stockData} />
    </Box>
  );
};

export default StockViewer;
