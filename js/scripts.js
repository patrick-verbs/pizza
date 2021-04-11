// Business logic
/////////////////
function Pizza(size) {
  this.size = size
  this.max_toppings = 10
  this.toppings = []
}

Pizza.prototype.addTopping = function(toppingDatabase, toppingName) {
  if (this.toppings.length < this.max_toppings) {
    index = toppingDatabase.findIndex(x => x.name === toppingName) // Credit to answer by "Michał Perłakowski" at https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
    this.toppings.push(toppingDatabase[index])
    return true
  } else {
    return false
  }
}

Pizza.prototype.Cost = function() {
  const livingWage = new LivingWage
  let laborCostPerMinute = Math.floor(unitConversion(livingWage, "cents, minutes"))
  return laborCostPerMinute
  let runningTotal = 0 // All numeric values are 1/100th of a USD (so, cents)
  let totalExpense = 0
  let totalPrepTime = 0
  let totalPoisonFee = 0
  let totalUnethicalFee = 0
  for (let i = 0; i < this.toppings.length; i++) {
    let topping = this.toppings[i]
    let expense = topping.acquisition_expense
    expense += clamp(topping.preparation_time[0])
    let fees = 25 * (topping.health_warning_tags.length + topping.ethics_tags.length)
  }
}

// Console test instantiation
/////////////////////////////
const myPizza = new Pizza("medium");
// const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];
myPizza.addTopping(all_toppings, "black olives")