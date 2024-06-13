const express = require("express");
const { ProductModel } = require("../model/schema");
const productRouter = express.Router();

// Get All Products
productRouter.get('/', async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get All Products for only specific user
productRouter.get('/my-prod', async (req, res) => {
    try {
        const products = await ProductModel.findAll({ where: { user_id: req.userID } });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a Product
productRouter.post('/create', async (req, res) => {
    try {
        const { name, description, price, image, product_type } = req.body;
        console.log("Body", req.body);
        const product = new ProductModel({
            name,
            description,
            price,
            image,
            product_type,
            user_id: req.userID,
        });
        await product.save();
        res.json({ message: 'Product created successfully' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a Product
productRouter.put('/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, image, product_type } = req.body;
      console.log('Body', req.body);
      const product = await ProductModel.findOne({ where: { id, user_id: req.userID } });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.name = name;
      product.description = description;
      product.price = price;
      product.image = image;
      product.product_type = product_type;
  
      await product.save();
  
      res.json({ message: 'Product updated successfully', product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete Product by Id
productRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const procduct = await ProductModel.findOne({ where: {id, user_id: req.userID }});

        if (!procduct) {
            return res.status(404).send('Product not found');
        }

        await procduct.destroy();
        res.send('Product deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});



module.exports = productRouter;
