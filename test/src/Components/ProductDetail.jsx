// ProductDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductDetail() {
  const location = useLocation();
  const { product } = location.state;

  if (!product) return <div>No product found.</div>;

  return (
    <div className="product-detail">
      <h1>{product.productName}</h1>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>

    </div>
  );
}

export default ProductDetail;
