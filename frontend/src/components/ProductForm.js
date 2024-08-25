import React, { useState } from 'react';
import { createProduct, updateProduct } from '../api';

const ProductForm = ({ token, isEditMode, product }) => {
  const [productData, setProductData] = useState(
    product || { name: '', price: '' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateProduct(product.id, productData, token);
      } else {
        await createProduct(productData, token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
      />
      <button type="submit">{isEditMode ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;
