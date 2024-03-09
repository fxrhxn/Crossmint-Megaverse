const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Step 1: Retrieve the goal map
app.get('/retrieveGoalMap', async (req, res) => {
    try {
        const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';
        const response = await axios.get(`https://challenge.crossmint.io/api/map/${candidateId}/goal`);

        let goalMapData = response.data;

        // Extract the goal array from the goalMapData
        let goalMapArray = goalMapData.goal;

        // Parse each row into an array of characters
        let parsedGoalMap = goalMapArray.map(row => row.map(item => item === "SPACE" ? "🌌" : item));

        for (let row = 0; row < parsedGoalMap.length; row++) {
            for (let col = 0; col < parsedGoalMap[row].length; col++) {
                let entity = parsedGoalMap[row][col];
                let position = { row, column: col };

                try {
                    // Make API request with a delay to avoid rate limits
                    await delay(400); // Adjust the delay time as needed

                    if (entity === 'RIGHT_COMETH' || entity === 'LEFT_COMETH' || entity === 'UP_COMETH' || entity === 'DOWN_COMETH') {
                        const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                            row: position.row,
                            column: position.column,
                            direction: entity.toLowerCase(), // Assuming entity names match the direction
                            candidateId,
                        });
                        console.log(response.data);
                    } else if (entity === 'POLYANET') {
                        const response = await axios.post('https://challenge.crossmint.io/api/polyanets', {
                            row: position.row,
                            column: position.column,
                            candidateId,
                        });
                        console.log(response.data);
                    } else if (entity === 'BLUE_SOLOON' || entity === 'RED_SALOON' || entity === 'PURPLE_SALOON' || entity === 'WHITE_SALOON') {
                        const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                            row: position.row,
                            column: position.column,
                            color: entity.split('_')[0].toLowerCase(),
                            candidateId,
                        });
                        console.log(response.data);
                    }
                } catch (error) {
                    console.error(`Error creating ${entity}:`, error.response.data);
                }
            }
        }

        res.send('Success');
    } catch (error) {
        console.error('Error retrieving goal map:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
