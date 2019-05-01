exports.centsToDecimal = num => {
  return (num / 100).toFixed(2);
};

exports.decimalToCents = num => {
  return num * 100;
};
