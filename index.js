const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./auth');

// Initialize dotenv to read .env variables
dotenv.config();

const app = express();

// CORS Configuration
// const corsOptions = {
//   origin: ['https://explore-bharat-frontend.vercel.app'], // Add your frontend URL here
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };
app.use(cors({
  origin: "https://explore-bharat-frontend.vercel.app", // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Middleware to parse JSON data
app.use(express.json());

// MongoDB Connection
const connectdb = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI,{})
  console.log('Connected to MongoDB')
  }catch(err){
    console.log("err")
  }
}
connectdb();
// Routes middleware
app.use('/api/auth', authRoutes);

// Start the server

app.get('/',(req,res)=>{
  return res.json({
    message:"Server UP"
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


