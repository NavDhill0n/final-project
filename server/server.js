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

app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/newdatabase'; // Replace with your actual URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB database "finalproject"'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// REST API Routes
// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username (this could be an Admin, Student, or Teacher)
    const user = await Admin.findOne({ username }) || await Student.findOne({ username }) || await Teacher.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout route (for JWT, logout is usually handled on the client side by simply removing the token)
app.post('/logout', (req, res) => {
  // On the server side, you can invalidate tokens by adding them to a blacklist
  // This example assumes logout is handled by removing the token on the client side.
  res.status(200).json({ message: 'Logged out successfully' });
});

// Hashing passwords before saving users

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
    const password = 'PASSWORD!1234558@#';
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name: 'nav23458',
      username: 'navdhillon23458',
      email: 'nvdhillon1233458@example.com',
      password: hashedPassword
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
    const password = 'PASSWORD!123468@#';
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name: 'Suraj Kumar168',
      username: 'SurajKumar168',
      email: 'suraj168@example.com',
      password: hashedPassword,
      studentId: 'S09876168'
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
    const password = 'PASSWORD!123478@#';
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      name: 'Raj Kumar178',
      username: 'RajKumar178',
      email: 'raj178@example.com',
      password: hashedPassword,
      teacherId: 'T0987617'
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});