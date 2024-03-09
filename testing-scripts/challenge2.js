const axios = require('axios');
const BASE_URL = 'https://challenge.crossmint.io/api/';
const candidateId = '9141bfe4-caac-408a-9015-ac330d0a178e';

// Function to make a generic POST request using Axios
async function postData(endpoint, data) {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, { candidateId, ...data });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.response.status} - ${error.response.statusText}`);
  }
}

// Function to make a generic DELETE request using Axios
async function deleteData(endpoint, data) {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      data: { candidateId, ...data },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.response.status} - ${error.response.statusText}`);
  }
}

// Functions for creating and deleting entities
async function createPolyanet(row, column) {
  return await postData('polyanets', { row, column });
}

async function deletePolyanet(row, column) {
  return await deleteData('polyanets', { row, column });
}

async function createSoloon(row, column, color) {
  return await postData('soloons', { row, column, color });
}

async function deleteSoloon(row, column) {
  return await deleteData('soloons', { row, column });
}

async function createCometh(row, column, direction) {
  return await postData('comeths', { row, column, direction });
}

async function deleteCometh(row, column) {
  return await deleteData('comeths', { row, column });
}

// Function to retrieve the goal map
async function getGoalMap() {
  try {
    const response = await axios.get(`${BASE_URL}map/${candidateId}/goal`);
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.response.status} - ${error.response.statusText}`);
  }
}

// Function to compare goal map and current Metaverse state
function goalMapContainsEntity(goalMap, rowIndex, columnIndex, entity) {
  return goalMap[rowIndex][columnIndex].entity === entity;
}

// Example usage
// Inside the generateCrossmintLogo function
async function generateCrossmintLogo() {
    try {
      // Retrieve the goal map
      const goalMap = await getGoalMap();
  
      // Check the type of goalMapData and iterate accordingly
      if (Array.isArray(goalMap)) {
        // If it's an array, assume a simple array of arrays structure
        goalMap.forEach(async (row, rowIndex) => {
          row.forEach(async (cell, columnIndex) => {
            const { entity, color, direction } = cell;
  
            // Create entities based on the goal map
            if (entity === 'polyanet') {
              await createPolyanet(rowIndex, columnIndex);
            } else if (entity === 'soloon') {
              await createSoloon(rowIndex, columnIndex, color);
            } else if (entity === 'cometh') {
              await createCometh(rowIndex, columnIndex, direction);
            }
          });
        });
      } else {
        // Handle other possible structures if needed
        console.error('Unexpected goal map structure:', goalMap);
      }
  
      console.log('Crossmint logo pushed to the Metaverse successfully!');
  
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

// Call the function to generate the Crossmint logo
generateCrossmintLogo();
