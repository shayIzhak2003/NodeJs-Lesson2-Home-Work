const fs = require('fs');
const express = require('express');
const { error } = require('console');
const app = express();

// Function to read the JSON file
function readFile(path) {
  fs.open(path, 'r', (err, fd) => {
    if (err) {
      console.error('Error opening file:', err);
      return;
    }

    fs.readFile(fd, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // Parse the JSON data (assuming it's valid JSON)
      try {
        const jsonData = JSON.parse(data);
        // Do something with the jsonData here
        console.log('Successfully read data:', jsonData);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      } finally {
        // Close the file descriptor (optional but good practice)
        fs.close(fd, (err) => {
          if (err) {
            console.error('Error closing file:', err);
          }
        });
      }
    });
  });
}

// Read the data.json file
readFile('src/data.json');

// Start the server (assuming you have routes defined in your app)
app.listen(4500, () => {
  console.log('Server started on port 3000');
});
