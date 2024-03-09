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
            
        //   console.log("entity", entity)
        //   console.log("position", position)


          
        //   RIGHT_COMETH
        //   LEFT_COMETH
        //   UP_COMETH
        //   DOWN_COMETH

        //  POLYANET  

        //   BLUE_SOLOON
        //   RED_SOLOON
        //   PURPLE_SOLOON
        //   WHITE_SOLOON

        if(entity == 'RIGHT_COMETH'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                  row : position.row,
                  column : position.column,
                  direction: 'right', // Assuming 'right' is the direction for right comETH
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        } else if(entity == 'LEFT_COMETH'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                  row : position.row,
                  column : position.column,
                  direction: 'left', // Assuming 'right' is the direction for right comETH
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'UP_COMETH'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                  row : position.row,
                  column : position.column,
                  direction: 'up', // Assuming 'right' is the direction for right comETH
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'DOWN_COMETH'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/comeths', {
                  row : position.row,
                  column : position.column,
                  direction: 'down', // Assuming 'right' is the direction for right comETH
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'POLYANET'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/polyanets', {
                  row : position.row,
                  column : position.column,
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'BLUE_SOLOON'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                  row : position.row,
                  column : position.column,
                  color : 'blue',
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'RED_SALOON'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                  row : position.row,
                  column : position.column,
                  color : 'red',
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'PURPLE_SALOON'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                  row : position.row,
                  column : position.column,
                  color : 'purple',
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }else if(entity == 'WHITE_SALOON'){

            try {
                
                // Make API request to create right comETH
                const response = await axios.post('https://challenge.crossmint.io/api/soloons', {
                  row : position.row,
                  column : position.column,
                  color : 'white',
                  candidateId,
                });
            
                // Respond with the result from the Megaverse API
                console.log(response.data);

              } catch (error) {

                console.error('Error creating right comETH:', error.response.data);
                

              }

        }


        }

        await delay(1000);

      }

      res.send('Success')

    } catch (error) {
      console.error('Error retrieving goal map:', error.message);
      res.status(500).send('Internal Server Error');
    }

    
  });
  


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
