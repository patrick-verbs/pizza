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

// Utility functions
////////////////////
function clamp(number, min, max) { // Credit to answer by "dweeves" at https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
  return number <= min ? min : number >= max ? max : number
}

function unitConversion(inputMeasurement, outputUnits) {
  const allUnits = [ // Numbers based on minimum supported units, to delay floating-point handling as long as I can...
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
    {
      synonyms: ["cent", "cents"],
      factor: 1,
      measures: "currency (United States)",
    },
    {
      synonyms: ["USD", "dollar", "dollars", "$"],
      factor: 100,
      measures: "currency (United States)",
    }
  ]

  isJsonMeasurement = false
  outputUnits = outputUnits.split(", ")
  let outputFactors = []
  let outputParadigms = []

  let multiplierUnits = []
  let divisorUnits = []
  let multiplierFactors = []
  let divisorFactors = []
  let multiplierParadigms = []
  let divisorParadigms = []

  // Detect the notation format of the input measurement, then store its number (as factors)
  if (typeof inputMeasurement === 'object' && inputMeasurement !== null && inputMeasurement.hasOwnProperty("numerator") && inputMeasurement.hasOwnProperty("denominator")) {
    // This checks whether the input is a special "measurement" JSON object I designed (see "LivingWage()" for example)
    isJsonMeasurement = true
    multiplierFactors.push((inputMeasurement.numerator).number)
    divisorFactors.push((inputMeasurement.denominator).number)
    console.log("Detection working!\nBase number is: (" + multiplierFactors + ") / (" + divisorFactors + ")")
  } else {
    // Future handling to parse strings
    // multiplierFactors.push(parsed input number)
  }  

  // Find then store both the factors and paradigms of the output units
  for (let i = 0; i < allUnits.length; i++) {
    for (let j = 0; j < allUnits[i].synonyms.length; j++) {
      for (let k = 0; k < outputUnits.length; k++) {
        if (outputUnits[k] === allUnits[i].synonyms[j]) {
          let outputFactor = allUnits[i].factor
          let outputParadigm = allUnits[i].measures
          outputFactors.push(outputFactor)
          outputParadigms.push(outputParadigm)
          // Possible call to function here (DRY)
        }  
      }  
    }  
  }  
  console.log(`Output factors and their paradigms found!
  This measurement includes the paradigm(s): ${outputParadigms}
  The base factor(s) of the specific output units are: ${outputFactors}`)

  // Store the factors of the input measurement's units
  // *only* if those units are of the same paradigm as the output
  const numeratorUnits = (inputMeasurement.numerator).units
  const denominatorUnits = (inputMeasurement.denominator).units
  console.log(`
  The units used in the numerator are: ${numeratorUnits}
  The units used in the denominator are: ${denominatorUnits}`)

  for (let i = 0; i < allUnits.length; i++) {
    for (let j = 0; j < allUnits[i].synonyms.length; j++) {
      // assuming here it's a JSON measurement...
      for (let k = 0; k < numeratorUnits.length; k++) {
        if (numeratorUnits[k] === allUnits[i].synonyms[j]) {
          const thisParadigm = allUnits[i].measures
          console.log("Match found: " + numeratorUnits[k] + ", " + thisParadigm)
          for (let m = 0; m < outputParadigms.length; m++) {
            if (thisParadigm === outputParadigms[m]) {
              multiplierFactors.push(allUnits[i].factor)
              divisorFactors.push(outputFactors[m])
            }
          }
        }
      }
      for (let k = 0; k < denominatorUnits.length; k++) {
        if (denominatorUnits[k] === allUnits[i].synonyms[j]) {
          const thisParadigm = allUnits[i].measures
          for (let m = 0; m < outputParadigms.length; m++) {
            if (thisParadigm === outputParadigms[m]) {
              divisorFactors.push(allUnits[i].factor)
              multiplierFactors.push(outputFactors[m])
            }
          }
        }
      }
    }
  }

  let finalNumerator = 1
  let finalDenominator = 1
  for (let i = 0; i < multiplierFactors.length; i++) {
    finalNumerator *= multiplierFactors[i]
  }
  for (let i = 0; i < divisorFactors.length; i++) {
    finalDenominator *= divisorFactors[i]
  }
  console.log("Multipliers: " + multiplierFactors + '\n' + "Divisors: " + divisorFactors)
  console.log("Final result: " + finalNumerator/finalDenominator)
  return finalNumerator/finalDenominator
}

// Database stand-in
////////////////////

// Simulate processing Bureau of Labor and Statistics data for a living wage:
function LivingWage() {
  // This number is based the BLS Inflation Calculator from July 1968 (median for the year) to February 2021 (most recent available at this writing)
  // $1.60 (1968 minimum wage) comes to $12.06 on their calculator; I multiplied by 2.5 to bring it to the more equitable and realistic $30/hour for 2021 ($4/hour in 1968)
  this.numerator = {
    number: 30.14,
    units: ["USD"]
  }
  this.denominator = {
    number: 1,
    units: ["hour"]
  }
  this.statement = `${(this.numerator).number / (this.denominator).number} ${(this.numerator).units} per ${(this.denominator).units[0]}`
  return this.statement
  // BLS API to do this "for real": https://www.bls.gov/developers/
  // CPI Inflation Calculator: https://www.bls.gov/data/inflation_calculator.htm || Based on API-pullable data series: https://data.bls.gov/timeseries/CUUR0000SA0
  // Article on basing a living wage on earnings growth, rather than indexing it on inflation: https://inequality.org/research/minimum-wage/
  // Data to instead base living wage on earnings growth: https://www.bls.gov/cps/earnings.htm
}

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

// Console test instantiation
/////////////////////////////
const myPizza = new Pizza("medium");
// const myToppings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "daisies", "dandelions"];
myPizza.addTopping(all_toppings, "black olives")