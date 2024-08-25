const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: "https://bajaj-finserv-health-challenge-frontend.vercel.app"
}));
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
      user_id: 'john_doe_17091999', 
      email: 'john@xyz.com', 
      roll_number: 'ABCD123', 
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
