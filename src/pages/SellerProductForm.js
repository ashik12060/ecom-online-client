// import React, { useState } from 'react';
// import axios from 'axios';

// const SellerProductForm = ({ sellerId }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
     
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/seller-product/add`, {
//         name,
//         price,
//         image,
//         sellerId,
//       });
//       console.log('Product added:', response.data);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Product Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Image URL:</label>
//         <input
//           type="text"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default SellerProductForm;

import React, { useState } from 'react';
import axios from 'axios';

const SellerProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [phone, setPhone] = useState('');

  const registerSeller = async (phone) => {
    try {
      const response = await axios.post('http://localhost:9000/api/register', { phone });
      return response.data.seller._id;
    } catch (error) {
      console.error('Error registering seller:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToken = localStorage.getItem('idToken');

    if (!sellerId) {
      const id = await registerSeller(phone);
      setSellerId(id);
    }

    try {
      const response = await axios.post(
        'http://localhost:9000/api/seller-product/add',
        { name, price, image, sellerId },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      console.log('Product added:', response.data.product);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Seller Phone" required />

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />

      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" required />
      
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Product Image URL" required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default SellerProductForm;
