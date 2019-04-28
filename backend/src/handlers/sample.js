exports.getCat = function(req, res, next) {
  res.send({ cat: "Fluffykins" });
};

exports.createCat = function(req, res, next) {
  res.send("Created Cat");
};
