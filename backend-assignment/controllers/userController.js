const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
   console.log(req.user)
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('productFeatures');
    const products = user.productFeatures;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
