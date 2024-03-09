const axios = require('axios');

const BASE_URL = 'https://challenge.crossmint.io/api/';
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e'; // Replace with your actual candidate ID
const delayBetweenRequests = 1000; // Adjust the delay in milliseconds based on the API rate limits

// Function to create a 🪐POLYanet at a given position with a delay
async function createPolyanet(row, column) {
    const endpoint = `${BASE_URL}polyanets`;
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
}

// Function to create the specified shape of 🪐POLYanets
async function createShape() {
    const shapeCoordinates = [
        [2, 2], [2, 8],
        [3, 3], [3, 7],
        [4, 4], [4, 6],
        [5, 5],
        [6, 4], [6, 6],
        [7, 3], [7, 7],
        [8, 2], [8, 8]
    ];

    for (const [row, column] of shapeCoordinates) {
        await createPolyanet(row, column);
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
    }

    console.log('Shape created successfully.');
}

// Call the function to create the specified shape
createShape();
