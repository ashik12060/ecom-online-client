import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleSllerProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seller-products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image.url} alt={product.name} style={{ width: '300px' }} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default SingleSllerProduct;
