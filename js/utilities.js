// Utility functions
////////////////////
function clamp(number, min, max) { // Credit to answer by "dweeves" at https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
  return number <= min ? min : number >= max ? max : number
}

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

  isJsonMeasurement = false // Flag for my measurement storage format
  outputUnits = outputUnits.split(", ")
  let outputFactors = []
  let outputParadigms = []

  let multiplierFactors = []
  let divisorFactors = []

  // Detect the notation format of the input measurement, then store its number (as factors)
  if (typeof inputMeasurement === 'object' && inputMeasurement !== null && inputMeasurement.hasOwnProperty("numerator") && inputMeasurement.hasOwnProperty("denominator")) {
    // Checks whether the input is a special "measurement" JSON object (see "LivingWage()" for example)
    isJsonMeasurement = true
    multiplierFactors.push((inputMeasurement.numerator).number)
    divisorFactors.push((inputMeasurement.denominator).number)
    // console.log("Detection working!\nBase number is: (" + multiplierFactors + ") / (" + divisorFactors + ")")
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
  // console.log(`Output factors and their paradigms found!
  // This measurement includes the paradigm(s): ${outputParadigms}
  // The base factor(s) of the specific output units are: ${outputFactors}`)

  // Store the factors of the input measurement's units
  // *only* if those units are of the same paradigm as the output
  const numeratorUnits = (inputMeasurement.numerator).units
  const denominatorUnits = (inputMeasurement.denominator).units
  // console.log(`
  // The units used in the numerator are: ${numeratorUnits}
  // The units used in the denominator are: ${denominatorUnits}`)

  for (let i = 0; i < allUnits.length; i++) {
    for (let j = 0; j < allUnits[i].synonyms.length; j++) {
      // assuming here it's a JSON measurement...
      for (let k = 0; k < numeratorUnits.length; k++) {
        if (numeratorUnits[k] === allUnits[i].synonyms[j]) {
          const thisParadigm = allUnits[i].measures
          // console.log("Match found: " + numeratorUnits[k] + ", " + thisParadigm)
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
  // console.log("Multipliers: " + multiplierFactors + '\n' + "Divisors: " + divisorFactors)
  // console.log("Final result: " + finalNumerator/finalDenominator)
  return finalNumerator/finalDenominator
}