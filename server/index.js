require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');
const multer = require('multer');
const path = require('path');

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect('mongodb://127.0.0.1:27017/employee')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { email, username, password, phone, location, role } = req.body;
    const profilePicture = req.file ? req.file.filename : null; // Handle profile picture
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new EmployeeModel({ email, username, password: hashedPassword, phone, location, profilePicture, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error during registration:', err);
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      res.status(500).json({ message: 'Error during registration', error: err.message });
    }
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No records found' });
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token, role: user.role });
    } else {
      res.status(400).json({ message: 'Password is incorrect' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});
app.get('/user/profile', authenticateToken, async (req, res) => {
  
  try {
    const user = await EmployeeModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
