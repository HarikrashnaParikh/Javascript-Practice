const Repository = require("./repository.js");

class Cart extends Repository {}
module.exports = new Cart("carts.json");
