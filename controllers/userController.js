const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// User login
exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, admin: user.admin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // res.json({ token });

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    // Redirect to the homepage
    res.redirect('/catalog');
  
  } else {
    // res.status(401).json({ message: 'Invalid username or password' });
    res.status(401).render('login', { title: 'Login - Disc API', error: 'Invalid username or password' });
  }
});

// User logout
exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  // Typically, no action needed on the server side for JWT logout
  // res.status(200).json({ message: 'Logout successful' });
  res.redirect('/catalog');
});