const express = require('express');
const connectDb = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', urlRoutes);

const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log("The server is running on port", port);
})