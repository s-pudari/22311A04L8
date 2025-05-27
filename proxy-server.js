const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "http://20.244.56.144/evaluation-service";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MzI3NjU2LCJpYXQiOjE3NDgzMjczNTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQxNzEzZmY3LWU3ZDAtNDQ5OS05Zjk4LTUxZGVkOTI4YjIxNiIsInN1YiI6IjIyMzExYTA0bDhAZWNlLnNyZWVuaWRoaS5lZHUifSwiZW1haWwiOiIyMjMxMWEwNGw4QGVjZS5zcmVlbmlkaGkuZWR1IiwibmFtZSI6InB1ZGFyaSBzaGl2YWt1bWFyIiwicm9sbE5vIjoiMjIzMTFhMDRsOCIsImFjY2Vzc0NvZGUiOiJQQ3FBVUsiLCJjbGllbnRJRCI6IjQxNzEzZmY3LWU3ZDAtNDQ5OS05Zjk4LTUxZGVkOTI4YjIxNiIsImNsaWVudFNlY3JldCI6InlDaFByQlBQSnN1VVNaRWgifQ.dLJ6TS9kXsXcqpJX6r6lBneJPdv8iEYuYaIyqbjtYgg";

app.get("/stocks", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/stocks`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ ERROR CALLING AFFORDMED API:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(4000, () => {
  console.log(" Proxy server running on http://localhost:4000");
});
