const axios = require('axios');

// Base URL for the Megaverse API
const baseUrl = 'https://challenge.crossmint.io/api/';

// Candidate ID (replace 'your_candidate_id' with the actual ID)
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';

// Function to create a 🪐POLYanet at a given position
const createPolyanet = async (row, column) => {
  const endpoint = `${baseUrl}polyanets`;
  const params = { row, column, candidateId };

  try {
    await axios.post(endpoint, params, { headers: { 'Content-Type': 'application/json' } });
    console.log(`🪐POLYanet created at position (${row}, ${column})`);
  } catch (error) {
    console.error(`Failed to create 🪐POLYanet at position (${row}, ${column}). Error: ${error.message}`);
  }
};

// Function to create an X-shape pattern of 🪐POLYanets
const createXShape = async () => {
  const size = 11; // Size of the grid (adjust as needed)

  // Create 🪐POLYanets in an X-shape pattern
  for (let i = 0; i < size; i++) {
    const row = i + 1;
    const column = i + 1;

    // Skip the center row to avoid duplicate coordinates
    if (row !== (size + 1) / 2) {
      await createPolyanet(row, column);
      await createPolyanet(row, size - i);
    }
  }
};

// Entry point - create the X-shape pattern
createXShape();
