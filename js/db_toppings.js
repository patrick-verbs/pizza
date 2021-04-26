// Database stand-in
////////////////////
const all_toppings = [ // The overall array acts like a database
  // Roughly based on data from https://www.dominos.com/en/pages/content/nutritional/ingredients
  { // Each ingredient is an object in the array
    name: "pepperoni",
    type: "meat",
    ingredients: ["pork", "beef", "salt", "pepper", "dextrose", "lactic acid starter culture", "natural flavors", "oleoresin of paprika", "sodium ascorbate", "sodium nitrite", "citric acid"],// can be used for user-specific filtering (e.g. rare allergies)
  },
  {
    name: "grilled chicken",
    type: "meat",
    ingredients: ["chicken breast with rib meat (boneless; skinless)", "water", "yeast extract", "garlic powder", "buttermilk powder", "onion powder", "maltodextrin", "modified corn starch", "lipolyzed butter oil", "salt", "whey powder (milk)", "dehydrated garlic", "chicken powder", "flavors", "sunflower oil", "disodium guanylate", "disodium inosinate", "pepper", "chicken fat", "chicken broth", "sodium caseinate (milk)", "sodium phosphate", "modified food starch", "vinegar", "salt", "sodium phosphates"],
  },
  {
    name: "Italian sausage",
    type: "meat",
    ingredients: ["pork", "water", "salt", "pepper", "dextrose", "sodium phosphates", "natural flavors", "dehydrated garlic", "onion powder", "oleoresin of paprika"],
  },
  {
    name: "salami",
    type: "meat",
    ingredients: ["pork", "beef", "salt", "pepper", "natural flavors", "maltodextrin", "natural smoke flavor", "lactic acid starter culture", "sodium nitrite"],
  },
  {
    name: "feta cheese",
    type: "dairy",
    ingredients: ["cultured pasteurized milk", "salt", "enzymes", "potato starch (to prevent caking)"],
  },
  {
    name: "Parmesan cheese",
    type: "dairy",
    ingredients: ["pasteurized part-skim milk", "cheese cultures", "salt", "enzymes", "powdered cellulose (to prevent caking)", "titanium dioxide"],
  },
  {
    name: "spinach",
    type: "plant",
    ingredients: ["baby spinach leaves"],
  },
  {
    name: "banana peppers",
    type: "plant",
    ingredients: ["banana peppers (sliced)", "water", "distilled vinegar", "salt", "calcium chloride", "sodium benzoate (preservative)", "turmeric", "sodium metabisulfate (preservative)"],
  },
  {
    name: "pepperoncini",
    type: "plant",
    ingredients: ["pepperoncini (sliced)", "water", "salt", "citric acid", "sodium bisulfate", "sodium benzoate", "turmeric"],
  },
  {
    name: "black olives",
    type: "plant",
    ingredients: ["black olives (sliced)", "water", "salt", "ferrous gluconate (to stabilize color)"],
  },
  {
    name: "garlic",
    type: "plant",
    ingredients: ["garlic (minced)", "water", "phosphoric acid"],
  },
  {
    name: "roasted garlic",
    type: "plant",
    ingredients: ["garlic cloves (roasted)", "water"],
  },
  {
    name: "green peppers",
    type: "plant",
    ingredients: ["green bell peppers (sliced)"],
  },
  {
    name: "jalapeño peppers",
    type: "plant",
    ingredients: ["jalapeño peppers (sliced)"],
  },
  {
    name: "mushrooms",
    type: "plant",
    ingredients: ["cremini mushrooms (sliced)"],
  },
  {
    name: "pineapple",
    type: "plant",
    ingredients: ["pineapple (diced)", "water", "sugar", "citric acid", "ascorbic acid"],
  },
  {
    name: "onions",
    type: "plant",
    ingredients: ["yellow onions (sliced)"],
  },
  {
    name: "red onions",
    type: "plant",
    ingredients: ["red onions (sliced)"],
  },
  {
    name: "roasted red peppers",
    type: "plant",
    ingredients: ["red peppers (chopped)", "water", "salt", "citric acid", "calcium chloride"],
  },
  {
    name: "diced tomatoes",
    type: "plant",
    ingredients: ["roma tomatoes (diced)"],
  },
]