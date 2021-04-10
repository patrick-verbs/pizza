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

Pizza.prototype.calcCost = function() {
  // All numberic values are 1/100th of a USD (so, cents)
  let laborCostPerMinute = Math.floor(LIVING_WAGE[0] / unitConversion(LIVING_WAGE[1], "minutes"))
  let total = 0
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

// Utility functions
////////////////////
function clamp(number, min, max) { // Credit to answer by "dweeves" at https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
  return number <= min ? min : number >= max ? max : number
}

function unitConversion(inputUnit, outputUnit) {
  const factors = [ // Numbers based on minimum supported units, to delay floating-point handling as long as I can...
    {
      synonyms: ["ms", "millisecond", "milliseconds"],
      factor: 1,
      measures: "time",
    },
    {
      synonyms: ["s", "sec", "secs", "second", "seconds"],
      factor: 1000,
      measures: "time",
    },
    {
      synonyms: ["min", "mins", "minute", "minutes"],
      factor: 60000,
      measures: "time",
    },
    {
      synonyms: ["h", "hr", "hrs", "hour", "hours"],
      factor: 3600000,
      measures: "time",
    },
  ]
  inputUnit = inputUnit.toLowerCase() // These may have to be removed if expanded for some case-sensitive units (e.g. Hz)
  outputUnit = outputUnit.toLowerCase()
  let inputFactor = 0
  let outputFactor = 0
  for (let i = 0; i < factors.length; i++) {
    for (let j = 0; j < factors[i].synonyms.length; j++) {
      if (inputUnit === factors[i].synonyms[j]) {
        inputFactor = factors[i].factor
      }
      if (outputUnit === factors[i].synonyms[j]) {
        outputFactor = factors[i].factor
      }
    }
  }
  let multiplier = (inputFactor / outputFactor).toFixed(4)
  return multiplier
}

// Database simulation
//////////////////////
const all_toppings = [ // The overall array acts like a database
  // Roughly based on data from https://www.dominos.com/en/pages/content/nutritional/ingredients
  { // Each ingredient is an object in the array
    name: "pepperoni",
    ingredients: ["pork", "beef", "salt", "pepper", "dextrose", "lactic acid starter culture", "natural flavors", "oleoresin of paprika", "sodium ascorbate", "sodium nitrite", "citric acid"],// can be used for user-specific filtering (e.g. rare allergies)
    common_allergen_tags: [],// should be derived from ingredients (and processes/preparation for cross-contamination risk??)
    dietary_tags: [],// should also be derived from ingredients
    health_warning_tags: [],// ...also derived
    ethics_tags: [],// derive from source of foods (way outside the scope of this project)
    acquisition_expense: [500, "USD / 100", "pound"],// likely derived from food provider as well! Eventually use this in topping pricing
    // using minimum units (so, cents instead of dollars) to avoid floating-point headaches as long as possible...
    preparation_time: [0, "minutes"],// also use this in the pricing formula
    surface_area_density: [1, "ounce", "cm^2"]// Systems of measure (and abbreviation/notation) are intentionally mixed for planned robust handling
  },
  {
    name: "grilled chicken",
    ingredients: ["chicken breast with rib meat (boneless; skinless)", "water", "yeast extract", "garlic powder", "buttermilk powder", "onion powder", "maltodextrin", "modified corn starch", "lipolyzed butter oil", "salt", "whey powder (milk)", "dehydrated garlic", "chicken powder", "flavors", "sunflower oil", "disodium guanylate", "disodium inosinate", "pepper", "chicken fat", "chicken broth", "sodium caseinate (milk)", "sodium phosphate", "modified food starch", "vinegar", "salt", "sodium phosphates"],
    common_allergen_tags: ["milk"],
    dietary_tags: [],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "Italian sausage",
    ingredients: ["pork", "water", "salt", "pepper", "dextrose", "sodium phosphates", "natural flavors", "dehydrated garlic", "onion powder", "oleoresin of paprika"],
    common_allergen_tags: [],
    dietary_tags: [],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "salami",
    ingredients: ["pork", "beef", "salt", "pepper", "natural flavors", "maltodextrin", "natural smoke flavor", "lactic acid starter culture", "sodium nitrite"],
    common_allergen_tags: [],
    dietary_tags: [],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "feta cheese",
    ingredients: ["cultured pasteurized milk", "salt", "enzymes", "potato starch (to prevent caking)"],
    common_allergen_tags: ["milk"],
    dietary_tags: ["vegetarian"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "Parmesan cheese",
    ingredients: ["pasteurized part-skim milk", "cheese cultures", "salt", "enzymes", "powdered cellulose (to prevent caking)", "titanium dioxide"],
    common_allergen_tags: ["milk"],
    dietary_tags: ["vegetarian"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "spinach",
    ingredients: ["baby spinach leaves"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan", "vegan_SOS-free"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "banana peppers",
    ingredients: ["banana peppers (sliced)", "water", "distilled vinegar", "salt", "calcium chloride", "sodium benzoate (preservative)", "turmeric", "sodium metabisulfate (preservative)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "pepperoncini",
    ingredients: ["pepperoncini (sliced)", "water", "salt", "citric acid", "sodium bisulfate", "sodium benzoate", "turmeric"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "black olives",
    ingredients: ["black olives (sliced)", "water", "salt", "ferrous gluconate (to stabilize color)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "garlic",
    ingredients: ["garlic (minced)", "water", "phosphoric acid"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "roasted garlic",
    ingredients: ["garlic cloves (roasted)", "water"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "green peppers",
    ingredients: ["green bell peppers (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "jalapeño peppers",
    ingredients: ["jalapeño peppers (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "mushrooms",
    ingredients: ["cremini mushrooms (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "pineapple",
    ingredients: ["pineapple (diced)", "water", "sugar", "citric acid", "ascorbic acid"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "onions",
    ingredients: ["yellow onions (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "red onions",
    ingredients: ["red onions (sliced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "roasted red peppers",
    ingredients: ["red peppers (chopped)", "water", "salt", "citric acid", "calcium chloride"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
  {
    name: "diced tomatoes",
    ingredients: ["roma tomatoes (diced)"],
    common_allergen_tags: [],
    dietary_tags: ["vegetarian", "vegan"],
    health_warning_tags: [],
    ethics_tags: [],
    acquisition_expense: [500, "USD / 100", "pound"],
    preparation_time: [0, "minutes"],
    surface_area_density: [1, "ounce", "cm^2"],
  },
]

// Simulate processing Bureau of Labor and Statistics data for a living wage:
const LIVING_WAGE = [30.14, "hour"]
// This number is based the BLS Inflation Calculator from July 1968 (median for the year) to February 2021 (most recent available at this writing)
// $1.60 (1968 minimum wage) comes to $12.06 on their calculator; I multiplied by 2.5 to bring it to the more equitable and realistic $30/hour for 2021 ($4/hour in 1968)

// BLS API to do this "for real": https://www.bls.gov/developers/
// CPI Inflation Calculator: https://www.bls.gov/data/inflation_calculator.htm || Based on API-pullable data series: https://data.bls.gov/timeseries/CUUR0000SA0
// Article on basing a living wage on earnings growth, rather than indexing it on inflation: https://inequality.org/research/minimum-wage/
// Data to instead base living wage on earnings growth: https://www.bls.gov/cps/earnings.htm

// Console test instantiation
/////////////////////////////
const myPizza = new Pizza("medium");
// const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];
myPizza.addTopping(all_toppings, "black olives")