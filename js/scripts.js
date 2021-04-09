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

function Topping(name, ingredients, dietary_tags, acquisition_expense, preparation_time) {
  this.name = name
  this.ingredients = ingredients
  this.dietary_tags = dietary_tags
  this.acquisition_expense = acquisition_expense
  this.preparation_time = preparation_time
}

// Database simulation
//////////////////////
const all_toppings = [ // The overall array acts like a database
  { // Each ingredient is an object in the array
    name: "spinach",
    ingredients: ["baby spinach leaves"],// can be used for user-specific filtering (e.g. rare allergies)
    common_allergen_tags: [],// should be derived from ingredients (and processes/preparation for cross-contamination risk??)
    dietary_tags: ["vegetarian", "vegan", "vegan_SOS-free"],// should also be derived from ingredients
    health_warning_tags: [],// ...also derived
    ethics_tags: [],// derive from source of foods (way outside the scope of this project)
    acquisition_expense: [500, "USD/100", "pound"],// likely derived from food provider as well! Eventually use this in topping pricing
    preparation_time: [0, "minutes"],// also use this in the pricing formula
  },
  {
    name: "banana peppers",
    ingredients: ["banana peppers (sliced)", "water", "distilled vinegar", "salt", "calcium chloride", "sodium benzoate (preservative)", "turmeric", "sodium metabisulfate (preservative)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "pepperoncini",
    ingredients: ["pepperoncini (sliced)", "water", "salt", "citric acid", "sodium bisulfate", "sodium benzoate", "turmeric"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "black olives",
    ingredients: ["black olives (sliced)", "water", "salt", "ferrous gluconate (to stabilize color)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "feta cheese",
    ingredients: ["cultured pasteurized milk", "salt", "enzymes", "potato starch (to prevent caking)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "garlic",
    ingredients: ["garlic (minced)", "water", "phosphoric acid"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "roasted garlic",
    ingredients: ["garlic cloves (roasted)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "green peppers",
    ingredients: ["green bell peppers (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "jalapeño peppers",
    ingredients: ["jalapeño peppers (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "mushrooms",
    ingredients: ["cremini mushrooms (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "pineapple",
    ingredients: ["pineapple (diced)", "water", "sugar", "citric acid", "ascorbic acid"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "onions",
    ingredients: ["yellow onions (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "red onions",
    ingredients: ["red onions (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "roasted red peppers",
    ingredients: ["red peppers (chopped)", "water", "salt", "citric acid", "calcium chloride"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
  {
    name: "diced tomatoes",
    ingredients: ["roma tomatoes (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD/100", "pound"],
    preparation_time: [0, "minutes"],
  },
]

// Console test instantiation
/////////////////////////////
const myPizza = new Pizza("medium");
const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];