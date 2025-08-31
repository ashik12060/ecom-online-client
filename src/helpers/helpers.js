export const addCartItemToStorage = (item) => {
  const currentItems = JSON.parse(localStorage.getItem("cart"));
  if (!currentItems) {
    const cart = [item];
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const productId = item._id;
    if (currentItems.find((itm) => itm._id === productId)) {
      const newItems = [...currentItems].map((itm) => {
        if (itm._id === productId) {
          itm.quantity = itm.quantity + 1;
        }
        return itm;
      });
      setToLocalStorage("cart", newItems);
    } else {
      const newCurrentItems = [...currentItems];
      newCurrentItems.push({ ...item, quantity: 1 });
      setToLocalStorage("cart", newCurrentItems);
    }
  }
};

export const setToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
