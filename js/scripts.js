// Business logic
/////////////////
function Pizza(size) {
  this.size = size
  this.max_toppings = 12
  this.toppings = []
}

Pizza.prototype.addTopping = function(topping) {
  if (this.toppings.length < this.max_toppings) {
    this.toppings.push(topping)
  } else {
    console.log("She cannot hold any more toppings, Cap'n!")
  }
}

function Topping(name, ingredients, dietaryTags, acquisitionExpense, preparationTime) {
  this.name = name
  this.ingredients = ingredients
  this.dietaryTags = dietaryTags
  this.acquisitionExpense = acquisitionExpense
  this.preparationTime = preparationTime
}

// Database simulation
//////////////////////
const all_toppings = [
  {
    name: "spinach",
    ingredients: "spinach leaves",
    dietaryTags: ["vegetarian", "vegan"],
    acquisitionExpense: [500, "USD/100", "pound"],
    preparationTime: [0, "minutes"],
  },
]

// Console test instantiation
/////////////////////////////
const myPizza = new Pizza("medium");
const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];