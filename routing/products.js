
const express = require("express");



const { MENU_LINKS } = require('../constants/navigation'); 
const { productsSlice } = require('../store/products'); 

const router = express.Router();


router.get('/', (_request, response) => {
  response.render('products', { 
    headTitle: 'Shop – Products',
    path: '/products', 
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products', 
    products: productsSlice.products, 
  });
});


router.get('/add', (_request, response) => {
 
  response.render('add-product', {
    headTitle: 'Shop - Add Product',
    path: '/products/add',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products/add',
  });
});


router.post('/add', (request, response) => {
  const { name, description } = request.body;

  
  if (name && description) { 
      const newProduct = {
        id: Date.now().toString(), 
        name: name,
        description: description,
      };

      productsSlice.newestProduct = { ...newProduct }; 
      productsSlice.products.push(newProduct);     
      response.redirect('/products');
  } else {

      response.redirect('/products/add');
  }

 
});


router.get('/new', (_request, response) => {
  
  response.render('new-product', {
    headTitle: 'Shop - Newest Product',
    path: '/products/new',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products/new',
    newestProduct: productsSlice.newestProduct, 
  });


});

module.exports = router;