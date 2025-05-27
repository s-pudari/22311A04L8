
import axios from "axios";


const API_BASE = "http://localhost:4000"; 



const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MzI0Mjk0LCJpYXQiOjE3NDgzMjM5OTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQxNzEzZmY3LWU3ZDAtNDQ5OS05Zjk4LTUxZGVkOTI4YjIxNiIsInN1YiI6IjIyMzExYTA0bDhAZWNlLnNyZWVuaWRoaS5lZHUifSwiZW1haWwiOiIyMjMxMWEwNGw4QGVjZS5zcmVlbmlkaGkuZWR1IiwibmFtZSI6InB1ZGFyaSBzaGl2YWt1bWFyIiwicm9sbE5vIjoiMjIzMTFhMDRsOCIsImFjY2Vzc0NvZGUiOiJQQ3FBVUsiLCJjbGllbnRJRCI6IjQxNzEzZmY3LWU3ZDAtNDQ5OS05Zjk4LTUxZGVkOTI4YjIxNiIsImNsaWVudFNlY3JldCI6InlDaFByQlBQSnN1VVNaRWgifQ.Nnr1xgN49qUb8v8vLghXgGrhLHVzCp1SoptJJ8bMuN4";


export const getStocks = async () => {
  const res = await axios.get(`${API_BASE}/stocks`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`, 
    },
  });
  return res.data;
};
