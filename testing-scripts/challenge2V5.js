const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// GET request that starts a for loop 
app.get('/fill-metaverse', async (req, res) => {


    try {

        // Candidate ID 
        const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';
        const response = await axios.get(`https://challenge.crossmint.io/api/map/${candidateId}/goal`);

        // Data retrieved for the goal map
        let goalMapData = response.data;

        // Extract the goal array from the goalMapData
        let goalMapArray = goalMapData.goal;

        // Parse each row into an array of characters
        let parsedGoalMap = goalMapArray.map(row => row.map(item => item === "SPACE" ? "🌌" : item));

        // Start a for loop 
        for (let row = 0; row < parsedGoalMap.length; row++) {
           
            for (let col = 0; col < parsedGoalMap[row].length; col++) {
                let entity = parsedGoalMap[row][col];
                let position = { row, column: col };

                try {

                    // Make API request with a delay to avoid rate limits
                    await delay(1000); // Adjust the delay time as needed

                    // Fill in all COMETHs 
                    if (entity === 'RIGHT_COMETH' || entity === 'LEFT_COMETH' || entity === 'UP_COMETH' || entity === 'DOWN_COMETH') {
                        const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                            row: position.row,
                            column: position.column,
                            direction: entity.split('_')[0].toLowerCase(), // Assuming entity names match the direction
                            candidateId,
                        });
                        console.log(response.data);

                    // Fill in all POLYANETS
                    } else if (entity === 'POLYANET') {
                        const response = await axios.post('https://challenge.crossmint.io/api/polyanets', {
                            row: position.row,
                            column: position.column,
                            candidateId,
                        });
                        console.log(response.data);

                    // Fill in all SOLOONS
                    } else if (entity === 'BLUE_SOLOON' || entity === 'RED_SOLOON' || entity === 'PURPLE_SOLOON' || entity === 'WHITE_SOLOON') {
                        const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                            row: position.row,
                            column: position.column,
                            color: entity.split('_')[0].toLowerCase(),
                            candidateId,
                        });
                        console.log(response.data);
                    }
                
                    // Catch any errors 
                } catch (error) {
                    console.error(`Error creating ${entity}:`, error.response.data);
                }
            }
        }

        


    } catch (error) {
        console.error('Error retrieving goal map:', error.message);
        res.status(500).send('Internal Server Error');
    }

    res.send('Please wait as the map gets filled.');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
