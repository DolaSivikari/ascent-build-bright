#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');
const bcrypt = require('bcryptjs');

// Ensure bcryptjs is installed
try {
  require.resolve('bcryptjs');
} catch (e) {
  console.log('bcryptjs not found, installing...');
  execSync('npm install bcryptjs', { stdio: 'inherit' });
}

// Ensure data folder exists
if (!fs.existsSync('data')) fs.mkdirSync('data');

// Admin file path
const adminFile = './data/admins.json';
let admins = [];
if (fs.existsSync(adminFile)) {
  admins = JSON.parse(fs.readFileSync(adminFile));
}

// Prompt user for email/password
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin password: ', (password) => {
    const hash = bcrypt.hashSync(password, 12);
    admins.push({ email, password: hash, role: 'admin' });
    fs.writeFileSync(adminFile, JSON.stringify(admins, null, 2));
    console.log(`Admin user ${email} created successfully!`);
    rl.close();
  });
});
