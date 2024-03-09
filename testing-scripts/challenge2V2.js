const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/addCrossmintLogo', async (req, res) => {
  try {
    // Step 1: Retrieve Goal Map Data
    const candidateId = 'your_candidate_id'; // Replace with your actual candidate ID
    const goalMapData = await axios.get(`https://challenge.crossmint.io/api/map/${candidateId}/goal`);

    // Step 2: Parse Goal Map Data
    // Extract necessary details from goalMapData to determine logo placement

    // Step 3: Add Crossmint Logo
    const logoRow = 5; // Replace with the actual row for logo placement
    const logoColumn = 5; // Replace with the actual column for logo placement

    // Example for creating Polyanet
    await axios.post(`https://challenge.crossmint.io/api/polyanets`, { row: logoRow, column: logoColumn });

    // Example for creating Soloon
    await axios.post(`https://challenge.crossmint.io/api/soloons`, { row: logoRow, column: logoColumn, color: "blue" });

    // Example for creating Cometh
    await axios.post(`https://challenge.crossmint.io/api/comeths`, { row: logoRow, column: logoColumn, direction: "up" });

    // Step 4: Verify Changes
    const updatedMetaverse = await axios.get(`https://challenge.crossmint.io/api/map/${candidateId}`);
    console.log('Updated Metaverse:', updatedMetaverse.data);

    res.status(200).json({ success: true, message: 'Crossmint logo added successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error adding Crossmint logo.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
