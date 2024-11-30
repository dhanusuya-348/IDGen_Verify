const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined! Server cannot start.');
}

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// User Schema and Model for Signup/Login
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Registration Schema and Model for Storing Registrations
const registerSchema = new mongoose.Schema({
  uniqueID: { type: String, unique: true },
  name: String,
  gender: String,
  age: { type: Number, min: 0 },
  dob: Date,
  phone: { type: String, match: /^[0-9]{10}$/ },
  email: { type: String, match: /.+\@.+\..+/ },
  faceScan: String,
  rationCard: String,
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model('Registration', registerSchema);

// Multer Configuration for File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// OTP Storage (Temporary In-Memory for Demo Purposes)
const otpStore = new Map();

// User Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error during signup' });
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// OTP Generation Route
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);
  console.log(`Generated OTP for ${phone}: ${otp}`);
  res.status(200).json({ message: 'OTP sent successfully', otp }); // OTP sent back in response for demo
});

// OTP Verification Route
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore.get(phone);
  if (storedOtp && storedOtp === otp) {
    otpStore.delete(phone);
    res.status(200).json({ verified: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid OTP' });
  }
});

// Registration Route with File Upload for Ration Card and Face Scan Data
app.post('/register', upload.single('rationCard'), async (req, res) => {
  const { name, gender, age, dob, phone, email, faceScan } = req.body;
  const rationCard = req.file ? req.file.buffer.toString('base64') : '';
  try {
    const uniqueID = `REG-${uuidv4()}`;
    const registration = new Registration({
      uniqueID,
      name,
      gender,
      age,
      dob,
      phone,
      email,
      faceScan,
      rationCard,
    });
    await registration.save();
    res.status(201).json({ message: 'Registration successful', uniqueID });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
