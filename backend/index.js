const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Utility function to process the input data
const processInput = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Input data should be an array');
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z') {
        if (highestLowercase === '' || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  return {
    numbers,
    alphabets,
    highestLowercase: highestLowercase ? [highestLowercase] : []
  };
};

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Call the utility function to process input data
    const result = processInput(data);

    // Respond with the required data
    res.json({
      is_success: true,
      user_id: 'john_doe_17091999', // Replace with dynamic user_id based on user input
      email: 'john@xyz.com', // Replace with dynamic email based on user input
      roll_number: 'ABCD123', // Replace with dynamic roll number based on user input
      ...result
    });
  } catch (error) {
    res.status(400).json({ is_success: false, message: error.message });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
