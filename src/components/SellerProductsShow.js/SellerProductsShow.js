import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerProductsShow = ({id}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seller-products`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container'>
      <h2 className='fw-bold'>Seller Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div className='rounded' key={product._id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', width: '200px' }}>
            <img className='border border-1 rounded' src={product.image.url} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button className="bg-color  text-white border-0 px-2 py-1">Buy Now</button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProductsShow;
