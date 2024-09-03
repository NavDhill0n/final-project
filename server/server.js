const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./admin');
const Student = require('./student');
const Teacher = require('./teacher');

app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/newdatabase'; // Replace with your actual URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB database "finalproject"'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// REST API Routes

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
    const admin = new Admin({
      name: 'nav23',
      username: 'navdhillon23',
      email: 'nvdhillon1233@example.com',
      password: 'PASSWORD!123@#'
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
    const student = new Student({
      name: 'Suraj Kumar',
      username: 'SurajKumar',
      email: 'suraj@example.com',
      password: 'PASSWORD12233',
      studentId: 'S09876'
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
    const teacher = new Teacher({
      name: 'Raj Kumar',
      username: 'RajKumar',
      email: 'raj@example.com',
      password: 'PASSWORD12345',
      teacherId: 'T09876'
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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});