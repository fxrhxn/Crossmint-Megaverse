const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace 'YOUR_CANDIDATE_ID' with your actual candidate ID
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';

const createPolyanet = async (row, column) => {
  const postData = {
    row,
    column,
    candidateId,
  };

  try {
    await axios.post(`https://challenge.crossmint.io/api/polyanets`, postData);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate limit by retrying after an increasing delay
      const delay = Math.pow(2, error.response.headers['retry-after']);
      console.log(`Rate limited. Retrying after ${delay} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      return createPolyanet(row, column);
    } else {
      throw error;
    }
  }
};

app.get('/create-x-shape', async (req, res) => {
  try {
    // Loop to create 🪐POLYanets forming an X-shape
    for (let i = 0; i < 11; i++) {
      const offset = Math.abs(5 - i);
      await createPolyanet(i, offset);
      await createPolyanet(i, 10 - offset);
    }

    res.send('🪐POLYanet X-shape created successfully!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
