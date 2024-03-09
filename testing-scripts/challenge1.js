const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Base URL for the Megaverse API
const baseUrl = 'https://challenge.crossmint.io/api/';

// Candidate ID (replace 'your_candidate_id' with the actual ID)
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';

// Function to create a 🪐POLYanet at a given position
const createPolyanet = async (row, column) => {
  const endpoint = `${baseUrl}polyanets`;
  const params = { row, column, candidateId };

  try {
    const response = await axios.post(endpoint, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(`🪐POLYanet created at position (${row}, ${column})`);
  } catch (error) {
    console.log(error)
    console.error(`Failed to create 🪐POLYanet. Error: ${error.message}`);
  }
};





// Function to create an X-shape pattern of 🪐POLYanets
const createXShape = () => {
  // Define the coordinates for the X-shape
  const xCoordinates = Array.from({ length: 5 }, (_, i) => [i, i]);

  // Create 🪐POLYanets at the specified coordinates
  xCoordinates.forEach(([row, column]) => createPolyanet(row, column));
};

// Endpoint to trigger the creation of the X-shape pattern
app.get('/create-x-shape', (req, res) => {
  createXShape();
  res.send('X-shape pattern creation initiated.');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
