// Business logic
/////////////////
function Pizza(size) {
  this.size = size
  this.toppings = []
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping)
}

// Console test instantiation
/////////////////////////////
const myToppings = ["spinach", "sun-dried tomatoes", "roasted garlic"];
const myPizza = new Pizza("medium");
