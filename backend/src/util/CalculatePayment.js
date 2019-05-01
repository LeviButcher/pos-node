exports.minimumPayment = cart => {
  return Math.ceil(
    cart.reduce((acc, curr) => curr.item.price * curr.quantity, 0)
  );
};
