const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./admin');
const Student = require('./student');
const Teacher = require('./teacher');
const authMiddleware = require('./authMiddleware');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/abc'; // Replace with your actual URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB database "finalproject"'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// REST API Routes
// Login route
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    console.log(`Received login request with email: ${email}, role: ${role}`);

    let user;

    if (role === 'admin') {
      user = await Admin.findOne({ email: email.toLowerCase() });
    } else if (role === 'student') {
      user = await Student.findOne({ email: email.toLowerCase() });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ email: email.toLowerCase() });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    console.log("JWT Secret:", jwtSecret); 
    const userRole = user.role; // Use the single role directly
    const token = jwt.sign(
      { id: user._id, email: user.email, role: userRole }, 
      jwtSecret, 
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ token, role: userRole });
  } catch (err) {
    console.error(`Error during login: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

// Logout route (for JWT, logout is usually handled on the client side by simply removing the token)
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Hashing passwords before saving users
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Admin routes
app.post('/admins', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/admins/:username', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.params.username });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student routes
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/students/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teacher routes
app.post('/teachers', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/teachers/:username', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ username: req.params.username });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new admin
async function addAdmin() {
  try {
    const password = 'navdhillon8';
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name: 'navdhillon8',
      email: 'navdhillon8@example.com',
      password: hashedPassword,
      role: 'admin' // Change from 'roles' to 'role'
    });
    const savedAdmin = await admin.save();
    console.log(savedAdmin);
  } catch (err) {
    console.error(err);
  }
}

// Add a new student
async function addStudent() {
  try {
    const password = 'surajkumar9';
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name: 'surajkumar9',
      email: 'surajkumar9@example.com',
      password: hashedPassword,
      role: 'student', // Change from 'roles' to 'role'
    });
    const savedStudent = await student.save();
    console.log(savedStudent);
  } catch (err) {
    console.error(err);
  }
}

// Add a new teacher
async function addTeacher() {
  try {
    const password = 'taniyabawa18';
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      name: 'taniyabawa18',
      email: 'taniyabawa18@example.com',
      password: hashedPassword,
      role: 'teacher', // Change from 'roles' to 'role'
    });
    const savedTeacher = await teacher.save();
    console.log(savedTeacher);
  } catch (err) {
    console.error(err);
  }
}

// Call the functions to add admin, student, and teacher
addAdmin();
addStudent();
addTeacher();

// Define your protected route
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Define a public route (for testing)
app.get('/public', (req, res) => {
  res.status(200).json({ message: 'This is a public route' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
