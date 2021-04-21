// Business logic
/////////////////
function Pizza(size) {
  this.size = size
  this.max_toppings = 12
  this.toppings = []
}

Pizza.prototype.addTopping = function(toppingDatabase, toppingName) {
  if (this.toppings.length < this.max_toppings) {
    index = toppingDatabase.findIndex(x => x.name === toppingName) // Credit to answer by "Michał Perłakowski" at https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
    this.toppings.push(toppingDatabase[index.name])
    return true
  } else {
    return false
  }
}

Pizza.prototype.Cost = function() {
  return "$12.00"
  // const livingWage = new LivingWage
  // let laborCostPerMinute = Math.floor(unitConversion(livingWage, "cents, minutes"))
  // let runningTotal = 0 // All numeric values are 1/100th of a USD (so, cents)
  // let totalExpense = 0
  // let totalPrepTime = 0
  // let totalPoisonFee = 0
  // let totalUnethicalFee = 0
  // for (let i = 0; i < this.toppings.length; i++) {
  //   let topping = this.toppings[i]
  //   let expense = topping.acquisition_expense
  //   expense += clamp(topping.preparation_time[0])
  //   let fees = 25 * (topping.health_warning_tags.length + topping.ethics_tags.length)
  // }
}

// UI logic
///////////
$(document).ready(function() {
  const unselectedToppings = $("#unselected-toppings")
  for (let i = 0; i < all_toppings.length; i++) {
    let toppingName = all_toppings[i].name
    let toppingId = toppingName.replace(" ", "-")
    let toppingClass = all_toppings[i].type
    let toppingHtml = `<div class="topping" id="${toppingId}"><div class="card ${toppingClass}"><span class="button-text">${toppingName}</span></div><br></div>`
    unselectedToppings.append(toppingHtml)
  }

  const sizeSelector = $("#size-choice")
  const toppingSelector = $("#toppings-choice")
  const toppingsArray = []
  sizeSelector.on("click", "div", function() {
    sizeSelector.slideUp()
    const myPizza = new Pizza(this.id)
    toppingSelector.removeClass("hide-me")//.slideDown()

    unselectedToppings.on("click", ".topping", function() {
      toppingsArray.push(this.id)
      $(selectedToppings).append($(this)) // "this" === $("#whateverId")
    })

    const selectedToppings = $("#selected-toppings")
    selectedToppings.on("click", "div", function() {
      removeArrayValue(toppingsArray, this.id)
      $(unselectedToppings).append($(this))
    })

    $("#makeThePizzaAlready").on("click", function () {
      for (let i = 0; i < toppingsArray.length; i++) {
        myPizza.addTopping(all_toppings, toppingsArray[i])
      }
      console.log(myPizza.cost + " with " + toppingsArray.length + " toppings...")
      console.log(toppingsArray)
    })
  })
})

// Console test instantiation
/////////////////////////////
// const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];
// myPizza.addTopping(all_toppings, "black olives")