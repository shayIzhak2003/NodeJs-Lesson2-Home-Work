const express = require('express');


const server = express();
const port = 3250;

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/products', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


server.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
