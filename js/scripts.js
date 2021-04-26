// Business logic
/////////////////
function Pizza(size) {
  this.size = size
  this.max_toppings = 12
  this.toppings = []
}

Pizza.prototype.addTopping = function(toppingDatabase, toppingName) {
  if (this.toppings.length < this.max_toppings) {
    console.log("Here's the topping: " + toppingName)
    const index = toppingDatabase.findIndex(toppingDatabase => toppingDatabase.name === toppingName) // Credit to answer by "Michał Perłakowski" at https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
    this.toppings.push(toppingDatabase[index].name)
    return true
  } else {
    return false
  }
}

Pizza.prototype.Cost = function() {
  let sizeCost
  if (this.size === "small") {
    sizeCost = 4
  } else if (this.size === "medium") {
    sizeCost = 6
  } else if (this.size === "large") {
    sizeCost = 8
  }
  let totalCost = sizeCost
  console.log("The toppings on this pizza are: " + this.toppings)
  let topping;
  for (let i = 0; i < this.toppings.length; i++) {
    topping = this.toppings[i]
    console.log("Topping: " + topping)
    for (let j = 0; j < all_toppings.length; j++) {
      if (topping === all_toppings[j].name) {
        console.log("why are there sooo many ingredients..." + all_toppings[j])
        // This adds "10" (cents) per ingredient in the topping
        totalCost += 0.10 * (all_toppings[j].ingredients.length)
      }
    }
  }
  totalCost = clamp(totalCost, sizeCost + 1, 14)
  return totalCost
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
  const pizzaResults = $("#pizza-results")
  const toppingsArray = []
  sizeSelector.on("click", "div", function() {
    sizeSelector.slideUp()
    const myPizza = new Pizza(this.id)// "this.id" will be "small", "medium", or "large"
    toppingSelector.removeClass("hide-me")

    unselectedToppings.on("click", ".topping", function() {
      let topping = this.id.replace("-", " ")
      toppingsArray.push(topping)
      $(selectedToppings).append($(this))
    })

    const selectedToppings = $("#selected-toppings")
    selectedToppings.on("click", "div", function() {
      removeArrayValue(toppingsArray, this.id)
      $(unselectedToppings).append($(this))
    })

    $("#makeThePizzaAlready").on("click", function () {
      toppingSelector.slideUp()
      for (let i = 0; i < toppingsArray.length; i++) {
        myPizza.addTopping(all_toppings, toppingsArray[i])
      }
      console.log(myPizza.cost + " with " + toppingsArray.length + " toppings...")
      console.log(toppingsArray)
      pizzaResults.html(`<h2>Your pizza's final price is:</h2><br><h1>$${(myPizza.Cost()).toFixed(2)}</h1>`)
      pizzaResults.removeClass("hide-me")
    })
  })
})