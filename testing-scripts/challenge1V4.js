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
        console.error(`Failed to create 🪐POLYanet. Error: ${error.message}`);
        throw error;
    }
};

// Function to create an X-shape pattern of 🪐POLYanets
const createXShape = () => {
    // Define the coordinates for the X-shape
    const xCoordinates = Array.from({ length: 5 }, (_, i) => [i, i]);

    // Create 🪐POLYanets at the specified coordinates
    xCoordinates.forEach(([row, column]) => createPolyanet(row, column));
};

// Function to delete a 🪐POLYanet at a given position
const deletePolyanet = async (row, column, candidateId) => {
    const endpoint = `${baseUrl}polyanets`;
    try {
        const response = await axios.delete(endpoint, {
            params: { row, column, candidateId },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`🪐POLYanet deleted at position (${row}, ${column})`);
    } catch (error) {
        console.error(`Failed to delete 🪐POLYanet. Error: ${error.message}`);
        throw error;
    }
};

// Function to delete all 🪐POLYanets on the grid
const deleteAllPolyanets = async (candidateId) => {
    for (let row = 0; row < 11; row++) {
        for (let column = 0; column < 11; column++) {
            await deletePolyanet(row, column, candidateId);
        }
    }

    console.log('All 🪐POLYanets deleted.');
};


// Endpoint to trigger the creation of the X-shape pattern
app.get('/create-x-shape', (req, res) => {
    createXShape();
    res.send('X-shape pattern creation initiated.');
});

// Endpoint to delete all 🪐POLYanets on the grid
app.get('/delete-all-polyanets', async (req, res) => {
    try {
        await deleteAllPolyanets(candidateId);
        res.send('All 🪐POLYanets deleted.');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
