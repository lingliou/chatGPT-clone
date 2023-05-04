import axios from "axios";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = 8000;

// const cors = require("cors");
// const express = require("express");
// const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.REACT_APP_API_KEY;

// const options = {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Hello!" }],
//     max_tokens: 100
//   }),
// };

// app.post("/completions", async(req, res) => {
//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data  = await response.json();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });


const options = {
  method: "POST",
  url: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  data: {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
    max_tokens: 100,
  },
};

app.post("/completions", (req, res) => {
  options.data.messages = [{ role: "user", content: req.body.messages }];
  console.log(options.headers.Authorization)
  axios(options)
    .then((response) => {
      res.send(response.data)
    })
    
    .catch((error) => console.error(error));
});

app.listen(PORT, () => console.log(`server runing in ${PORT}`));
