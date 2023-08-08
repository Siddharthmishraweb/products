const User = require('../models/User');

exports.getUserAnalytics = async (req, res) => {
  try {
   const user = await User.findById(req.user._id);
   if (!user) {
     return res.status(404).json({ message: 'User not found' });
   }
   const charts = user.charts;
   return res.json(charts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
