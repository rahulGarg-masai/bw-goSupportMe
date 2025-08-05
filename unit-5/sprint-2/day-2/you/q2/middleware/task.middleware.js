const validateTaskData = async (req,res,next) => {
    const { title, description, priority } = req.body;

      // Check required fields
      if (!title || !description || !priority) {
          return res.status(400).json({
              msg: "Incomplete Data Received"
          });
      }

      // Validate priority values
      if (!['low', 'medium', 'high'].includes(priority)) {
          return res.status(400).json({
              msg: "Priority must be low, medium, or high"
          });
      }

      next(); // Continue to controller
  };


  module.exports = { validateTaskData };
