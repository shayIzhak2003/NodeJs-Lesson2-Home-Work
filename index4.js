const express = require('express');
// const fetch = require('node-fetch');
const server = express();
const port = 12345;

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

server.get('/search/:productName', async (req, res) => {
  const { productName } = req.params;
  try {
    const response = await fetch('https://dummyjson.com/products');
    const { products } = await response.json();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
    if (filteredProducts.length > 0) {
      res.json(filteredProducts);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
