
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('../config/passport');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("Stored hashed password:", user.password);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const storedHashedPassword = user.password;
    console.log("Stored hashed password:", storedHashedPassword);
    
    const generatedHashedPassword = bcrypt.hashSync(password.trim(), 10);
    console.log("Generated hashed password:", generatedHashedPassword);
    
    const isMatch = await bcrypt.compare(password, storedHashedPassword);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const payload = { sub: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred' });
  }
};
