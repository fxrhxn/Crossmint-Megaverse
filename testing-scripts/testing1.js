const axios = require('axios');

const BASE_URL = 'https://challenge.crossmint.io/api/';
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e'; // Replace with your actual candidate ID

// Function to create a 🪐POLYanet at a given position
async function createPolyanet(row, column) {
    const endpoint = `${BASE_URL}polyanets`;
    try {
        const response = await axios.post(endpoint, { row, column, candidateId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`🪐POLYanet created at position (${row}, ${column})`);
    } catch (error) {
        console.error(`Failed to create 🪐POLYanet. Error: ${error.message}`);
        throw error;
    }
}

// Function to create the desired pattern of 🪐POLYanets
async function createPattern() {
    const patternCoordinates = [
        [2, 2], [2, 8],
        [4, 4], [4, 6],
        [6, 2], [6, 8],
        [8, 4], [8, 6],
    ];

    for (const [row, column] of patternCoordinates) {
        await createPolyanet(row, column);
    }

    console.log('Pattern of 🪐POLYanets created.');
}

// Call the function to create the pattern
createPattern();
