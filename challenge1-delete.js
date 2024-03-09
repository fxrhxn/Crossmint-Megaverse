const axios = require('axios');

const BASE_URL = 'https://challenge.crossmint.io/api/';
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e'; // Replace with your actual candidate ID
const delayBetweenRequests = 1000; // Adjust the delay in milliseconds based on the API rate limits

// Function to delete a 🪐POLYanet at a given position with a delay
async function deletePolyanet(row, column) {
    const endpoint = `${BASE_URL}polyanets`;
    const params = { row, column, candidateId };

    try {
        const response = await axios.delete(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: params,
        });

        console.log(`🪐POLYanet deleted at position (${row}, ${column})`);
    } catch (error) {
        console.error(`Failed to delete 🪐POLYanet. Error: ${error.message}`);
        throw error;
    }
}

// Function to delete all 🪐POLYanets on the Megaverse with a delay
async function clearMegaverse() {
    for (let row = 0; row < 11; row++) {
        for (let column = 0; column < 11; column++) {
            await deletePolyanet(row, column);
            await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        }
    }

    console.log('Megaverse cleared of all 🪐POLYanets.');
}

// Call the function to clear the Megaverse
clearMegaverse();
