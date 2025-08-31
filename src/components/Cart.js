const Cart = ({ cartItems }) => {

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};


export default Cart