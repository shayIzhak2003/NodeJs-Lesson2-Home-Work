const express = require('express');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let name = "";

rl.question('hello user please enter your name: ', (userInput) => {
   name = userInput;
   rl.close();

   const server = express();
   const PORT = 12345;

   server.get('/', (req, res) => {
       res.send(`hello ${name}, and welcome to our server!`);
   });

   server.get('/products', async (req, res) => {
       try {
           const response = await fetch('https://dummyjson.com/products');
           const data = await response.json();
           res.json(data);
       } catch (error) {
           res.status(500).json({ message: "Failed to fetch products" });
       }
   });
   
   server.get('/products/:productId', async (req, res) => {
       const { productId } = req.params;
       try {
           const response = await fetch(`https://dummyjson.com/products/${productId}`);
           const data = await response.json();
           res.json(data);
       } catch (error) {
           res.status(404).json({ message: "Product not found" });
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
               res.status(404).json({ message: `Hello ${name}, we didn't manage to find the product ${productName}!` });
           }
       } catch (error) {
           res.status(500).json({ message: "Failed to search products" });
       }
   });

   server.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
});
