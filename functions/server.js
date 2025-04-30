const express = require('express');
const serverless = require('serverless-http');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Data file path
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper functions
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, '[]');
    }
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

async function readUsers() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const users = await readUsers();

  if (users.some(u => u.username === username)) {
    return res.render('signup', { error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    username,
    email,
    password: hashedPassword
  });

  await writeUsers(users);
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { username: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Export the serverless handler
module.exports.handler = serverless(app);
